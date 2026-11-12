// Dynamics 365 Sales Hub — Application Logic
// State management, Web Audio synthesizer, transcript rendering, and interactions.

    // --- 2. GLOBAL APPLICATION STATE ---
    let activeSidebarMenu = 'activities';
    let menuHistory = ['activities'];
    let activeSubTab = 'callInsights';
    let activeSubTabIndex = 2;
    let activeDynSubTabIndex = 0;
    let activeKeywordFilter = '';
    let activeSpeakerFilter = '';
    let activeSentimentFilter = 'all';
    let activeLineId = 1;
    let isCompleted = false;
    let isPlayingAudio = false;
    let playbackSpeed = 1;
    let audioInterval = null;
    let currentPlaySeconds = 24;
    let isDraggingWaveform = false;
    let audioCtx = null;
    let quoteSeats = 500;
    let quotePrinters = 45;

    // --- 3. WEB AUDIO API SYNTHESIZER FOR REALISTIC VOICE CADENCE & DIAL TONES ---
    function playVoicePulseTone(speaker) {
      const toggle = document.getElementById('toggleWebAudio');
      if (toggle && !toggle.checked) return;
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        // Subtle soft harmonic click/pulse representing speech envelope
        osc.frequency.setValueAtTime(speaker === 'Halle Griffiths' ? 235 : 165, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.018, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.14);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } catch (e) {}
    }

    function simulateRedialTone() {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc1 = audioCtx.createOscillator();
        const osc2 = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc1.frequency.value = 440;
        osc2.frequency.value = 480;
        gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.45);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start();
        osc2.start();
        osc1.stop(audioCtx.currentTime + 0.45);
        osc2.stop(audioCtx.currentTime + 0.45);
      } catch (e) {}
      showToast('Dialing +1 (555) 234-8910 (Northwind HQ)...');
    }

    // --- 4. RENDER TRANSCRIPT FEED ---
    function renderTranscriptList() {
      const container = document.getElementById('transcriptScrollContainer');
      const searchInput = document.getElementById('transcriptSearchInput');
      const clearBtn = document.getElementById('clearSearchBtn');
      const matchBadge = document.getElementById('searchMatchBadge');
      const countLabel = document.getElementById('transcriptCountLabel');
      const query = (searchInput.value || '').trim().toLowerCase();

      const hasAnyFilter = Boolean(query || activeKeywordFilter || activeSpeakerFilter || activeSentimentFilter !== 'all');
      clearBtn.classList.toggle('hidden', !hasAnyFilter);

      const filtered = transcriptData.filter(item => {
        const matchesSearch = !query || item.text.toLowerCase().includes(query) || item.speaker.toLowerCase().includes(query);
        const matchesKeyword = !activeKeywordFilter || item.text.toLowerCase().includes(activeKeywordFilter.toLowerCase());
        const matchesSpeaker = !activeSpeakerFilter || item.speaker === activeSpeakerFilter || (activeSpeakerFilter === 'Josiah Love' && item.id === 2);
        const matchesSentiment = activeSentimentFilter === 'all' || item.sentiment === activeSentimentFilter;
        return matchesSearch && matchesKeyword && matchesSpeaker && matchesSentiment;
      });

      if (query || activeKeywordFilter) {
        matchBadge.classList.remove('hidden');
        matchBadge.textContent = `${filtered.length} match${filtered.length === 1 ? '' : 'es'}`;
      } else {
        matchBadge.classList.add('hidden');
      }

      countLabel.textContent = filtered.length === transcriptData.length
        ? `Showing all ${filtered.length} conversation turns • Scroll for full transcript`
        : `Filtered: ${filtered.length} of ${transcriptData.length} turns`;

      if (filtered.length === 0) {
        container.innerHTML = `
          <div class="transcript-bubble rounded-[26px] p-5 text-center text-white/85 text-xs">
            No transcript turns match your current filter criteria.
            <button onclick="clearTranscriptSearch()" class="underline ml-2 font-semibold">Reset all filters</button>
          </div>
        `;
        return;
      }

      container.innerHTML = filtered.map(item => {
        let highlightedText = item.text;
        const highlightTarget = query || activeKeywordFilter;
        if (highlightTarget) {
          const regex = new RegExp(`(${highlightTarget.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
          highlightedText = highlightedText.replace(regex, '<mark class="bg-white text-[#121316] px-1.5 py-0.5 rounded font-semibold">$1</mark>');
        }

        const isActive = item.id === activeLineId;
        const sentDotColor = item.sentiment === 'positive'
          ? 'bg-[#6EE7B7]'
          : item.sentiment === 'negative'
          ? 'bg-rose-300'
          : 'bg-white/60';

        return `
          <div
            id="transcriptRow-${item.id}"
            onclick="selectTranscriptLine(${item.id}, ${item.percent}, '${item.time.slice(3)}', ${item.seconds})"
            class="transcript-bubble ${isActive ? 'active-line' : ''} rounded-full px-3.5 py-2.5 flex items-center justify-between gap-4 cursor-pointer"
          >
            <div class="flex items-center gap-3 min-w-[155px] shrink-0">
              <div class="w-9 h-9 rounded-full p-0.5 shrink-0 overflow-hidden relative" style="background:${item.avatarBg}">
                <img src="${item.avatar}" alt="${item.speaker}" class="w-full h-full rounded-full object-cover"/>
              </div>
              <div>
                <div class="text-[11.5px] font-medium text-white leading-tight flex items-center gap-1.5">
                  <span>${item.speaker}</span>
                  <span class="w-1.5 h-1.5 rounded-full ${sentDotColor}" title="Sentiment: ${item.sentiment}"></span>
                </div>
                <div class="text-[10px] text-[#7CE7D9] font-normal mt-0.5">${item.time}</div>
              </div>
            </div>

            <div class="flex-1 text-[12px] text-white/95 font-light leading-snug">
              ${highlightedText}
            </div>

            <button
              onclick="event.stopPropagation(); openTranscriptTurnMenu(${item.id})"
              title="Turn Actions (Copy, Convert to Action Item, Bookmark)"
              class="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white/90 shrink-0 transition-colors"
            >
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="4" cy="10" r="1.4"/><circle cx="10" cy="10" r="1.4"/><circle cx="16" cy="10" r="1.4"/>
              </svg>
            </button>
          </div>
        `;
      }).join('');
    }

    function selectTranscriptLine(id, percent, shortTime, seconds) {
      activeLineId = id;
      if (typeof seconds === 'number') currentPlaySeconds = seconds;
      const playhead = document.getElementById('playheadLine');
      const timeLabel = document.getElementById('playheadTimeLabel');
      playhead.style.left = `${percent}%`;
      timeLabel.textContent = shortTime.startsWith('0') ? shortTime.slice(1) : shortTime;
      const turn = transcriptData.find(t => t.id === id);
      if (turn) playVoicePulseTone(turn.speaker);
      renderTranscriptList();
    }

    function openTranscriptTurnMenu(turnId) {
      const turn = transcriptData.find(t => t.id === turnId);
      if (!turn) return;
      const overlay = document.getElementById('modalOverlay');
      const title = document.getElementById('modalTitle');
      const body = document.getElementById('modalBody');
      const confirmBtn = document.getElementById('modalConfirmBtn');

      overlay.classList.remove('hidden');
      title.textContent = `Transcript Turn (${turn.time})`;
      body.innerHTML = `
        <div class="bg-white p-3 rounded-xl border border-black/10 text-[#141518] italic">"${turn.text}"</div>
        <div class="grid grid-cols-2 gap-2 pt-2">
          <button onclick="copyTranscriptLine('${turn.speaker}', '${turn.time}', \`${turn.text.replace(/`/g, '')}\`); closeModal();" class="bg-white hover:bg-neutral-100 border border-black/10 p-2.5 rounded-xl font-medium text-[#141518]">📋 Copy Quote</button>
          <button onclick="promoteTurnToActionItem(\`${turn.text.slice(0, 38).replace(/`/g, '')}...\`); closeModal();" class="bg-white hover:bg-neutral-100 border border-black/10 p-2.5 rounded-xl font-medium text-[#141518]">⚡ Convert to Action Item</button>
        </div>
      `;
      confirmBtn.textContent = 'Jump Audio Here';
      confirmBtn.onclick = () => {
        selectTranscriptLine(turn.id, turn.percent, turn.time.slice(3), turn.seconds);
        closeModal();
      };
    }

    function promoteTurnToActionItem(shortText) {
      const input = document.getElementById('newActionItemInput');
      if (input) {
        input.value = shortText;
        addNewActionItem();
      }
    }

    function copyTranscriptLine(speaker, time, text) {
      const temp = document.createElement('textarea');
      temp.value = `[${time}] ${speaker}: "${text}"`;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast(`Copied quote (${time}) to clipboard!`);
    }



    function inspectKpiBenchmark(index) {
      const drawer = document.getElementById('kpiBenchmarkDrawer');
      const b = kpiBenchmarks[index];
      document.querySelectorAll('.kpi-card').forEach((c, idx) => c.classList.toggle('active-kpi', idx === index));
      document.getElementById('kpiDrawerTitle').textContent = b.title;
      document.getElementById('kpiDrawerDesc').textContent = b.desc;
      document.getElementById('kpiDrawerBar').style.width = `${b.bar}%`;
      drawer.classList.remove('hidden');

      const turn = transcriptData.find(t => t.id === b.jumpTurn);
      if (turn) {
        selectTranscriptLine(turn.id, turn.percent, turn.time.slice(3), turn.seconds);
        const row = document.getElementById(`transcriptRow-${turn.id}`);
        if (row) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    function closeKpiBenchmark() {
      document.getElementById('kpiBenchmarkDrawer').classList.add('hidden');
      document.querySelectorAll('.kpi-card').forEach(c => c.classList.remove('active-kpi'));
    }

    // --- 6. SMART SIGNAL FILTERING & WAVEFORM SCRUBBING (CLICK, DRAG, HOVER) ---
    function filterByKeyword(keyword, btnEl) {
      if (activeKeywordFilter === keyword) {
        clearEntityFilter();
        return;
      }
      activeKeywordFilter = keyword;
      document.querySelectorAll('.entity-pill').forEach(el => el.classList.remove('active-filter'));
      if (btnEl) btnEl.classList.add('active-filter');

      const badge = document.getElementById('activeKeywordFilterBadge');
      document.getElementById('activeKeywordFilterText').textContent = keyword;
      badge.classList.remove('hidden');

      // Jump playhead to first matching turn
      const firstMatch = transcriptData.find(t => t.text.toLowerCase().includes(keyword.toLowerCase()));
      if (firstMatch) {
        activeLineId = firstMatch.id;
        currentPlaySeconds = firstMatch.seconds;
        document.getElementById('playheadLine').style.left = `${firstMatch.percent}%`;
        document.getElementById('playheadTimeLabel').textContent = firstMatch.time.slice(4);
      }

      renderTranscriptList();
      showToast(`Highlighted "${keyword}" in transcript & jumped playhead`);
    }

    function clearEntityFilter() {
      activeKeywordFilter = '';
      activeSpeakerFilter = '';
      document.querySelectorAll('.entity-pill').forEach(el => el.classList.remove('active-filter'));
      document.getElementById('activeKeywordFilterBadge').classList.add('hidden');
      renderTranscriptList();
    }

    function filterBySpeaker(speaker) {
      activeSpeakerFilter = activeSpeakerFilter === speaker ? '' : speaker;
      renderTranscriptList();
      showToast(activeSpeakerFilter ? `Filtered by speaker: ${speaker}` : 'Showing all speakers');
    }

    function toggleSentimentFilter(sentiment) {
      activeSentimentFilter = activeSentimentFilter === sentiment ? 'all' : sentiment;
      document.querySelectorAll('.sentiment-filter-btn').forEach(btn => {
        btn.classList.remove('bg-white/25', 'font-semibold');
      });
      if (activeSentimentFilter !== 'all') {
        document.getElementById(`sentBtn-${sentiment}`).classList.add('bg-white/25', 'font-semibold');
      }
      renderTranscriptList();
    }

    function clearTranscriptSearch() {
      document.getElementById('transcriptSearchInput').value = '';
      activeSentimentFilter = 'all';
      document.querySelectorAll('.sentiment-filter-btn').forEach(btn => btn.classList.remove('bg-white/25', 'font-semibold'));
      clearEntityFilter();
    }

    function startWaveformDrag(event) {
      isDraggingWaveform = true;
      scrubWaveform(event);
    }

    window.addEventListener('mousemove', (e) => {
      if (isDraggingWaveform) scrubWaveform(e);
    });

    window.addEventListener('mouseup', () => {
      isDraggingWaveform = false;
    });

    function hoverWaveformMove(event) {
      const track = document.getElementById('waveformTrack');
      const tip = document.getElementById('waveformHoverTip');
      const rect = track.getBoundingClientRect();
      const x = Math.max(12, Math.min(event.clientX - rect.left, rect.width - 12));
      const pct = x / rect.width;
      const sec = Math.round(pct * 176);
      const mins = Math.floor(sec / 60);
      const secs = String(sec % 60).padStart(2, '0');
      tip.style.left = `${x}px`;
      tip.textContent = `${mins}:${secs}`;
      tip.classList.remove('hidden');
    }

    function hideWaveformHover() {
      document.getElementById('waveformHoverTip').classList.add('hidden');
    }

    function scrubWaveform(event) {
      const track = document.getElementById('waveformTrack');
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const clickX = Math.max(12, Math.min(event.clientX - rect.left, rect.width - 12));
      const pct = (clickX / rect.width) * 100;

      const totalSec = Math.round((pct / 100) * 176);
      currentPlaySeconds = totalSec;
      const mins = Math.floor(totalSec / 60);
      const secs = String(totalSec % 60).padStart(2, '0');

      document.getElementById('playheadLine').style.left = `${pct.toFixed(1)}%`;
      document.getElementById('playheadTimeLabel').textContent = `${mins}:${secs}`;

      let closest = transcriptData[0];
      let minDiff = 9999;
      transcriptData.forEach(item => {
        const diff = Math.abs(item.seconds - totalSec);
        if (diff < minDiff) {
          minDiff = diff;
          closest = item;
        }
      });
      if (activeLineId !== closest.id) {
        activeLineId = closest.id;
        playVoicePulseTone(closest.speaker);
        renderTranscriptList();
        const targetRow = document.getElementById(`transcriptRow-${closest.id}`);
        if (targetRow) targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // --- 7. PLAY/PAUSE CALL AUDIO SIMULATION WITH SPEED CONTROL ---
    function cyclePlaybackSpeed() {
      const speeds = [1, 1.5, 2];
      playbackSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
      document.getElementById('btnPlaybackSpeed').textContent = `${playbackSpeed}x`;
      if (isPlayingAudio) {
        toggleCallPlayback();
        toggleCallPlayback();
      } else {
        showToast(`Playback speed set to ${playbackSpeed}x`);
      }
    }

    function toggleCallPlayback() {
      isPlayingAudio = !isPlayingAudio;
      const playIcon = document.getElementById('playCallIcon');
      const waveformTrack = document.getElementById('waveformTrack');
      const hallePill = document.getElementById('speakerPill-Halle');
      const josiahPill = document.getElementById('speakerPill-Josiah');

      if (isPlayingAudio) {
        playIcon.innerHTML = '<path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/>';
        waveformTrack.classList.add('playing-wave');
        showToast(`Playing call audio (${playbackSpeed}x)...`);

        const intervalMs = Math.round(650 / playbackSpeed);
        audioInterval = setInterval(() => {
          currentPlaySeconds += 2;
          if (currentPlaySeconds > 176) currentPlaySeconds = 14;
          const pct = (currentPlaySeconds / 176) * 100;
          const mins = Math.floor(currentPlaySeconds / 60);
          const secs = String(currentPlaySeconds % 60).padStart(2, '0');

          document.getElementById('playheadLine').style.left = `${pct.toFixed(1)}%`;
          document.getElementById('playheadTimeLabel').textContent = `${mins}:${secs}`;

          const match = transcriptData.find(t => Math.abs(t.seconds - currentPlaySeconds) <= 6);
          if (match) {
            hallePill.classList.toggle('speaking-ring', match.speaker === 'Halle Griffiths');
            josiahPill.classList.toggle('speaking-ring', match.speaker === 'Josiah Love');
            if (match.id !== activeLineId) {
              activeLineId = match.id;
              playVoicePulseTone(match.speaker);
              renderTranscriptList();
              const autoScroll = document.getElementById('toggleAutoScroll');
              if (!autoScroll || autoScroll.checked) {
                const row = document.getElementById(`transcriptRow-${match.id}`);
                if (row) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
            }
          }
        }, intervalMs);
      } else {
        playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
        waveformTrack.classList.remove('playing-wave');
        hallePill.classList.remove('speaking-ring');
        josiahPill.classList.remove('speaking-ring');
        clearInterval(audioInterval);
        showToast('Call playback paused.');
      }
    }

    // --- 8. HORIZONTAL SUB-MENU SWITCHING WITH ANIMATED V-NOTCH UNDERLINE ---
    function switchSubTab(tabKey, newIndex) {
      if (tabKey === activeSubTab) return;

      const directionClass = newIndex > activeSubTabIndex ? 'view-transition-right' : 'view-transition-left';
      activeSubTab = tabKey;
      activeSubTabIndex = newIndex;

      const tabs = ['phoneCall', 'related', 'callInsights'];
      tabs.forEach(t => {
        const btn = document.getElementById(`subTabBtn-${t}`);
        if (t === tabKey) {
          btn.classList.remove('text-[#76777E]', 'font-normal');
          btn.classList.add('text-[#141518]', 'font-medium');
        } else {
          btn.classList.add('text-[#76777E]', 'font-normal');
          btn.classList.remove('text-[#141518]', 'font-medium');
        }
      });

      positionMainVNotch(tabKey);

      tabs.forEach(t => {
        const panel = document.getElementById(`subMenu-${t}`);
        panel.classList.add('hidden');
        panel.classList.remove('view-transition-enter', 'view-transition-right', 'view-transition-left');
      });

      const activePanel = document.getElementById(`subMenu-${tabKey}`);
      activePanel.classList.remove('hidden');
      void activePanel.offsetWidth;
      activePanel.classList.add(directionClass);

      if (tabKey === 'callInsights') {
        animateKpiNumbers();
      }
    }

    function positionMainVNotch(tabKey) {
      const activeBtn = document.getElementById(`subTabBtn-${tabKey}`);
      const list = document.getElementById('subTabsList');
      if (!activeBtn || !list) return;
      const parentRect = list.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const notch = document.getElementById('vNotchUnderline');
      const offsetLeft = btnRect.left - parentRect.left - 8;
      const notchWidth = btnRect.width + 16;
      notch.style.width = `${notchWidth}px`;
      notch.style.transform = `translateX(${offsetLeft}px)`;
    }

    // --- 9. KPI NUMBER COUNT-UP ANIMATION ---
    function animateKpiNumbers() {
      const targets = [
        { id: 'kpiRatioTalk', end: 37 },
        { id: 'kpiRatioListen', end: 63 },
        { id: 'kpiSpeed', end: 44 },
        { id: 'kpiSwitches', end: 40 },
        { id: 'kpiPause', end: 78 },
        { id: 'kpiMonologue', end: 48 }
      ];

      targets.forEach(item => {
        const el = document.getElementById(item.id);
        if (!el) return;
        let current = 0;
        const step = Math.max(1, Math.ceil(item.end / 18));
        const timer = setInterval(() => {
          current += step;
          if (current >= item.end) {
            el.textContent = item.end;
            clearInterval(timer);
          } else {
            el.textContent = current;
          }
        }, 20);
      });
    }



    function updateQuoteCalc(seats, printers) {
      if (seats !== null) quoteSeats = parseInt(seats, 10);
      if (printers !== null) quotePrinters = parseInt(printers, 10);
      const sLabel = document.getElementById('quoteSeatsLabel');
      const pLabel = document.getElementById('quotePrintersLabel');
      const totEl = document.getElementById('quoteTotalDisplay');
      if (sLabel) sLabel.textContent = `${quoteSeats} seats`;
      if (pLabel) pLabel.textContent = `${quotePrinters} nodes`;
      if (totEl) totEl.textContent = `$${((quoteSeats * 190) + (quotePrinters * 1111)).toLocaleString()}`;
    }

    function generateListMenuHtml(items) {
      return `
        <div class="space-y-3">
          ${items.map((item, idx) => `
            <div onclick="(${item.action.toString()})()" class="stagger-card bg-[#e8e7e5] hover:bg-white border border-white/70 rounded-[18px] p-4 flex items-center justify-between cursor-pointer transition-all shadow-xs" style="animation-delay: ${idx * 40}ms">
              <div>
                <div class="text-sm font-medium text-[#141518]">${item.title}</div>
                <div class="text-xs text-[#6E6F77] mt-0.5">${item.sub}</div>
              </div>
              <span class="bg-[#0b0d0e] text-white text-xs px-3.5 py-1.5 rounded-full font-medium shrink-0">${item.badge} →</span>
            </div>
          `).join('')}
        </div>
      `;
    }

    function switchSidebarMenu(menuKey, iconIndex) {
      const menuOrder = ['home', 'recent', 'pinned', 'playbook', 'integrations', 'activities', 'contacts', 'opportunities', 'quotes', 'analytics'];
      const resolvedIndex = typeof iconIndex === 'number' ? iconIndex : menuOrder.indexOf(menuKey);

      if (menuKey !== activeSidebarMenu) {
        menuHistory.push(activeSidebarMenu);
        activeSidebarMenu = menuKey;
      }

      // Slide the black active circle on the left vertical sidebar
      const indicator = document.getElementById('sidebarActiveIndicator');
      indicator.style.transform = `translateY(${resolvedIndex * 36}px)`;

      document.querySelectorAll('.sidebar-btn').forEach((btn, idx) => {
        if (idx === resolvedIndex) {
          btn.classList.remove('text-[#5A5B62]');
          btn.classList.add('text-white');
        } else {
          btn.classList.add('text-[#5A5B62]');
          btn.classList.remove('text-white');
        }
      });

      const activitiesView = document.getElementById('menuView-activities');
      const dynamicView = document.getElementById('menuView-dynamic');

      if (menuKey === 'activities') {
        dynamicView.classList.add('hidden');
        activitiesView.classList.remove('hidden', 'view-transition-enter');
        void activitiesView.offsetWidth;
        activitiesView.classList.add('view-transition-enter');
        setTimeout(() => positionMainVNotch(activeSubTab), 30);
        animateKpiNumbers();
      } else {
        const conf = sidebarModules[menuKey] || sidebarModules.home;
        activeDynSubTabIndex = 0;
        document.getElementById('dynMenuBreadcrumb').textContent = conf.breadcrumb;
        document.getElementById('dynMenuTitle').textContent = conf.title;
        renderDynamicModuleSubTabs(menuKey, 0);

        activitiesView.classList.add('hidden');
        dynamicView.classList.remove('hidden', 'view-transition-enter');
        void dynamicView.offsetWidth;
        dynamicView.classList.add('view-transition-enter');
      }
    }

    function renderDynamicModuleSubTabs(menuKey, activeIdx) {
      const conf = sidebarModules[menuKey] || sidebarModules.home;
      const list = document.getElementById('dynSubTabsList');
      list.innerHTML = conf.tabs.map((label, idx) => `
        <button onclick="switchDynamicSubTab('${menuKey}', ${idx})" id="dynTabBtn-${idx}" class="text-[16px] ${idx === activeIdx ? 'font-medium text-[#141518]' : 'font-normal text-[#76777E] hover:text-[#141518]'} transition-colors pb-1">
          ${label}
        </button>
      `).join('');

      const body = document.getElementById('dynMenuScrollBody');
      body.classList.remove('view-transition-right', 'view-transition-left');
      void body.offsetWidth;
      body.classList.add(activeIdx >= activeDynSubTabIndex ? 'view-transition-right' : 'view-transition-left');
      activeDynSubTabIndex = activeIdx;
      body.innerHTML = conf.renderTab(activeIdx);

      setTimeout(() => {
        const btn = document.getElementById(`dynTabBtn-${activeIdx}`);
        if (!btn) return;
        const pRect = list.getBoundingClientRect();
        const bRect = btn.getBoundingClientRect();
        const notch = document.getElementById('dynVNotchUnderline');
        notch.style.width = `${bRect.width + 16}px`;
        notch.style.transform = `translateX(${bRect.left - pRect.left - 8}px)`;
      }, 25);
    }

    function switchDynamicSubTab(menuKey, idx) {
      renderDynamicModuleSubTabs(menuKey, idx);
    }

    function goBackHistory() {
      if (menuHistory.length > 0) {
        const prev = menuHistory.pop();
        switchSidebarMenu(prev);
        showToast(`Returned to previous view`);
      } else {
        switchSidebarMenu('activities', 5);
      }
    }

    // --- 11. TOP COMMAND BAR & METADATA INTERACTIONS ---
    function toggleMarkComplete() {
      isCompleted = !isCompleted;
      const btn = document.getElementById('btnMarkComplete');
      const text = document.getElementById('markCompleteText');
      const statusText = document.getElementById('metaStatusText');

      if (isCompleted) {
        btn.className = 'bg-emerald-400 text-[#0b0d0e] hover:bg-emerald-300 rounded-full px-4 py-1.5 text-[12px] font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm';
        text.textContent = 'Completed';
        statusText.textContent = 'Completed';
        statusText.className = 'text-emerald-700 font-semibold';
        showToast('✓ Activity "Discuss New Opportunity" marked as Completed!');
      } else {
        btn.className = 'bg-white text-[#121316] hover:bg-neutral-100 rounded-full px-4 py-1.5 text-[12px] font-medium flex items-center gap-1.5 transition-all active:scale-95 shadow-sm';
        text.textContent = 'Mark Complete';
        statusText.textContent = 'Open';
        statusText.className = '';
        showToast('Activity status reverted to Open.');
      }
    }

    function triggerRefresh() {
      const icon = document.getElementById('refreshIcon');
      icon.style.transform = 'rotate(360deg)';
      setTimeout(() => { icon.style.transform = 'rotate(0deg)'; }, 520);

      const workspace = document.getElementById('mainWorkspaceContainer');
      workspace.classList.remove('refresh-shimmer');
      void workspace.offsetWidth;
      workspace.classList.add('refresh-shimmer');

      animateKpiNumbers();
      showToast('Call Insights metrics & transcript synchronized.');
    }

    function toggleProcessBar() {
      document.getElementById('processStageBar').classList.toggle('hidden');
    }

    function setSalesStage(stepNum, label) {
      document.getElementById('activeStageBadge').textContent = label;
      [1, 2, 3, 4].forEach(n => {
        const el = document.getElementById(`bpfStep${n}`);
        if (!el) return;
        if (n < stepNum) {
          el.className = 'px-3 py-1 rounded-full text-xs bg-emerald-500/20 text-emerald-300 transition-all';
        } else if (n === stepNum) {
          el.className = 'px-3 py-1 rounded-full text-xs bg-white text-black font-semibold transition-all';
        } else {
          el.className = 'px-3 py-1 rounded-full text-xs bg-white/10 text-neutral-300 hover:bg-white/20 transition-all';
        }
      });
      showToast(`Business Process Stage advanced to ${label}`);
    }

    function togglePopover(id) {
      const target = document.getElementById(id);
      const wasHidden = target.classList.contains('hidden');
      closeAllPopovers();
      if (wasHidden) target.classList.remove('hidden');
    }

    function closeAllPopovers() {
      document.querySelectorAll('.pop-menu').forEach(el => el.classList.add('hidden'));
    }

    function assignOwner(name, avatarUrl) {
      document.getElementById('metaOwnerName').textContent = name;
      document.getElementById('metaOwnerAvatar').src = avatarUrl;
      document.getElementById('topNavAvatar').src = avatarUrl;
      const pName = document.getElementById('profilePopName');
      const pAva = document.getElementById('profilePopAvatar');
      if (pName) pName.textContent = name;
      if (pAva) pAva.src = avatarUrl;
      closeAllPopovers();
      showToast(`Record owner reassigned to ${name}`);
    }

    function setPriorityValue(val) {
      const el = document.getElementById('metaPriority');
      el.textContent = val;
      el.className = val === 'Critical'
        ? 'text-[12.5px] font-semibold text-rose-600 group-hover:underline'
        : 'text-[12.5px] font-medium text-[#141518] group-hover:underline';
      closeAllPopovers();
      showToast(`Priority updated to ${val}`);
    }

    function setDueDateValue(val) {
      document.getElementById('metaDueDate').textContent = val;
      closeAllPopovers();
      showToast(`Due date rescheduled to ${val}`);
    }

    function convertRecord(targetType) {
      closeAllPopovers();
      if (targetType === 'Quote') {
        switchSidebarMenu('quotes', 8);
      } else if (targetType === 'Opportunity') {
        switchSidebarMenu('opportunities', 7);
      }
      showToast(`Converted call intelligence into ${targetType}!`);
    }

    function exportCallReport() {
      closeAllPopovers();
      const report = {
        activity: 'Discuss New Opportunity',
        account: 'Northwind Traders',
        owner: document.getElementById('metaOwnerName').textContent,
        metrics: { talkListenRatio: '37/63%', speed: '44 wpn', switches: 40, avgPause: '78 ms', longestMonologue: '48 sec' },
        transcriptTurns: transcriptData.length
      };
      const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Dynamic365_Call_Insights_Report.json';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Exported Dynamic365_Call_Insights_Report.json');
    }

    function toggleCompactMode() {
      const win = document.getElementById('appWindow');
      win.classList.toggle('compact-mode');
      const isCompact = win.classList.contains('compact-mode');
      document.getElementById('compactModeIndicator').textContent = isCompact ? 'On' : 'Off';
      closeAllPopovers();
      showToast(`Compact KPI mode ${isCompact ? 'enabled' : 'disabled'}`);
    }

    function resetDemoState() {
      closeAllPopovers();
      clearTranscriptSearch();
      closeKpiBenchmark();
      if (isPlayingAudio) toggleCallPlayback();
      selectTranscriptLine(1, 14.5, '0:24', 24);
      switchSidebarMenu('activities', 5);
      switchSubTab('callInsights', 2);
      showToast('Demo state reset to initial reference view.');
    }

    // --- 12. ACTION ITEM CONTEXT MENU, BANT & AI SUMMARY HELPERS ---
    let actionItemCounter = 2;
    function addNewActionItem() {
      const input = document.getElementById('newActionItemInput');
      const val = (input.value || '').trim();
      if (!val) {
        showToast('Enter an action item description first.');
        return;
      }
      appendActionItemPill(val);
      input.value = '';
    }

    function appendActionItemPill(val) {
      actionItemCounter++;
      document.getElementById('actionItemsCountLabel').textContent = `(${actionItemCounter})`;

      const insightsList = document.getElementById('insightsActionItemsList');
      const pillDiv = document.createElement('div');
      pillDiv.className = 'inline-flex items-center justify-between entity-pill rounded-full pl-3.5 pr-1.5 py-1 text-[11.5px] w-fit max-w-full gap-2';

      const textSpan = document.createElement('span');
      textSpan.className = 'cursor-pointer truncate';
      textSpan.textContent = `${val} `;
      textSpan.addEventListener('click', () => filterByKeyword(val, pillDiv));

      const countSpan = document.createElement('span');
      countSpan.className = 'text-[#76777E]';
      countSpan.textContent = '(1)';
      textSpan.appendChild(countSpan);

      const menuBtn = document.createElement('button');
      menuBtn.className = 'w-6 h-6 rounded-full bg-[#f3f2f0] hover:bg-black hover:text-white flex items-center justify-center text-[#45464C] transition-colors shrink-0';
      menuBtn.textContent = '•••';
      menuBtn.addEventListener('click', () => openActionItemMenu(val, '00:02:44'));

      pillDiv.append(textSpan, menuBtn);
      insightsList.appendChild(pillDiv);

      const checklist = document.getElementById('phoneCallActionChecklist');
      if (checklist) {
        const labelEl = document.createElement('label');
        labelEl.className = 'flex items-center justify-between bg-white/75 rounded-xl px-3.5 py-2 cursor-pointer';

        const leftSpan = document.createElement('span');
        leftSpan.className = 'flex items-center gap-2.5';
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'accent-black rounded';
        const textEl = document.createElement('span');
        textEl.textContent = val;
        leftSpan.append(checkbox, textEl);

        const badge = document.createElement('span');
        badge.className = 'text-[10px] bg-emerald-500/15 text-emerald-800 px-2 py-0.5 rounded-full';
        badge.textContent = 'Synced';

        labelEl.append(leftSpan, badge);
        checklist.prepend(labelEl);
      }
      showToast(`Synced action item: "${val}"`);
    }

    function openActionItemMenu(actionName, timestamp) {
      const overlay = document.getElementById('modalOverlay');
      const title = document.getElementById('modalTitle');
      const body = document.getElementById('modalBody');
      const confirmBtn = document.getElementById('modalConfirmBtn');

      overlay.classList.remove('hidden');
      title.textContent = `Action Item: ${actionName}`;
      body.innerHTML = `
        <p class="text-[#6E6F77]">Detected in call transcript at <strong>${timestamp}</strong>. Choose an automated CRM workflow:</p>
        <div class="grid grid-cols-1 gap-2 pt-1">
          <button onclick="switchSubTab('phoneCall', 0); closeModal(); showToast('Opened Follow-up Email Composer for ${actionName}');" class="bg-white hover:bg-neutral-100 border border-black/10 p-2.5 rounded-xl text-left font-medium text-[#141518]">✉ Draft Follow-Up Email in Phone Call Tab</button>
          <button onclick="filterByKeyword('${actionName}'); closeModal();" class="bg-white hover:bg-neutral-100 border border-black/10 p-2.5 rounded-xl text-left font-medium text-[#141518]">🔍 Highlight Mention in Transcript (${timestamp})</button>
        </div>
      `;
      confirmBtn.textContent = 'Mark Action Done';
      confirmBtn.onclick = () => {
        closeModal();
        showToast(`Action item "${actionName}" marked as completed!`);
      };
    }

    function openQuickAddSignalModal() {
      const overlay = document.getElementById('modalOverlay');
      const title = document.getElementById('modalTitle');
      const body = document.getElementById('modalBody');
      const confirmBtn = document.getElementById('modalConfirmBtn');

      overlay.classList.remove('hidden');
      title.textContent = 'Add Tracked Action Item or Signal';
      body.innerHTML = `
        <label class="block text-[11px] text-[#6E6F77] mb-1">Action Item / Keyword Phrase</label>
        <input id="modalQuickSignalInput" type="text" value="Share Azure AD Security Whitepaper" class="w-full bg-white border border-black/15 rounded-xl px-3.5 py-2 text-xs text-[#141518] focus:outline-none"/>
      `;
      confirmBtn.textContent = '+ Add to Call Insights';
      confirmBtn.onclick = () => {
        const val = document.getElementById('modalQuickSignalInput').value.trim();
        if (val) appendActionItemPill(val);
        closeModal();
      };
    }

    function recalcBant() {
      const checks = document.querySelectorAll('.bant-check');
      let checked = 0;
      checks.forEach(c => { if (c.checked) checked++; });
      const pct = Math.round((checked / checks.length) * 100);
      document.getElementById('bantScoreBadge').textContent = `BANT Score: ${pct}%`;
      showToast(`BANT Qualification updated to ${pct}%`);
    }

    function regenerateAiSummary() {
      const el = document.getElementById('aiExecutiveSummaryText');
      el.innerHTML = `
        • <strong>Executive Recap:</strong> Josiah Love (Northwind VP Ops) validated budget for the 500 Seat Expansion ($145,000).<br/>
        • <strong>Competitor Insights:</strong> XYZ Printers (3x) offered hardware discounts, while Fabricator XD (1x) lacked native Azure AD compliance.<br/>
        • <strong>Winning Strategy:</strong> Emphasize zero-downtime migration & send offering details ahead of Tuesday's 10 AM live demo.
      `;
      showToast('AI Executive Summary regenerated!');
    }

    function copyAiSummary() {
      const text = document.getElementById('aiExecutiveSummaryText').innerText;
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast('AI Executive Summary copied to clipboard!');
    }

    function copyCounterPitch(competitor) {
      const pitches = {
        'XYZ Printers': 'Unlike XYZ Printers, our Microsoft & Contoso Q3 Enterprise License includes a zero-downtime parallel ERP migration and a 99.99% SLA.',
        'Fabricator XD': 'Unlike Fabricator XD, our solution integrates natively with Azure Active Directory for end-to-end Security Compliance across all 500 seats.',
        'Northwind Legacy': 'Our weekend sandbox cutover guarantees zero warehouse disruption during the Northwind 500 Seat Expansion.'
      };
      const temp = document.createElement('textarea');
      temp.value = pitches[competitor] || '';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast(`Copied ${competitor} counter-pitch script!`);
    }

    // --- 13. UNIVERSAL MODAL & KEYBOARD SHORTCUTS ---
    function openModal(type) {
      const overlay = document.getElementById('modalOverlay');
      const title = document.getElementById('modalTitle');
      const body = document.getElementById('modalBody');
      const confirmBtn = document.getElementById('modalConfirmBtn');

      overlay.classList.remove('hidden');

      if (type === 'closeCall') {
        title.textContent = 'Close Phone Call & Log Disposition';
        body.innerHTML = `
          <p>Select final disposition for <strong>Discuss New Opportunity</strong> (02m 56s):</p>
          <select id="modalDispositionSelect" class="w-full bg-white border border-black/15 rounded-xl px-3 py-2 text-xs font-medium text-[#141518] mt-1">
            <option>Won / Advancing — Live Demo Scheduled (Tue 10 AM)</option>
            <option>Follow-up Needed — Send Offering Details Today</option>
            <option>No Answer / Reschedule</option>
          </select>
        `;
        confirmBtn.textContent = 'Log & Mark Complete';
        confirmBtn.onclick = () => {
          closeModal();
          if (!isCompleted) toggleMarkComplete();
        };
      } else if (type === 'deleteCall') {
        title.textContent = 'Archive Call Activity';
        body.innerHTML = `<p>Move <strong>Discuss New Opportunity</strong> to the archived CRM queue? All transcript insights and 5 KPI metrics remain preserved in the audit log.</p>`;
        confirmBtn.textContent = 'Archive Activity';
        confirmBtn.onclick = () => {
          closeModal();
          showToast('Call activity archived safely.');
        };
      } else if (type === 'copilotTips') {
        title.textContent = '💡 AI Copilot Conversation Coaching';
        body.innerHTML = `
          <div class="space-y-2">
            <p><strong>1. Optimal Talk/Listen (37/63%):</strong> Halle let Josiah speak for 63% of the call, uncovering the 48-second objection monologue at <code>01:22</code>.</p>
            <p><strong>2. Competitor Defense:</strong> <em>XYZ Printers</em> was mentioned 3 times. Use the Related tab battlecard when sending offering details.</p>
            <p><strong>3. Keyboard Shortcuts:</strong> Press <code>Space</code> to Play/Pause audio, or <code>1</code> / <code>2</code> / <code>3</code> to switch sub-menu tabs.</p>
          </div>
        `;
        confirmBtn.textContent = 'Apply Coaching Insights';
        confirmBtn.onclick = () => {
          closeModal();
          showToast('Coaching insights applied to opportunity record.');
        };
      } else if (type === 'helpGuide') {
        title.textContent = 'Interactive Guide & Keyboard Shortcuts';
        body.innerHTML = `
          <ul class="list-disc pl-4 space-y-1.5">
            <li><strong>Strict Fixed Dimensions:</strong> Switching any of the 10 left sidebar icons or horizontal sub-menu tabs keeps the exact same window size with smooth internal scrolling.</li>
            <li><strong>Waveform Scrubbing:</strong> Click or drag anywhere along the waveform timeline (<code>0:00</code> – <code>2:56</code>) or press <strong>▶</strong> between Halle & Josiah.</li>
            <li><strong>KPI Benchmarks:</strong> Click any of the 5 KPI cards to open its enterprise benchmark comparison bar.</li>
            <li><strong>Shortcuts:</strong> <code>Space</code> (Play/Pause Call), <code>1</code> (Phone Call tab), <code>2</code> (Related tab), <code>3</code> (Call Insights tab).</li>
          </ul>
        `;
        confirmBtn.textContent = 'Got it!';
        confirmBtn.onclick = closeModal;
      }
    }

    function closeModal() {
      document.getElementById('modalOverlay').classList.add('hidden');
    }

    let toastTimeout = null;
    function showToast(msg) {
      const banner = document.getElementById('toastBanner');
      document.getElementById('toastMessage').textContent = msg;
      banner.classList.remove('opacity-0', 'translate-y-3');
      banner.classList.add('opacity-100', 'translate-y-0');
      clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        banner.classList.add('opacity-0', 'translate-y-3');
        banner.classList.remove('opacity-100', 'translate-y-0');
      }, 2800);
    }

    // Close popovers on outside click
    window.addEventListener('click', (e) => {
      if (!e.target.closest('.pop-menu') && !e.target.closest('[onclick*="togglePopover"]')) {
        closeAllPopovers();
      }
    });

    // Keyboard shortcuts (Space to play/pause, 1/2/3 for sub-tabs)
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        toggleCallPlayback();
      } else if (e.key === '1' && activeSidebarMenu === 'activities') {
        switchSubTab('phoneCall', 0);
      } else if (e.key === '2' && activeSidebarMenu === 'activities') {
        switchSubTab('related', 1);
      } else if (e.key === '3' && activeSidebarMenu === 'activities') {
        switchSubTab('callInsights', 2);
      }
    });

    // Initialize on load
    window.addEventListener('DOMContentLoaded', () => {
      renderTranscriptList();
      animateKpiNumbers();
      setTimeout(() => positionMainVNotch('callInsights'), 60);
    });

    window.addEventListener('resize', () => {
      if (activeSidebarMenu === 'activities') positionMainVNotch(activeSubTab);
    });
