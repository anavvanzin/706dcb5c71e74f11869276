/**
 * Parallel Legal Circulation Timeline Data & Pure Lookup Logic (v3)
 * Maps Serge Dauchy’s 14-paragraph manuscript (¶6–14) and Montesquieu’s De l’esprit des lois (1777 text)
 * across Slides 02–06 of Ana Vitória Vanzin Mendes’s discussant intervention.
 */

export const LEGAL_CIRCULATION_TIMELINE = [
  {
    id: 'milestone-bordeaux-spirit',
    periodLabel: '1689–1755 · ¶1–4, ¶7–10',
    theme: 'circulation',
    slideId: 'slide-2',
    sourceAnchor: '#src-montesquieu',
    sourceCode: 'S1 · S2',
    french: {
      year: '1716 / 1748 · XIX.4',
      institution: 'Parlement of Bordeaux & Dauchy ¶1–4, ¶7–10',
      title: 'Magistracy, Esprit Général & Security Under Laws',
      summary:
        '« Enfermer Montesquieu dans une vision purement “constitutionnaliste” serait toutefois réducteur » (Dauchy ¶7); laws interact with climate, religion, maxims, mores, and « manieres » to form an « esprit général » (XIX.4).'
    },
    brazilian: {
      year: 'Discussant Reading',
      institution: 'Civil, Criminal & Judicial Guarantees',
      title: 'Conditions of Political Liberty Beyond a Formula',
      summary:
        'Constitutional provisions must be seconded by civil and criminal laws and an institutional frame « (surtout judiciaire) »; « système de liberté » stays strictly Dauchy’s attribution.'
    },
    citation: {
      heading: 'BORDEAUX MAGISTRACY, LIBERTY & ESPRIT GÉNÉRAL — DAUCHY ¶1–4, ¶7–10 & MONTESQUIEU XIX.4',
      primaryQuote:
        '« Plusieurs choses gouvernent les hommes, le climat, la religion, les lois, les maximes du gouvernement, les exemples des choses passées, les mœurs, les manieres ; d’où il se forme un esprit général qui en résulte. » (XIX.4)',
      bibliographicRef:
        'DAUCHY, Serge, manuscript, ¶1–4, ¶7–10 · MONTESQUIEU, Esprit des lois (1777), Livre XIX, chap. 4 (Wikisource).',
      methodologicalNote:
        'Preserve 1777 spelling « manieres »; keep « système de liberté » as Dauchy’s analytical synthesis rather than a verified Montesquieu quote.',
      externalUrl: 'https://fr.wikisource.org/wiki/Esprit_des_lois_(1777)/L19/C4',
      externalLabel: 'Wikisource · Esprit des lois (1777), XIX.4'
    },
    researchPrompt:
      'Examine Serge Dauchy’s critique of a purely constitutionalist reading of Montesquieu alongside Book XIX, chapter 4 of De l’esprit des lois (1777) on the esprit général.'
  },
  {
    id: 'milestone-book-xi-ch6',
    periodLabel: '1748 · Book XI, ch. 6 · ¶7',
    theme: 'constitutional',
    slideId: 'slide-3',
    sourceAnchor: '#src-montesquieu',
    sourceCode: 'S1 · S2',
    french: {
      year: '1748 · XI.6 & XII.2',
      institution: 'Montesquieu XI.6 & Dauchy ¶7',
      title: 'Three Functions & Preventing Concentrated Power',
      summary:
        'Distinguishes legislative, executive, and judicial functions so no single authority can enact and enforce oppressive laws; judging is « en quelque façon nulle ».'
    },
    brazilian: {
      year: 'Historical Distance',
      institution: '18th-Century Magistracy vs. Modern Courts',
      title: 'Relational Limits on Power, Not Isolated Branches',
      summary:
        'Montesquieu’s account of judging in Book XI, ch. 6 is not a description of today’s permanent constitutional courts.'
    },
    citation: {
      heading: 'THREE POWERS & LIMITS ON POWER — MONTESQUIEU BOOK XI, CHAPTER 6 & DAUCHY ¶7',
      primaryQuote:
        '« Tout seroit perdu, si le même homme, ou le même corps des principaux, ou des nobles, ou du peuple, exerçoient ces trois pouvoirs : celui de faire des lois, celui d’exécuter les résolutions publiques, & celui de juger les crimes ou les différends des particuliers. » (XI.6)',
      bibliographicRef:
        'MONTESQUIEU, De l’esprit des lois (1748; 1777 ed.), Livre XI, chap. 6 · DAUCHY, Serge, manuscript, ¶7.',
      methodologicalNote:
        'Emphasize relational arrangements that prevent concentration of power and mark historical distance from modern permanent constitutional courts.',
      externalUrl: 'https://fr.wikisource.org/wiki/Esprit_des_lois_(1777)/L11/C6',
      externalLabel: 'Wikisource · Esprit des lois (1777), XI.6'
    },
    researchPrompt:
      'Analyze Montesquieu’s Book XI, chapter 6 on the three powers and why his account of the power of judging differs from modern permanent constitutional courts.'
  },
  {
    id: 'milestone-1748-1824',
    periodLabel: '1789–1824 · ¶6',
    theme: 'constitutional',
    slideId: 'slide-4',
    sourceAnchor: '#src-const-1824',
    sourceCode: 'S1 · S3',
    french: {
      year: '1789 · 1798 · 1823 (¶6)',
      institution: 'Dauchy’s Brazilian Circulation Account',
      title: 'Clandestine Reading & Benjamin Constant',
      summary:
        'Dauchy traces circulation via 1789 (Minas Gerais), 1798 (Cipriano Barata’s confiscated library in Bahia), and the 1823 Constituent Assembly debates prior to the 1949 translation.'
    },
    brazilian: {
      year: '1824 · Art. 10',
      institution: 'Constituição Política do Império do Brazil',
      title: 'Legislativo · Moderador · Executivo · Judicial',
      summary:
        'Article 10 enumerates four political powers in exact constitutional order—described by Dauchy (¶6) as « une évolution voire une correction » of Montesquieu’s tripartition.'
    },
    citation: {
      heading: 'BRAZIL, 1824: CIRCULATION & FOUR POWERS — DAUCHY ¶6 & CONSTITUTION OF 1824, ARTICLE 10',
      primaryQuote:
        'Os Poderes Politicos reconhecidos pela Constituição do Imperio do Brazil são quatro: o Poder Legislativo, o Poder Moderador, o Poder Executivo, e o Poder Judicial.',
      bibliographicRef:
        'BRASIL, Constituição Política do Império do Brazil, 25 mar. 1824, art. 10 · DAUCHY, Serge, manuscript, ¶6.',
      methodologicalNote:
        'Show Dauchy’s 1789 / 1798 / 1823 / 1949 chronology explicitly as his account, and distinguish selective monarchical adaptation from an automatic causal chain.',
      externalUrl:
        'https://www2.camara.leg.br/legin/fed/consti/1824-1899/constituicao-35041-25-marco-1824-532540-publicacaooriginal-14770-pl.html',
      externalLabel: 'Câmara dos Deputados · Constituição de 1824'
    },
    researchPrompt:
      'Compare Article 10 of the 1824 Imperial Constitution of Brazil (Legislative, Moderating, Executive, Judicial) with Benjamin Constant’s pouvoir neutre and Montesquieu’s tripartition.'
  },
  {
    id: 'milestone-figueiredo-1896',
    periodLabel: '1891 / 1896 · ¶6–7',
    theme: 'iconography',
    slideId: 'slide-5',
    sourceAnchor: '#src-figueiredo',
    sourceCode: 'S3 · S4',
    french: {
      year: 'Constitutional Obligation',
      institution: 'Dauchy ¶6–7 & Republican Form',
      title: 'Staging Harmonious & Bound Offices',
      summary:
        'Tests how ceremonial painting represents the bond between executive power, constitutional text, and legislative assembly.'
    },
    brazilian: {
      year: '1891 Oath / 1896 Canvas',
      institution: 'Museu da República · Const. 1891 Arts. 15 & 44',
      title: 'Aurélio de Figueiredo, Compromisso Constitucional (1896)',
      summary:
        'Oil on canvas, 330 × 257 cm: Deodoro da Fonseca’s oath of 26 Feb. 1891 with Prudente de Moraes presiding at the centre (reproduction: Romulo Fialdini).'
    },
    citation: {
      heading: 'FIGUEIREDO (1896): COMPROMISSO CONSTITUCIONAL & CONSTITUTION OF 1891, ARTS. 15 AND 44',
      primaryQuote:
        'Aurélio de Figueiredo, Compromisso Constitucional, 1896 (oath of 26 Feb. 1891) · Constitution of 1891, art. 15 (harmonious and independent powers) & art. 44 (presidential oath).',
      bibliographicRef:
        'MUSEU DA REPÚBLICA, Compromisso Constitucional, 1896 (330 × 257 cm; Reproduction: Romulo Fialdini) · BRASIL, Constituição de 1891, arts. 15, 44.',
      methodologicalNote:
        'My reading: makes executive authority under obligation visible, without proving de facto independence or direct reception of Montesquieu.',
      externalUrl: 'https://museudarepublica.acervos.museus.gov.br/acervo-museologico/pintura-historica-4/',
      externalLabel: 'Museu da República · Compromisso Constitucional'
    },
    researchPrompt:
      'Verify the Museu da República catalogue entry for Aurélio de Figueiredo’s Compromisso Constitucional (1896, oath of 26 February 1891) alongside Articles 15 and 44 of the 1891 Brazilian Constitution.'
  },
  {
    id: 'milestone-ceschiatti-1961',
    periodLabel: '1748 XI.6 / 1961 · ¶7, ¶11–14',
    theme: 'iconography',
    slideId: 'slide-6',
    sourceAnchor: '#src-ceschiatti',
    sourceCode: 'S2 · S5 · S6',
    french: {
      year: '1748 · XI.6 & ¶7, ¶11–14',
      institution: 'Montesquieu XI.6 & Dauchy ¶7, ¶11–14',
      title: '« En quelque façon nulle » vs. Judicial Autonomy',
      summary:
        'Contrasts Montesquieu’s 1748 statement on judging with Dauchy’s emphasis in ¶7 on civil/criminal laws and « un cadre institutionnel (surtout judiciaire) ».'
    },
    brazilian: {
      year: '1961 · STF Brasília (3.30 m)',
      institution: 'Supremo Tribunal Federal · Praça dos Três Poderes',
      title: 'Alfredo Ceschiatti, A Justiça (1961) & Rafael Simioni',
      summary:
        'Seated sculpture holding a resting sword across her lap before the STF in Brasília (photo: Fellipe Sampaio / STF; cf. Simioni on judicial autonomy).'
    },
    citation: {
      heading: 'CESCHIATTI’S JUSTICE (1961), MONTESQUIEU XI.6 & DAUCHY’S JUDICIAL FRAME (¶7)',
      primaryQuote:
        '« Des trois puissances dont nous avons parlé, celle de juger est en quelque façon nulle. » (Montesquieu, XI.6) · Alfredo Ceschiatti, A Justiça, 1961, 3.30 m, STF.',
      bibliographicRef:
        'MONTESQUIEU, Esprit des lois (1777), XI.6 · STF, A Justiça, 1961 (3.30 m; Photo: Fellipe Sampaio / STF) · SIMIONI, Rafael Lazzarotto.',
      methodologicalNote:
        'Treats the resting sword across Justice’s lap as a contextual hypothesis in the Praça dos Três Poderes alongside Rafael Simioni’s study on judicial autonomy.',
      externalUrl:
        'https://noticias.stf.jus.br/postsnoticias/130-anos-conheca-os-destaques-do-acervo-cultural-stf/',
      externalLabel: 'STF · Acervo Cultural (A Justiça)'
    },
    researchPrompt:
      'Examine Alfredo Ceschiatti’s 1961 sculpture A Justiça before the Supremo Tribunal Federal in Brasília alongside Montesquieu XI.6 and Rafael Simioni’s reading of judicial autonomy.'
  }
];

