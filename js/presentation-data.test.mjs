import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PRESENTATION_META,
  PRINCIPAL_SLIDES,
  VERIFIED_SOURCES,
  DAUCHY_MANUSCRIPT_META,
  DAUCHY_MANUSCRIPT_PARAGRAPHS,
  MATCHING_SCRIPT_FINAL,
  DEEP_RESEARCH_DOSSIER,
  getSlideByNumber,
  getDauchyParagraphByNumber,
  filterDauchyParagraphs,
  getMatchingScriptFinalPages,
  getDeepResearchDossierSections,
  getLecternScriptPages,
  getConstellationCoordinates,
  clampMusicVolume,
  formatMusicStatusLabel,
  shouldBypassOpeningPoster,
  getPresenterTipForSlide,
  resolvePresenterTipState,
  computeSlideTransitionSpec
} from './presentation-data.mjs';

test('PRESENTATION_META matches official PPGD-UFSC poster, France-Brazil artwork, Chopin Nocturne, and Montesquieu Lectern Script', () => {
  assert.equal(PRESENTATION_META.title, 'Montesquieu and the three powers');
  assert.equal(
    PRESENTATION_META.subtitle,
    'Political liberty, legal images, and institutional autonomy in Brazil'
  );
  assert.equal(PRESENTATION_META.presenter, 'Ana Vitória Vanzin Mendes · Discussant');
  assert.equal(PRESENTATION_META.keynoteSpeaker, 'Serge Dauchy (CNRS/Université de Lille)');
  assert.deepEqual(PRESENTATION_META.discussants, [
    'Marja Mangili (UniCesusc)',
    'Ana Vitória Vanzin Mendes (UFSC)'
  ]);
  assert.equal(PRESENTATION_META.eventDateTime, '11 de novembro de 2026 · 15h10');
  assert.ok(PRESENTATION_META.eventPosterUrl.endsWith('.png'));
  assert.ok(PRESENTATION_META.flagsMixUrl.endsWith('.png'));
  assert.ok(PRESENTATION_META.backgroundMusic.src.endsWith('.mp3'));
  assert.equal(PRESENTATION_META.backgroundMusic.defaultVolume, 0.12);
  assert.equal(PRESENTATION_META.backgroundMusic.maxVolume, 0.35);
  assert.equal(PRESENTATION_META.targetDurationMinutes, 10);
  assert.equal(PRESENTATION_META.presenterTipsShortcut, 'N');
  assert.equal(PRESENTATION_META.lecternScriptShortcut, 'L');
  assert.equal(PRESENTATION_META.dauchyPaperShortcut, 'D');
});

test('Background music helpers enforce gentle low-volume cap and clear status labels', () => {
  assert.equal(clampMusicVolume(undefined), 0.12);
  assert.equal(clampMusicVolume('invalid'), 0.12);
  assert.equal(clampMusicVolume(-0.5), 0);
  assert.equal(clampMusicVolume(0.08), 0.08);
  assert.equal(clampMusicVolume(0.95), 0.35);

  const playingLabel = formatMusicStatusLabel({ playing: true, muted: false, volume: 0.12 });
  assert.equal(playingLabel.shortLabel, 'Nocturne · 12%');
  assert.equal(playingLabel.percent, 12);

  const mutedLabel = formatMusicStatusLabel({ playing: true, muted: true, volume: 0.12 });
  assert.equal(mutedLabel.shortLabel, 'Piano · Muted');
  assert.equal(mutedLabel.percent, 0);

  const standbyLabel = formatMusicStatusLabel({ playing: false, muted: false, volume: 0.12 });
  assert.equal(standbyLabel.shortLabel, 'Play Nocturne · 12%');
});

