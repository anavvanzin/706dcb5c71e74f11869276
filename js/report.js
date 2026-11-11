import {
  PRESENTATION_META,
  PRINCIPAL_SLIDES,
  DAUCHY_MANUSCRIPT_META,
  DAUCHY_MANUSCRIPT_PARAGRAPHS,
  MATCHING_SCRIPT_FINAL,
  DEEP_RESEARCH_DOSSIER,
  getLecternScriptPages,
  getMatchingScriptFinalPages,
  getDeepResearchDossierSections,
  filterDauchyParagraphs,
  getConstellationCoordinates,
  clampMusicVolume,
  formatMusicStatusLabel,
  shouldBypassOpeningPoster,
  getPresenterTipForSlide,
  resolvePresenterTipState,
  computeSlideTransitionSpec
} from './presentation-data.mjs';
import {
  DEFAULT_SESSION_CODE,
  buildRemoteShareUrl,
  parseRemoteParamsFromSearch
} from './audience-sync-logic.mjs';
import { generateQrSvg } from './qr-svg.mjs';
import { VoiceController } from './voice-control.js';
import { RemoteController } from './remote-controller.js';
import { perfMonitor } from './perf-monitor.mjs';

(function () {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const TOTAL_SLIDES = PRINCIPAL_SLIDES.length; // 7
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  let currentSlideNum = 1;
  let activeSlideCallouts = {
    2: '',
    3: 'judicial',
    4: 'four-powers',
    5: '',
    6: 'stf',
    7: 'q1'
  };
  let visualPauseTimer = null;
  let visualPauseSlide = 0;

  // =========================================================================
  // 1. Theme & Projector Legibility Modes
  // =========================================================================
  const themeBtn = $('#theme-toggle');
  const mobileThemeBtn = $('#mobile-theme-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('dauchy-theme', theme);
    } catch (e) {}

    const isDark = theme === 'dark';
    if (themeBtn) {
      const icon = $('.theme-toggle__icon', themeBtn);
      const text = $('.theme-toggle__text', themeBtn);
      if (icon) icon.textContent = isDark ? '☾' : '☼';
      if (text) text.textContent = isDark ? 'Dark' : 'Light';
    }
    const mobileLabel = $('#mobile-theme-label');
    if (mobileLabel) {
      mobileLabel.textContent = isDark ? 'Dark' : 'Light';
    }
  }

  applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  themeBtn?.addEventListener('click', toggleTheme);
  mobileThemeBtn?.addEventListener('click', toggleTheme);

  const projectorBtn = $('#projector-toggle');
  const mobileProjectorBtn = $('#mobile-projector-toggle');

  function applyProjectorMode(mode) {
    const isHigh = mode === 'high';
    if (isHigh) {
      document.documentElement.setAttribute('data-projector', 'high');
    } else {
      document.documentElement.removeAttribute('data-projector');
    }
    try {
      localStorage.setItem('dauchy-projector', isHigh ? 'high' : 'normal');
    } catch (e) {}

    if (projectorBtn) {
      projectorBtn.setAttribute('aria-pressed', String(isHigh));
      const label = $('#projector-label');
      if (label) label.textContent = isHigh ? 'Projector ON' : 'Projector (P)';
    }
    const mobileProjLabel = $('#mobile-projector-label');
    if (mobileProjLabel) {
      mobileProjLabel.textContent = isHigh ? 'High Contrast' : 'Standard';
    }
  }

  applyProjectorMode(
    document.documentElement.getAttribute('data-projector') === 'high' ? 'high' : 'normal'
  );

  function toggleProjectorMode() {
    const current =
      document.documentElement.getAttribute('data-projector') === 'high' ? 'high' : 'normal';
    applyProjectorMode(current === 'high' ? 'normal' : 'high');
  }

  projectorBtn?.addEventListener('click', toggleProjectorMode);
  mobileProjectorBtn?.addEventListener('click', toggleProjectorMode);

  // =========================================================================
  // 2. Low-Volume Background Music Controller (Chopin Nocturne Op. 9, No. 2)
  // =========================================================================
  const bgAudio = $('#bg-music-audio');
  const curtainMusicBtn = $('#curtain-music-btn');
  const curtainMusicLabel = $('#curtain-music-label');
  const floatingMusicBtn = $('#floating-music-btn');
  const floatingMusicLabel = $('#floating-music-label');
  const prepMusicToggle = $('#prep-music-toggle');
  const prepMusicLabel = $('#prep-music-label');
  const prepMusicSlider = $('#prep-music-volume');
  const prepMusicVolReadout = $('#prep-music-vol-readout');
  const mobileMusicBtn = $('#mobile-music-toggle');
  const mobileMusicLabel = $('#mobile-music-label');

  const MUSIC_VOL_KEY = 'dauchy-music-volume';
  const MUSIC_MUTE_KEY = 'dauchy-music-muted';

  let musicVolume = PRESENTATION_META.backgroundMusic.defaultVolume; // 0.12 (12%)
  let userMutedMusic = false;
  let musicFadeInterval = null;

  try {
    const savedVol = localStorage.getItem(MUSIC_VOL_KEY);
    if (savedVol !== null) {
      musicVolume = clampMusicVolume(savedVol);
    }
    userMutedMusic = localStorage.getItem(MUSIC_MUTE_KEY) === 'true';
  } catch (e) {}

  function clearMusicFade() {
    if (musicFadeInterval) {
      clearInterval(musicFadeInterval);
      musicFadeInterval = null;
    }
  }

  function isMusicPlaying() {
    return Boolean(bgAudio && !bgAudio.paused && !bgAudio.ended && !bgAudio.muted);
  }

  function syncMusicUI() {
    const playing = isMusicPlaying();
    const muted = userMutedMusic || musicVolume === 0;
    const status = formatMusicStatusLabel({
      playing,
      muted,
      volume: musicVolume
    });
    const activePressed = String(playing && !muted);

    if (curtainMusicBtn) {
      curtainMusicBtn.setAttribute('aria-pressed', activePressed);
      curtainMusicBtn.setAttribute('aria-label', status.ariaLabel);
    }
    if (curtainMusicLabel) curtainMusicLabel.textContent = status.shortLabel;

    if (floatingMusicBtn) {
      floatingMusicBtn.setAttribute('aria-pressed', activePressed);
      floatingMusicBtn.setAttribute('aria-label', status.ariaLabel);
    }
    if (floatingMusicLabel) floatingMusicLabel.textContent = status.shortLabel;

    if (prepMusicToggle) {
      prepMusicToggle.setAttribute('aria-pressed', activePressed);
      prepMusicToggle.setAttribute('aria-label', status.ariaLabel);
    }
    if (prepMusicLabel) prepMusicLabel.textContent = status.shortLabel;

    const sliderPct = muted ? 0 : Math.round(musicVolume * 100);
    if (prepMusicSlider && document.activeElement !== prepMusicSlider) {
      prepMusicSlider.value = String(sliderPct);
    }
    if (prepMusicVolReadout) {
      prepMusicVolReadout.textContent = `${sliderPct}%`;
    }
    if (mobileMusicLabel) {
      mobileMusicLabel.textContent = muted
        ? 'Muted'
        : playing
        ? `Playing (${sliderPct}%)`
        : `Ready (${sliderPct}%)`;
    }
  }

  function startMusicGentle({ fade = true } = {}) {
    if (!bgAudio || userMutedMusic || musicVolume <= 0) {
      syncMusicUI();
      return Promise.resolve(false);
    }
    clearMusicFade();
    bgAudio.muted = false;
    const target = clampMusicVolume(musicVolume);

    if (!fade || prefersReducedMotion?.matches) {
      bgAudio.volume = target;
    } else if (bgAudio.paused) {
      bgAudio.volume = Math.min(0.02, target);
    }

    const playPromise = bgAudio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      return playPromise
        .then(() => {
          if (fade && !prefersReducedMotion?.matches && bgAudio.volume < target) {
            const step = Math.max(0.008, (target - bgAudio.volume) / 12);
            musicFadeInterval = setInterval(() => {
              if (!bgAudio || bgAudio.paused || userMutedMusic) {
                clearMusicFade();
                return;
              }
              const next = Math.min(target, bgAudio.volume + step);
              bgAudio.volume = Number(next.toFixed(3));
              if (next >= target) {
                clearMusicFade();
              }
            }, 65);
          } else {
            bgAudio.volume = target;
          }
          syncMusicUI();
          return true;
        })
        .catch(() => {
          syncMusicUI();
          return false;
        });
    }
    bgAudio.volume = target;
    syncMusicUI();
    return Promise.resolve(true);
  }

  function pauseAndMuteMusic() {
    clearMusicFade();
    userMutedMusic = true;
    try {
      localStorage.setItem(MUSIC_MUTE_KEY, 'true');
    } catch (e) {}
    if (bgAudio) {
      bgAudio.pause();
    }
    syncMusicUI();
  }

  function toggleBackgroundMusic() {
    if (isMusicPlaying() && !userMutedMusic) {
      pauseAndMuteMusic();
      return;
    }
    userMutedMusic = false;
    if (musicVolume <= 0) {
      musicVolume = PRESENTATION_META.backgroundMusic.defaultVolume;
    }
    try {
      localStorage.setItem(MUSIC_MUTE_KEY, 'false');
      localStorage.setItem(MUSIC_VOL_KEY, String(musicVolume));
    } catch (e) {}
    startMusicGentle({ fade: true });
  }

  function setMusicVolumeFromPercent(pctValue) {
    const normalized = clampMusicVolume(Number(pctValue) / 100);
    clearMusicFade();
    musicVolume = normalized;
    if (normalized === 0) {
      userMutedMusic = true;
      if (bgAudio) bgAudio.pause();
    } else {
      userMutedMusic = false;
      if (bgAudio) {
        bgAudio.muted = false;
        bgAudio.volume = normalized;
        if (bgAudio.paused) {
          bgAudio.play()?.catch(() => {});
        }
      }
    }
    try {
      localStorage.setItem(MUSIC_VOL_KEY, String(musicVolume));
      localStorage.setItem(MUSIC_MUTE_KEY, String(userMutedMusic));
    } catch (e) {}
    syncMusicUI();
  }

  if (bgAudio) {
    bgAudio.volume = clampMusicVolume(musicVolume);
    bgAudio.addEventListener('play', syncMusicUI);
    bgAudio.addEventListener('pause', syncMusicUI);
    bgAudio.addEventListener('volumechange', syncMusicUI);
  }

  [curtainMusicBtn, floatingMusicBtn, prepMusicToggle].forEach((btn) => {
    btn?.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleBackgroundMusic();
    });
  });

  mobileMusicBtn?.addEventListener('click', () => {
    toggleBackgroundMusic();
  });

  prepMusicSlider?.addEventListener('input', (e) => {
    setMusicVolumeFromPercent(e.target.value);
  });

  syncMusicUI();

  // Start soft background playback on first user gesture if not muted (avoids eager 6.4 MB audio stream on initial boot)
  if (!userMutedMusic) {
    const resumeOnFirstGesture = (ev) => {
      const targetEl = ev.target instanceof Element ? ev.target : null;
      if (
        targetEl?.closest('#curtain-music-btn, #floating-music-btn, #prep-music-toggle, #mobile-music-toggle')
      ) {
        return;
      }
      if (!userMutedMusic && !isMusicPlaying()) {
        startMusicGentle({ fade: true });
      }
    };
    document.addEventListener('pointerdown', resumeOnFirstGesture, { once: true, passive: true });
  }

  // =========================================================================
  // 2B. Opening Event Poster & Franco-Brazilian Flag Mix Stage (#podium-curtain)
  // =========================================================================
  const podiumCurtain = $('#podium-curtain');
  const curtainStartBtn = $('#curtain-start-btn');
  const curtainBrowseBtn = $('#curtain-browse-btn');
  const curtainScriptBtn = $('#curtain-script-btn');
  const drawCurtainBtn = $('#draw-curtain-btn');
  const mobileCurtainBtn = $('#mobile-curtain-toggle');
  let curtainOpen = true;
  let curtainTransitionTimer = null;

  function isCurtainVisible() {
    return Boolean(podiumCurtain && !podiumCurtain.hidden && curtainOpen);
  }

  function dismissPodiumCurtain({ enterPresent = false, targetSlide = 1 } = {}) {
    if (!podiumCurtain) return;
    curtainOpen = false;
    document.documentElement.setAttribute('data-curtain-bypassed', 'true');

    if (!userMutedMusic && !isMusicPlaying()) {
      startMusicGentle({ fade: true });
    }

    if (enterPresent) {
      goToSlide(targetSlide, false);
      setPresentingState(true);
      document.documentElement.requestFullscreen?.().catch(() => {});
    }

    if (prefersReducedMotion?.matches) {
      podiumCurtain.classList.remove('is-parting');
      podiumCurtain.hidden = true;
      return;
    }

    podiumCurtain.classList.add('is-parting');
    animateSlideFrameEntrance(targetSlide, 1);
    if (curtainTransitionTimer) clearTimeout(curtainTransitionTimer);
    curtainTransitionTimer = setTimeout(() => {
      podiumCurtain.hidden = true;
      podiumCurtain.classList.remove('is-parting');
    }, 580);
  }

  function drawPodiumCurtain() {
    if (!podiumCurtain) return;
    closePrepPopover();
    if (document.body.classList.contains('is-presenting')) {
      exitFullscreenPresentation();
    }
    if (curtainTransitionTimer) clearTimeout(curtainTransitionTimer);
    curtainOpen = true;
    document.documentElement.removeAttribute('data-curtain-bypassed');
    podiumCurtain.hidden = false;
    void podiumCurtain.offsetWidth;
    podiumCurtain.classList.remove('is-parting');
    curtainStartBtn?.focus({ preventScroll: true });
  }

  if (
    document.documentElement.getAttribute('data-curtain-bypassed') === 'true' ||
    shouldBypassOpeningPoster(window.location.search, window.location.hash)
  ) {
    curtainOpen = false;
    document.documentElement.setAttribute('data-curtain-bypassed', 'true');
    if (podiumCurtain) podiumCurtain.hidden = true;
  }

  curtainStartBtn?.addEventListener('click', () => {
    dismissPodiumCurtain({ enterPresent: true, targetSlide: 1 });
  });

  curtainBrowseBtn?.addEventListener('click', () => {
    dismissPodiumCurtain({ enterPresent: false });
  });

  const curtainDauchyBtn = $('#curtain-dauchy-btn');

  curtainScriptBtn?.addEventListener('click', () => {
    dismissPodiumCurtain({ enterPresent: false });
    openLecternScriptDialog(1);
  });

  curtainDauchyBtn?.addEventListener('click', () => {
    dismissPodiumCurtain({ enterPresent: false });
    openEmbeddedDauchySection({ tab: 'manuscript' });
  });

  drawCurtainBtn?.addEventListener('click', drawPodiumCurtain);
  mobileCurtainBtn?.addEventListener('click', () => {
    closeMobileMenu();
    drawPodiumCurtain();
  });

  // =========================================================================
  // 3. Backstage "Prep ▾" Popover & Mobile Slide Menu
  // =========================================================================
  const prepMenuWrap = $('#prep-menu-wrap');
  const prepToggleBtn = $('#prep-menu-toggle');
  const prepPopover = $('#prep-popover');

  function setPrepPopoverOpen(open) {
    if (!prepToggleBtn || !prepPopover) return;
    prepPopover.hidden = !open;
    prepToggleBtn.setAttribute('aria-expanded', String(open));
  }

  function closePrepPopover() {
    setPrepPopoverOpen(false);
  }

  prepToggleBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const shouldOpen = prepPopover ? prepPopover.hidden : false;
    setPrepPopoverOpen(shouldOpen);
  });

  document.addEventListener('click', (e) => {
    if (prepPopover && !prepPopover.hidden && prepMenuWrap && !prepMenuWrap.contains(e.target)) {
      closePrepPopover();
    }
  });

  // Close popover when launching dialogs/drawers inside it
  [
    '#sync-audience-btn',
    '#prep-google-slides-btn',
    '#prep-perf-monitor-btn',
    '#meridian-3d-button',
    '#studio-button',
    '#revisions-button',
    '#print-button',
    '#prep-print-script-direct-btn'
  ].forEach((sel) => {
    $(sel)?.addEventListener('click', () => closePrepPopover());
  });

  const contentsBtn = $('#contents-toggle');
  const contentsMenu = $('#mobile-contents');

  function closeMobileMenu() {
    if (!contentsBtn || !contentsMenu) return;
    contentsMenu.hidden = true;
    contentsBtn.setAttribute('aria-expanded', 'false');
  }

  if (contentsBtn && contentsMenu) {
    contentsBtn.addEventListener('click', () => {
      const open = contentsMenu.hidden;
      contentsMenu.hidden = !open;
      contentsBtn.setAttribute('aria-expanded', String(open));
    });
    $$('a', contentsMenu).forEach((a) => a.addEventListener('click', closeMobileMenu));
  }

  // =========================================================================
  // 4. Full-Artwork Lightbox Dialog
  // =========================================================================
  const dialog = $('#image-dialog');
  const dialogImg = $('#dialog-image');
  const dialogCaption = $('#dialog-caption');
  const dialogClose = $('#dialog-close');

  $$('[data-image]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!dialog || !dialogImg || !dialogCaption) return;
      dialogImg.src = btn.dataset.image;
      dialogImg.alt = btn.dataset.alt || '';
      dialogCaption.textContent = btn.dataset.caption || '';
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
    });
  });

  const closeDialog = () => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  dialogClose?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', (e) => {
    if (e.target === dialog) closeDialog();
  });

  // =========================================================================
  // 5. Orbital Power Constellation Controller
  // =========================================================================
  const constellationDial = $('#constellation-dial');
  const constellationToggle = $('#constellation-toggle');
  const constSlideTag = $('#constellation-slide-tag');
  const constLabelText = $('#constellation-label-text');
  const constNodeLeg = $('#const-node-leg');
  const constNodeExec = $('#const-node-exec');
  const constNodeJud = $('#const-node-jud');
  const constNodeDom = $('#const-node-dom');
  const constLineLE = $('#const-line-le');
  const constLineEJ = $('#const-line-ej');
  const constLineJL = $('#const-line-jl');
  const constLineDom = $('#const-line-dom');

  function setSvgPoint(circleEl, point) {
    if (!circleEl || !Array.isArray(point) || point.length < 2) return;
    circleEl.setAttribute('cx', String(point[0]));
    circleEl.setAttribute('cy', String(point[1]));
  }

  function setSvgLine(lineEl, p1, p2) {
    if (!lineEl || !Array.isArray(p1) || p1.length < 2 || !Array.isArray(p2) || p2.length < 2) {
      return;
    }
    lineEl.setAttribute('x1', String(p1[0]));
    lineEl.setAttribute('y1', String(p1[1]));
    lineEl.setAttribute('x2', String(p2[0]));
    lineEl.setAttribute('y2', String(p2[1]));
  }

  function updateConstellationForSlide(num) {
    if (!constellationDial) return;
    const { mode, caption, leg, exec, jud, dom } = getConstellationCoordinates(num);

    constellationDial.setAttribute('data-constellation-mode', mode);
    if (constSlideTag) {
      constSlideTag.textContent = `${String(num).padStart(2, '0')} · POWER ORBIT`;
    }
    if (constLabelText) {
      constLabelText.textContent = caption;
    }

    setSvgPoint(constNodeLeg, leg);
    setSvgPoint(constNodeExec, exec);
    setSvgPoint(constNodeJud, jud);
    setSvgPoint(constNodeDom, dom);

    setSvgLine(constLineLE, leg, exec);
    setSvgLine(constLineEJ, exec, jud);
    setSvgLine(constLineJL, jud, leg);
    setSvgLine(constLineDom, jud, dom);
  }

  constellationToggle?.addEventListener('click', () => {
    const expanded = constellationToggle.getAttribute('aria-expanded') === 'true';
    constellationToggle.setAttribute('aria-expanded', String(!expanded));
    constellationDial?.classList.toggle('is-expanded', !expanded);
  });

  // =========================================================================
  // 6. Interactive Power-Distribution & Equilibrium Callouts (Slides 02–07)
  // =========================================================================
  function emitPresenterStateChanged() {
    window.dispatchEvent(
      new CustomEvent('dauchy:presenter-state-changed', {
        detail: {
          currentSlide: currentSlideNum,
          activeCallout: getCurrentCallout()
        }
      })
    );
  }

  // Slide 02: Who Was Montesquieu (Court / Spirit of the Laws / Security Under Laws)
  const s2Bridge = $('#s2-equilibrium-bridge');
  const s2PoleBtns = $$('[data-eq-pole]');
  const s2SelectRows = $$('[data-eq-select]');
  const s2PolePanels = $$('[data-pole-panel]');

  function setSlide2Pole(pole, { fromRemoteSync = false } = {}) {
    const nextPole =
      pole === 'court' || pole === 'spirit' || pole === 'liberty' ? pole : 'balanced';
    activeSlideCallouts[2] = nextPole === 'balanced' ? '' : nextPole;
    if (s2Bridge) {
      s2Bridge.setAttribute('data-active-pole', nextPole);
    }
    s2PoleBtns.forEach((btn) => {
      const active = btn.dataset.eqPole === nextPole;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    s2PolePanels.forEach((panel) => {
      panel.classList.toggle('is-highlighted', panel.dataset.polePanel === nextPole);
    });
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  s2PoleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pole = btn.dataset.eqPole;
      const current = s2Bridge?.getAttribute('data-active-pole') || 'balanced';
      setSlide2Pole(current === pole ? 'balanced' : pole);
    });
  });

  s2SelectRows.forEach((row) => {
    const pole = row.dataset.eqSelect;
    const toggle = () => {
      const current = s2Bridge?.getAttribute('data-active-pole') || 'balanced';
      setSlide2Pole(current === pole ? 'balanced' : pole);
    };
    row.addEventListener('click', toggle);
    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Slide 03: Book XI, Chapter 6 — Legislative, Executive & Judicial Functions
  const s3ScaleBar = $('#s3-functions-scale');
  const s3FnCards = $$('[data-s3-fn]');
  const s3StepMap = {
    legislative: 'imposed',
    executive: 'deliberate',
    judicial: 'overlapping'
  };

  function setSlide3Function(fnId, { fromRemoteSync = false } = {}) {
    if (fnId !== 'legislative' && fnId !== 'executive' && fnId !== 'judicial') return;
    activeSlideCallouts[3] = fnId;
    if (s3ScaleBar) {
      s3ScaleBar.setAttribute('data-step', s3StepMap[fnId] || 'deliberate');
    }
    s3FnCards.forEach((card) => {
      card.classList.toggle('is-active', card.dataset.s3Fn === fnId);
    });
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  s3FnCards.forEach((card) => {
    const fnId = card.dataset.s3Fn;
    card.addEventListener('click', () => setSlide3Function(fnId));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSlide3Function(fnId);
      }
    });
  });

  // Slide 04: Montesquieu in Brazil, 1824 — Tripartite Three Powers vs. 1824 Art. 10 Four Powers
  const s4OrbitBox = $('#s4-powers-orbit');
  const s4ModeBtns = $$('[data-powers-mode]');

  function setSlide4PowersMode(mode, { fromRemoteSync = false } = {}) {
    const nextMode = mode === 'three-powers' ? 'three-powers' : 'four-powers';
    activeSlideCallouts[4] = nextMode;
    if (s4OrbitBox) {
      s4OrbitBox.setAttribute('data-mode', nextMode);
    }
    s4ModeBtns.forEach((btn) => {
      const active = btn.dataset.powersMode === nextMode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  s4ModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSlide4PowersMode(btn.dataset.powersMode);
    });
  });

  // Slide 05: Representing Distinct and Related Institutions (Figueiredo, 1896 / Oath of 1891)
  const s5ArtworkBox = $('#s5-artwork-box');
  const s5SpotItems = $$('[data-spot-select]');

  function setSlide5OathSpotlight(spotId, { fromRemoteSync = false } = {}) {
    const valid =
      spotId === 'deodoro' || spotId === 'prudente' || spotId === 'gallery' ? spotId : '';
    activeSlideCallouts[5] = valid;
    if (s5ArtworkBox) {
      s5ArtworkBox.setAttribute('data-active-spot', valid);
    }
    s5SpotItems.forEach((item) => {
      item.classList.toggle('is-active', item.dataset.spotSelect === valid);
    });
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  s5SpotItems.forEach((item) => {
    const id = item.dataset.spotSelect;
    const toggle = () => {
      setSlide5OathSpotlight(activeSlideCallouts[5] === id ? '' : id);
    };
    item.addEventListener('click', toggle);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Slide 06: Ceschiatti’s Justice (1961, STF) — Sword Focus & Praça dos Três Poderes Triad
  const swordBtn = $('#toggle-sword-focus');
  const s6PhotoBox = $('#s6-photo-box');
  const pracaNodeBtns = $$('[data-praca-node]');
  const pracaCaptionEl = $('#s6-triad-caption');
  const PRACA_NOTES = {
    stf: 'Positioned before the Supreme Federal Court, identifying the figure of Justice with a particular judicial institution.',
    congress: 'Shares the Praça dos Três Poderes with the National Congress—distinct legislative and judicial buildings in a common civic space.',
    planalto: 'Shares the Praça dos Três Poderes with the presidential palace—visualising distinct powers within a shared republican setting.'
  };

  function setSlide6JusticaState(callout, { fromRemoteSync = false } = {}) {
    const val = String(callout || '');
    if (val === 'sword-detail' || val === 'whole') {
      const swordFocused = val === 'sword-detail';
      activeSlideCallouts[6] = swordFocused ? 'sword-detail' : 'whole';
      if (s6PhotoBox) {
        s6PhotoBox.classList.toggle('is-sword-focused', swordFocused);
      }
      if (swordBtn) {
        swordBtn.classList.toggle('is-active', swordFocused);
        swordBtn.setAttribute('aria-pressed', String(swordFocused));
        swordBtn.textContent = swordFocused ? 'Show whole sculpture' : 'Detail: Sword on lap';
      }
    } else if (val === 'stf' || val === 'congress' || val === 'planalto') {
      activeSlideCallouts[6] = val;
      pracaNodeBtns.forEach((btn) => {
        const active = btn.dataset.pracaNode === val;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-pressed', String(active));
      });
      if (pracaCaptionEl && !document.body.classList.contains('is-editing')) {
        pracaCaptionEl.textContent = PRACA_NOTES[val];
      }
    }
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  swordBtn?.addEventListener('click', () => {
    const next = !s6PhotoBox?.classList.contains('is-sword-focused');
    setSlide6JusticaState(next ? 'sword-detail' : 'whole');
  });

  pracaNodeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setSlide6JusticaState(btn.dataset.pracaNode);
    });
  });

  // Slide 07: Questions for Serge Spotlights (Q1 / Q2)
  const s7Questions = $$('[data-q-spot]');

  function setSlide7QuestionSpot(qId, { fromRemoteSync = false } = {}) {
    if (qId !== 'q1' && qId !== 'q2') return;
    activeSlideCallouts[7] = qId;
    s7Questions.forEach((q) => {
      q.classList.toggle('is-active', q.dataset.qSpot === qId);
    });
    if (!fromRemoteSync) emitPresenterStateChanged();
  }

  s7Questions.forEach((q) => {
    const qId = q.dataset.qSpot;
    q.addEventListener('click', () => setSlide7QuestionSpot(qId));
    q.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSlide7QuestionSpot(qId);
      }
    });
  });

  // =========================================================================
  // 7. 5-Second Visual Pause Aura (Slide 05 — Figueiredo’s Compromisso Constitucional)
  // =========================================================================
  const pauseButtons = $$('[data-visual-pause]');

  function stopVisualPause({ fromRemoteSync = false } = {}) {
    if (visualPauseTimer) {
      clearTimeout(visualPauseTimer);
      visualPauseTimer = null;
    }
    const prevSlide = visualPauseSlide;
    visualPauseSlide = 0;

    const sec = $('#slide-5');
    const badge = $('#s5-pause-badge');
    sec?.removeAttribute('data-visual-pause-active');
    if (badge) {
      badge.hidden = true;
      badge.classList.remove('is-counting');
    }
    pauseButtons.forEach((b) => b.classList.remove('is-active'));

    if (prevSlide && !fromRemoteSync) {
      emitPresenterStateChanged();
    }
  }

  function startVisualPause(slideNum, { fromRemoteSync = false } = {}) {
    const targetNum = Number(slideNum);
    if (targetNum !== 5) return;

    if (visualPauseSlide === targetNum) {
      stopVisualPause({ fromRemoteSync });
      return;
    }

    stopVisualPause({ fromRemoteSync: true });
    visualPauseSlide = targetNum;

    const sec = $(`#slide-${targetNum}`);
    const badge = $(`#s${targetNum}-pause-badge`);
    sec?.setAttribute('data-visual-pause-active', 'true');
    if (badge) {
      badge.hidden = false;
      badge.classList.remove('is-counting');
      void badge.offsetWidth;
      badge.classList.add('is-counting');
    }
    pauseButtons.forEach((b) => {
      b.classList.toggle('is-active', Number(b.dataset.visualPause) === targetNum);
    });

    if (!fromRemoteSync) {
      emitPresenterStateChanged();
    }

    visualPauseTimer = setTimeout(() => {
      stopVisualPause({ fromRemoteSync });
    }, 5000);
  }

  pauseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      startVisualPause(Number(btn.dataset.visualPause));
    });
  });

  // =========================================================================
  // 7B. Slide-Specific Unobtrusive Presenter Tips (Top-Right of Slides 01–07)
  // =========================================================================
  const presenterTipWraps = $$('[data-presenter-tip-slide]');
  const prepTipToggleBtn = $('#prep-tip-toggle');
  let presenterTipState = { activeSlide: null, mode: 'closed' };
  const tipHoverTimers = new Map();

  function clearTipHoverTimer(slideNum) {
    const t = tipHoverTimers.get(slideNum);
    if (t) {
      clearTimeout(t);
      tipHoverTimers.delete(slideNum);
    }
  }

  function renderPresenterTipPanelContent(slideNum, panelEl) {
    if (!panelEl) return;
    const tip = getPresenterTipForSlide(slideNum);
    panelEl.textContent = '';

    const head = document.createElement('div');
    head.className = 'presenter-tip__head';

    const titleWrap = document.createElement('div');
    const kicker = document.createElement('p');
    kicker.className = 'presenter-tip__kicker t-meta';
    kicker.textContent = tip.kicker;

    const heading = document.createElement('h3');
    heading.className = 'presenter-tip__heading t-display-serif';
    heading.textContent = tip.heading;

    titleWrap.appendChild(kicker);
    titleWrap.appendChild(heading);

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'presenter-tip__close t-ui';
    closeBtn.setAttribute(
      'aria-label',
      `Close Presenter Tip for Slide ${String(slideNum).padStart(2, '0')}`
    );
    closeBtn.textContent = '×';
    closeBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      applyPresenterTipAction({ type: 'close' }, { restoreFocusSlide: slideNum });
    });

    head.appendChild(titleWrap);
    head.appendChild(closeBtn);
    panelEl.appendChild(head);

    const list = document.createElement('ul');
    list.className = 'presenter-tip__list';

    tip.cues.forEach((cue) => {
      const li = document.createElement('li');
      li.className = 'presenter-tip__item';

      const lbl = document.createElement('span');
      lbl.className = 'presenter-tip__cue-label t-meta';
      lbl.textContent = cue.label;

      const txt = document.createElement('p');
      txt.className = 'presenter-tip__cue-text';
      txt.textContent = cue.text;

      li.appendChild(lbl);
      li.appendChild(txt);

      if (cue.isPauseCue && tip.pauseActionSlide) {
        const pauseTrigger = document.createElement('button');
        pauseTrigger.type = 'button';
        pauseTrigger.className = 'presenter-tip__pause-btn t-ui';
        pauseTrigger.textContent = '◎ Start 5s Visual Pause';
        pauseTrigger.addEventListener('click', (ev) => {
          ev.stopPropagation();
          applyPresenterTipAction({ type: 'close' });
          startVisualPause(tip.pauseActionSlide);
        });
        li.appendChild(pauseTrigger);
      }

      list.appendChild(li);
    });

    panelEl.appendChild(list);

    if (tip.guardrail) {
      const guard = document.createElement('p');
      guard.className = 'presenter-tip__guardrail';
      guard.textContent = tip.guardrail;
      panelEl.appendChild(guard);
    }

    const scriptLinkRow = document.createElement('div');
    scriptLinkRow.className = 'presenter-tip__footer-row';
    const scriptLinkBtn = document.createElement('button');
    scriptLinkBtn.type = 'button';
    scriptLinkBtn.className = 'presenter-tip__pause-btn t-ui';
    scriptLinkBtn.textContent = `📄 Read Page ${slideNum} in Lectern Script (L)`;
    scriptLinkBtn.addEventListener('click', (ev) => {
      ev.stopPropagation();
      applyPresenterTipAction({ type: 'close' });
      openLecternScriptDialog(slideNum);
    });
    scriptLinkRow.appendChild(scriptLinkBtn);
    panelEl.appendChild(scriptLinkRow);
  }

  function syncPresenterTipDOM({ restoreFocusSlide = null } = {}) {
    presenterTipWraps.forEach((wrap) => {
      const num = Number(wrap.dataset.presenterTipSlide);
      const isOpen = presenterTipState.activeSlide === num && presenterTipState.mode !== 'closed';
      const mode = isOpen ? presenterTipState.mode : 'closed';
      wrap.setAttribute('data-tip-mode', mode);

      const btn = $('.presenter-tip__btn', wrap);
      const panel = $('.presenter-tip__panel', wrap);
      if (btn) {
        btn.setAttribute('aria-expanded', String(isOpen));
      }
      if (panel) {
        panel.hidden = !isOpen;
      }
      if (restoreFocusSlide === num && btn) {
        btn.focus({ preventScroll: true });
      }
    });
  }

  function applyPresenterTipAction(action, options = {}) {
    presenterTipState = resolvePresenterTipState(presenterTipState, action);
    syncPresenterTipDOM(options);
  }

  presenterTipWraps.forEach((wrap) => {
    const num = Number(wrap.dataset.presenterTipSlide);
    const btn = $('.presenter-tip__btn', wrap);
    const panel = $('.presenter-tip__panel', wrap);
    renderPresenterTipPanelContent(num, panel);

    wrap.addEventListener('pointerenter', (ev) => {
      if (ev.pointerType && ev.pointerType !== 'mouse' && ev.pointerType !== 'pen') return;
      clearTipHoverTimer(num);
      applyPresenterTipAction({ type: 'hover-enter', slide: num });
    });

    wrap.addEventListener('pointerleave', (ev) => {
      if (ev.pointerType && ev.pointerType !== 'mouse' && ev.pointerType !== 'pen') return;
      clearTipHoverTimer(num);
      const timer = setTimeout(() => {
        tipHoverTimers.delete(num);
        applyPresenterTipAction({ type: 'hover-leave', slide: num });
      }, 150);
      tipHoverTimers.set(num, timer);
    });

    btn?.addEventListener('click', (ev) => {
      ev.stopPropagation();
      clearTipHoverTimer(num);
      applyPresenterTipAction({ type: 'click-toggle', slide: num });
    });
  });

  prepTipToggleBtn?.addEventListener('click', (ev) => {
    ev.stopPropagation();
    closePrepPopover();
    applyPresenterTipAction(
      { type: 'pin-open', slide: currentSlideNum },
      { restoreFocusSlide: currentSlideNum }
    );
  });

  document.addEventListener('click', (ev) => {
    if (presenterTipState.mode === 'closed') return;
    const targetEl = ev.target instanceof Element ? ev.target : null;
    if (!targetEl?.closest('[data-presenter-tip-slide], #prep-tip-toggle')) {
      applyPresenterTipAction({ type: 'close' });
    }
  });

  // =========================================================================
  // 7C. 7-Page Revised Lectern Script Reader, Matching Script Final & Embedded Dauchy Corpus
  // =========================================================================
  const lecternDialog = $('#lectern-script-dialog');
  const lecternCloseBtn = $('#lectern-script-close');
  const lecternPagesContainer = $('#lectern-script-pages');
  const printLecternContainer = $('#print-lectern-script');
  const printScriptOnlyBtn = $('#print-script-only-btn');
  const prepPrintScriptDirectBtn = $('#prep-print-script-direct-btn');
  const headerScriptBtn = $('#header-script-btn');
  const prepScriptBtn = $('#prep-script-btn');
  const mobileScriptBtn = $('#mobile-script-toggle');
  const footerScriptOpenBtn = $('#footer-script-open-btn');
  const footerScriptPrintBtn = $('#footer-script-print-btn');
  const scriptFontBtns = $$('[data-script-font]');
  const lecternModeBtns = $$('[data-lectern-mode-btn]');
  let activeLecternMode = 'lectern'; // 'lectern' | 'matching' | 'dauchy'

  function buildLecternPageElement(pageData, { forPrint = false } = {}) {
    const pageEl = document.createElement('article');
    pageEl.className = forPrint ? 'print-lectern-page' : 'lectern-page-card';
    pageEl.dataset.scriptPage = String(pageData.page);

    const runningHead = document.createElement('header');
    runningHead.className = 'lectern-page__running-head t-meta';
    runningHead.textContent = 'MONTESQUIEU • LECTERN SCRIPT • ANA VITÓRIA VANZIN MENDES';
    pageEl.appendChild(runningHead);

    const titleRow = document.createElement('div');
    titleRow.className = 'lectern-page__title-row';

    const h3 = document.createElement('h3');
    h3.className = 'lectern-page__heading t-display-serif';
    h3.textContent = pageData.heading;
    titleRow.appendChild(h3);

    if (!forPrint && pageData.slideNumber) {
      const jumpBtn = document.createElement('button');
      jumpBtn.type = 'button';
      jumpBtn.className = 'text-link-sm';
      jumpBtn.textContent = `Go to Slide 0${pageData.slideNumber} →`;
      jumpBtn.addEventListener('click', () => {
        closeLecternScriptDialog();
        goToSlide(pageData.slideNumber);
      });
      titleRow.appendChild(jumpBtn);
    }

    pageEl.appendChild(titleRow);

    const metaLine = document.createElement('p');
    metaLine.className = 'lectern-page__meta t-meta';
    metaLine.textContent = pageData.stageLabel
      ? `${pageData.elapsedRange}  |  ${pageData.stageLabel}`
      : pageData.elapsedRange || '';
    pageEl.appendChild(metaLine);

    if (pageData.instruction) {
      const instr = document.createElement('p');
      instr.className = 'lectern-page__instruction';
      instr.textContent = pageData.instruction;
      pageEl.appendChild(instr);
    }

    const rule = document.createElement('hr');
    rule.className = 'lectern-page__rule';
    pageEl.appendChild(rule);

    const body = document.createElement('div');
    body.className = 'lectern-page__prose';
    pageData.paragraphs.forEach((p) => {
      const para = document.createElement('p');
      if (typeof p === 'string') {
        para.textContent = p;
      } else {
        const strong = document.createElement('strong');
        strong.textContent = p.leadIn;
        para.appendChild(strong);
        if (p.rest) {
          para.appendChild(document.createTextNode(` ${p.rest}`));
        }
      }
      body.appendChild(para);
    });
    pageEl.appendChild(body);

    if (pageData.stageCue) {
      const cue = document.createElement('p');
      cue.className = 'lectern-page__cue';
      cue.textContent = pageData.stageCue;
      pageEl.appendChild(cue);
    }

    const foot = document.createElement('footer');
    foot.className = 'lectern-page__footer t-meta';
    foot.textContent = `PAGE ${pageData.page}`;
    pageEl.appendChild(foot);

    return pageEl;
  }

  function buildMatchingScriptPageElement(pageData, { inDialog = false } = {}) {
    const card = document.createElement('article');
    card.className = 'lectern-page-card matching-page-card';
    card.dataset.scriptPage = String(pageData.page);

    const runningHead = document.createElement('header');
    runningHead.className = 'lectern-page__running-head t-meta';
    const refsLabel = Array.isArray(pageData.dauchyRefs) ? pageData.dauchyRefs.join(', ') : '';
    runningHead.textContent = `MATCHING SCRIPT FINAL • DAUCHY ${refsLabel} • ANA VITÓRIA VANZIN MENDES`;
    card.appendChild(runningHead);

    const titleRow = document.createElement('div');
    titleRow.className = 'lectern-page__title-row';

    const h3 = document.createElement('h3');
    h3.className = 'lectern-page__heading t-display-serif';
    h3.textContent = pageData.header || `${pageData.page} / 7 · ${pageData.heading || ''}`;
    titleRow.appendChild(h3);

    const jumpBtn = document.createElement('button');
    jumpBtn.type = 'button';
    jumpBtn.className = 'text-link-sm';
    jumpBtn.textContent = `Slide 0${pageData.slideNumber} →`;
    jumpBtn.addEventListener('click', () => {
      if (inDialog) closeLecternScriptDialog();
      goToSlide(pageData.slideNumber);
    });
    titleRow.appendChild(jumpBtn);
    card.appendChild(titleRow);

    if (Array.isArray(pageData.cues) && pageData.cues.length) {
      const metaLine = document.createElement('p');
      metaLine.className = 'lectern-page__meta t-meta';
      metaLine.textContent = `CUES: ${pageData.cues.join(' · ')}  |  ENGAGES DAUCHY ${refsLabel}`;
      card.appendChild(metaLine);
    }

    const rule = document.createElement('hr');
    rule.className = 'lectern-page__rule';
    card.appendChild(rule);

    const body = document.createElement('div');
    body.className = 'lectern-page__prose';
    pageData.paragraphs.forEach((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      body.appendChild(p);
    });
    card.appendChild(body);

    const foot = document.createElement('footer');
    foot.className = 'lectern-page__footer t-meta';
    foot.textContent = `MONTESQUIEU MATCHING SCRIPT FINAL · PAGE ${pageData.page} / 7`;
    card.appendChild(foot);

    return card;
  }

  function buildDauchyParagraphElement(paraData, { inDialog = false } = {}) {
    const card = document.createElement('article');
    card.className = 'dauchy-para-card';
    card.id = inDialog ? `dialog-dauchy-para-${paraData.number}` : paraData.id;
    card.dataset.dauchyPara = String(paraData.number);
    card.dataset.dauchyTheme = paraData.theme;

    const topRow = document.createElement('header');
    topRow.className = 'dauchy-para-card__head';

    const leftMeta = document.createElement('div');
    leftMeta.className = 'dauchy-para-card__title-wrap';

    const badge = document.createElement('span');
    badge.className = 'dauchy-para-card__badge t-meta';
    badge.textContent = `${paraData.ref} · ${paraData.themeLabel}`;

    const h3 = document.createElement('h3');
    h3.className = 'dauchy-para-card__title t-display-serif';
    h3.textContent = paraData.sectionTitle;

    leftMeta.appendChild(badge);
    leftMeta.appendChild(h3);
    topRow.appendChild(leftMeta);

    const slideLinksWrap = document.createElement('div');
    slideLinksWrap.className = 'dauchy-para-card__slides';
    (paraData.slideNumbers || []).forEach((sNum) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'text-link-sm';
      btn.textContent = `Slide 0${sNum} →`;
      btn.addEventListener('click', () => {
        if (inDialog) closeLecternScriptDialog();
        goToSlide(sNum);
      });
      slideLinksWrap.appendChild(btn);
    });
    topRow.appendChild(slideLinksWrap);
    card.appendChild(topRow);

    const grid = document.createElement('div');
    grid.className = 'dauchy-para-card__grid';

    const frCol = document.createElement('div');
    frCol.className = 'dauchy-para-card__col dauchy-para-card__col--fr';
    frCol.setAttribute('lang', 'fr');
    const frLabel = document.createElement('span');
    frLabel.className = 'source-tag t-meta';
    frLabel.textContent = `TEXTE ORIGINAL DE SERGE DAUCHY (${paraData.ref})`;
    const frText = document.createElement('p');
    frText.className = 'dauchy-para-card__fr-text t-display-serif';
    frText.textContent = paraData.frenchText;
    frCol.appendChild(frLabel);
    frCol.appendChild(frText);
    grid.appendChild(frCol);

    const enCol = document.createElement('div');
    enCol.className = 'dauchy-para-card__col dauchy-para-card__col--en';

    const enLabel = document.createElement('span');
    enLabel.className = 'source-tag t-meta';
    enLabel.textContent = 'ENGLISH WORKING TRANSLATION & SUMMARY';
    const enText = document.createElement('p');
    enText.className = 'dauchy-para-card__en-text';
    enText.textContent = paraData.englishSummary;
    enCol.appendChild(enLabel);
    enCol.appendChild(enText);

    if (paraData.dossierCommentary) {
      const dossierBox = document.createElement('div');
      dossierBox.className = 'dauchy-para-card__dossier';
      const dossierTag = document.createElement('span');
      dossierTag.className = 't-meta dauchy-para-card__dossier-tag';
      dossierTag.textContent = 'DISCUSSANT & DOSSIER RESONANCE';
      const dossierP = document.createElement('p');
      dossierP.textContent = paraData.dossierCommentary;
      dossierBox.appendChild(dossierTag);
      dossierBox.appendChild(dossierP);
      enCol.appendChild(dossierBox);
    }

    if (Array.isArray(paraData.keyConcepts) && paraData.keyConcepts.length) {
      const conceptsRow = document.createElement('div');
      conceptsRow.className = 'dauchy-para-card__concepts';
      paraData.keyConcepts.forEach((c) => {
        const tag = document.createElement('span');
        tag.className = 'dauchy-concept-tag t-meta';
        tag.textContent = c;
        conceptsRow.appendChild(tag);
      });
      enCol.appendChild(conceptsRow);
    }

    grid.appendChild(enCol);
    card.appendChild(grid);

    return card;
  }

  function renderLecternModalContent() {
    if (!lecternPagesContainer) return;
    lecternPagesContainer.textContent = '';

    if (activeLecternMode === 'matching') {
      const matchingPages = getMatchingScriptFinalPages();
      matchingPages.forEach((p) => {
        lecternPagesContainer.appendChild(buildMatchingScriptPageElement(p, { inDialog: true }));
      });
    } else if (activeLecternMode === 'dauchy') {
      DAUCHY_MANUSCRIPT_PARAGRAPHS.forEach((para) => {
        lecternPagesContainer.appendChild(buildDauchyParagraphElement(para, { inDialog: true }));
      });
    } else {
      const pages = getLecternScriptPages();
      pages.forEach((p) => {
        lecternPagesContainer.appendChild(buildLecternPageElement(p, { forPrint: false }));
      });
    }
  }

  function populateLecternScriptViews() {
    renderLecternModalContent();
    if (printLecternContainer) {
      const pages = getLecternScriptPages();
      printLecternContainer.textContent = '';
      pages.forEach((p) => {
        printLecternContainer.appendChild(buildLecternPageElement(p, { forPrint: true }));
      });
    }
  }

  populateLecternScriptViews();

  lecternModeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextMode = btn.dataset.lecternModeBtn || 'lectern';
      activeLecternMode = nextMode;
      lecternDialog?.setAttribute('data-lectern-mode', nextMode);
      lecternModeBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle('is-active', isCurrent);
        b.setAttribute('aria-pressed', String(isCurrent));
      });
      renderLecternModalContent();
      highlightActiveLecternPage(currentSlideNum);
    });
  });

  function highlightActiveLecternPage(slideNum) {
    if (!lecternPagesContainer) return;
    $$('.lectern-page-card', lecternPagesContainer).forEach((card) => {
      card.classList.toggle('is-current-slide', Number(card.dataset.scriptPage) === slideNum);
    });
  }

  function openLecternScriptDialog(targetPage = currentSlideNum, mode = null) {
    if (!lecternDialog) return;
    closePrepPopover();
    closeMobileMenu();
    if (mode && (mode === 'lectern' || mode === 'matching' || mode === 'dauchy')) {
      activeLecternMode = mode;
      lecternDialog.setAttribute('data-lectern-mode', mode);
      lecternModeBtns.forEach((b) => {
        const active = b.dataset.lecternModeBtn === mode;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderLecternModalContent();
    }
    highlightActiveLecternPage(targetPage);
    if (!lecternDialog.open) {
      if (typeof lecternDialog.showModal === 'function') {
        lecternDialog.showModal();
      } else {
        lecternDialog.setAttribute('open', '');
      }
    }
    const targetCard = $(`[data-script-page="${targetPage}"]`, lecternPagesContainer);
    targetCard?.scrollIntoView({ behavior: 'auto', block: 'start' });
  }

  function closeLecternScriptDialog() {
    if (!lecternDialog) return;
    if (typeof lecternDialog.close === 'function') lecternDialog.close();
    else lecternDialog.removeAttribute('open');
  }

  function printLecternScript() {
    if (!printLecternContainer) return;
    if (lecternDialog?.open) {
      closeLecternScriptDialog();
    }
    document.body.classList.add('is-printing-script');
    printLecternContainer.hidden = false;
    printLecternContainer.removeAttribute('aria-hidden');

    const cleanup = () => {
      document.body.classList.remove('is-printing-script');
      printLecternContainer.hidden = true;
      printLecternContainer.setAttribute('aria-hidden', 'true');
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    window.print();
    setTimeout(cleanup, 1200);
  }

  headerScriptBtn?.addEventListener('click', () => openLecternScriptDialog(currentSlideNum));
  prepScriptBtn?.addEventListener('click', () => openLecternScriptDialog(currentSlideNum));
  mobileScriptBtn?.addEventListener('click', () => openLecternScriptDialog(currentSlideNum));
  footerScriptOpenBtn?.addEventListener('click', () => openLecternScriptDialog(1));
  lecternCloseBtn?.addEventListener('click', closeLecternScriptDialog);
  lecternDialog?.addEventListener('click', (e) => {
    if (e.target === lecternDialog) closeLecternScriptDialog();
  });

  printScriptOnlyBtn?.addEventListener('click', printLecternScript);
  prepPrintScriptDirectBtn?.addEventListener('click', printLecternScript);
  footerScriptPrintBtn?.addEventListener('click', printLecternScript);

  scriptFontBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const size = btn.dataset.scriptFont === 'large' ? 'large' : 'standard';
      lecternDialog?.setAttribute('data-script-size', size);
      scriptFontBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });

  if (
    /(?:^\?|&)script=1(?:&|$)/.test(window.location.search) ||
    window.location.hash === '#lectern-script'
  ) {
    requestAnimationFrame(() => openLecternScriptDialog(1));
  }

  // =========================================================================
  // 7D. Embedded Serge Dauchy Corpus Section (#dauchy-paper)
  // =========================================================================
  const dauchySection = $('#dauchy-paper');
  const dauchyTabBtns = $$('[data-dauchy-tab]');
  const dauchyPanelManuscript = $('#dauchy-panel-manuscript');
  const dauchyPanelMatchingPdf = $('#dauchy-panel-matching-pdf');
  const dauchyPanelDossier = $('#dauchy-panel-dossier');
  const dauchyParagraphsList = $('#dauchy-paragraphs-list');
  const dauchyResultsCount = $('#dauchy-results-count');
  const dauchyThemeBtns = $$('[data-dauchy-theme]');
  const dauchySearchInput = $('#dauchy-search-input');
  const dauchyViewBtns = $$('[data-dauchy-view]');
  const matchingScriptCardsList = $('#matching-script-cards-list');
  const dossierPanelInner = $('#dossier-panel-inner');

  const headerDauchyBtn = $('#header-dauchy-btn');
  const prepDauchyBtn = $('#prep-dauchy-btn');
  const mobileDauchyBtn = $('#mobile-dauchy-toggle');
  const footerDauchyOpenBtn = $('#footer-dauchy-open-btn');
  const dauchyParaJumpLinks = $$('[data-open-dauchy-para]');

  let activeDauchyTheme = 'all';
  let activeDauchyQuery = '';

  function renderEmbeddedDauchyParagraphs() {
    if (!dauchyParagraphsList) return;
    const filtered = filterDauchyParagraphs({
      theme: activeDauchyTheme,
      query: activeDauchyQuery
    });

    dauchyParagraphsList.textContent = '';

    if (dauchyResultsCount) {
      if (filtered.length === DAUCHY_MANUSCRIPT_PARAGRAPHS.length) {
        dauchyResultsCount.textContent = `Showing all ${DAUCHY_MANUSCRIPT_PARAGRAPHS.length} paragraphs (¶1–14) of Serge Dauchy’s « ${DAUCHY_MANUSCRIPT_META.title} »`;
      } else {
        dauchyResultsCount.textContent = `Showing ${filtered.length} of ${DAUCHY_MANUSCRIPT_PARAGRAPHS.length} paragraphs matching filter`;
      }
    }

    if (!filtered.length) {
      const empty = document.createElement('p');
      empty.className = 'dauchy-empty-state';
      empty.textContent = 'No paragraphs match that filter or search query. Clear search to view all 14 paragraphs.';
      dauchyParagraphsList.appendChild(empty);
      return;
    }

    filtered.forEach((para) => {
      dauchyParagraphsList.appendChild(buildDauchyParagraphElement(para, { inDialog: false }));
    });
  }

  function renderEmbeddedMatchingScriptCards() {
    if (!matchingScriptCardsList) return;
    matchingScriptCardsList.textContent = '';
    const pages = getMatchingScriptFinalPages();
    pages.forEach((pageData) => {
      matchingScriptCardsList.appendChild(buildMatchingScriptPageElement(pageData, { inDialog: false }));
    });
  }

  function renderEmbeddedDeepResearchDossier() {
    if (!dossierPanelInner) return;
    dossierPanelInner.textContent = '';
    const dossierData = getDeepResearchDossierSections();

    const introCard = document.createElement('article');
    introCard.className = 'dossier-intro-card';

    const tag = document.createElement('p');
    tag.className = 'source-tag t-meta';
    tag.textContent = 'DEEP RESEARCH DOSSIER · PPGD/UFSC · 11 NOVEMBER 2026';

    const h3 = document.createElement('h3');
    h3.className = 't-display-serif dossier-intro-card__title';
    h3.textContent = dossierData.title;

    const synth = document.createElement('p');
    synth.className = 'dossier-intro-card__synthesis';
    synth.textContent = dossierData.executiveSynthesis;

    introCard.appendChild(tag);
    introCard.appendChild(h3);
    introCard.appendChild(synth);
    dossierPanelInner.appendChild(introCard);

    // Archival Reception Table (1789 / 1798 / 1823-1824)
    if (Array.isArray(dossierData.archivalReceptionTable)) {
      const tableWrap = document.createElement('div');
      tableWrap.className = 'dossier-table-wrap';

      const tableTitle = document.createElement('p');
      tableTitle.className = 'source-tag t-meta';
      tableTitle.textContent = 'ARCHIVAL VECTORS · TRANSATLANTIC RECEPTION OF MONTESQUIEU IN BRAZIL (DAUCHY ¶6)';
      tableWrap.appendChild(tableTitle);

      const table = document.createElement('table');
      table.className = 'dossier-archival-table';
      table.innerHTML = `
        <thead>
          <tr>
            <th>Historical Episode</th>
            <th>Serge Dauchy Manuscript Anchor (¶6)</th>
            <th>Primary Archival &amp; Historiographical Expansion</th>
          </tr>
        </thead>
      `;
      const tbody = document.createElement('tbody');
      dossierData.archivalReceptionTable.forEach((row) => {
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        td1.innerHTML = `<strong>${row.episode}</strong>`;
        const td2 = document.createElement('td');
        td2.textContent = row.dauchyRef;
        const td3 = document.createElement('td');
        td3.textContent = row.archivalExpansion;
        tr.append(td1, td2, td3);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      tableWrap.appendChild(table);
      dossierPanelInner.appendChild(tableWrap);
    }

    // Dossier Sections Grid
    const sectionsGrid = document.createElement('div');
    sectionsGrid.className = 'dossier-sections-grid';
    (dossierData.sections || []).forEach((sec) => {
      const card = document.createElement('article');
      card.className = 'dossier-section-card';
      card.id = sec.id;

      const partTag = document.createElement('span');
      partTag.className = 'source-tag t-meta';
      partTag.textContent = `${sec.part} · ${(sec.dauchyParagraphs || []).join(', ')}`;

      const title = document.createElement('h4');
      title.className = 't-display-serif dossier-section-card__title';
      title.textContent = sec.title;

      const summary = document.createElement('p');
      summary.className = 'dossier-section-card__summary';
      summary.textContent = sec.summary;

      card.append(partTag, title, summary);

      if (sec.keyQuote) {
        const quoteBox = document.createElement('div');
        quoteBox.className = 'dauchy-para-card__dossier';
        const qP = document.createElement('p');
        qP.textContent = sec.keyQuote;
        quoteBox.appendChild(qP);
        card.appendChild(quoteBox);
      }

      sectionsGrid.appendChild(card);
    });

    dossierPanelInner.appendChild(sectionsGrid);
  }

  function setDauchyCorpusTab(tabId) {
    const validTab =
      tabId === 'matching-pdf' || tabId === 'dossier' ? tabId : 'manuscript';
    dauchyTabBtns.forEach((btn) => {
      const isSelected = btn.dataset.dauchyTab === validTab;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));
    });
    if (dauchyPanelManuscript) dauchyPanelManuscript.hidden = validTab !== 'manuscript';
    if (dauchyPanelMatchingPdf) dauchyPanelMatchingPdf.hidden = validTab !== 'matching-pdf';
    if (dauchyPanelDossier) dauchyPanelDossier.hidden = validTab !== 'dossier';
  }

  function openEmbeddedDauchySection({ tab = 'manuscript', paragraph = null } = {}) {
    closePrepPopover();
    closeMobileMenu();
    if (isCurtainVisible()) {
      dismissPodiumCurtain({ enterPresent: false });
    }
    setDauchyCorpusTab(tab);

    if (paragraph) {
      // Ensure filter shows all paragraphs if target paragraph is hidden
      if (activeDauchyTheme !== 'all' || activeDauchyQuery) {
        activeDauchyTheme = 'all';
        activeDauchyQuery = '';
        if (dauchySearchInput) dauchySearchInput.value = '';
        dauchyThemeBtns.forEach((b) => {
          const active = b.dataset.dauchyTheme === 'all';
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-pressed', String(active));
        });
        renderEmbeddedDauchyParagraphs();
      }
      const targetParaEl = $(`#dauchy-para-${paragraph}`);
      if (targetParaEl) {
        $$('.dauchy-para-card.is-highlighted').forEach((el) =>
          el.classList.remove('is-highlighted')
        );
        targetParaEl.classList.add('is-highlighted');
        targetParaEl.scrollIntoView({
          behavior: prefersReducedMotion?.matches ? 'auto' : 'smooth',
          block: 'center'
        });
        return;
      }
    }

    dauchySection?.scrollIntoView({
      behavior: prefersReducedMotion?.matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  dauchyTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setDauchyCorpusTab(btn.dataset.dauchyTab);
    });
  });

  dauchyThemeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeDauchyTheme = btn.dataset.dauchyTheme || 'all';
      dauchyThemeBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      renderEmbeddedDauchyParagraphs();
    });
  });

  dauchySearchInput?.addEventListener('input', (e) => {
    activeDauchyQuery = e.target.value || '';
    renderEmbeddedDauchyParagraphs();
  });

  dauchyViewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.dauchyView || 'bilingual';
      dauchyParagraphsList?.setAttribute('data-view-mode', mode);
      dauchyViewBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
    });
  });

  headerDauchyBtn?.addEventListener('click', () =>
    openEmbeddedDauchySection({ tab: 'manuscript' })
  );
  prepDauchyBtn?.addEventListener('click', () =>
    openEmbeddedDauchySection({ tab: 'manuscript' })
  );
  mobileDauchyBtn?.addEventListener('click', () =>
    openEmbeddedDauchySection({ tab: 'manuscript' })
  );
  footerDauchyOpenBtn?.addEventListener('click', () =>
    openEmbeddedDauchySection({ tab: 'manuscript' })
  );

  dauchyParaJumpLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const paraNum = Number(link.dataset.openDauchyPara);
      if (Number.isInteger(paraNum) && paraNum >= 1 && paraNum <= 14) {
        e.preventDefault();
        openEmbeddedDauchySection({ tab: 'manuscript', paragraph: paraNum });
      }
    });
  });

  renderEmbeddedDauchyParagraphs();
  renderEmbeddedMatchingScriptCards();
  renderEmbeddedDeepResearchDossier();

  if (
    /(?:^\?|&)dauchy=1(?:&|$)/.test(window.location.search) ||
    window.location.hash === '#dauchy-paper' ||
    /^#dauchy-para-(?:[1-9]|1[0-4])$/.test(window.location.hash)
  ) {
    const matchPara = window.location.hash.match(/^#dauchy-para-([1-9]|1[0-4])$/);
    const paraNum = matchPara ? Number(matchPara[1]) : null;
    requestAnimationFrame(() =>
      openEmbeddedDauchySection({ tab: 'manuscript', paragraph: paraNum })
    );
  }

  function getCurrentCallout() {
    if (visualPauseSlide === currentSlideNum && currentSlideNum === 5) {
      return 'pause-5s';
    }
    return activeSlideCallouts[currentSlideNum] || '';
  }

  function applySlideCallout(slideNum, calloutId, { fromRemoteSync = true } = {}) {
    const num = Number(slideNum);
    const id = String(calloutId || '');

    if (id === 'pause-5s' && num === 5) {
      startVisualPause(num, { fromRemoteSync });
      return;
    }
    if (visualPauseSlide === num && id !== 'pause-5s') {
      stopVisualPause({ fromRemoteSync: true });
    }

    if (num === 2) {
      setSlide2Pole(id, { fromRemoteSync });
    } else if (num === 3) {
      setSlide3Function(id, { fromRemoteSync });
    } else if (num === 4 && (id === 'three-powers' || id === 'four-powers')) {
      setSlide4PowersMode(id, { fromRemoteSync });
    } else if (num === 5) {
      setSlide5OathSpotlight(id, { fromRemoteSync });
    } else if (num === 6) {
      setSlide6JusticaState(id, { fromRemoteSync });
    } else if (num === 7) {
      setSlide7QuestionSpot(id, { fromRemoteSync });
    }
  }

  // =========================================================================
  // 8. Gentle Archival Pointer Parallax on Slide 01
  // =========================================================================
  const slide1El = $('#slide-1');
  if (slide1El && !prefersReducedMotion?.matches) {
    let rafPending = false;
    let targetPx = 0;
    let targetPy = 0;

    slide1El.addEventListener(
      'pointermove',
      (e) => {
        if (
          prefersReducedMotion?.matches ||
          currentSlideNum !== 1 ||
          isCurtainVisible() ||
          isProgrammaticGsapScroll
        ) {
          return;
        }
        const rect = slide1El.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / Math.max(1, rect.width) - 0.5;
        const ny = (e.clientY - rect.top) / Math.max(1, rect.height) - 0.5;
        targetPx = Math.round(nx * 12 * 10) / 10;
        targetPy = Math.round(ny * 10 * 10) / 10;
        if (!rafPending) {
          rafPending = true;
          requestAnimationFrame(() => {
            rafPending = false;
            slide1El.style.setProperty('--px', `${targetPx}px`);
            slide1El.style.setProperty('--py', `${targetPy}px`);
          });
        }
      },
      { passive: true }
    );

    slide1El.addEventListener('pointerleave', () => {
      slide1El.style.setProperty('--px', '0px');
      slide1El.style.setProperty('--py', '0px');
    });
  }

  // =========================================================================
  // 9. Slide Stepper, Navigation & Scroll Synchronization
  // =========================================================================
  const headerEl = $('.header');
  const slideSections = $$('[data-slide]');
  const navLinks = $$('[data-slide-link]');
  const slideIndicator = $('#slide-indicator');
  const prevBtn = $('#prev-slide');
  const nextBtn = $('#next-slide');
  const progressBar = $('#reading-progress-bar');

  let cachedHeaderOffset = 0;
  let cachedMaxScroll = 1;
  let cachedSlideMetrics = [];
  let resizeRafPending = false;

  function syncHeaderOffset() {
    const isPresenting = document.body.classList.contains('is-presenting');
    const h = !isPresenting && headerEl ? Math.ceil(headerEl.offsetHeight) : 0;
    cachedHeaderOffset = h;
    document.documentElement.style.setProperty('--header-offset', `${h}px`);
    return h;
  }

  function refreshLayoutMetrics() {
    syncHeaderOffset();
    const doc = document.documentElement;
    const scrollY = window.scrollY;
    cachedMaxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
    cachedSlideMetrics = slideSections.map((sec) => {
      const rect = sec.getBoundingClientRect();
      const top = rect.top + scrollY;
      return {
        num: Number(sec.dataset.slide),
        top,
        center: top + rect.height * 0.5
      };
    });
  }

  refreshLayoutMetrics();
  window.addEventListener(
    'resize',
    () => {
      if (resizeRafPending) return;
      resizeRafPending = true;
      requestAnimationFrame(() => {
        resizeRafPending = false;
        refreshLayoutMetrics();
      });
    },
    { passive: true }
  );
  if (document.fonts && typeof document.fonts.ready?.then === 'function') {
    document.fonts.ready.then(() => refreshLayoutMetrics()).catch(() => {});
  }

  // Lazy loader for Three.js 3D Transatlantic Meridian companion stage (~680 KB deferred until requested)
  let meridianLoadPromise = null;
  function openMeridian3DLazy(preset = 'overview') {
    if (window.__meridian3DApi) {
      window.__meridian3DApi.openMeridian3D(preset);
      return;
    }
    if (!meridianLoadPromise) {
      meridianLoadPromise = import('./three-meridian.js')
        .then((mod) => mod.ensureTransatlanticMeridian3D())
        .catch((err) => {
          meridianLoadPromise = null;
          throw err;
        });
    }
    meridianLoadPromise.then((api) => api?.openMeridian3D?.(preset)).catch(() => {});
  }

  $$('[data-open-meridian-3d]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      if (window.__meridian3DApi) return;
      e.preventDefault();
      const preset = btn.getAttribute('data-open-meridian-3d') || 'overview';
      openMeridian3DLazy(preset);
    });
  });

  const bgs = {
    storm: $('.bg--storm'),
    palace: $('.bg--palace'),
    lake: $('.bg--lake'),
    nightsea: $('.bg--nightsea')
  };

  let suppressScrollEmitUntil = 0;

  // GSAP engine for single-layer GPU-composited cross-fade & directional slide-in transitions
  const gsapApi = typeof window !== 'undefined' ? window.gsap || null : null;
  let activeSlideTimeline = null;
  let activeTransitionProbe = null;
  let isProgrammaticGsapScroll = false;

  function clearAllSlideGsapProps() {
    if (!gsapApi) return;
    slideSections.forEach((sec) => {
      const frame = $('.slide-frame', sec);
      if (!frame) return;
      frame.classList.remove('is-gsap-transitioning');
      gsapApi.killTweensOf(frame);
      gsapApi.set(frame, { clearProps: 'opacity,transform' });
    });
  }

  function animateSlideFrameEntrance(slideNum, direction = 1) {
    if (
      !gsapApi ||
      prefersReducedMotion?.matches ||
      document.body.classList.contains('is-editing') ||
      document.body.classList.contains('is-phone-remote')
    ) {
      return;
    }
    const sec = $(`#slide-${slideNum}`);
    const frame = sec ? $('.slide-frame', sec) : null;
    if (!frame) return;

    frame.classList.add('is-gsap-transitioning');
    gsapApi.killTweensOf(frame);

    gsapApi.fromTo(
      frame,
      { opacity: 0.42, y: direction * 14 },
      {
        opacity: 1,
        y: 0,
        duration: 0.46,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
        clearProps: 'opacity,transform',
        onComplete: () => frame.classList.remove('is-gsap-transitioning')
      }
    );
  }

  function updateActiveSlideUI(num, { fromRemoteSync = false } = {}) {
    const changed = currentSlideNum !== num;
    if (changed && visualPauseSlide) {
      stopVisualPause({ fromRemoteSync: true });
    }
    if (changed && presenterTipState.mode !== 'closed') {
      applyPresenterTipAction({ type: 'slide-change' });
    }
    currentSlideNum = num;
    highlightActiveLecternPage(num);

    const padded = String(num).padStart(2, '0');
    const totalPadded = String(TOTAL_SLIDES).padStart(2, '0');
    if (slideIndicator) slideIndicator.textContent = `${padded} / ${totalPadded}`;
    navLinks.forEach((link) => {
      link.classList.toggle('is-current', Number(link.dataset.slideLink) === num);
    });
    slideSections.forEach((sec) => {
      sec.classList.toggle('is-active-slide', Number(sec.dataset.slide) === num);
    });

    updateConstellationForSlide(num);

    const activeSection = $(`[data-slide="${num}"]`);
    const scene = activeSection?.dataset.scene || 'storm';
    Object.entries(bgs).forEach(([key, el]) => {
      if (!el) return;
      el.classList.toggle('is-active-bg', key === scene);
    });

    if (changed && !fromRemoteSync) {
      emitPresenterStateChanged();
    }
  }

  function goToSlide(num, options = true) {
    const smooth = typeof options === 'boolean' ? options : options?.smooth !== false;
    const fromRemoteSync = typeof options === 'object' && Boolean(options?.fromRemoteSync);
    const trigger =
      typeof options === 'object' && options?.trigger
        ? String(options.trigger)
        : fromRemoteSync
        ? 'remote-sync'
        : 'navigation';
    const clamped = Math.max(1, Math.min(TOTAL_SLIDES, num));
    const prevSlide = currentSlideNum;

    if (fromRemoteSync && isCurtainVisible()) {
      dismissPodiumCurtain({ enterPresent: false });
    }

    const target = $(`#slide-${clamped}`);
    if (!target) return;

    const spec = computeSlideTransitionSpec(prevSlide, clamped, {
      reducedMotion: Boolean(prefersReducedMotion?.matches),
      smooth
    });

    if (activeTransitionProbe) {
      activeTransitionProbe.complete({ interrupted: true });
      activeTransitionProbe = null;
    }
    if (activeSlideTimeline) {
      activeSlideTimeline.kill();
      activeSlideTimeline = null;
    }
    isProgrammaticGsapScroll = false;
    clearAllSlideGsapProps();

    const h = syncHeaderOffset();
    const top = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - h));

    const canAnimateGsap = Boolean(
      gsapApi &&
        spec.animate &&
        !document.body.classList.contains('is-editing') &&
        !document.body.classList.contains('is-phone-remote')
    );

    if (prevSlide !== clamped) {
      activeTransitionProbe = perfMonitor.beginSlideTransition({
        fromSlide: prevSlide,
        toSlide: clamped,
        trigger,
        mode: canAnimateGsap ? 'gsap' : smooth ? 'native-smooth' : 'instant'
      });
    }

    if (canAnimateGsap) {
      const prevSection = $(`#slide-${prevSlide}`);
      const prevFrame = prevSection ? $('.slide-frame', prevSection) : null;
      const nextFrame = $('.slide-frame', target);

      suppressScrollEmitUntil = Date.now() + Math.round((spec.scrollDuration + 0.2) * 1000);
      isProgrammaticGsapScroll = true;

      if (prevFrame) prevFrame.classList.add('is-gsap-transitioning');
      if (nextFrame) nextFrame.classList.add('is-gsap-transitioning');

      updateActiveSlideUI(clamped, { fromRemoteSync });

      const probeRef = activeTransitionProbe;
      const scrollProxy = { y: window.scrollY };
      activeSlideTimeline = gsapApi.timeline({
        onComplete: () => {
          isProgrammaticGsapScroll = false;
          activeSlideTimeline = null;
          clearAllSlideGsapProps();
          if (probeRef) {
            probeRef.complete({ interrupted: false });
            if (activeTransitionProbe === probeRef) activeTransitionProbe = null;
          }
        },
        onInterrupt: () => {
          isProgrammaticGsapScroll = false;
          clearAllSlideGsapProps();
          if (probeRef) {
            probeRef.complete({ interrupted: true });
            if (activeTransitionProbe === probeRef) activeTransitionProbe = null;
          }
        }
      });

      activeSlideTimeline.to(
        scrollProxy,
        {
          y: top,
          duration: spec.scrollDuration,
          ease: 'power2.inOut',
          onUpdate: () => {
            window.scrollTo(0, Math.round(scrollProxy.y));
          }
        },
        0
      );

      if (prevFrame && prevFrame !== nextFrame) {
        activeSlideTimeline.to(
          prevFrame,
          {
            opacity: spec.exitOpacity,
            y: spec.exitY,
            duration: spec.exitDuration,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto'
          },
          0
        );
      }

      if (nextFrame) {
        gsapApi.set(nextFrame, { opacity: spec.enterOpacity, y: spec.enterY, force3D: true });
        activeSlideTimeline.to(
          nextFrame,
          {
            opacity: 1,
            y: 0,
            duration: spec.enterDuration,
            ease: 'power2.out',
            force3D: true,
            overwrite: 'auto'
          },
          spec.enterDelay
        );
      }

      if (!fromRemoteSync) {
        emitPresenterStateChanged();
      }
      return;
    }

    suppressScrollEmitUntil = Date.now() + (smooth ? 600 : 180);
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    updateActiveSlideUI(clamped, { fromRemoteSync });
    if (activeTransitionProbe) {
      const probeRef = activeTransitionProbe;
      requestAnimationFrame(() => {
        probeRef.complete({ interrupted: false });
        if (activeTransitionProbe === probeRef) activeTransitionProbe = null;
      });
    }
    if (!fromRemoteSync) {
      emitPresenterStateChanged();
    }
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const num = Number(link.dataset.slideLink);
      if (num >= 1 && num <= TOTAL_SLIDES) {
        e.preventDefault();
        goToSlide(num, { smooth: true, trigger: 'header-nav' });
      }
    });
  });

  prevBtn?.addEventListener('click', () =>
    goToSlide(currentSlideNum - 1, { smooth: true, trigger: 'stepper' })
  );
  nextBtn?.addEventListener('click', () =>
    goToSlide(currentSlideNum + 1, { smooth: true, trigger: 'stepper' })
  );

  // Keyboard navigation & stage shortcuts
  document.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('is-editing')) return;
    if (
      dialog?.open ||
      lecternDialog?.open ||
      $('#phone-remote-dialog')?.open ||
      $('#revisions-dialog')?.open ||
      $('#confirm-dialog')?.open ||
      $('#sync-audience-dialog')?.open ||
      $('#google-slides-dialog')?.open ||
      $('#perf-monitor-dialog')?.open
    ) {
      return;
    }
    const studioDrawer = $('#studio-drawer');
    if (studioDrawer && !studioDrawer.hidden) return;
    const meridianOverlay = $('#meridian-3d-overlay');
    if (meridianOverlay && !meridianOverlay.hidden) return;

    const tag = document.activeElement?.tagName;
    if (
      tag === 'INPUT' ||
      tag === 'TEXTAREA' ||
      tag === 'SELECT' ||
      document.activeElement?.isContentEditable
    ) {
      return;
    }

    // Handle Opening Event Poster keyboard shortcuts first when poster is drawn
    if (isCurtainVisible()) {
      if (!e.ctrlKey && !e.metaKey && !e.altKey) {
        const ck = e.key.toLowerCase();
        if (ck === 'b') {
          e.preventDefault();
          toggleBackgroundMusic();
          return;
        }
        if (ck === 'l') {
          e.preventDefault();
          dismissPodiumCurtain({ enterPresent: false });
          openLecternScriptDialog(1);
          return;
        }
      }
      if (e.key === 'Enter' || e.key === ' ') {
        const activeEl = document.activeElement;
        const isInteractiveOther =
          activeEl &&
          activeEl !== document.body &&
          activeEl !== podiumCurtain &&
          activeEl !== curtainStartBtn &&
          (activeEl.tagName === 'BUTTON' || activeEl.tagName === 'A');
        if (!isInteractiveOther) {
          e.preventDefault();
          dismissPodiumCurtain({ enterPresent: true, targetSlide: 1 });
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        dismissPodiumCurtain({ enterPresent: false });
      }
      return;
    }

    if (e.key === 'Escape') {
      if (presenterTipState.mode !== 'closed') {
        e.preventDefault();
        const prevTipSlide = presenterTipState.activeSlide;
        applyPresenterTipAction({ type: 'close' }, { restoreFocusSlide: prevTipSlide });
        return;
      }
      if (prepPopover && !prepPopover.hidden) {
        closePrepPopover();
        return;
      }
      if (contentsMenu && !contentsMenu.hidden) {
        closeMobileMenu();
        return;
      }
      if (visualPauseSlide) {
        stopVisualPause();
        return;
      }
      if (document.body.classList.contains('is-presenting')) {
        exitFullscreenPresentation();
        return;
      }
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      goToSlide(currentSlideNum + 1, { smooth: true, trigger: 'keyboard' });
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      goToSlide(currentSlideNum - 1, { smooth: true, trigger: 'keyboard' });
    } else if (!e.ctrlKey && !e.metaKey && !e.altKey) {
      const key = e.key.toLowerCase();
      if (key === 'p') {
        e.preventDefault();
        toggleProjectorMode();
      } else if (key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (key === 'c' || key === '.') {
        e.preventDefault();
        if (isCurtainVisible()) {
          dismissPodiumCurtain({ enterPresent: false });
        } else {
          drawPodiumCurtain();
        }
      } else if (key === 'b') {
        e.preventDefault();
        toggleBackgroundMusic();
      } else if (key === 'n') {
        e.preventDefault();
        applyPresenterTipAction({ type: 'click-toggle', slide: currentSlideNum });
      } else if (key === 'l') {
        e.preventDefault();
        openLecternScriptDialog(currentSlideNum);
      } else if (key === 'd') {
        e.preventDefault();
        openEmbeddedDauchySection({ tab: 'manuscript' });
      } else if (key === 'r') {
        e.preventDefault();
        openPhoneRemoteDialog();
      } else if (key === 'v') {
        e.preventDefault();
        toggleVoiceNavigation();
      } else if (key === 't') {
        e.preventDefault();
        toggleAutoPace();
      } else if (key === 'm' && !window.__meridian3DApi) {
        e.preventDefault();
        openMeridian3DLazy('overview');
      }
    }
  });

  let scrollRafPending = false;
  function flushScrollState() {
    scrollRafPending = false;
    const scrollY = window.scrollY;
    if (progressBar) {
      const ratio = Math.min(1, Math.max(0, scrollY / cachedMaxScroll));
      progressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }

    if (isProgrammaticGsapScroll || Date.now() < suppressScrollEmitUntil) {
      return;
    }

    if (!cachedSlideMetrics.length) {
      refreshLayoutMetrics();
    }

    const viewportFocusDocY = scrollY + window.innerHeight * 0.45;
    let bestNum = currentSlideNum;
    let bestDist = Infinity;

    for (let i = 0; i < cachedSlideMetrics.length; i++) {
      const item = cachedSlideMetrics[i];
      const dist = Math.abs(item.center - viewportFocusDocY);
      if (dist < bestDist) {
        bestDist = dist;
        bestNum = item.num;
      }
    }

    if (bestNum !== currentSlideNum) {
      updateActiveSlideUI(bestNum, { fromRemoteSync: false });
    }
  }

  function onScroll() {
    if (scrollRafPending) return;
    scrollRafPending = true;
    requestAnimationFrame(flushScrollState);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateActiveSlideUI(1, { fromRemoteSync: true });
  flushScrollState();

  // Interrupt programmatic GSAP scroll cleanly if user manually scrolls with mousewheel or touch
  const cancelProgrammaticScrollOnUserGesture = () => {
    if (isProgrammaticGsapScroll && activeSlideTimeline) {
      if (activeTransitionProbe) {
        activeTransitionProbe.complete({ interrupted: true });
        activeTransitionProbe = null;
      }
      activeSlideTimeline.kill();
      activeSlideTimeline = null;
      isProgrammaticGsapScroll = false;
      suppressScrollEmitUntil = 0;
      clearAllSlideGsapProps();
    }
  };
  window.addEventListener('wheel', cancelProgrammaticScrollOnUserGesture, { passive: true });
  window.addEventListener('touchmove', cancelProgrammaticScrollOnUserGesture, { passive: true });
  window.addEventListener('beforeprint', () => {
    if (activeSlideTimeline) {
      activeSlideTimeline.kill();
      activeSlideTimeline = null;
    }
    isProgrammaticGsapScroll = false;
    clearAllSlideGsapProps();
  });

  // =========================================================================
  // 10. Clean Audience Mode / Fullscreen Presentation
  // =========================================================================
  const presentBtn = $('#present-button');
  const presentLabel = $('#present-label');
  const exitPresentBtn = $('#exit-present-btn');

  function setPresentingState(active) {
    document.body.classList.toggle('is-presenting', active);
    if (presentLabel) {
      presentLabel.textContent = active ? 'Exit' : 'Present';
    }
    if (exitPresentBtn) {
      exitPresentBtn.hidden = !active;
    }
    if (active) {
      closePrepPopover();
    }
    syncHeaderOffset();
  }

  function exitFullscreenPresentation() {
    if (document.fullscreenElement) {
      document.exitFullscreen?.().catch(() => {});
    }
    setPresentingState(false);
  }

  function toggleFullscreen() {
    const isCurrentlyPresenting =
      Boolean(document.fullscreenElement) || document.body.classList.contains('is-presenting');
    if (!isCurrentlyPresenting) {
      setPresentingState(true);
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      exitFullscreenPresentation();
    }
  }

  presentBtn?.addEventListener('click', toggleFullscreen);
  exitPresentBtn?.addEventListener('click', exitFullscreenPresentation);
  document.addEventListener('fullscreenchange', () => {
    setPresentingState(Boolean(document.fullscreenElement));
  });

  // =========================================================================
  // 11. Print Handout / PDF Button
  // =========================================================================
  const printBtn = $('#print-button');
  const footerPrintBtn = $('#footer-print-btn');
  const handlePrint = () => {
    document.body.classList.remove('is-printing-script');
    if (printLecternContainer) {
      printLecternContainer.hidden = true;
      printLecternContainer.setAttribute('aria-hidden', 'true');
    }
    window.print();
  };
  printBtn?.addEventListener('click', handlePrint);
  footerPrintBtn?.addEventListener('click', handlePrint);

  // =========================================================================
  // 12. Inline Text Editing & LocalStorage Revision Support
  // =========================================================================
  const editBtn = $('#edit-toggle');
  const editLabel = $('#edit-toggle-label');
  const resetBtn = $('#reset-edits');
  const editableEls = $$('[data-editable]');

  const STORAGE_KEY = 'montesquieu-lectern-aligned-v3';
  const LEGACY_KEYS = [
    'whose-liberty-dauchy-response-v2',
    'whose-liberty-unified-edits-v1',
    'three-powers-edits-v1',
    'whose-liberty-edits-v2',
    'whose-liberty-edits-v1',
    'whose-liberty-revisions-v1'
  ];

  const defaultTexts = {};
  editableEls.forEach((el) => {
    defaultTexts[el.dataset.editable] = el.innerHTML;
  });

  function collectAllLocalEditsBundle() {
    const bundle = {
      exportedAt: new Date().toISOString(),
      presentationTitle: 'Whose liberty? Montesquieu in Brazil',
      currentEdits: {},
      preservedLegacyStorage: {}
    };
    editableEls.forEach((el) => {
      const key = el.dataset.editable;
      if (el.innerHTML !== defaultTexts[key]) {
        bundle.currentEdits[key] = el.innerHTML;
      }
    });
    try {
      LEGACY_KEYS.forEach((k) => {
        const raw = localStorage.getItem(k);
        if (raw) {
          try {
            bundle.preservedLegacyStorage[k] = JSON.parse(raw);
          } catch {
            bundle.preservedLegacyStorage[k] = raw;
          }
        }
      });
    } catch (e) {}
    return bundle;
  }

  function downloadEditsJsonBundle(filenamePrefix = 'whose-liberty-slides-backup') {
    const payload = collectAllLocalEditsBundle();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filenamePrefix}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadSavedEdits() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      let hasCustom = false;
      editableEls.forEach((el) => {
        const key = el.dataset.editable;
        if (saved[key] && saved[key] !== defaultTexts[key]) {
          el.innerHTML = saved[key];
          hasCustom = true;
        }
      });
      if (resetBtn) resetBtn.hidden = !hasCustom;
    } catch (e) {}
  }

  function saveEdits() {
    try {
      const current = {};
      let hasCustom = false;
      editableEls.forEach((el) => {
        const key = el.dataset.editable;
        if (el.innerHTML !== defaultTexts[key]) {
          current[key] = el.innerHTML;
          hasCustom = true;
        }
      });
      if (hasCustom) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
      if (resetBtn) resetBtn.hidden = !hasCustom;
      window.dispatchEvent(
        new CustomEvent('dauchy:edits-changed', {
          detail: { edits: current, hasCustom }
        })
      );
    } catch (e) {}
  }

  const deckBridge = {
    getCurrentSlide() {
      return currentSlideNum;
    },
    getCurrentCallout() {
      return getCurrentCallout();
    },
    goToSlide(num, opts = {}) {
      goToSlide(num, opts);
    },
    applySlideCallout(slideNum, calloutId, opts = {}) {
      applySlideCallout(slideNum, calloutId, opts);
    },
    syncHeaderOffset() {
      return syncHeaderOffset();
    },
    getCurrentEdits() {
      const current = {};
      editableEls.forEach((el) => {
        const key = el.dataset.editable;
        if (el.innerHTML !== defaultTexts[key]) {
          current[key] = el.innerHTML;
        }
      });
      return current;
    },
    getEditsMap() {
      return this.getCurrentEdits();
    },
    applyEditsMap(editsMap = {}) {
      editableEls.forEach((el) => {
        const key = el.dataset.editable;
        if (Object.prototype.hasOwnProperty.call(editsMap, key)) {
          el.innerHTML = editsMap[key];
        } else {
          el.innerHTML = defaultTexts[key];
        }
      });
      saveEdits();
    },
    exportAllBundle: downloadEditsJsonBundle
  };

  window.dauchyDeckBridge = deckBridge;
  window.WhoseLibertyDeck = deckBridge;

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    });
  }

  loadSavedEdits();

  let isEditing = false;
  editBtn?.addEventListener('click', () => {
    isEditing = !isEditing;
    document.body.classList.toggle('is-editing', isEditing);
    editBtn.setAttribute('aria-pressed', String(isEditing));
    if (editLabel) editLabel.textContent = isEditing ? 'Done Editing' : 'Edit Text';

    editableEls.forEach((el) => {
      if (isEditing) {
        el.setAttribute('contenteditable', 'true');
        el.setAttribute('spellcheck', 'true');
      } else {
        el.removeAttribute('contenteditable');
      }
    });

    if (!isEditing) saveEdits();
    closePrepPopover();
  });

  editableEls.forEach((el) => {
    el.addEventListener('blur', saveEdits);
  });

  resetBtn?.addEventListener('click', () => {
    editableEls.forEach((el) => {
      el.innerHTML = defaultTexts[el.dataset.editable];
    });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    resetBtn.hidden = true;
    saveEdits();
  });

  // =========================================================================
  // 13. Backstage Rehearsal Timer (10 / 12 / 15 min)
  // =========================================================================
  const timerBox = $('#pacing-timer');
  const timerPresetBtn = $('#timer-preset-btn');
  const timerToggleBtn = $('#timer-toggle-btn');
  const timerResetBtn = $('#timer-reset-btn');

  if (timerBox && timerPresetBtn && timerToggleBtn && timerResetBtn) {
    const PRESETS_MINUTES = [10, 12, 15];
    let presetIndex = 0;
    let totalSeconds = PRESETS_MINUTES[presetIndex] * 60;
    let remainingSeconds = totalSeconds;
    let timerInterval = null;
    let isRunning = false;

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = sec % 60;
      return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function updateTimerUI() {
      timerPresetBtn.textContent = formatTime(remainingSeconds);
      timerToggleBtn.textContent = isRunning ? 'Pause' : 'Start';
      timerToggleBtn.setAttribute('aria-pressed', String(isRunning));
      timerPresetBtn.disabled = isRunning;
      timerResetBtn.hidden = isRunning || remainingSeconds === totalSeconds;

      if (remainingSeconds === 0) {
        timerBox.setAttribute('data-timer-state', 'expired');
      } else if (remainingSeconds <= 120) {
        timerBox.setAttribute('data-timer-state', 'warning');
      } else if (isRunning) {
        timerBox.setAttribute('data-timer-state', 'running');
      } else {
        timerBox.removeAttribute('data-timer-state');
      }
    }

    function stopTimer() {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
      }
      isRunning = false;
      updateTimerUI();
    }

    function startTimer() {
      if (remainingSeconds <= 0) {
        remainingSeconds = totalSeconds;
      }
      isRunning = true;
      updateTimerUI();
      timerInterval = setInterval(() => {
        if (remainingSeconds > 0) {
          remainingSeconds -= 1;
          updateTimerUI();
        } else {
          stopTimer();
        }
      }, 1000);
    }

    function toggleTimer() {
      if (isRunning) stopTimer();
      else startTimer();
    }

    timerToggleBtn.addEventListener('click', toggleTimer);

    timerPresetBtn.addEventListener('click', () => {
      if (isRunning) return;
      presetIndex = (presetIndex + 1) % PRESETS_MINUTES.length;
      totalSeconds = PRESETS_MINUTES[presetIndex] * 60;
      remainingSeconds = totalSeconds;
      updateTimerUI();
    });

    timerResetBtn.addEventListener('click', () => {
      stopTimer();
      remainingSeconds = totalSeconds;
      updateTimerUI();
    });

    updateTimerUI();
  }

  // =========================================================================
  // 14. Standing Presenter Suite: Phone Remote, Voice Control & Auto-Pace
  // =========================================================================

  // A. Stage Action Dispatcher for Remote & Voice triggers
  function handleRemoteAction(action) {
    if (!action) return;
    if (action === 'pause-5s') {
      if (currentSlideNum !== 5) goToSlide(5);
      startVisualPause(5);
    } else if (action === 'toggle-powers') {
      if (currentSlideNum !== 4) goToSlide(4);
      const isFour = activeSlideCallouts[4] === 'four-powers';
      applySlideCallout(4, isFour ? 'three-powers' : 'four-powers');
    } else if (action === 'toggle-sword') {
      if (currentSlideNum !== 6) goToSlide(6);
      const isSword = activeSlideCallouts[6] === 'sword-detail';
      applySlideCallout(6, isSword ? 'whole' : 'sword-detail');
    } else if (action === 'toggle-tip') {
      applyPresenterTipAction({ type: 'click-toggle', slide: currentSlideNum });
    } else if (action === 'toggle-music') {
      toggleBackgroundMusic();
    } else if (action === 'toggle-curtain') {
      if (isCurtainVisible()) {
        dismissPodiumCurtain({ enterPresent: false });
      } else {
        drawPodiumCurtain();
      }
    }
  }

  // B. Smartphone Remote Pairing Dialog & Inline QR Code
  const phoneRemoteDialog = $('#phone-remote-dialog');
  const phoneRemoteCloseBtn = $('#phone-remote-dialog-close');
  const phoneRemoteDismissBtn = $('#phone-remote-dismiss-btn');
  const phoneRemoteCopyBtn = $('#phone-remote-copy-btn');
  const phoneRemoteLaunchBtn = $('#phone-remote-launch-btn');
  const phoneRemoteUrlInput = $('#phone-remote-url-input');
  const phoneRemoteQrWrap = $('#phone-remote-qr-wrap');

  const headerPhoneRemoteBtn = $('#header-phone-remote-btn');
  const prepPhoneRemoteBtn = $('#prep-remote-btn');

  function openPhoneRemoteDialog() {
    const sessionCode = window.getActiveSyncSessionCode?.() || DEFAULT_SESSION_CODE;
    const remoteUrl = buildRemoteShareUrl(window.location.href, sessionCode);

    if (phoneRemoteUrlInput) phoneRemoteUrlInput.value = remoteUrl;
    if (phoneRemoteQrWrap) {
      phoneRemoteQrWrap.innerHTML = generateQrSvg(remoteUrl, { sizePx: 210 });
    }

    phoneRemoteDialog?.showModal();
    closePrepPopover();
  }

  headerPhoneRemoteBtn?.addEventListener('click', openPhoneRemoteDialog);
  prepPhoneRemoteBtn?.addEventListener('click', openPhoneRemoteDialog);
  phoneRemoteCloseBtn?.addEventListener('click', () => phoneRemoteDialog?.close());
  phoneRemoteDismissBtn?.addEventListener('click', () => phoneRemoteDialog?.close());

  phoneRemoteCopyBtn?.addEventListener('click', async () => {
    if (!phoneRemoteUrlInput) return;
    try {
      await navigator.clipboard.writeText(phoneRemoteUrlInput.value);
      phoneRemoteCopyBtn.textContent = 'Copied! ✓';
      setTimeout(() => {
        if (phoneRemoteCopyBtn) phoneRemoteCopyBtn.textContent = 'Copy Link';
      }, 2000);
    } catch (e) {
      phoneRemoteUrlInput.select();
    }
  });

  phoneRemoteLaunchBtn?.addEventListener('click', () => {
    if (!phoneRemoteUrlInput) return;
    phoneRemoteDialog?.close();
    window.location.href = phoneRemoteUrlInput.value;
  });

  // C. Hands-Free Voice Controller (Web Speech API)
  const headerVoiceBtn = $('#header-voice-btn');
  const prepVoiceBtn = $('#prep-voice-btn');
  const prepVoiceLabel = $('#prep-voice-label');

  const voiceController = new VoiceController({
    onNavigateSlide: (val, mode) => {
      if (mode === 'delta') {
        goToSlide(currentSlideNum + val);
      } else {
        goToSlide(val);
      }
    },
    onToggleTip: () => applyPresenterTipAction({ type: 'click-toggle', slide: currentSlideNum }),
    onTogglePause: () => {
      if (currentSlideNum !== 5) goToSlide(5);
      startVisualPause(5);
    },
    onToggleMusic: () => toggleBackgroundMusic(),
    onTogglePowers: () => {
      if (currentSlideNum !== 4) goToSlide(4);
      const isFour = activeSlideCallouts[4] === 'four-powers';
      applySlideCallout(4, isFour ? 'three-powers' : 'four-powers');
    },
    onToggleSword: () => {
      if (currentSlideNum !== 6) goToSlide(6);
      const isSword = activeSlideCallouts[6] === 'sword-detail';
      applySlideCallout(6, isSword ? 'whole' : 'sword-detail');
    },
    onOpenScript: () => openLecternScriptDialog(currentSlideNum),
    onToggleCurtain: () => {
      if (isCurtainVisible()) {
        dismissPodiumCurtain({ enterPresent: false });
      } else {
        drawPodiumCurtain();
      }
    },
    onStatusChange: ({ active }) => {
      if (headerVoiceBtn) {
        headerVoiceBtn.setAttribute('aria-pressed', String(active));
        headerVoiceBtn.classList.toggle('is-listening', Boolean(active));
        const lbl = $('#header-voice-label', headerVoiceBtn);
        if (lbl) lbl.textContent = active ? '🎙️ Listening' : '🎙️ Voice';
      }
      if (prepVoiceBtn) {
        prepVoiceBtn.setAttribute('aria-pressed', String(active));
        if (prepVoiceLabel) {
          prepVoiceLabel.textContent = active ? '🎙️ Voice: ON (V)' : '🎙️ Voice: OFF (V)';
        }
      }
    }
  });

  function toggleVoiceNavigation() {
    voiceController.toggle();
  }

  headerVoiceBtn?.addEventListener('click', toggleVoiceNavigation);
  prepVoiceBtn?.addEventListener('click', toggleVoiceNavigation);

  // D. Lectern-Script Synchronized Auto-Paced Rehearsal & Delivery Mode (50s, 75s, 90s, 70s, 90s, 125s, 70s = 9m30s)
  const SLIDE_DURATIONS_SEC = Object.fromEntries(
    PRINCIPAL_SLIDES.map((s) => [s.number, Number(s.durationSeconds) || 85])
  );
  let autoPaceActive = false;
  let autoPaceElapsedOnSlide = 0;
  let autoPaceInterval = null;
  const autoPaceBar = $('#auto-pace-bar');
  const prepAutoPaceBtn = $('#prep-auto-pace-btn');
  const prepAutoPaceLabel = $('#prep-auto-pace-label');

  function updateAutoPaceProgress() {
    if (!autoPaceActive || !autoPaceBar) return;
    const dur = SLIDE_DURATIONS_SEC[currentSlideNum] || 85;
    const pct = Math.min(100, (autoPaceElapsedOnSlide / dur) * 100);
    autoPaceBar.style.width = `${pct}%`;

    if (autoPaceElapsedOnSlide >= dur) {
      if (currentSlideNum < TOTAL_SLIDES) {
        goToSlide(currentSlideNum + 1);
        autoPaceElapsedOnSlide = 0;
      } else {
        stopAutoPace();
      }
    }
  }

  function startAutoPace() {
    autoPaceActive = true;
    autoPaceElapsedOnSlide = 0;
    if (autoPaceBar) {
      autoPaceBar.hidden = false;
      autoPaceBar.classList.remove('is-paused');
      autoPaceBar.style.width = '0%';
    }
    if (prepAutoPaceBtn) prepAutoPaceBtn.setAttribute('aria-pressed', 'true');
    if (prepAutoPaceLabel) prepAutoPaceLabel.textContent = '⏱️ Auto-Pace: ON (T)';

    clearInterval(autoPaceInterval);
    autoPaceInterval = setInterval(() => {
      autoPaceElapsedOnSlide += 0.5;
      updateAutoPaceProgress();
    }, 500);
  }

  function stopAutoPace() {
    autoPaceActive = false;
    clearInterval(autoPaceInterval);
    if (autoPaceBar) {
      autoPaceBar.style.width = '0%';
      autoPaceBar.hidden = true;
    }
    if (prepAutoPaceBtn) prepAutoPaceBtn.setAttribute('aria-pressed', 'false');
    if (prepAutoPaceLabel) prepAutoPaceLabel.textContent = '⏱️ Auto-Pace: OFF (T)';
  }

  function toggleAutoPace() {
    if (autoPaceActive) stopAutoPace();
    else startAutoPace();
  }

  prepAutoPaceBtn?.addEventListener('click', toggleAutoPace);

  // E. Listen to incoming commands from Smartphone Remote or Firebase/SSE
  window.addEventListener('remote-slide-command', (e) => {
    if (e.detail) {
      if (Number.isInteger(e.detail.currentSlide)) {
        goToSlide(e.detail.currentSlide, { smooth: true, fromRemoteSync: true });
      }
      if (e.detail.activeCallout) {
        handleRemoteAction(e.detail.activeCallout);
      }
    }
  });

  // F. Mount Dedicated Smartphone Remote when opened with ?role=remote
  const remoteParams = parseRemoteParamsFromSearch(window.location.search);
  if (remoteParams.isRemote) {
    document.body.classList.add('is-phone-remote');
    const remoteRoot = $('#mobile-remote-root');
    if (remoteRoot) {
      const remote = new RemoteController({
        sessionCode: remoteParams.sessionCode,
        onSlideChange: (num) => {
          goToSlide(num, { smooth: false });
        },
        onCalloutTrigger: (action) => {
          handleRemoteAction(action);
        }
      });
      remote.mount(remoteRoot);
    }
  }

  window.openPhoneRemoteDialog = openPhoneRemoteDialog;
  window.openLecternScriptDialog = openLecternScriptDialog;
  window.printLecternScript = printLecternScript;
  window.toggleVoiceNavigation = toggleVoiceNavigation;
  window.toggleAutoPace = toggleAutoPace;
})();