/**
 * Filter timeline entries by thematic category ('all', 'constitutional', 'iconography', 'circulation').
 * @param {string} themeFilter
 * @returns {Array}
 */
export function filterTimelineByTheme(themeFilter = 'all') {
  const normalized = String(themeFilter || 'all').trim().toLowerCase();
  if (!normalized || normalized === 'all') {
    return [...LEGAL_CIRCULATION_TIMELINE];
  }
  return LEGAL_CIRCULATION_TIMELINE.filter((item) => item.theme === normalized);
}

/**
 * Retrieve a specific timeline milestone by its id, falling back to the first entry.
 * @param {string} id
 * @returns {Object}
 */
export function getTimelineMilestoneById(id) {
  if (!id) return LEGAL_CIRCULATION_TIMELINE[0];
  const found = LEGAL_CIRCULATION_TIMELINE.find((item) => item.id === id);
  return found || LEGAL_CIRCULATION_TIMELINE[0];
}

/**
 * Format a plain-text scholarly citation note for clipboard export or research grounding.
 * @param {Object} milestone
 * @returns {string}
 */
export function formatMilestoneCitationNote(milestone) {
  if (!milestone || !milestone.citation) return '';
  return [
    `${milestone.periodLabel} — ${milestone.citation.heading}`,
    `France / Theory (${milestone.french.year}): ${milestone.french.title} — ${milestone.french.summary}`,
    `Brazil / Response (${milestone.brazilian.year}): ${milestone.brazilian.title} — ${milestone.brazilian.summary}`,
    `Key Formulation: ${milestone.citation.primaryQuote}`,
    `Source Citation (${milestone.sourceCode}): ${milestone.citation.bibliographicRef}`,
    `Methodological Note: ${milestone.citation.methodologicalNote}`
  ].join('\n\n');
}