test('shouldBypassOpeningPoster honors ?autostart=1, ?script=1, ?dauchy=1, ?sync=, and #slide-N / #lectern-script / #dauchy-paper deep links', () => {
  assert.equal(shouldBypassOpeningPoster('', ''), false);
  assert.equal(shouldBypassOpeningPoster('?autostart=1', ''), true);
  assert.equal(shouldBypassOpeningPoster('?foo=bar&autostart=1', ''), true);
  assert.equal(shouldBypassOpeningPoster('?script=1', ''), true);
  assert.equal(shouldBypassOpeningPoster('?dauchy=1', ''), true);
  assert.equal(shouldBypassOpeningPoster('?sync=UFSC-2026', ''), true);
  assert.equal(shouldBypassOpeningPoster('', '#slide-5'), true);
  assert.equal(shouldBypassOpeningPoster('', '#sources'), true);
  assert.equal(shouldBypassOpeningPoster('', '#lectern-script'), true);
  assert.equal(shouldBypassOpeningPoster('', '#dauchy-paper'), true);
  assert.equal(shouldBypassOpeningPoster('', '#dauchy-para-7'), true);
  assert.equal(shouldBypassOpeningPoster('', '#unknown'), false);
});

test('PRINCIPAL_SLIDES matches the 7-slide Montesquieu Lectern Script sequence and preserves both Slide 7 questions', () => {
  assert.equal(PRINCIPAL_SLIDES.length, 7);
  assert.deepEqual(
    PRINCIPAL_SLIDES.map((s) => s.number),
    [1, 2, 3, 4, 5, 6, 7]
  );

  const serialized = JSON.stringify(PRINCIPAL_SLIDES);
  assert.equal(/married women/i.test(serialized), false);

  const s1 = getSlideByNumber(1);
  assert.equal(s1.title, 'Montesquieu and the three powers');
  assert.equal(
    s1.subtitle,
    'Political liberty, legal images, and institutional autonomy in Brazil'
  );
  assert.equal(s1.presenter, 'Ana Vitória Vanzin Mendes · Discussant');

  const s2 = getSlideByNumber(2);
  assert.equal(s2.title, 'Who was Montesquieu');
  assert.equal(s2.elements.length, 3);
  assert.match(s2.elements[0].label, /Parlement of Bordeaux/);

  const s3 = getSlideByNumber(3);
  assert.equal(s3.title, 'Three powers, limits on power');
  assert.deepEqual(
    s3.functions.map((fn) => fn.id),
    ['legislative', 'executive', 'judicial']
  );

  const s4 = getSlideByNumber(4);
  assert.equal(s4.title, 'Montesquieu in Brazil, 1824');
  assert.deepEqual(s4.powersComparison.fourPowers, [
    'Legislative',
    'Moderating',
    'Executive',
    'Judicial'
  ]);

  const s5 = getSlideByNumber(5);
  assert.equal(s5.title, 'Representing distinct and related institutions');
  assert.equal(s5.artwork.artist, 'Aurélio de Figueiredo');
  assert.equal(s5.artwork.paintingDate, '1896');
  assert.equal(s5.artwork.eventDate, '26 February 1891');
  assert.match(s5.artwork.credit, /Romulo Fialdini/);
  assert.equal(s5.hasVisualPause, true);

  const s6 = getSlideByNumber(6);
  assert.equal(s6.title, 'Ceschiatti’s Justice: the sword and autonomy');
  assert.equal(s6.artwork.artist, 'Alfredo Ceschiatti');
  assert.equal(s6.artwork.date, '1961');
  assert.match(s6.artwork.credit, /Fellipe Sampaio \/ STF/);

  const s7 = getSlideByNumber(7);
  assert.equal(s7.title, 'Questions for Serge');
  assert.equal(s7.questions.length, 2);
  assert.match(
    s7.questions[0].text,
    /Montesquieu’s insistence that laws belong to a particular society/
  );
  assert.match(s7.questions[1].text, /read mainly through the separation of powers/);
});

test('getLecternScriptPages returns all 7 verbatim lectern pages with bold lead-ins, silent cues, and both closing questions', () => {
  const pages = getLecternScriptPages();
  assert.equal(pages.length, 7);
  assert.deepEqual(
    pages.map((p) => p.page),
    [1, 2, 3, 4, 5, 6, 7]
  );

  for (const page of pages) {
    assert.ok(page.heading.startsWith(`Slide ${page.slideNumber}`));
    assert.ok(page.elapsedRange.includes('–'));
    assert.ok(page.paragraphs.length >= 3);
    assert.ok(page.stageCue.startsWith('[') && page.stageCue.endsWith(']'));
    for (const para of page.paragraphs) {
      assert.ok(para.leadIn.length > 0);
    }
  }

  const page1 = pages[0];
  assert.equal(page1.stageLabel, 'Stage 1: the author and his problem');
  assert.match(page1.instruction, /Bracketed cues are silent/);

  const page5 = pages[4];
  assert.match(page5.stageCue, /Give the audience a moment to look/);

  const page7 = pages[6];
  const fullPage7Text = page7.paragraphs.map((p) => `${p.leadIn} ${p.rest}`).join(' ');
  assert.match(fullPage7Text, /boundaries are constantly being renegotiated/);
  assert.match(fullPage7Text, /read mainly through the separation of powers/);
});

test('Every slide has context-sensitive Presenter Tip cues and deterministic hover/pin state transitions', () => {
  for (const slide of PRINCIPAL_SLIDES) {
    const tip = getPresenterTipForSlide(slide.number);
    assert.equal(tip.slideNumber, slide.number);
    assert.ok(tip.heading.length > 0);
    assert.equal(tip.cues.length, 3, `Slide ${slide.number} should have 3 concise podium cues`);
    for (const cue of tip.cues) {
      assert.ok(cue.label.length > 0);
      assert.ok(cue.text.length > 15);
    }

    const coords = getConstellationCoordinates(slide.number);
    assert.equal(typeof coords.mode, 'string');
    assert.ok(coords.caption.length > 0);
    for (const key of ['leg', 'exec', 'jud', 'dom']) {
      assert.ok(Array.isArray(coords[key]), `${key} must be an [x, y] array`);
      assert.equal(coords[key].length, 2);
      assert.ok(Number.isFinite(coords[key][0]) && Number.isFinite(coords[key][1]));
    }
  }

  const tip2 = getPresenterTipForSlide(2);
  assert.match(tip2.guardrail, /Parlement of Bordeaux/);

  const tip3 = getPresenterTipForSlide(3);
  assert.match(tip3.guardrail, /permanent constitutional courts/);

  const tip4 = getPresenterTipForSlide(4);
  assert.match(tip4.guardrail, /invented by Montesquieu/);

  const tip5 = getPresenterTipForSlide(5);
  assert.equal(tip5.pauseActionSlide, 5);
  assert.ok(tip5.cues.some((c) => c.isPauseCue));
  assert.match(tip5.guardrail, /interpretation of the image/);

  const tip6 = getPresenterTipForSlide(6);
  assert.match(tip6.guardrail, /Rafael Simioni/);

  let state = resolvePresenterTipState(undefined, { type: 'hover-enter', slide: 1 });
  assert.deepEqual(state, { activeSlide: 1, mode: 'hover' });

  state = resolvePresenterTipState(state, { type: 'click-toggle', slide: 1 });
  assert.deepEqual(state, { activeSlide: 1, mode: 'pinned' });

  state = resolvePresenterTipState(state, { type: 'hover-leave', slide: 1 });
  assert.deepEqual(state, { activeSlide: 1, mode: 'pinned' });

  state = resolvePresenterTipState(state, { type: 'click-toggle', slide: 1 });
  assert.deepEqual(state, { activeSlide: null, mode: 'closed' });
});

test('VERIFIED_SOURCES covers Serge Dauchy paper, Montesquieu, 1824 & 1891 Constitutions, artworks, and Simioni', () => {
  assert.equal(VERIFIED_SOURCES.length, 6);
  const codes = VERIFIED_SOURCES.map((s) => s.code);
  assert.deepEqual(codes, ['S1', 'S2', 'S3', 'S4', 'S5', 'S6']);
});

test('Embedded Serge Dauchy 14-paragraph manuscript (¶1–14), Matching Script Final PDF, and Deep Research Dossier are complete and searchable', () => {
  assert.equal(DAUCHY_MANUSCRIPT_META.totalParagraphs, 14);
  assert.equal(DAUCHY_MANUSCRIPT_PARAGRAPHS.length, 14);
  assert.deepEqual(
    DAUCHY_MANUSCRIPT_PARAGRAPHS.map((p) => p.number),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  );

  const p6 = getDauchyParagraphByNumber(6);
  assert.equal(p6.ref, '¶6');
  assert.match(p6.frenchText, /Cipriano Barata/);
  assert.match(p6.frenchText, /Benjamin Constant/);

  const p7 = getDauchyParagraphByNumber(7);
  assert.equal(p7.ref, '¶7');
  assert.match(p7.frenchText, /Enfermer Montesquieu dans une vision purement « constitutionnaliste »/);
  assert.match(p7.frenchText, /système de liberté/);

  const p14 = getDauchyParagraphByNumber(14);
  assert.equal(p14.ref, '¶14');
  assert.match(p14.frenchText, /Clóvis Beviláqua/);

  const transplantsOnly = filterDauchyParagraphs({ theme: 'transplants' });
  assert.equal(transplantsOnly.length, 4);
  assert.deepEqual(
    transplantsOnly.map((p) => p.number),
    [11, 12, 13, 14]
  );

  const searchBevil = filterDauchyParagraphs({ query: 'Beviláqua' });
  assert.ok(searchBevil.some((p) => p.number === 14));

  const matchingPages = getMatchingScriptFinalPages();
  assert.equal(matchingPages.length, 7);
  assert.equal(
    MATCHING_SCRIPT_FINAL.pdfUrl,
    './public/assets/aistudio/Montesquieu_Matching_Script_Final_5fe68ce6.pdf'
  );
  assert.equal(matchingPages[0].header, '1 / 7 · Discussing Dauchy’s Montesquieu');
  assert.equal(matchingPages[5].header, '6 / 7 · Article 6 and the Civil Code of 1916');
  assert.equal(matchingPages[6].header, '7 / 7 · Two questions for Serge Dauchy');

  const dossier = getDeepResearchDossierSections();
  assert.equal(
    DEEP_RESEARCH_DOSSIER.sourceUrl,
    './public/assets/aistudio/Paste_November_11__2026_-_2_49PM_c357fc36'
  );
  assert.equal(dossier.archivalReceptionTable.length, 3);
  assert.equal(dossier.sections.length, 5);
});

test('computeSlideTransitionSpec returns directional GSAP cross-fade & slide-in parameters and honors reduced motion', () => {
  const forward = computeSlideTransitionSpec(1, 2);
  assert.equal(forward.animate, true);
  assert.equal(forward.direction, 1);
  assert.equal(forward.distance, 1);
  assert.ok(forward.enterY > 0);
  assert.ok(forward.exitY < 0);
  assert.ok(forward.enterOpacity > 0 && forward.enterOpacity < 1);
  assert.ok(forward.scrollDuration > 0);

  const backward = computeSlideTransitionSpec(5, 4);
  assert.equal(backward.animate, true);
  assert.equal(backward.direction, -1);
  assert.ok(backward.enterY < 0);
  assert.ok(backward.exitY > 0);

  const multiJump = computeSlideTransitionSpec(1, 6);
  assert.equal(multiJump.animate, true);
  assert.equal(multiJump.distance, 5);
  assert.ok(multiJump.scrollDuration >= forward.scrollDuration);

  const sameSlide = computeSlideTransitionSpec(3, 3);
  assert.equal(sameSlide.animate, false);
  assert.equal(sameSlide.scrollDuration, 0);

  const reduced = computeSlideTransitionSpec(2, 3, { reducedMotion: true });
  assert.equal(reduced.animate, false);
  assert.equal(reduced.enterY, 0);
  assert.equal(reduced.enterOpacity, 1);
});
