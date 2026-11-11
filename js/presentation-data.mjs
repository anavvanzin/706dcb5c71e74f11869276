/**
 * Source-of-truth data module for Ana Vitória Vanzin Mendes's discussant response
 * following Serge Dauchy · PPGD/UFSC · 11 November 2026:
 * - 7-slide presentation deck ("Montesquieu and the three powers" / "Discussing Dauchy’s Montesquieu")
 * - Embedded Serge Dauchy 14-paragraph conference manuscript ("Montesquieu, De l’esprit des lois (1748)", ¶1–14)
 * - Embedded 7-page Matching Script Final PDF & verbatim pages (Montesquieu_Matching_Script_Final_5fe68ce6.pdf)
 * - Embedded Deep Research Dossier: Commenting on Serge Dauchy’s Analysis of Montesquieu’s De l’esprit des lois and the Paradox of Gender
 */

export const PRESENTATION_META = {
  deckVersion: 'v4-embedded-dauchy',
  title: 'Montesquieu and the three powers',
  discussantTitle: 'Discussing Dauchy’s Montesquieu',
  subtitle: 'Political liberty, legal images, and institutional autonomy in Brazil',
  discussantSubtitle: 'Context, reception and the representation of powers',
  presenter: 'Ana Vitória Vanzin Mendes · Discussant',
  presenterAffiliation: 'Doctoral Researcher in Law · PPGD/UFSC · Florianópolis',
  event: 'A circulação das ideias e saberes franceses na ciência jurídica brasileira',
  eventKicker: 'PPGD-UFSC · CCJ/UFSC · 11 a 13 de novembro de 2026',
  eventTheme: 'Montesquieu',
  eventDateTime: '11 de novembro de 2026 · 15h10',
  keynoteSpeaker: 'Serge Dauchy (CNRS/Université de Lille)',
  discussants: ['Marja Mangili (UniCesusc)', 'Ana Vitória Vanzin Mendes (UFSC)'],
  panelContext:
    'TEMÁTICA: Montesquieu · 11 de novembro de 2026 · 15h10 · CCJ/UFSC · Conferencista: Serge Dauchy (CNRS/Université de Lille) · Debatedores: Marja Mangili (UniCesusc) & Ana Vitória Vanzin Mendes (UFSC)',
  handoutPdfUrl: './public/assets/aistudio/Discussing-Dauchy-handout_b097f5ac.pdf',
  matchingScriptPdfUrl: './public/assets/aistudio/Montesquieu_Matching_Script_Final_5fe68ce6.pdf',
  dauchyManuscriptUrl: './public/assets/aistudio/S._Dauchy-Montesquieu_b10f60b2.md',
  deepResearchDossierUrl: './public/assets/aistudio/Paste_November_11__2026_-_2_49PM_c357fc36',
  eventPosterUrl: './public/assets/aistudio/7fefb9a6-f0ef-44ce-9981-b65916a5eb01__1__a4e5800a.png',
  flagsMixUrl: './public/assets/aistudio/c9c1d695-f5e3-4da2-b7dc-d4a3788e04bf_3353c5b9.png',
  backgroundMusic: {
    title: 'Frédéric Chopin — Nocturne Op. 9, No. 2 in E-flat major',
    shortTitle: 'Nocturne Op. 9, No. 2',
    src: './public/assets/aistudio/Classicals.de_-_Chopin_-_Nocturne_Op._9_no._2_in_E-flat_major_a91ca46b.mp3',
    defaultVolume: 0.12,
    maxVolume: 0.35
  },
  presenterTipsShortcut: 'N',
  lecternScriptShortcut: 'L',
  dauchyPaperShortcut: 'D',
  targetDurationMinutes: 10,
  dauchyBlue: '#1F35FF',
  timingNote:
    'Synchronized 7-slide intervention (~9–10 minutes) with embedded Serge Dauchy 14-paragraph manuscript (¶1–14), Matching Script Final PDF (1/7–7/7), and Deep Research Dossier.'
};

export const VOICE_CODE_KEY = [
  {
    id: 'dauchy',
    label: 'DAUCHY',
    variant: 'solid-blue',
    position: 'above',
    description: 'Serge Dauchy’s manuscript, quoted verbatim; ¶ numbers follow its order (¶1–14).'
  },
  {
    id: 'montesquieu',
    label: 'MONTESQUIEU',
    variant: 'solid-black',
    position: 'above',
    description: 'De l’esprit des lois, 1777 text, quoted verbatim.'
  },
  {
    id: 'other-source',
    label: 'OTHER SOURCE',
    variant: 'outlined-ink',
    position: 'above',
    description: 'Constitutions of 1824 and 1891; Civil Code of 1916; Watson, Legrand, and Teubner.'
  },
  {
    id: 'my-reading',
    label: 'MY READING',
    variant: 'outlined-blue-mono',
    position: 'below',
    description: 'Ana Vitória’s interpretation and discussant response. Translations marked [tr. AVVM].'
  }
];

export const DAUCHY_PARAGRAPH_MAP = [
  {
    id: 'p1-4',
    paraRef: '¶1–4',
    slidesLabel: 'slides 1–3',
    shortTitle: 'LA BRÈDE · BORDEAUX · 1748',
    detail: 'Parlement of Bordeaux, Lettres persanes (1721), De l’esprit des lois (1748), Catherine II’s 1767 Nakaz, and the 31 books.',
    primarySlide: 2,
    answeredBySlides: [1, 2, 3]
  },
  {
    id: 'p5-6',
    paraRef: '¶5–6',
    slidesLabel: 'slides 3–4',
    shortTitle: 'AMERICAS · BRAZIL 1824',
    detail: '1764 Philadelphia & 1776 US reception; Brazilian circulation (1789 Minas, 1798 Cipriano Barata, 1823 Assembly) and 1824 four powers.',
    primarySlide: 4,
    answeredBySlides: [3, 4, 7]
  },
  {
    id: 'p7',
    paraRef: '¶7',
    slidesLabel: 'slides 2–6',
    shortTitle: 'LIBERTY BEYOND THE CONSTITUTION',
    detail: 'Refusing a purely “constitutionalist” reading: civil and criminal laws + institutional frame « (surtout judiciaire) ».',
    primarySlide: 3,
    answeredBySlides: [1, 2, 3, 5, 6, 7]
  },
  {
    id: 'p8-10',
    paraRef: '¶8–10',
    slidesLabel: 'slides 2, 6–7',
    shortTitle: 'THE SPIRIT OF THE LAWS (I.3)',
    detail: 'Natural and historical determinants (Books XIV–XXV), « esprit général », and Book I, ch. 3 on laws suited to each people.',
    primarySlide: 2,
    answeredBySlides: [2, 6, 7]
  },
  {
    id: 'p11-14',
    paraRef: '¶11–14',
    slidesLabel: 'slides 1, 6–7',
    shortTitle: 'WATSON · LEGRAND · 1916 CODE',
    detail: 'Watson (1974) vs. Legrand (1997), historical hybridity, Teubner, and Dauchy’s closing question on Clóvis Beviláqua’s 1916 Civil Code.',
    primarySlide: 7,
    answeredBySlides: [1, 6, 7]
  }
];

/**
 * Complete verbatim 14-paragraph conference manuscript by Professor Serge Dauchy
 * ("Montesquieu, De l’esprit des lois (1748)"), embedded from /public/assets/aistudio/S._Dauchy-Montesquieu_b10f60b2.md
 * with English scholarly translation/summary [tr. AVVM], Deep Research Dossier commentary, and slide cross-references.
 */
export const DAUCHY_MANUSCRIPT_META = {
  title: 'Montesquieu, De l’esprit des lois (1748)',
  author: 'Serge Dauchy',
  affiliation: 'Directeur de recherche émérite au CNRS · Centre d’Histoire Judiciaire (Université de Lille)',
  event: 'A circulação das ideias e saberes franceses na ciência jurídica brasileira · PPGD/UFSC',
  date: '11 November 2026 · 15h10 · CCJ/UFSC',
  totalParagraphs: 14,
  sourcePath: './public/assets/aistudio/S._Dauchy-Montesquieu_b10f60b2.md'
};

export const DAUCHY_MANUSCRIPT_PARAGRAPHS = [
  {
    number: 1,
    id: 'dauchy-para-1',
    ref: '¶1',
    theme: 'biography',
    themeLabel: 'I · Biography & Formation (1689–1748)',
    sectionTitle: 'Birth at La Brède, Parlement of Bordeaux, Académie française & European Travels',
    frenchText:
      'Charles-Louis de Secondat, plus connu sous le nom de Montesquieu, est né à La Brède, près de Bordeaux, le 18 janvier 1689 et y décèdera le 10 février 1755. Après ses humanités au collège de Juilly, près de Paris, chez les Oratoriens, une congrégation réputée plutôt progressiste, il étudie le droit à l’université de Bordeaux. Il obtient sa licence en juillet 1708 et est admis au barreau quelques semaines plus tard. À la mort de son oncle en 1716, il acquiert le titre de baron de Montesquieu et reprend le nom de son parent ainsi que sa charge de président à mortier au Parlement de Bordeaux, où il siégeait déjà depuis trois ans en tant que conseiller. En cette même année 1716, il est également élu membre de l’Académie locale récemment fondée, véritable centre de la vie sociale et intellectuelle à Bordeaux. À partir de 1717, Montesquieu passe la majeure partie de son temps à Paris. Grâce au succès de ses Lettres persanes paru en 1721, Montesquieu devient un habitué des salons littéraires et des cercles politiques influents. Désireux de passer plus de temps dans la capitale, il vend sa charge au Parlement. En 1728 il est élu membre de la prestigieuse Académie française. Quelques mois plus tard, il entreprend un voyage à travers l’Europe afin d’observer les systèmes culturels et politiques de l’Autriche, de l’Italie, de l’Empire germanique, des Pays-Bas et surtout de l’Angleterre, où il séjourne pendant dix-huit mois et rassemble des éléments pour son œuvre majeure, De l’Esprit des lois, qu’il achèvera près de vingt ans plus tard.',
    englishSummary:
      '[tr. AVVM] Born at La Brède near Bordeaux on 18 January 1689 (d. 10 February 1755), Montesquieu studied with the Oratorians at Juilly and earned his law licence at Bordeaux in July 1708. Inheriting the barony of Montesquieu and the judicial office of président à mortier at the Parlement of Bordeaux in 1716 (where he had served three years as conseiller), he entered the Bordeaux Academy, rose to fame in Paris through the Lettres persanes (1721), sold his parliamentary office, entered the Académie française in 1728, and traveled across Europe—spending eighteen formative months in England gathering material for De l’Esprit des lois.',
    dossierCommentary:
      'Slide 02 anchors Montesquieu’s perspective in this judicial magistracy: the Parlement of Bordeaux was a sovereign judicial court of the Ancien Régime, not a modern legislative parliament. (Backstage archival note: Montesquieu died in Paris at his rue Saint-Dominique residence on 10 Feb. 1755 and was buried at Saint-Sulpice.)',
    keyConcepts: ['La Brède (1689)', 'Parlement of Bordeaux', 'Président à mortier (1716)', '18 Months in England'],
    slideNumbers: [1, 2]
  },
  {
    number: 2,
    id: 'dauchy-para-2',
    ref: '¶2',
    theme: 'biography',
    themeLabel: 'I · Biography & Formation (1689–1748)',
    sectionTitle: 'Lettres persanes (1721), Critique of the 1670 Ordonnance criminelle, Romans (1734) & Natural History',
    frenchText:
      'Montesquieu s’est d’abord fait connaître par ses Lettres persanes. Il s’agit d’un roman épistolaire racontant le voyage de deux nobles persans en France qui, dans leur correspondance, comparent les cultures orientales et européenne ainsi que les religions chrétienne et musulmane. L’ouvrage fut publié anonymement en 1721, car Montesquieu craignait la censure en raison de sa satire des institutions politiques et des mœurs sociales. Il utilise par exemple le regard extérieur de ses voyageurs persans pour livrer une critique féroce de la justice pénale d\'Ancien Régime, ciblant particulièrement l\'absurdité des procès intentés aux suicidés et la cruauté des peines prévues par l’ordonnance criminelle de 1670. En 1734, il publie Les considérations sur les causes de la grandeur des Romains et de leur décadence, un ouvrage qui témoigne déjà de la place centrale qu’occupe l’histoire dans sa pensée politique et qui ouvre également la voie à ses futures théories sur le républicanisme. Il est également l’auteur de plusieurs écrits et discours attestant de son intérêt pour les sciences naturelles et empiriques, comme son Essai d’observation sur l’histoire naturelle publié en 1721, où il exprime pour la première fois l’idée, développée dans le livre XIV de L’Esprit des lois, de la relation entre les lois, la nature et le climat.',
    englishSummary:
      '[tr. AVVM] Montesquieu first gained renown with the anonymous Lettres persanes (1721), using the outsider gaze of two Persian nobles to satirize political institutions and social mores—delivering a fierce critique of Ancien Régime penal justice, trials against suicides, and the cruel punishments of the Criminal Ordinance of 1670. His 1734 Considerations on the Romans foregrounded history and republicanism, while his 1721 Essai d’observation sur l’histoire naturelle anticipated Book XIV on laws, nature, and climate.',
    dossierCommentary:
      'Dossier Part I.3 & Part II.4: Connects directly to Book XII, ch. 2 (« C’est donc de la bonté des lois criminelles que dépend principalement la liberté du citoyen ») and to the proto-feminist natural-law subversion in Lettres persanes Letter 38 (Rica on equal education) and Letter 161 (Roxane’s suicide note: « j’ai pu vivre dans la servitude ; mais j’ai toujours été libre »).',
    keyConcepts: ['Lettres persanes (1721)', 'Ordonnance criminelle (1670)', 'Romains (1734)', 'Law, Nature & Climate'],
    slideNumbers: [2, 3]
  },
  {
    number: 3,
    id: 'dauchy-para-3',
    ref: '¶3',
    theme: 'biography',
    themeLabel: 'I · Biography & Formation (1689–1748)',
    sectionTitle: 'Geneva Publication (1748), Censorship (1751 Index), European Translations & Catherine II’s Nakaz (1767)',
    frenchText:
      'L’œuvre majeure de Montesquieu, De l’Esprit des Lois, paraît également de manière anonyme à Genève en 1748. Un an plus tard, une édition révisée comportant d’importantes corrections est publiée à Amsterdam. L’ouvrage fait grand bruit. Salué par des encyclopédistes tels que d’Alembert, il est vivement critiqué dans les milieux ecclésiastiques et conservateurs. Dans une longue critique datée d’octobre 1749, le journal janséniste Nouvelles ecclésiastiques qualifie l’ouvrage de scandaleux et accuse Montesquieu de nier les valeurs universelles du christianisme et l’autorité morale de l’Église. Bien que Montesquieu ait tenté de réfuter cette accusation violente et sans nuance (ainsi que les critiques plus doctrinales des jésuites) en publiant quelques mois plus tard, sous la forme d’une dispute scolastique, une Défense de l’Esprit des Lois, son ouvrage est censuré par l’Église catholique et inscrit en 1751 à l’Index des livres prohibés. Entretemps, des exemplaires clandestins du traité de Montesquieu circulent dans les cercles intellectuels en France. L’œuvre se répand également à étranger, entre autres grâce à sa traduction rapide en anglais (1750) et, au cours de la seconde moitié du XVIIIe siècle, aussi en russe (1775) et en allemand (1782). Le traité est tout particulièrement bien accueilli par les monarques éclairés. Ainsi, par exemple, la moitié des 655 articles du Nakaz (ou Instruction de l’impératrice Catherine la Grande pour la Commission chargée de dresser le projet d\'un nouveau Code des lois) sont copiés mot pour mot du traité de Montesquieu. En juin 1765, Catherine écrit à D’Alembert : « Pour l’utilité de mon empire, j’ai pillé le président Montesquieu sans le nommer. J’espère que si de l’autre monde il me voit travailler, il me pardonnera ce plagiat pour le bien de trente millions d’hommes qui en doit résulter. Il aimait trop l’humanité pour s’en formaliser. Son livre est mon bréviaire ».',
    englishSummary:
      '[tr. AVVM] Published anonymously in Geneva in 1748 (revised Amsterdam 1749), De l’Esprit des Lois was praised by d’Alembert but attacked by the Jansenist Nouvelles ecclésiastiques (Oct. 1749) and placed on the Catholic Index in 1751 despite Montesquieu’s Défense. Translated into English (1750), Russian (1775), and German (1782), it was embraced by enlightened monarchs: half of the 655 articles of Catherine the Great’s 1767 Nakaz were copied verbatim from Montesquieu, whom she called her “breviary” in a June 1765 letter to d’Alembert (« j’ai pillé le président Montesquieu sans le nommer »).',
    dossierCommentary:
      'Dossier Part I.3: Exposes the ideological subversion behind Catherine II’s borrowing—opening Art. 6 of the 1767 Nakaz with « La Russie est une puissance européenne » against Montesquieu’s classification of Muscovy (XIX.14), while stripping out his division of powers and intermediary bodies to consolidate autocratic bureaucracy.',
    keyConcepts: ['Geneva (1748)', 'Index (1751)', 'Catherine II’s Nakaz (1767)', '« Son livre est mon bréviaire »'],
    slideNumbers: [2, 4]
  },
  {
    number: 4,
    id: 'dauchy-para-4',
    ref: '¶4',
    theme: 'biography',
    themeLabel: 'I · Biography & Formation (1689–1748)',
    sectionTitle: 'Thirty-One Books, BnF Manuscript & the Three Governments (Republics, Monarchies, Despotisms)',
    frenchText:
      'De l’Esprit des Lois se compose de 31 livres, chacun divisé en plusieurs chapitres. Le manuscrit original, conservé à la Bibliothèque nationale de France (FR Nouv. Acq. 12832-12837), témoigne de la manière dont Montesquieu travaillait et de l’évolution de sa pensée, mais aussi de la façon dont il est intervenu dans la révision et l’enrichissement des éditions ultérieures. L’ouvrage, comme l’indique son sous-titre, a pour objet d’étudier « la relation que les lois doivent avoir avec la constitution de chaque gouvernement, ainsi qu’avec les mœurs, le climat, la religion, le commerce, etc. ». Après une analyse des trois formes fondamentales de gouvernement – les républiques, les monarchies et les despotismes –, l’auteur aborde les « principes » de chaque gouvernement. Il met l’accent sur la « vertu » qui anime les républiques, qu’elles soient démocratiques ou aristocratiques, tandis que l’« honneur » et la « crainte » régissent les monarchies et les despotismes ; la distinction entre ces derniers reposant sur le fait que les lois restreignent ou non l’autorité du souverain.',
    englishSummary:
      '[tr. AVVM] Comprising 31 books (working manuscript at BnF, FR Nouv. Acq. 12832–12837), the treatise studies the relation laws must have with the constitution of each government and with mores, climate, religion, and commerce. Montesquieu pairs the three fundamental forms of government with their animating principles: virtue (vertu) in republics, honor (honneur) in monarchies, and fear (crainte) in despotisms—distinguishing monarchy from despotism by whether fixed laws restrain the sovereign.',
    dossierCommentary:
      'Dossier Part II.1: In Book VII, Montesquieu makes the condition of women a structural consequence of these three principles—confinement under despotic fear, polite luxury and doux commerce under monarchical honor (XIX.8), and legal freedom paired with strict censorship by mores under republican virtue (VII.9: « libres par les lois, et captivées par les mœurs »).',
    keyConcepts: ['31 Books (BnF MS)', 'Republics → Vertu', 'Monarchies → Honneur', 'Despotisms → Crainte'],
    slideNumbers: [2, 3]
  },
  {
    number: 5,
    id: 'dauchy-para-5',
    ref: '¶5',
    theme: 'americas',
    themeLabel: 'II · Transatlantic Circulation & Brazil (¶5–6)',
    sectionTitle: 'North American Reception: Philadelphia (1764), Jefferson, John Adams & Thomas Paine (1776)',
    frenchText:
      'L’œuvre de Montesquieu a très tôt circulé dans les colonies américaines, et d’abord dans les colonies britanniques d’Amérique du Nord. Le catalogue de la Bibliothèque de Philadelphie, imprimé en 1764, mentionne un exemplaire de la deuxième édition anglaise de 1752 de L’Esprit des lois, traduite par Thomas Nugent, un érudit irlandais. Aucun auteur n’est plus cité que Montesquieu par les membres du comité nommé par le Congrès continental des treize colonies britanniques d’Amérique du Nord pour rédiger la Déclaration d’indépendance de 1776. Thomas Jefferson, considéré comme son principal auteur, a notamment repris l’idée de Montesquieu selon laquelle un gouvernement républicain devait reposer sur la vertu, comprise comme un équilibre entre les droits particuliers et l’intérêt général. L’Esprit des lois semble également avoir été la principale source d’inspiration de Thoughts on Government applicable to the Present state of the American colonies (Réflexions sur le gouvernement applicables à l’état actuel des colonies américaines) publié en 1776 par John Adams. Montesquieu est entre autres invoqué pour réfuter la théorie du gouvernement populaire de Thomas Paine ainsi que l’idée d’un organe législatif unique que ce dernier avait défendu dans un pamphlet intitulé Common Sense, publié également en 1776.',
    englishSummary:
      '[tr. AVVM] Montesquieu circulated early in British North America: the 1764 Library Company of Philadelphia catalogue lists Thomas Nugent’s 1752 English translation. He was the most cited author among the drafters of the 1776 Declaration of Independence (Jefferson drawing on republican virtue), and inspired John Adams’s Thoughts on Government (1776) to refute Thomas Paine’s unicameral legislature in Common Sense.',
    dossierCommentary:
      'Sets up Dauchy’s critical contrast in ¶7: North American constitutional engineering privileged a written « dispositif constitutionnel » of separated powers, which later narrowed how Montesquieu was remembered.',
    keyConcepts: ['Thomas Nugent (1752)', 'Philadelphia Catalogue (1764)', 'Jefferson & Virtue (1776)', 'John Adams vs. Paine'],
    slideNumbers: [2, 3, 4]
  },
  {
    number: 6,
    id: 'dauchy-para-6',
    ref: '¶6',
    theme: 'americas',
    themeLabel: 'II · Transatlantic Circulation & Brazil (¶5–6)',
    sectionTitle: 'Circulation in Colonial Brazil (1789, 1798 Cipriano Barata), 1823 Assembly & the 1824 Four Powers',
    frenchText:
      'L’Esprit des lois et les ouvrages d’autres auteurs des Lumières circulaient également en Amérique du Sud à la fin du XVIIIe siècle. La première traduction complète en portugais ne sera certes éditée au Brésil qu’en 1949, mais cela ne signifie nullement que l’œuvre de Montesquieu n’était pas connue et lue au Brésil dès la fin du XVIIIe siècle. L’esprit des lois, comme la quasi-totalité des ouvrages des Lumières, avait été interdit tant par la Real Mesa Censoria créée en 1768 que par l’Inquisition ; mais malgré la censure royale et ecclésiastique, l’ouvrage circulait dans la colonie portugaise, en version française comme par des traductions partielles en portugais. Pour preuve on peut citer l’inventaire dressé par les autorités coloniales des biens confisqués à Cipriano Barata, un médecin et philosophe arrêté et emprisonné en 1798 lors de la conjuration des Baianos à Salvador de Bahia. Cet inventaire mentionne un exemplaire de l’Esprit des lois ainsi que l’Encyclopédie et les oeuvres de Voltaire. Ces ouvrages semblent avoir été introduits clandestinement au Brésil par de jeunes aristocrates partis étudier à l’Université de Coimbra, voir pour certains en France. Les écrits de Montesquieu avaient d’ailleurs déjà nourri dix années auparavant les discussions lors de la conjuration Mineira de 1789. Au cours des débats de l’Assemblée constituante chargée en 1823 de doter le Brésil indépendant d’une constitution, L’esprit des lois est également abondamment cité et commenté. La première Constitution brésilienne de 1824 adoptera certes une organisation originale inspirée du modèle théorique de Benjamin Constant et organisée en quatre pouvoirs (législatif, exécutif, judiciaire et modérateur), elle se présente néanmoins comme une évolution voire une correction de la tripartition des pouvoirs proposés par Montesquieu.',
    englishSummary:
      '[tr. AVVM] Despite bans by the Real Mesa Censória (1768) and the Inquisition—and although the first complete Portuguese translation appeared in Brazil only in 1949—De l’esprit des lois circulated in late-18th-century Brazil via Coimbra and French networks. It nourished the 1789 Inconfidência Mineira, appeared in the 1798 Bahia confiscation inventory of physician-philosopher Cipriano Barata, and was abundantly cited in the 1823 Constituent Assembly. Brazil’s 1824 Constitution adopted four powers inspired by Benjamin Constant (Legislative, Moderating, Executive, Judicial in Art. 10), presenting itself as « une évolution voire une correction » of Montesquieu’s tripartition.',
    dossierCommentary:
      'Engaged directly on Slide 04 & Dossier Part I.2: Archival sequestration records confirm Canon Luís Vieira da Silva’s 267 titles (569 vols.) in Mariana (1789 Autos da Devassa) and Kátia Mattoso’s study of Cipriano Barata (74 books) & Lt. Hermógenes Pantoja in Bahia (1798, holding Didot Esprit des lois & Amsterdam Lettres persanes). In 1824, Carneiro de Campos adapted Constant by uniting the Moderating Power (Art. 98) and Executive headship (Art. 101 § VI) in Emperor Dom Pedro I.',
    keyConcepts: ['Real Mesa Censória (1768)', '1789 Minas & 1798 Cipriano Barata', '1823 Constituent Assembly', '1824 Art. 10 & Benjamin Constant'],
    slideNumbers: [3, 4, 7]
  },
  {
    number: 7,
    id: 'dauchy-para-7',
    ref: '¶7',
    theme: 'liberty',
    themeLabel: 'III · System of Liberty & Esprit Général (¶7–10)',
    sectionTitle: 'Against a Purely “Constitutionalist” Vision: Civil & Criminal Laws and the Judicial Frame',
    frenchText:
      'L’idée centrale de l’Esprit de lois porte en effet sur la liberté politique et les meilleurs moyens de la préserver. S’appuyant, entre autres, sur Le Prince de Machiavel (1532) et les Deux traités du gouvernement civil de John Locke (1690), et examinant en détail les principes du droit naturel et le système politique anglais, Montesquieu soutient que la liberté politique et individuelle ne peut être garantie que lorsque les fonctions exécutives, législatives et judiciaires du gouvernement sont confiées à des organes distincts. La séparation des pouvoirs constitue la meilleure garantie contre les tentatives d’une branche du gouvernement visant à porter atteinte ou à restreindre les libertés politiques, telles que la liberté de pensée, d’expression et de réunion. L’équilibre des pouvoirs assure par conséquent la sécurité individuelle. Les colonies d’Amérique du Nord ont davantage mis l’accent sur la nécessité de protéger les droits et libertés individuels par un « dispositif constitutionnel » sophistiqué. Il en résulte qu’aujourd’hui l’œuvre principale de Montesquieu est systématiquement, pour ne pas dire exclusivement, associée à l’idée que la séparation et l’équilibre des pouvoirs, gravé dans le marbre d’une constitution écrite, sont les plus à même d’empêcher toute atteinte aux libertés individuelles. Enfermer Montesquieu dans une vision purement « constitutionnaliste » serait toutefois réducteur. Il rappelle en effet de manière récurrente que les dispositions constitutionnelles capables d’assurer la liberté politique doivent être secondées par l’établissement de lois civiles et criminelles et par un cadre institutionnel (surtout judiciaire) qui garantissent au citoyen ce que Montesquieu qualifie de « système de liberté ». C’est sur ce point que l’Angleterre lui fournit un exemple d’équilibre de forces sociales en même temps qu’une régulation institutionnelle.',
    englishSummary:
      '[tr. AVVM] Political liberty and individual security require entrusting executive, legislative, and judicial functions to distinct organs. Yet North American readings emphasized a written « dispositif constitutionnel », leading Montesquieu to be associated almost exclusively with constitutional separation of powers. « Enfermer Montesquieu dans une vision purement “constitutionnaliste” serait toutefois réducteur »: constitutional provisions must be seconded by civil and criminal laws and an institutional—above all judicial—framework guaranteeing what Dauchy calls a « système de liberté ».',
    dossierCommentary:
      'Central spine of Ana Vitória’s intervention (Slides 01, 02, 03, 05, 06, 07) & Dossier Part I.3: Connects Book XI (liberty in relation to the constitution) with Book XII, ch. 2 (liberty in relation to the citizen: « C’est donc de la bonté des lois criminelles que dépend principalement la liberté du citoyen »). Note: « système de liberté » is treated strictly as Dauchy’s analytical synthesis.',
    keyConcepts: ['« vision purement constitutionnaliste »', 'Lois civiles et criminelles', 'Cadre institutionnel (surtout judiciaire)', '« Système de liberté »'],
    slideNumbers: [1, 2, 3, 5, 6, 7]
  },
  {
    number: 8,
    id: 'dauchy-para-8',
    ref: '¶8',
    theme: 'liberty',
    themeLabel: 'III · System of Liberty & Esprit Général (¶7–10)',
    sectionTitle: 'Natural & Historical Determinants Forging the Spirit of a People',
    frenchText:
      'Montesquieu accorde dans son ouvrage, et c’est d’ailleurs le sens qu’il convient de donner à son titre, « l’esprit des lois », une attention toute particulière aux déterminants naturels et historiques qui peuvent obérer voire interdire la liberté ou, inversement, former un terreau favorable au développement des libertés tant politiques qu’individuelles. Montesquieu défend en effet une méthode naturaliste et scientifique de la politique, affirmant que le climat et la géographie, mais aussi la religion ou le commerce, interagissent avec chaque culture pour forger « l’esprit » d’un peuple. Cet esprit, à son tour, oriente chaque pays vers un type particulier de système politique et institutionnel et influence bien évidemment aussi ses lois.',
    englishSummary:
      '[tr. AVVM] The very title “The Spirit of the Laws” reflects Montesquieu’s attention to the natural and historical determinants that can hinder or foster political and individual liberty. Advancing a naturalistic, empirical method of politics, he argues that climate, geography, religion, and commerce interact with each culture to forge the “spirit” of a people, which in turn shapes its political institutions and laws.',
    dossierCommentary:
      'Engaged on Slide 02 & Matching Script 2/7: Laws are embedded in social, religious, commercial, and customary conditions (mœurs)—the exact terrain where Montesquieu places the status of women (Books VII, XVI, XIX).',
    keyConcepts: ['Natural & Historical Determinants', 'Climate, Religion, Commerce', 'Esprit d’un peuple'],
    slideNumbers: [2]
  },
  {
    number: 9,
    id: 'dauchy-para-9',
    ref: '¶9',
    theme: 'liberty',
    themeLabel: 'III · System of Liberty & Esprit Général (¶7–10)',
    sectionTitle: 'Books XIV–XXV: Empire of Climate, Servitude, Mœurs, Commerce & Brief Allusion to Brazil (XXI.10)',
    frenchText:
      'L’auteur analyse successivement les rapports des lois avec le climat (livres XIV à XVII), avec la géographie et la nature du terrain (livre XVIII), avec les mœurs (livre XIX), avec le commerce et le régime monétaire (livre XX à XXII), avec le nombre des habitants (livre XXIII) et avec la religion (livres XXIV et XXV). L’ « empire du climat » conduit par exemple l’auteur à étudier la soumission à la contrainte climatique et son rapport aux différentes formes de servitude, et tout particulièrement l’esclavage. L’étude des principaux déterminants naturels et historiques des lois fait bien évidemment la part belle aux empires coloniaux. Montesquieu mentionne très peu le Brésil ; ses analyses sur l\'Amérique latine se concentrent principalement sur l\'Empire espagnol. Il avait d’ailleurs déjà publié, une vingtaine d’années plus tôt, une brève étude intitulée Considérations sur les richesses de l’Espagne. Il ne fait en revanche qu’une très brève allusion au Brésil dans le livre XXI, chapitre X où il retrace les évolutions en matière de navigation maritime qui ont été rendues possibles grâce à la découverte de la boussole.',
    englishSummary:
      '[tr. AVVM] Montesquieu successively examines the relation of laws with climate (Books XIV–XVII), terrain (XVIII), mores (XIX), commerce and money (XX–XXII), population (XXIII), and religion (XXIV–XXV). The “empire of climate” leads him to analyze forms of servitude and slavery. While focusing on the Spanish Empire, he makes only a brief allusion to Brazil in Book XXI, ch. 10 regarding maritime navigation enabled by the compass.',
    dossierCommentary:
      'Dossier Part II.2: In Book XVI (within Books XIV–XVII on the “empire of climate”), Montesquieu distinguishes civil slavery from « servitude domestique » (XVI.1–2) and argues that in hot climates physical passions overpower moral restraint (XVI.8–10), contrasting with temperate marital symmetry.',
    keyConcepts: ['Books XIV–XXV', '« Empire du climat » & Servitude', 'Mœurs (Book XIX)', 'Brazil in Book XXI, ch. 10'],
    slideNumbers: [2, 4]
  },
  {
    number: 10,
    id: 'dauchy-para-10',
    ref: '¶10',
    theme: 'liberty',
    themeLabel: 'III · System of Liberty & Esprit Général (¶7–10)',
    sectionTitle: 'Esprit Général & Book I, Chapter 3: Laws Proper to the People for Whom They Are Made',
    frenchText:
      'Au terme de son parcours heuristique, Montesquieu conclut à l’enracinement des lois et des institutions dans une histoire particulière et un environnement spécifique à chaque nation. C’est ce qu’il appelle l’esprit général d’une nation, où se regroupent et se conjuguent, chaque fois de façon originale, tous les ordres de détermination. Il en déduit aussi logiquement que « La loi, en général, est la raison humaine, en tant qu’elle gouverne tous les peuples de la terre, & les lois politiques & civiles de chaque nation ne doivent être que les cas particuliers où s’applique cette raison humaine. Elles doivent être tellement propres au peuple pour lequel elles sont faites, que c’est un très-grand hasard si celles d’une nation peuvent convenir à une autre… ».',
    englishSummary:
      '[tr. AVVM] At the end of his heuristic inquiry, Montesquieu concludes that laws and institutions are rooted in each nation’s particular history and environment—its esprit général (XIX.4). He deduces in Book I, ch. 3: “Law in general is human reason, inasmuch as it governs all the peoples of the earth; and the political and civil laws of each nation ought to be only the particular cases in which this human reason is applied. They should be so proper to the people for whom they are made, that it is a very great chance if those of one nation can suit another…”',
    dossierCommentary:
      'Directly motivates Question 1 on Slide 07 & Matching Script 6/7–7/7: When a rule is defended as suited to a people’s local mores (as in the 1916 Civil Code debate over Article 6), does the argument from context circulate too?',
    keyConcepts: ['Esprit général (XIX.4)', 'Livre I, chap. 3', '« un très-grand hasard »', 'Particular Cases of Human Reason'],
    slideNumbers: [2, 6, 7]
  },
  {
    number: 11,
    id: 'dauchy-para-11',
    ref: '¶11',
    theme: 'transplants',
    themeLabel: 'IV · Legal Transplants, Hybridity & 1916 Civil Code (¶11–14)',
    sectionTitle: 'The Legal Transplants Debate: Alan Watson (1974) vs. Pierre Legrand (1997)',
    frenchText:
      'On peut considérer que Montesquieu fut le premier à lancer le débat sur les transplantations juridiques et institutionnelles. Il n’utilise bien évidemment pas le terme de transplantation, pas plus que celui de greffe ou de translation. L’idée de transplantation n’apparaîtra qu’en 1974 avec la parution de l’ouvrage d’Alan Watson, Legal transplants. Watson, professeur de droit romain et de droit comparé à l’université d’Edimbourg, affirmait qu’il n’existe pas de lien nécessaire et étroit entre les lois et la société dans laquelle elles s’appliquent. Les lois étant souvent empruntées à d’autres systèmes, elles peuvent selon lui s’appliquer sans difficultés dans des sociétés et des lieux très différents de ceux où elles ont été initialement élaborées. Elles sont donc aisément transposables et transplantables. Contrairement à Montesquieu, Watson défend une conception spatiale des « transferts juridiques », c’est-à-dire la possibilité d’un déplacement du droit d’un lieu donné vers un autre qui, à son tour, entraîne un autre mouvement : le développement de règles juridiques spécifiques voire d’un système juridique spécifique. Utilisant la métaphore du corps humain – sa théorie et le titre même de son ouvrage s’inspirent des avancées réalisées à la fin des années 1960 par Christiaan Barnard en matière de transplantation cardiaque – Watson écrit « Une transplantation juridique réussie – à l’instar de celle d’un organe humain – se développera dans son nouveau corps et en fera partie intégrante, tout comme la règle ou l’institution aurait continué à évoluer au sein de son système d’origine. L’évolution ultérieure au sein du système d’accueil ne doit pas être confondue avec un rejet ». Pour Pierre Legrand, professeur de droit comparé à l’Université de Paris 1 et principal opposant aux théories de greffe juridique, le paradigme de Watson conduit à une conception décontextualisée du droit par rapport à son environnement social et culturel. Une règle de droit ne peut selon lui exister en dehors de la signification qui lui est attribuée, et cette signification ne peut être trouvée que dans le contexte spécifique du système juridique où elle s’applique. Aucune règle du système receveur ne peut avoir de signification par rapport à la règle du système donneur. En effet, lorsqu’elle franchit les frontières, la règle d’origine subit nécessairement un changement. Pour Legrand, les transplantations juridiques sont par conséquent « impossibles ».',
    englishSummary:
      '[tr. AVVM] Montesquieu launched the debate on legal transplants. In Legal Transplants (1974), Edinburgh Roman and comparative law professor Alan Watson—inspired by Christiaan Barnard’s heart transplants—argued that laws have no necessary link to their society of origin and move easily across borders, growing in their new body without subsequent evolution implying “rejection.” Conversely, Paris 1 professor Pierre Legrand argues that Watson’s paradigm decontextualizes law: because a rule’s meaning is culturally embedded in its host legal system, crossing borders necessarily changes its meaning, rendering legal transplants “impossible.”',
    dossierCommentary:
      'Engaged on Slide 06 & 07 and Dossier Part I.1: Clóvis Beviláqua’s comparative method at the Escola do Recife bridges this binary by treating imported rules as culturally filtered adaptations within a distinct Latin American legal family.',
    keyConcepts: ['Alan Watson (1974)', 'Christiaan Barnard Metaphor', 'Pierre Legrand (1997)', 'Transplants « impossibles »'],
    slideNumbers: [6, 7]
  },
  {
    number: 12,
    id: 'dauchy-para-12',
    ref: '¶12',
    theme: 'transplants',
    themeLabel: 'IV · Legal Transplants, Hybridity & 1916 Civil Code (¶11–14)',
    sectionTitle: 'Pierre Legrand’s « Contextualité » & Max Weber on Historical Individuality',
    frenchText:
      'En rejetant toute idée de transfert que supposent les transplants juridiques, Pierre Legrand s’inscrit clairement dans la dimension spatiale mise en avant par Montesquieu. Certes, il n’évoque pas le climat ou la géographie mais, comme l’auteur de l’Esprit de lois, Legrand insiste sur l’importance de ce qu’il appelle « la contextualité ». Il affirme que c’est « parce que l’indifférence aux questions d’hétérogénéité culturelle ne rend pas justice aux spécificités locales du savoir que le comparatiste ne doit jamais abolir la distance entre soi et l’autre ». Legrand s’inscrit ainsi dans une perspective statique des systèmes juridiques, et des traditions qui les sous-tendent, ce qui fait écho aux positions de Max Weber qui affirmait que « Les études comparatives ne devraient pas avoir pour objectif de trouver des analogies et des parallèles, comme le font ceux qui se livrent à cette entreprise, actuellement en vogue, consistant à élaborer des schémas généraux de développement. L’objectif devrait plutôt être exactement le contraire : identifier et définir l’individualité de chaque développement, les caractéristiques qui ont conduit l’un à aboutir à un résultat si différent de l’autre. Et une fois cela fait, on peut alors déterminer les causes qui ont conduit à ces différences ».',
    englishSummary:
      '[tr. AVVM] By rejecting legal transfers, Legrand aligns with Montesquieu’s spatial sensibility, insisting on « la contextualité » and preserving the distance between self and other to respect local cultural heterogeneity. Dauchy notes that this static view of legal traditions echoes Max Weber’s warning that comparative studies should not seek general schemas of parallel development, but rather define the historical individuality of each trajectory and the causes of their divergence.',
    dossierCommentary:
      'Highlights why Dauchy moves beyond Legrand’s static contextualism in ¶13–14: if legal systems are treated as closed, static individualities, we miss how contact itself reshapes legal meaning.',
    keyConcepts: ['« La contextualité »', 'Cultural Heterogeneity', 'Static Perspective', 'Max Weber on Individuality'],
    slideNumbers: [6, 7]
  },
  {
    number: 13,
    id: 'dauchy-para-13',
    ref: '¶13',
    theme: 'transplants',
    themeLabel: 'IV · Legal Transplants, Hybridity & 1916 Civil Code (¶11–14)',
    sectionTitle: 'Historical Hybridity: Imposed Transplantations, Assumed Receptions & Changing Sovereignties',
    frenchText:
      'La grande majorité des comparatistes s’accordent aujourd’hui pour reconnaître que tous les systèmes juridiques présentent un certain degré d’hybridité. Cette hybridation n’est pas un phénomène nouveau lié à la mondialisation. On pourrait multiplier les exemples historiques, conséquences de transplantations imposées, de réceptions assumées, de souverainetés changeantes et donc de superpositions de systèmes juridiques successifs ou encore d’interconnexion voire simplement de contacts entre territoires.',
    englishSummary:
      '[tr. AVVM] Most comparatists today recognize that all legal systems exhibit a degree of hybridity. Far from being a novel byproduct of globalization, hybridization has deep historical roots in imposed transplantations, deliberate (“assumed”) receptions, shifting sovereignties, successive overlapping legal orders, and territorial interconnections.',
    dossierCommentary:
      'Dossier Part I.1: Brazil’s legal trajectory—from the Portuguese Ordenações Filipinas to the 1824 Imperial Constitution, Teixeira de Freitas’s Consolidação, and Beviláqua’s 1916 Civil Code—exemplifies layered historical hybridity across shifting sovereignties.',
    keyConcepts: ['Historical Hybridity', 'Transplantations imposées', 'Réceptions assumées', 'Souverainetés changeantes'],
    slideNumbers: [1, 6, 7]
  },
  {
    number: 14,
    id: 'dauchy-para-14',
    ref: '¶14',
    theme: 'transplants',
    themeLabel: 'IV · Legal Transplants, Hybridity & 1916 Civil Code (¶11–14)',
    sectionTitle: 'Renegotiated Boundaries, Gunther Teubner & the Closing Question on Clóvis Beviláqua’s 1916 Civil Code',
    frenchText:
      'Inévitablement, la majorité des systèmes juridiques présentent aujourd’hui un certain degré d’hybridité et leurs frontières sont constamment renégociées. De plus, il est juste d’affirmer, à l’instar de Teubner, que les espaces dans lesquels s’opère cette renégociation ne sont pas les sociétés nationales, « le transfert d’institutions juridiques (…) est au contraire le fruit d’un contact direct entre les ordres juridiques au sein d’un discours juridique mondial ». Le code civil brésilien de 1916 rédigé par Clóvis Beviláqua, professeur de droit civil et de droit comparé à Recife, en fournit probablement une illustration. Mais les collègues brésiliens sont bien plus compétents que moi pour l’attester et aussi pour nous dire si la question des transplantations juridiques soulevée par Montesquieu et le débat sur leur possibilité ou impossibilité furent évoqués au cours du long processus de rédaction puis l’adoption et d’entrée en vigueur de ce code.',
    englishSummary:
      '[tr. AVVM] Legal systems’ boundaries are constantly renegotiated—and as Gunther Teubner argues (1998, “Legal Irritants”), the spaces of this renegotiation are not isolated national societies, but “direct contact between legal orders within a global legal discourse.” Dauchy concludes by suggesting that the 1916 Brazilian Civil Code drafted by Clóvis Beviláqua (Professor of Civil and Comparative Law at Recife) likely illustrates this, and invites his Brazilian colleagues to attest whether Montesquieu’s transplant question was debated during its long drafting, adoption, and entry into force.',
    dossierCommentary:
      'Answered in Matching Script 1/7, 6/7, 7/7 & Dossier Part I.1 + Part II.5: Beviláqua explicitly engaged Montesquieu (Book I, ch. 3) in his Lições de Legislação Comparada (1893/1897) at the Escola do Recife and defended hybrid adaptation in Em Defesa do Projeto (1906). In Article 6, his 1899 Projeto Primitivo excluded married women from civil incapacity, but conservative parliamentarians (Andrade Figueira) reinstated their relative incapacity in the name of local family mores until Law 4,121 of 1962.',
    keyConcepts: ['Renegotiated Boundaries', 'Gunther Teubner (1998)', 'Clóvis Beviláqua (Recife)', '1916 Brazilian Civil Code'],
    slideNumbers: [1, 6, 7]
  }
];

/**
 * Verbatim 7-page Matching Script Final embedded from
 * /public/assets/aistudio/Montesquieu_Matching_Script_Final_5fe68ce6.pdf
 */
export const MATCHING_SCRIPT_FINAL = {
  title: 'Montesquieu Matching Script (Final 7-Page Podium Script)',
  author: 'Ana Vitória Vanzin Mendes · Discussant (PPGD/UFSC)',
  pdfUrl: './public/assets/aistudio/Montesquieu_Matching_Script_Final_5fe68ce6.pdf',
  totalPages: 7,
  pages: [
    {
      page: 1,
      slideNumber: 1,
      header: '1 / 7 · Discussing Dauchy’s Montesquieu',
      dauchyRefs: ['¶7', '¶14'],
      paragraphs: [
        'Thank you, Serge, and thank you, Arno. I would like to discuss two connected questions: how political liberty depends on the setting in which powers are exercised, and what happens when legal ideas move between settings. [PAUSE 2s]',
        'Serge, your invitation to consider the Brazilian Civil Code of 1916 gives me a concrete starting point: article 6, which listed married women among the relatively incapable.',
        'Following Arno’s suggestion, two images will accompany the argument. My question is how they make relationships of authority visible, including the relationship between the sexes that the Code organised. [CLICK]'
      ],
      cues: ['[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 2,
      slideNumber: 2,
      header: '2 / 7 · What sustains political liberty?',
      dauchyRefs: ['¶7', '¶8–10'],
      paragraphs: [
        'Serge, I would like to begin with your distinction between constitutional design and the historical conditions of liberty. The starting point is the relation between a constitutional arrangement and the conditions that sustain liberty. Separating governmental functions must be supported by civil and criminal laws and by institutions, above all judicial ones.',
        'Your reading of the spirit of the laws makes that setting central: laws belong to particular histories and interact with religion, commerce and mores. [PAUSE 2s]',
        'Montesquieu gives that setting a gendered form. In Book Seven he writes that in republics women are free by the laws and held captive by mores. The distinction between law and mores, which your reading puts at the centre, is where he places women.',
        'Carole Pateman gives this question a critical edge. In The Sexual Contract, she argues that the familiar story of free and equal contracting individuals leaves a sexual contract out of view: an ordering of relations between women and men that helps constitute civil freedom itself. I use this as a critical question, rather than as evidence of Montesquieu’s influence in Brazil.',
        'So I would ask whose liberty the setting sustains. When we look for the separation of powers historically, should we also look at how authority was distributed inside the household? [CLICK]'
      ],
      cues: ['[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 3,
      slideNumber: 4,
      header: '3 / 7 · Brazil: reception through adaptation',
      dauchyRefs: ['¶6'],
      paragraphs: [
        'Your Brazilian discussion already complicates the idea of straightforward reproduction. You describe the circulation of Montesquieu’s writings and then the Constitution of 1824, with its four powers and its relationship to Benjamin Constant. [PAUSE 2s]',
        'That example separates the circulation of a text, the appropriation of an argument and the construction of an institution. Each requires its own evidence, and a familiar vocabulary does not settle how authority was organised.',
        'The same care applies to images. A conventional attribute cannot by itself tell us which author was read. [CLICK]'
      ],
      cues: ['[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 4,
      slideNumber: 5,
      header: '4 / 7 · Who is party to the constitutional relationship?',
      dauchyRefs: ['¶6', '¶7'],
      paragraphs: [
        'Aurélio de Figueiredo’s Compromisso Constitucional, painted in 1896, shows Deodoro’s constitutional oath of February 1891. Deodoro holds a book before the assembly; Prudente de Moraes, its president, occupies the centre. [LOOK 5s]',
        'The relationship between the figures matters more than an emblem for each branch. Executive authority appears in the act of a commitment that article 44 of the 1891 Constitution prescribed, before powers that article 15 called harmonious and independent.',
        'Look also at the gallery. Women are present as spectators, above the floor where the commitment is made. I read the composition as placing them outside the constitutional relationship it represents. That is an interpretation of the image; it does not document who attended the session. [PAUSE 2s]',
        'Read with your argument, the scene needs its institutions and its society. It does not, by itself, prove a reception of Montesquieu. [CLICK]'
      ],
      cues: ['[LOOK 5s]', '[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 5,
      slideNumber: 6,
      header: '5 / 7 · A woman’s figure before the Court',
      dauchyRefs: ['¶7'],
      paragraphs: [
        'Arno also suggested the sword of Justice as a sign of judicial autonomy. Ceschiatti’s A Justiça, outside the Supreme Federal Court, lets us turn that suggestion into a question: what authorises the move from a sword to a claim about independence? [LOOK 5s]',
        'Montesquieu wrote, in Book Eleven, that of the three powers, judging is in some fashion null. A stone figure before a permanent court makes that power far more visible.',
        'The figure is a woman. She was placed before the Court in 1961. Until the following year, the Civil Code still counted married women among the relatively incapable; Law 4,121 of 1962 removed them from article 6. [PAUSE 2s]',
        'I do not suggest that the sculptor commented on the Code. The juxtaposition is mine. It shows how a feminine figure can lend authority to an institution within a legal order that limited the capacity of actual women. Whether the sword speaks of independence has to be established through its historical use. [CLICK]'
      ],
      cues: ['[LOOK 5s]', '[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 6,
      slideNumber: 6,
      header: '6 / 7 · Article 6 and the Civil Code of 1916',
      dauchyRefs: ['¶10', '¶11–12', '¶13–14'],
      paragraphs: [
        'This brings us to your invitation. You suggest that the 1916 Code, drafted by Clóvis Beviláqua, probably illustrates hybridity, and you ask whether the transplant question was raised during its long preparation. Between Montesquieu’s warning and that question you place Watson, Legrand and the renegotiation of legal boundaries. [PAUSE 2s]',
        'Article 6 offers one place to look. It declared married women relatively incapable while the conjugal society lasted. Beviláqua denied any mental inferiority; the restriction rested, he wrote, on the diversity of functions the spouses were called to perform. He described his draft as being as liberal as it was permitted to be.',
        'This is a contextual argument, close in form to the one you draw from Montesquieu: law must suit its setting. Here it served to limit liberty. Beviláqua also surveyed foreign codes, noting which kept the incapacity and which did not, so the choice among models was itself made in the name of local mores.',
        'The record is contested. A peer-reviewed study places the incapacity in his original draft; in 1937 Beviláqua wrote that it was an addition by the revising commission, accepted against his objections. I have not yet seen the draft itself, so I leave that point open. [CLICK]'
      ],
      cues: ['[PAUSE 2s]', '[CLICK]']
    },
    {
      page: 7,
      slideNumber: 7,
      header: '7 / 7 · Two questions for Serge Dauchy',
      dauchyRefs: ['¶6–7', '¶10–14'],
      paragraphs: [
        'I would therefore put two questions to you, Serge. [PAUSE 2s]',
        'First, when a rule is defended as suited to a people, does the argument from context circulate too? In 1916 the language of suitability justified keeping married women under their husbands’ direction. Does that count as resistance to transplantation, or as one of its forms? [PAUSE 3s]',
        'Second, can a history of reception follow whose liberty the setting sustained? The women in the gallery of 1891 and the feminine Justice of 1961 belong to a legal order in which married women’s capacity was limited until 1962.',
        'This is where I see legal iconography contributing to your discussion. Read with institutional and textual evidence, images show how authority is made visible, and for whom. Thank you. [STAY ON SLIDE]'
      ],
      cues: ['[PAUSE 2s]', '[PAUSE 3s]', '[STAY ON SLIDE]']
    }
  ]
};

/**
 * Structured Deep Research Dossier embedded from
 * /public/assets/aistudio/Paste_November_11__2026_-_2_49PM_c357fc36
 */
export const DEEP_RESEARCH_DOSSIER = {
  title:
    'Deep Research Dossier: Commenting on Serge Dauchy’s Analysis of Montesquieu’s De l’esprit des lois and the Paradox of Gender',
  sourceUrl: './public/assets/aistudio/Paste_November_11__2026_-_2_49PM_c357fc36',
  executiveSynthesis:
    'Positions the discussant intervention along two complementary axes that converge in the 1916 Brazilian Civil Code: (1) directly answering Serge Dauchy’s comparative-law and Brazilian historiographical questions (Clóvis Beviláqua at the Escola do Recife, 1789/1798/1824 primary archives, Book XII’s penal “system of liberty,” and Catherine II’s 1767 Nakaz); and (2) integrating Montesquieu’s paradox of gender across Books VII, XVI, XIX, Lettres persanes, Revolutionary France (1793), and Article 6 of the 1916 Civil Code (Law 4,121 of 1962).',
  archivalReceptionTable: [
    {
      episode: 'Inconfidência Mineira (1789)',
      dauchyRef: '¶6 · Nourished 1789 discussions in Minas Gerais via Coimbra/French networks.',
      archivalExpansion:
        'Primary evidence in the Autos de Sequestro (Autos da Devassa da Inconfidência Mineira): Canon Luís Vieira da Silva’s seized library in Mariana contained 267 titles in 569 volumes, featuring Montesquieu alongside Condillac, Voltaire, Diderot, Rousseau, d’Alembert, Mably, Raynal, Turgot, Burlamaqui, and Vatel. Inspired the satirical Cartas Chilenas in Vila Rica.'
    },
    {
      episode: 'Conjuração Baiana / Revolt of the Tailors (1798)',
      dauchyRef: '¶6 · Confiscation inventory of physician and philosopher Cipriano Barata in Salvador da Bahia.',
      archivalExpansion:
        'Kátia Queirós Mattoso (Presença francesa no movimento democrático baiano de 1798) analyzed the seized libraries of Cipriano Barata (74 books) and Lt. Hermógenes Francisco de Aguilar Pantoja, confirming both Montesquieu’s De l’esprit des lois (Paris: Didot) and Lettres persanes (Amsterdam) alongside Voltaire, Rousseau, Raynal, Locke, Volney, and Paine—crossing class and racial lines via handwritten pasquins.'
    },
    {
      episode: '1823 Constituent Assembly & 1824 Constitution',
      dauchyRef: '¶6 · Abundantly cited in 1823; 1824 four powers inspired by Benjamin Constant as « une évolution voire une correction ».',
      archivalExpansion:
        'Debated by Antônio Carlos Ribeiro de Andrada, José Joaquim Carneiro de Campos (Marquis of Caravelas), and José da Silva Lisboa (Viscount of Cairu). After Dom Pedro I dissolved the Assembly (12 Nov. 1823), Carneiro de Campos drafted the 1824 Charter: whereas Constant separated the Moderating Power from the Executive, Articles 98 and 101 (§ VI) vested both Moderating Power and Executive headship in the Emperor.'
    }
  ],
  sections: [
    {
      id: 'dossier-part1-bevilaqua',
      part: 'PART I · ANSWERING SERGE DAUCHY (¶6–14)',
      title: '1. Answering Dauchy’s Closing Question: Clóvis Beviláqua, the Escola do Recife & the 1916 Civil Code',
      dauchyParagraphs: ['¶10', '¶11', '¶12', '¶13', '¶14'],
      summary:
        'Before drafting the 1899 Civil Code project (promulgated as Law No. 3,071 on 1 Jan. 1916), Clóvis Beviláqua taught Comparative Legislation at Recife and published Resumo das Lições de Legislação Comparada sobre o Direito Privado (1893; 2nd ed. 1897). Anchored in the Escola do Recife, he explicitly engaged Montesquieu’s Book I, ch. 3 and formulated a non-Eurocentric taxonomy (highlighted by Mario Losano) recognizing Latin America as an autonomous, constitutively hybrid legal family.',
      keyQuote:
        'In Em Defesa do Projeto de Código Civil Brasileiro (1906), Beviláqua argued that codes operate as “philosophical systems” (sistemas filosóficos) filtering comparative European legislation through Rudolf von Jhering’s teleology and Brazilian “benignidade jurídica” (legal benignity)—exemplifying Gunther Teubner’s (1998) “Legal Irritants” and Dauchy’s ¶14 thesis.'
    },
    {
      id: 'dossier-part1-liberty-nakaz',
      part: 'PART I · ANSWERING SERGE DAUCHY (¶2–3, ¶7)',
      title: '2. Beyond “Pure Constitutionalism”: Book XII’s Penal System of Liberty & Catherine II’s 1767 Nakaz',
      dauchyParagraphs: ['¶2', '¶3', '¶7'],
      summary:
        'Grounds Dauchy’s warning in ¶7 by contrasting Book XI (constitutional separation of powers) with Book XII (political liberty in relation to the citizen), linking Montesquieu’s critique of the 1670 Ordonnance criminelle to Cesare Beccaria. Also exposes Catherine the Great’s geopolitical subversion in copying half of her 655 Nakaz articles (1767) from Montesquieu: declaring « La Russie est une puissance européenne » (Art. 6) while excising his division of powers and intermediary bodies to bolster autocracy.',
      keyQuote:
        '« C’est donc de la bonté des lois criminelles que dépend principalement la liberté du citoyen. » — Montesquieu, De l’esprit des lois, Livre XII, chap. 2.'
    },
    {
      id: 'dossier-part2-thermometer',
      part: 'PART II · MONTESQUIEU’S PARADOX OF GENDER',
      title: '3. Women as a Diagnostic “Thermometer” of Political Regimes (Books VII & XIX)',
      dauchyParagraphs: ['¶4', '¶8', '¶9'],
      summary:
        'In Book VII, the condition of women is a structural consequence of each regime’s principle: under Despotism (fear), domestic female confinement in the seraglio stabilizes servitude; under Monarchy (honor), women’s courtly freedom and fashion drive doux commerce (« gâte les mœurs et forme le goût », XIX.8); under a Republic (virtue), women are formally free by law yet strictly policed by mores and sumptuary tribunals.',
      keyQuote:
        '« Dans les républiques, les femmes sont libres par les lois, et captivées par les mœurs ; le luxe en est banni, et avec lui la corruption et les vices. » — Montesquieu, De l’esprit des lois, Livre VII, chap. 9.'
    },
    {
      id: 'dossier-part2-climate-sovereignty',
      part: 'PART II · MONTESQUIEU’S PARADOX OF GENDER',
      title: '4. Empire of Climate (Book XVI), Paradox of Female Sovereignty (VII.17) & Lettres persanes (1721)',
      dauchyParagraphs: ['¶2', '¶9'],
      summary:
        'Contrasts Book XVI’s physiological determinism on « servitude domestique » in hot vs. temperate climates (XVI.1–2, XVI.8–10) with two remarkable counter-movements: Book VII, ch. 17 (De l’administration des femmes), where Montesquieu decouples household rule from public empire—arguing that women’s gentleness and moderation make them excel as heads of state in England, Muscovy, and India—and the proto-feminist critiques of male tyranny in Lettres persanes Letter 38 (Rica on equal education) and Letter 161 (Roxane’s final assertion of natural-law independence).',
      keyQuote:
        '« Il est contre la raison et contre la nature que les femmes soient maîtresses dans la maison [...] ; mais il ne l’est pas qu’elles gouvernent un empire. » — Montesquieu, Livre VII, chap. 17 · « Non : j’ai pu vivre dans la servitude ; mais j’ai toujours été libre : j’ai réformé tes lois sur celles de la nature. » — Roxane, Lettres persanes, Lettre 161.'
    },
    {
      id: 'dossier-part2-afterlives',
      part: 'PART II · MONTESQUIEU’S PARADOX OF GENDER',
      title: '5. Dual Historical Afterlives: Revolutionary France (1793) & Article 6 of the 1916 Brazilian Civil Code',
      dauchyParagraphs: ['¶6', '¶7', '¶14'],
      summary:
        'Traces two concrete institutional afterlives: (1) On 30 Oct. 1793 (9 Brumaire Year II), Jacobin deputy Jean-Pierre-André Amar invoked republican female modesty (retenue) and domestic duties to outlaw women’s political clubs while the Republic elevated Marianne and Justice as state allegories; (2) In Brazil, Clóvis Beviláqua’s 1899 Projeto Primitivo omitted married women from civil incapacity, or as Beviláqua recounted in 1937, conservative parliamentarians led by Domingos de Andrade Figueira reinstated married women in Article 6, II as relatively incapable in the name of local family mores—a subordination that persisted until the Estatuto da Mulher Casada (Law No. 4,121 of 27 August 1962), one year after Ceschiatti’s feminine stone figure A Justiça (1961) was placed before the STF.',
      keyQuote:
        'Juxtaposes the female spectators in the gallery of Figueiredo’s Compromisso Constitucional (1896; oath of 1891) and Ceschiatti’s feminine A Justiça (1961, STF) with Article 6 of the 1916 Civil Code (repealed for married women by Law 4,121 of 1962).'
    }
  ]
};

export const PRINCIPAL_SLIDES = [
  {
    number: 1,
    id: 'slide-1',
    navLabel: '01 · Cover',
    kicker: '01 · STAGE 1: THE AUTHOR AND HIS PROBLEM · PPGD-UFSC · 11 NOVEMBER 2026',
    title: 'Montesquieu and the three powers',
    subtitle: 'Political liberty, legal images, and institutional autonomy in Brazil',
    presenter: 'Ana Vitória Vanzin Mendes · Discussant',
    durationSeconds: 50,
    targetDurationLabel: '0:50',
    estimatedAt125Wpm: '0:50',
    pauseSeconds: 5,
    answeredParagraphs: ['p7', 'p13-14'],
    dauchyParagraphRefs: ['¶1', '¶7', '¶14'],
    matchingScriptPage: 1,
    centralQuestion:
      'How does Montesquieu’s account of the three powers relate to the wider institutional, legal, and social conditions that sustain political liberty—and what happens when those ideas move to Brazil?',
    montesquieuAnchor:
      'Serge Dauchy, « Montesquieu, De l’esprit des lois (1748) » (¶7 on liberty beyond a purely “constitutionalist” reading; ¶14 on hybridity and the 1916 Brazilian Civil Code).',
    keyPoint:
      'Engages Serge Dauchy’s paper by connecting the distribution of powers, Brazilian constitutional adaptation (1824), institutional images (1896, 1961), and the 1916 Civil Code.',
    lecternScript: {
      page: 1,
      heading: 'Slide 1  Montesquieu and the three powers',
      elapsedRange: '0:00–0:50 · Target 0:50',
      stageLabel: 'Stage 1: the author and his problem',
      instruction:
        'Read the full prose (~125 wpm). Bracketed cues are silent. Press D at any time to inspect Serge Dauchy’s embedded 14-paragraph paper (¶1–14) or switch to the Matching Script Final PDF.',
      paragraphs: [
        {
          leadIn: 'Good afternoon. Thank you,',
          rest: 'Serge, for a rich paper, and thank you to Professor Arno Dal Ri Júnior and colleagues at PPGD/UFSC.'
        },
        {
          leadIn: 'I am Ana Vitória',
          rest: 'Vanzin Mendes, and my title is “Montesquieu and the three powers: political liberty, legal images, and institutional autonomy in Brazil.”'
        },
        {
          leadIn: 'Following Serge’s paper, I',
          rest: 'move in three steps: first, Montesquieu and his problem of limiting power; second, how Brazilian institutions and legal images in 1824, 1896, and 1961 staged those relationships; and third, two questions for Serge on context, reception, and what was lost when Montesquieu came to be read mainly through the separation of powers.'
        }
      ],
      stageCue: '[Pause 3 s. CHANGE TO SLIDE 2.]'
    },
    presenterTip: {
      heading: 'Opening & Three-Stage Arc (Dauchy ¶1, ¶7, ¶14)',
      pacing: '0:00–0:50 · Target 0:50',
      cues: [
        {
          label: 'Stage 1 · The Author and His Problem',
          text: 'Anchor in Serge Dauchy’s manuscript (¶1–4, ¶7): political liberty requires more than a written constitutional formula.'
        },
        {
          label: 'Stage 2 · Institutions & Legal Images in Brazil',
          text: 'Connect the 1824 Constitution (¶6), Figueiredo’s 1896 Compromisso Constitucional, and Ceschiatti’s 1961 A Justiça before the STF.'
        },
        {
          label: 'Stage 3 · Embedded Dauchy Paper & Matching Script',
          text: 'Press L for the Lectern Script / Matching Script Final PDF, or press D to inspect Dauchy’s verbatim French paragraphs (¶1–14).'
        }
      ],
      guardrail:
        'Guardrail: Keep sources and your interpretation distinct; never claim the artworks prove direct reception of Montesquieu.'
    },
    constellation: {
      mode: 'triad',
      caption: 'Montesquieu & Three Powers',
      nodes: [
        { id: 'leg', label: 'Legislative', x: 22, y: 48 },
        { id: 'exec', label: 'Executive', x: 78, y: 48 },
        { id: 'jud', label: 'Judicial', x: 50, y: 20 },
        { id: 'dom', label: 'Liberty', x: 50, y: 80, subtle: true }
      ]
    },
    artwork: {
      title: 'Portrait of Charles-Louis de Secondat, Baron de Montesquieu',
      date: '18th-century engraving (oval medallion)',
      src: './assets/report/montesquieu-oval.webp',
      verified: true,
      caption: 'Charles-Louis de Secondat, Baron de Montesquieu (1689–1755) · De l’esprit des lois (1748).'
    }
  },
  {
    number: 2,
    id: 'slide-2',
    navLabel: '02 · Montesquieu',
    kicker: '02 · STAGE 1: THE AUTHOR AND HIS PROBLEM · 1689–1755',
    title: 'Who was Montesquieu',
    subtitle: 'Charles-Louis de Secondat (1689–1755) · Parlement of Bordeaux · De l’esprit des lois (1748)',
    durationSeconds: 75,
    targetDurationLabel: '1:15',
    estimatedAt125Wpm: '1:15',
    pauseSeconds: 5,
    answeredParagraphs: ['p1-4', 'p7', 'p8-10'],
    dauchyParagraphRefs: ['¶1', '¶2', '¶4', '¶7', '¶8–10'],
    matchingScriptPage: 2,
    centralQuestion:
      'How did Montesquieu’s experience as a magistrate in the Parlement of Bordeaux and his study of societal circumstances shape his account of political liberty?',
    montesquieuAnchor:
      'Dauchy ¶1–2 (Parlement of Bordeaux, Lettres persanes, 1670 Ordonnance) and ¶7–10 (civil and criminal laws, judicial frame, and esprit général in XIX.4).',
    keyPoint:
      'More than a diagram of government: asking how power operates, what restrains it, and under what legal, judicial, and social conditions citizens live without fearing arbitrary power.',
    lecternScript: {
      page: 2,
      heading: 'Slide 2  Who was Montesquieu',
      elapsedRange: '0:50–2:05 · Target 1:15',
      stageLabel: 'Stage 1: judicial magistracy, societal context, and security under laws',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'As Serge reminds us',
          rest: 'at the opening of his paper, Charles-Louis de Secondat, Baron de Montesquieu, inherited the office of président à mortier in the Parlement of Bordeaux—a judicial court of the Ancien Régime, not a modern legislative parliament.'
        },
        {
          leadIn: 'When De l’esprit des',
          rest: 'lois appeared in 1748, Montesquieu was not offering an abstract geometric diagram. He examined how laws relate to each form of government and to a society’s customs, religion, commerce, climate, and history—what he called its general spirit.'
        },
        {
          leadIn: 'And as Serge emphasizes',
          rest: 'in paragraph seven, confining Montesquieu to a purely “constitutionalist” reading is reductive: political liberty means security under laws, supported by civil and criminal laws and by judicial institutions.'
        }
      ],
      stageCue: '[Pause 3 s. CHANGE TO SLIDE 3.]'
    },
    presenterTip: {
      heading: 'Montesquieu’s Magistracy & Esprit Général (Dauchy ¶1–2, ¶7–10)',
      pacing: '0:50–2:05 · Target 1:15',
      cues: [
        {
          label: 'Magistrate in the Parlement of Bordeaux (¶1)',
          text: 'Clarify that an Ancien Régime Parlement was a sovereign judicial court, shaping Montesquieu’s attention to procedure and judging.'
        },
        {
          label: 'The Spirit of the Laws (1748) & Esprit Général (¶4, ¶8–10)',
          text: 'Laws interact with government principles (virtue, honor, fear) and with mores, religion, commerce, and history (XIX.4).'
        },
        {
          label: 'Security Under Laws & Gendered Mores (¶7, Book VII.9)',
          text: 'Dauchy ¶7 stresses civil/criminal laws and judicial institutions; Matching Script 2/7 notes Book VII.9 (« libres par les lois, et captivées par les mœurs »).'
        }
      ],
      guardrail:
        'Guardrail: Emphasize that the Parlement of Bordeaux was a judicial court, not a modern legislature, and keep « système de liberté » as Dauchy’s attribution (¶7).'
    },
    constellation: {
      mode: 'dual-tension',
      caption: 'Magistracy, Context & Liberty',
      nodes: [
        { id: 'leg', label: 'Parlement (Court)', x: 22, y: 46 },
        { id: 'exec', label: 'Esprit Général', x: 50, y: 22 },
        { id: 'jud', label: 'Judicial Frame', x: 78, y: 54 },
        { id: 'dom', label: 'Security Under Laws', x: 50, y: 76 }
      ]
    },
    elements: [
      {
        id: 'court',
        label: 'Magistrate in the Parlement of Bordeaux',
        detail: 'A judicial court (1689–1755), not a parliament in the modern legislative sense.'
      },
      {
        id: 'spirit',
        label: 'The Spirit of the Laws (1748)',
        detail: 'Relates laws to forms of government and societal circumstances: customs, religion, commerce, geography, and history.'
      },
      {
        id: 'liberty',
        label: 'Political liberty as security under laws',
        detail: 'Requires security under laws and limits on those who exercise public power—distribution of powers is one essential part.'
      }
    ]
  },
  {
    number: 3,
    id: 'slide-3',
    navLabel: '03 · Three Powers',
    kicker: '03 · DE L’ESPRIT DES LOIS (1748), BOOK XI, CHAPTER 6',
    title: 'Three powers, limits on power',
    subtitle: 'De l’esprit des lois (1748), Book XI, chapter 6 · Preventing arbitrary concentration',
    durationSeconds: 90,
    targetDurationLabel: '1:30',
    estimatedAt125Wpm: '1:30',
    pauseSeconds: 5,
    answeredParagraphs: ['p7'],
    dauchyParagraphRefs: ['¶7'],
    matchingScriptPage: 2,
    centralQuestion:
      'Why does Book XI, chapter 6 distinguish legislative, executive, and judicial functions, and how does Montesquieu’s account of judging differ from modern permanent constitutional courts?',
    montesquieuAnchor:
      'Montesquieu, De l’esprit des lois (1748), Book XI, ch. 6 (« celle de juger est en quelque façon nulle ») and Book XII, ch. 2 (goodness of criminal laws); Dauchy ¶7.',
    keyPoint:
      'Relational arrangements prevent unchecked accumulation of legislative, executive, and judicial authority—while marking historical distance from today’s permanent constitutional courts.',
    lecternScript: {
      page: 3,
      heading: 'Slide 3  Three powers, limits on power',
      elapsedRange: '2:05–3:35 · Target 1:30',
      stageLabel: 'Stage 1: Book XI, chapter 6 and historical distance',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'In Book Eleven, chapter',
          rest: 'six of De l’esprit des lois, Montesquieu distinguishes three functions: making laws, executing public resolutions, and judging crimes or disputes between individuals.'
        },
        {
          leadIn: 'His warning is negative',
          rest: 'and relational: if legislative and executive power are united in the same person or body, there is no liberty; if the power of judging is joined to the legislative, the judge becomes the legislator; if joined to the executive, the judge may have the force of an oppressor.'
        },
        {
          leadIn: 'At the same time,',
          rest: 'we must mark our historical distance: when Montesquieu writes that the power of judging is “in some fashion null,” he is not describing today’s permanent constitutional courts.'
        }
      ],
      stageCue: '[Pause 4 s. CHANGE TO SLIDE 4.]'
    },
    presenterTip: {
      heading: 'Book XI, Ch. 6 & Historical Distance (Dauchy ¶7)',
      pacing: '2:05–3:35 · Target 1:30',
      cues: [
        {
          label: 'Three Functions & Negative Guarantee',
          text: 'Making laws, conducting government, judging crimes/disputes: separating them prevents any one holder from enacting and enforcing oppressive laws.'
        },
        {
          label: 'Relational Balance, Not Isolation',
          text: 'As Dauchy notes in ¶7, England provided Montesquieu with a balance of social forces and institutional regulation, seconded by civil and criminal laws (Book XII.2).'
        },
        {
          label: 'Historical Distance · « En quelque façon nulle »',
          text: 'Montesquieu’s judging power in XI.6 is not a description of modern permanent constitutional courts.'
        }
      ],
      guardrail:
        'Guardrail: State clearly that Montesquieu’s account of judging in Book XI, ch. 6 is not a description of permanent constitutional courts.'
    },
    constellation: {
      mode: 'triad',
      caption: 'Book XI, Ch. 6 · Three Functions',
      nodes: [
        { id: 'leg', label: 'Legislative', x: 20, y: 64 },
        { id: 'exec', label: 'Executive', x: 80, y: 64 },
        { id: 'jud', label: 'Judicial', x: 50, y: 18 },
        { id: 'dom', label: 'Limits on Power', x: 50, y: 52 }
      ]
    },
    functions: [
      {
        id: 'legislative',
        label: 'I · LEGISLATIVE',
        title: 'Making laws',
        risk: 'Joined with execution: the same authority can enact oppressive laws and enforce them.'
      },
      {
        id: 'executive',
        label: 'II · EXECUTIVE',
        title: 'Conducting government',
        risk: 'Joined with judging: judging can acquire the force of an oppressor.'
      },
      {
        id: 'judicial',
        label: 'III · JUDICIAL',
        title: 'Judging crimes and disputes',
        risk: 'Joined with legislation: the judge can become the lawmaker.'
      }
    ]
  },
  {
    number: 4,
    id: 'slide-4',
    navLabel: '04 · Brazil 1824',
    kicker: '04 · STAGE 2: INSTITUTIONS AND THEIR IMAGES · CONSTITUTION OF 1824',
    title: 'Montesquieu in Brazil, 1824',
    subtitle: 'Serge Dauchy, ¶6 · Constituição Política do Império do Brazil (1824), Article 10',
    durationSeconds: 70,
    targetDurationLabel: '1:10',
    estimatedAt125Wpm: '1:10',
    pauseSeconds: 5,
    answeredParagraphs: ['p5-6'],
    dauchyParagraphRefs: ['¶6'],
    matchingScriptPage: 3,
    centralQuestion:
      'How does Serge Dauchy’s account of Brazilian circulation in paragraph 6—and the four-power architecture of Article 10 of the 1824 Constitution—complicate straightforward models of reception?',
    montesquieuAnchor:
      'Serge Dauchy, ¶6 (1789 Minas Gerais, 1798 Cipriano Barata inventory in Bahia, 1823 Constituent Assembly, 1824 Constitution) · 1824 Constitution, Art. 10 (Legislative, Moderating, Executive, Judicial).',
    keyPoint:
      'Separates the circulation of a text, the appropriation of an argument, and the construction of an institution: Brazil’s 1824 Moderating Power drew on Benjamin Constant for an imperial monarchy.',
    lecternScript: {
      page: 4,
      heading: 'Slide 4  Montesquieu in Brazil, 1824',
      elapsedRange: '3:35–4:45 · Target 1:10',
      stageLabel: 'Stage 2: institutions and their images (Dauchy ¶6)',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'In paragraph six, Serge',
          rest: 'traces how De l’esprit des lois circulated in Brazil despite censorship—from the 1789 Inconfidência Mineira and Cipriano Barata’s confiscated library in 1798 Bahia to the 1823 Constituent Assembly.'
        },
        {
          leadIn: 'Yet when the Imperial',
          rest: 'Constitution of 1824 was promulgated, Article ten established four political powers in this exact sequence: Legislative, Moderating, Executive, and Judicial.'
        },
        {
          leadIn: 'As Serge notes, this',
          rest: 'four-power architecture drew on Benjamin Constant as an “evolution or even a correction” of Montesquieu’s tripartition: the Moderating Power belonged to the Emperor, showing that circulation, political argument, and institutional design are distinct historical steps.'
        }
      ],
      stageCue: '[Pause 4 s. CHANGE TO SLIDE 5.]'
    },
    presenterTip: {
      heading: 'Brazil 1824: Four Powers & Adaptation (Dauchy ¶6)',
      pacing: '3:35–4:45 · Target 1:10',
      cues: [
        {
          label: 'Dauchy ¶6 & Archival Deepening (1789, 1798, 1823)',
          text: '1789 Mariana sequestration (Canon Luís Vieira da Silva’s 267 titles); 1798 Bahia (Cipriano Barata’s 74 books & Lt. Pantoja); 1823 Constituent Assembly.'
        },
        {
          label: '1824 Constitution, Art. 10 · Exact Sequence',
          text: 'Legislative, Moderating, Executive, Judicial — inspired by Benjamin Constant (« une évolution voire une correction » in Dauchy ¶6).'
        },
        {
          label: 'Distinguishing Circulation from Institution-Building',
          text: 'In 1824 (Arts. 98 & 101 § VI), Dom Pedro I held both the Moderating Power and the Executive headship—not a fourth branch invented by Montesquieu.'
        }
      ],
      guardrail:
        'Guardrail: Make clear that the Moderating Power belonged to the Emperor under Benjamin Constant’s model and was not a fourth branch invented by Montesquieu.'
    },
    constellation: {
      mode: 'four-powers',
      caption: '1824 Art. 10 · Four Powers',
      nodes: [
        { id: 'dom', label: 'Moderating', x: 50, y: 14 },
        { id: 'leg', label: 'Legislative', x: 20, y: 64 },
        { id: 'exec', label: 'Executive', x: 50, y: 76 },
        { id: 'jud', label: 'Judicial', x: 80, y: 64 }
      ]
    },
    powersComparison: {
      threePowers: ['Legislative', 'Executive', 'Judicial'],
      fourPowers: ['Legislative', 'Moderating', 'Executive', 'Judicial']
    }
  },
  {
    number: 5,
    id: 'slide-5',
    navLabel: '05 · 1896 Oath',
    kicker: '05 · INSTITUTIONAL CEREMONY & OBLIGATION · 1891 / 1896',
    title: 'Representing distinct and related institutions',
    subtitle: 'Aurélio de Figueiredo, Compromisso Constitucional (1896; oath of 26 Feb. 1891) · Constitution of 1891, arts. 15 & 44',
    durationSeconds: 90,
    targetDurationLabel: '1:30',
    estimatedAt125Wpm: '1:30',
    pauseSeconds: 5,
    answeredParagraphs: ['p5-6', 'p7'],
    dauchyParagraphRefs: ['¶6', '¶7'],
    matchingScriptPage: 4,
    hasVisualPause: true,
    visualPauseSeconds: 5,
    visualPauseLabel: '5s Visual Look · Examine Figueiredo’s 1896 Canvas',
    centralQuestion:
      'How does Aurélio de Figueiredo’s 1896 painting stage executive authority under a constitutional obligation—and who is placed inside or outside that constitutional relationship?',
    montesquieuAnchor:
      'Aurélio de Figueiredo, Compromisso Constitucional (1896, oil on canvas, 330 × 257 cm, Museu da República; oath of 26 Feb. 1891) · Constitution of 1891, arts. 15 and 44.',
    keyPoint:
      'Stages Deodoro da Fonseca’s presidential oath before Congress (Prudente de Moraes at the centre) under Articles 15 and 44 of the 1891 Constitution—an interpretation of the image, not proof of de facto independence or direct influence from Montesquieu.',
    lecternScript: {
      page: 5,
      heading: 'Slide 5  Representing distinct and related institutions',
      elapsedRange: '4:45–6:15 · Target 1:30',
      stageLabel: 'Stage 2: Figueiredo’s Compromisso Constitucional (1896; oath of 26 Feb. 1891)',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'With that same care,',
          rest: 'let us look at Aurélio de Figueiredo’s Compromisso Constitucional, painted in 1896 and preserved in the Museu da República, which represents an event five years earlier: Deodoro da Fonseca taking the constitutional oath on 26 February 1891.'
        },
        {
          leadIn: 'Deodoro holds the constitutional',
          rest: 'book in a shared ceremony while Prudente de Moraes, president of the Constituent Congress, occupies the centre—staging the commitment prescribed by Article 44 before powers that Article 15 called harmonious and independent.'
        },
        {
          leadIn: 'In my reading, the',
          rest: 'composition makes executive authority under an obligation visible—and in the upper gallery, women appear as spectators above the floor where the commitment is made. Yet this is an interpretation of the image: it does not prove institutional independence in practice or a direct reception of Montesquieu.'
        }
      ],
      stageCue: '[Pause 5 s · Give the audience a moment to look at the painting. CHANGE TO SLIDE 6.]'
    },
    presenterTip: {
      heading: 'Figueiredo (1896) & 1891 Oath (Dauchy ¶6–7)',
      pacing: '4:45–6:15 · Target 1:30 (5s look)',
      pauseActionSlide: 5,
      cues: [
        {
          label: 'Catalogue Precision · 1896 Painting vs. 1891 Oath',
          text: 'Aurélio de Figueiredo, Compromisso Constitucional, 1896 (Museu da República · 330 × 257 cm · Reproduction: Romulo Fialdini). Depicts the oath of 26 Feb. 1891.'
        },
        {
          label: '1891 Constitution · Articles 15 & 44',
          text: 'Art. 15 declares Legislative, Executive, and Judicial powers harmonious and independent; Art. 44 prescribes the presidential oath before Congress.'
        },
        {
          label: 'Gallery Spectators & 5s Visual Look',
          text: 'Matching Script 4/7 notes women as spectators in the gallery above the floor. Frame strictly as your interpretation of the image.',
          isPauseCue: true
        }
      ],
      guardrail:
        'Guardrail: State explicitly that this is an interpretation of the image, not proof of independence in practice or direct reception of Montesquieu.'
    },
    constellation: {
      mode: 'floor-gallery',
      caption: '1896 Canvas · Oath & Obligation',
      nodes: [
        { id: 'exec', label: 'Deodoro · Oath', x: 26, y: 64 },
        { id: 'leg', label: 'Prudente · Congress', x: 52, y: 42 },
        { id: 'jud', label: '1891 Arts. 15 & 44', x: 76, y: 64 },
        { id: 'dom', label: 'Gallery Spectators', x: 50, y: 18 }
      ]
    },
    artwork: {
      title: 'Compromisso Constitucional',
      artist: 'Aurélio de Figueiredo',
      paintingDate: '1896',
      eventDate: '26 February 1891',
      src: './assets/report/compromisso.jpg',
      verified: true,
      caption: 'Aurélio de Figueiredo, Compromisso Constitucional, 1896. Represents Deodoro’s oath of 26 February 1891.',
      credit: 'Museu da República · Oil on canvas, 330 × 257 cm · Reproduction: Romulo Fialdini'
    }
  },
  {
    number: 6,
    id: 'slide-6',
    navLabel: '06 · 1961 Justice',
    kicker: '06 · PRAÇA DOS TRÊS PODERES · BRASÍLIA, 1961',
    title: 'Ceschiatti’s Justice: the sword and autonomy',
    subtitle: 'Alfredo Ceschiatti, A Justiça (1961, STF) · Montesquieu XI.6 · Dauchy ¶7 & ¶11–14 (1916 Civil Code)',
    durationSeconds: 125,
    targetDurationLabel: '2:05',
    estimatedAt125Wpm: '2:05',
    pauseSeconds: 5,
    answeredParagraphs: ['p7', 'p11-14'],
    dauchyParagraphRefs: ['¶7', '¶10', '¶11–12', '¶13–14'],
    matchingScriptPage: 5,
    centralQuestion:
      'What authorizes the move from the resting sword of Ceschiatti’s A Justiça (1961) to a claim about judicial autonomy—and how does Dauchy’s closing question on the 1916 Civil Code sharpen what sustains liberty?',
    montesquieuAnchor:
      'Alfredo Ceschiatti, A Justiça (1961, STF, Brasília; photo: Fellipe Sampaio / STF) · Rafael Simioni (judicial autonomy) · Montesquieu XI.6 & I.3 · Dauchy ¶7 & ¶11–14 (Watson, Legrand, Teubner, and Beviláqua’s 1916 Civil Code).',
    keyPoint:
      'A sculpture can stage judicial autonomy as a visual ideal in the Praça dos Três Poderes, yet actual liberty depends on civil, criminal, and judicial guarantees—brought into focus by Dauchy’s closing question on Clóvis Beviláqua’s 1916 Civil Code.',
    lecternScript: {
      page: 6,
      heading: 'Slide 6  Ceschiatti’s Justice: the sword and autonomy',
      elapsedRange: '6:15–8:20 · Target 2:05',
      stageLabel: 'Stage 2–3: Ceschiatti (1961), Dauchy ¶7, and the 1916 Civil Code (¶11–14)',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'Our second visual case',
          rest: 'is Alfredo Ceschiatti’s A Justiça, placed in 1961 before the Supremo Tribunal Federal in Brasília’s Praça dos Três Poderes alongside Congress and the presidential palace.'
        },
        {
          leadIn: 'Taking up Arno’s prompt',
          rest: 'as a contextual hypothesis about this sculpture in this setting—and Rafael Simioni’s study on judicial autonomy—the sword rests across Justice’s lap rather than being brandished as force, making visible a judicial power that Montesquieu in Book Eleven, chapter six had called “in some fashion null.”'
        },
        {
          leadIn: 'Yet a visual ideal',
          rest: 'cannot show whether judges are protected from interference or whose liberty the legal order actually sustains—which brings us to paragraphs eleven through fourteen of Serge’s paper, where he moves from Montesquieu’s warning in Book One, chapter three through Alan Watson and Pierre Legrand to historical hybridity and Clóvis Beviláqua’s 1916 Civil Code.'
        }
      ],
      stageCue: '[Pause 4 s. CHANGE TO SLIDE 7.]'
    },
    presenterTip: {
      heading: 'Ceschiatti (1961), Autonomy & 1916 Code (Dauchy ¶7, ¶11–14)',
      pacing: '6:15–8:20 · Target 2:05',
      cues: [
        {
          label: 'Praça dos Três Poderes & Resting Sword',
          text: 'Alfredo Ceschiatti, A Justiça, 1961, before the STF (photo: Fellipe Sampaio / STF). Treat the sword on her lap as a contextual hypothesis alongside Rafael Simioni’s study.'
        },
        {
          label: 'Visual Ideal vs. Legal Guarantees (Dauchy ¶7)',
          text: 'Contrasts Montesquieu XI.6 (« en quelque façon nulle ») with a permanent Supreme Court; stone stages an ideal, but liberty requires civil, criminal, and judicial guarantees.'
        },
        {
          label: 'Bridge to Dauchy ¶11–14 & 1916 Civil Code',
          text: 'Matching Script 5/7 & 6/7 juxtapose the 1961 female figure of Justice with Article 6 of Beviláqua’s 1916 Civil Code (reformed by Law 4,121 of 1962).'
        }
      ],
      guardrail:
        'Guardrail: Cite Rafael Simioni on judicial autonomy, keep the juxtaposition with the 1916 Code explicitly as your own reading, and never claim the sculpture proves direct Montesquieu reception.'
    },
    constellation: {
      mode: 'conjugal-scale',
      caption: '1961 Justice · STF & Autonomy',
      nodes: [
        { id: 'jud', label: 'STF · A Justiça', x: 50, y: 20 },
        { id: 'leg', label: 'National Congress', x: 22, y: 66 },
        { id: 'exec', label: 'Planalto Palace', x: 78, y: 66 },
        { id: 'dom', label: 'Sword at Rest', x: 50, y: 78 }
      ]
    },
    artwork: {
      title: 'A Justiça',
      artist: 'Alfredo Ceschiatti',
      date: '1961',
      material: 'Granite / Stone (“pedra de Petrópolis”), 3.30 m',
      institution: 'Supremo Tribunal Federal, Praça dos Três Poderes, Brasília',
      src: './assets/report/justica.jpg',
      verified: true,
      caption: 'Alfredo Ceschiatti, A Justiça, 1961, Supremo Tribunal Federal, Brasília.',
      credit: 'Granite / Stone (“pedra de Petrópolis”), 3.30 m · Photograph: Fellipe Sampaio / STF'
    }
  },
  {
    number: 7,
    id: 'slide-7',
    navLabel: '07 · Questions',
    kicker: '07 · STAGE 3: THE DISCUSSION · DIALOGUE WITH SERGE DAUCHY',
    title: 'Questions for Serge',
    subtitle: 'Engaging Serge Dauchy ¶6–7 (conditions of liberty) & ¶10–14 (context, transplants, and hybridity)',
    durationSeconds: 70,
    targetDurationLabel: '1:10',
    estimatedAt125Wpm: '1:10',
    pauseSeconds: 5,
    answeredParagraphs: ['p5-6', 'p7', 'p8-10', 'p11-14'],
    dauchyParagraphRefs: ['¶6', '¶7', '¶10', '¶11–12', '¶13–14'],
    matchingScriptPage: 7,
    centralQuestion:
      '1. What changes in our understanding of context when we move from laws rooted in a particular society (¶10) to legal systems whose boundaries are constantly renegotiated (¶13–14)? · 2. What was lost when Montesquieu came to be read mainly through the separation of powers (¶7)?',
    montesquieuAnchor:
      'Engages Serge Dauchy’s two overarching movements: from Book I, ch. 3 (¶10) and Watson/Legrand (¶11–12) to hybridity and the 1916 Civil Code (¶13–14); and from constitutional separation of powers to a wider « système de liberté » (¶7).',
    keyPoint:
      'Opens the floor dialogue with Serge Dauchy on how contextual arguments circulate across legal borders and how legal history and iconography can trace whose liberty the institutional setting sustained.',
    lecternScript: {
      page: 7,
      heading: 'Slide 7  Questions for Serge',
      elapsedRange: '8:20–9:30 · Target 1:10',
      stageLabel: 'Stage 3: the discussion (engaging Dauchy ¶6–14)',
      instruction: '',
      paragraphs: [
        {
          leadIn: 'This brings me to',
          rest: 'two questions for Serge, connecting the two halves of his paper.'
        },
        {
          leadIn: 'First: you begin with',
          rest: 'Montesquieu’s insistence that laws belong to a particular society, and end with legal systems whose boundaries are constantly being renegotiated. What changes in our understanding of context when we move from the first picture to the second—and what evidence distinguishes borrowing from a change of legal meaning?'
        },
        {
          leadIn: 'Second: you show how',
          rest: 'Montesquieu came to be read mainly through the separation of powers. What do you think was lost in that reading—and where would you begin investigating a “system of liberty” beyond the constitution? Thank you, Serge.'
        }
      ],
      stageCue: '[Pause 5 s · STOP. Leave both questions on screen for Serge Dauchy.]'
    },
    presenterTip: {
      heading: 'Two Questions for Serge Dauchy (¶6–14)',
      pacing: '8:20–9:30 · Target 1:10',
      cues: [
        {
          label: 'Question 1 · Context, Transplants & Renegotiated Boundaries (¶10–14)',
          text: 'From Montesquieu I.3 (laws proper to one society) to Watson, Legrand, Teubner, and Beviláqua’s 1916 Code: does the argument from context circulate too?'
        },
        {
          label: 'Question 2 · Beyond the Separation of Powers (¶6–7)',
          text: 'What was lost when Montesquieu was reduced to a constitutional formula, and how do civil/criminal laws, judicial institutions, and legal images illuminate whose liberty was sustained?'
        },
        {
          label: 'Dossier Ready for Q&A (Beviláqua 1893/1906 & Book XII.2)',
          text: 'If Serge invites further detail on the 1916 Code, cite Beviláqua’s Lições de Legislação Comparada (1893/1897), Em Defesa do Projeto (1906), and Article 6 (Law 4,121/1962).'
        }
      ],
      guardrail: ''
    },
    constellation: {
      mode: 'open-horizon',
      caption: 'Two Questions for Serge Dauchy',
      nodes: [
        { id: 'leg', label: '¶10–14 Context', x: 20, y: 36 },
        { id: 'exec', label: 'Renegotiation', x: 44, y: 22 },
        { id: 'jud', label: '¶6–7 Liberty', x: 66, y: 26 },
        { id: 'dom', label: '1916 Code', x: 82, y: 46 }
      ]
    },
    questions: [
      {
        number: 1,
        text: '“You begin with Montesquieu’s insistence that laws belong to a particular society, and end with legal systems whose boundaries are constantly being renegotiated. What changes in our understanding of context when we move from the first picture to the second?”',
        subtext: 'What evidence distinguishes borrowing from a change of legal meaning? (Engaging ¶10–14 & the 1916 Civil Code)'
      },
      {
        number: 2,
        text: '“You show how Montesquieu came to be read mainly through the separation of powers. What do you think was lost in that reading?”',
        subtext: 'Where would you begin investigating a “system of liberty” beyond the constitution? (Engaging ¶6–7 & institutional iconography)'
      }
    ]
  }
];

export const CITATION_VERIFICATION_ITEMS = [
  {
    item: 'Serge Dauchy’s 14-paragraph manuscript « Montesquieu, De l’esprit des lois (1748) » (¶1–14)',
    status: 'verified',
    symbol: '✓',
    note: 'Complete verbatim French text embedded in-app (`DAUCHY_MANUSCRIPT_PARAGRAPHS`, ¶1–14) from S._Dauchy-Montesquieu_b10f60b2.md.'
  },
  {
    item: 'Montesquieu Matching Script Final PDF (1 / 7 – 7 / 7)',
    status: 'verified',
    symbol: '✓',
    note: 'Embedded directly from /public/assets/aistudio/Montesquieu_Matching_Script_Final_5fe68ce6.pdf with verbatim 7-page reader.'
  },
  {
    item: 'Deep Research Dossier: Commenting on Serge Dauchy’s Analysis & the Paradox of Gender',
    status: 'verified',
    symbol: '✓',
    note: 'Embedded from /public/assets/aistudio/Paste_November_11__2026_-_2_49PM_c357fc36 (Part I on Beviláqua & 1789/1798/1824 archives; Part II on Books VII, XVI, XIX, Lettres persanes, and Art. 6 of the 1916 Code).'
  },
  {
    item: 'Montesquieu I.3, VII.9, VII.17, XI.6, XII.2, XVI.2, XIX.4',
    status: 'verified',
    symbol: '✓',
    note: 'Wikisource 1777 & Nourse editions verified; « système de liberté » kept strictly as Dauchy’s analytical synthesis in ¶7.'
  },
  {
    item: 'Constituição de 1824 (arts. 10, 98, 101 § VI) & Constituição de 1891 (arts. 15 & 44)',
    status: 'verified',
    symbol: '✓',
    note: 'Câmara dos Deputados original publications verified (exact 1824 Art. 10 sequence: Legislativo, Moderador, Executivo, Judicial).'
  },
  {
    item: 'Compromisso Constitucional (Figueiredo, 1896) & A Justiça (Ceschiatti, 1961, STF)',
    status: 'verified',
    symbol: '✓',
    note: 'Museu da República (330 × 257 cm, Romulo Fialdini) and STF Acervo Cultural (3.30 m, Fellipe Sampaio / STF; Simioni 2021) verified.'
  }
];

export const PRIVATE_MANUSCRIPT_NOTES = [
  {
    number: 1,
    locus: 'Place of death (¶1)',
    detail:
      'Dauchy writes that Montesquieu was born at La Brède « et y décèdera ». Montesquieu died in Paris at his rue Saint-Dominique home (10 February 1755) and was buried at Saint-Sulpice.'
  },
  {
    number: 2,
    locus: 'Considérations sur les richesses de l’Espagne (¶9)',
    detail:
      'Remained unpublished during Montesquieu’s lifetime and first appeared in 1910 (ed. Paul Bonnefon), though material from it was reused in De l’esprit des lois.'
  },
  {
    number: 3,
    locus: 'Alan Watson at Edinburgh (¶11)',
    detail:
      'Confirmed accurate: Alan Watson held the Chair of Civil Law at the University of Edinburgh from 1968 and published Legal Transplants in 1974.'
  },
  {
    number: 4,
    locus: 'Teubner & Weber quotations (¶12, ¶14)',
    detail:
      'Teubner’s phrase (« contact direct entre les ordres juridiques au sein d’un discours juridique mondial ») derives from Gunther Teubner (1998), “Legal Irritants”, Modern Law Review 61(1): 11–32.'
  },
  {
    number: 5,
    locus: 'Clóvis Beviláqua & Article 6 of the 1916 Civil Code (¶14)',
    detail:
      'Beviláqua’s Resumo das Lições de Legislação Comparada (1893/1897) and Em Defesa do Projeto (1906) explicitly address Montesquieu and hybrid legal families; Law No. 4,121 of 1962 removed married women from Article 6.'
  }
];

export const VERIFIED_SOURCES = [
  {
    code: 'S1',
    id: 'src-dauchy',
    title: 'DAUCHY, Serge.',
    work: 'Montesquieu, De l’esprit des lois (1748). 2026. Complete 14-paragraph conference manuscript embedded in-app (PPGD/UFSC, 11 Nov. 2026).',
    url: '#dauchy-paper',
    urlLabel: 'Read Embedded 14-Paragraph Manuscript (¶1–14)',
    verificationNote:
      'Full verbatim French paper embedded in #dauchy-paper with paragraph-by-paragraph navigation (¶1–14), English summaries, and Dossier commentary.'
  },
  {
    code: 'S2',
    id: 'src-montesquieu',
    title: 'MONTESQUIEU, Charles-Louis de Secondat, Baron de.',
    work: 'De l’esprit des lois (1748; 1777 ed.), Livres I.3, VII.9, VII.17, XI.6, XII.2, XVI.2, XIX.4; Lettres persanes (1721), Lettres 38 & 161.',
    url: 'https://fr.wikisource.org/wiki/Esprit_des_lois_(1777)/L11/C6',
    urlLabel: 'Wikisource · De l’esprit des lois (1777)',
    verificationNote:
      'Verbatim French citations verified across Book I ch. 3, Book VII ch. 9 & 17, Book XI ch. 6, Book XII ch. 2, and Book XIX ch. 4.'
  },
  {
    code: 'S3',
    id: 'src-const-1824',
    title: 'BRASIL.',
    work: 'Constituição Política do Império do Brazil (25 Mar. 1824), arts. 10, 98, 101 § VI; Constituição de 1891, arts. 15 and 44; Código Civil de 1916 (Lei n. 3.071/1916, art. 6) & Lei n. 4.121/1962.',
    url: 'https://www2.camara.leg.br/legin/fed/consti/1824-1899/constituicao-35041-25-marco-1824-532540-publicacaooriginal-14770-pl.html',
    urlLabel: 'Câmara dos Deputados · Publicações Originais (1824, 1891, 1916)',
    verificationNote:
      'Checked against original Câmara publications: 1824 Art. 10 four powers (Legislativo, Moderador, Executivo, Judicial); 1891 Arts. 15 & 44; 1916 Civil Code Art. 6 and Law 4,121/1962.'
  },
  {
    code: 'S4',
    id: 'src-figueiredo',
    title: 'FIGUEIREDO, Aurélio de.',
    work: 'Compromisso Constitucional, 1896. Oil on canvas, 330 × 257 cm. Museu da República, Rio de Janeiro (Deodoro’s oath, 26 Feb. 1891; reproduction: Romulo Fialdini).',
    url: 'https://museudarepublica.acervos.museus.gov.br/acervo-museologico/pintura-historica-4/',
    urlLabel: 'Museu da República · Compromisso Constitucional (1896)',
    verificationNote:
      'Slide 05 visual case: Prudente de Moraes presides at the centre while Deodoro da Fonseca holds the constitutional book and women observe from the upper gallery.'
  },
  {
    code: 'S5',
    id: 'src-ceschiatti',
    title: 'CESCHIATTI, Alfredo.',
    work: 'A Justiça, 1961. Granite / Stone (“pedra de Petrópolis”), 3.30 m. Supremo Tribunal Federal, Praça dos Três Poderes, Brasília (photograph: Fellipe Sampaio / STF).',
    url: 'https://noticias.stf.jus.br/postsnoticias/130-anos-conheca-os-destaques-do-acervo-cultural-stf/',
    urlLabel: 'STF · Acervo Cultural (A Justiça, 1961)',
    verificationNote:
      'Slide 06 visual case: engaged alongside Montesquieu XI.6, Dauchy ¶7, Rafael Simioni (2021), and Article 6 of the 1916 Civil Code prior to Law 4,121/1962.'
  },
  {
    code: 'S6',
    id: 'src-simioni',
    title: 'SIMIONI, Rafael Lazzarotto; BEVILÁQUA, Clóvis; WATSON, Alan; LEGRAND, Pierre; TEUBNER, Gunther.',
    work: 'Simioni (2021) on Ceschiatti’s Justice; Beviláqua, Lições de Legislação Comparada (1893/1897) & Em Defesa do Projeto (1906); Watson (1974); Legrand (1997); Teubner (1998); Pateman (1988).',
    url: '#dauchy-paper',
    urlLabel: 'Open Embedded Deep Research Dossier & Matching Script PDF',
    verificationNote:
      'Full historiographical and comparative-law dossier embedded in #dauchy-paper alongside Montesquieu_Matching_Script_Final_5fe68ce6.pdf.'
  }
];

/**
 * Retrieve slide data by 1-based slide number (1..7).
 * @param {number|string} slideNumber
 * @returns {Object}
 */
export function getSlideByNumber(slideNumber) {
  const num = Number(slideNumber);
  return PRINCIPAL_SLIDES.find((s) => s.number === num) || PRINCIPAL_SLIDES[0];
}

/**
 * Retrieve one of Serge Dauchy's 14 paragraphs by 1-based paragraph number (1..14).
 * @param {number|string} paraNumber
 * @returns {Object}
 */
export function getDauchyParagraphByNumber(paraNumber) {
  const num = Number(paraNumber);
  return (
    DAUCHY_MANUSCRIPT_PARAGRAPHS.find((p) => p.number === num) ||
    DAUCHY_MANUSCRIPT_PARAGRAPHS[0]
  );
}

/**
 * Filter Serge Dauchy's 14 paragraphs by thematic group ('all' | 'biography' | 'americas' | 'liberty' | 'transplants')
 * and optional search query across French text, English summary, Dossier commentary, and key concepts.
 * @param {{ theme?: string, query?: string }} [options]
 * @returns {Array<Object>}
 */
export function filterDauchyParagraphs({ theme = 'all', query = '' } = {}) {
  const normalizedTheme = String(theme || 'all').trim().toLowerCase();
  const normalizedQuery = String(query || '').trim().toLowerCase();

  return DAUCHY_MANUSCRIPT_PARAGRAPHS.filter((para) => {
    if (normalizedTheme && normalizedTheme !== 'all' && para.theme !== normalizedTheme) {
      return false;
    }
    if (!normalizedQuery) return true;
    const haystack = [
      para.ref,
      para.sectionTitle,
      para.frenchText,
      para.englishSummary,
      para.dossierCommentary,
      ...(Array.isArray(para.keyConcepts) ? para.keyConcepts : [])
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

/**
 * Return all 7 verbatim pages from Montesquieu_Matching_Script_Final_5fe68ce6.pdf.
 * @returns {Array<Object>}
 */
export function getMatchingScriptFinalPages() {
  return MATCHING_SCRIPT_FINAL.pages.map((p) => ({
    ...p,
    paragraphs: [...p.paragraphs],
    cues: [...p.cues],
    dauchyRefs: [...p.dauchyRefs]
  }));
}

/**
 * Return the structured Deep Research Dossier sections and archival reception table.
 * @returns {Object}
 */
export function getDeepResearchDossierSections() {
  return {
    title: DEEP_RESEARCH_DOSSIER.title,
    sourceUrl: DEEP_RESEARCH_DOSSIER.sourceUrl,
    executiveSynthesis: DEEP_RESEARCH_DOSSIER.executiveSynthesis,
    archivalReceptionTable: DEEP_RESEARCH_DOSSIER.archivalReceptionTable.map((row) => ({ ...row })),
    sections: DEEP_RESEARCH_DOSSIER.sections.map((sec) => ({
      ...sec,
      dauchyParagraphs: [...sec.dauchyParagraphs]
    }))
  };
}

/**
 * Count spoken words in a string (ignoring bracketed editorial tags like [ADDED, CUTTABLE]).
 * @param {string} text
 * @returns {number}
 */
export function countSpokenWords(text) {
  const cleaned = String(text || '')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/[—–·]/g, ' ')
    .trim();
  if (!cleaned) return 0;
  return cleaned.split(/\s+/).filter(Boolean).length;
}

/**
 * Compute live word count, pause seconds, and estimated total speaking duration
 * across all 7 Lectern Script pages.
 * @param {{ excludeCuttable?: boolean, wpm?: number }} [options]
 */
export function computeLecternScriptMetrics({ excludeCuttable = false, wpm = 125 } = {}) {
  const safeWpm = Number.isFinite(Number(wpm)) && Number(wpm) > 0 ? Number(wpm) : 125;
  let totalWords = 0;
  let cuttableWords = 0;
  let totalPauseSeconds = 0;

  const perSlide = PRINCIPAL_SLIDES.map((slide) => {
    const paragraphs = slide.lecternScript?.paragraphs || [];
    let slideWords = 0;
    for (const p of paragraphs) {
      const words = countSpokenWords(`${p.leadIn || ''} ${p.rest || ''}`);
      if (p.cuttable) {
        cuttableWords += words;
        if (excludeCuttable) continue;
      }
      slideWords += words;
    }
    const pauseSec = Number(slide.pauseSeconds) || 5;
    totalWords += slideWords;
    totalPauseSeconds += pauseSec;
    const estSec = Math.round((slideWords / safeWpm) * 60 + pauseSec);
    return {
      slideNumber: slide.number,
      words: slideWords,
      pauseSeconds: pauseSec,
      estimatedSeconds: estSec
    };
  });

  const totalSeconds = Math.round((totalWords / safeWpm) * 60 + totalPauseSeconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;

  return {
    wpm: safeWpm,
    excludeCuttable: Boolean(excludeCuttable),
    totalWords,
    cuttableWords,
    totalPauseSeconds,
    totalSeconds,
    formattedDuration: `${mins}:${String(secs).padStart(2, '0')}`,
    perSlide
  };
}

/**
 * Return all 7 structured Lectern Script pages (aligned 1-to-1 with PRINCIPAL_SLIDES)
 * for the in-app Lectern Script reader, Smartphone Remote teleprompter, and 7-page A4 print mode.
 * @param {{ excludeCuttable?: boolean }} [options]
 * @returns {Array<Object>}
 */
export function getLecternScriptPages({ excludeCuttable = false } = {}) {
  return PRINCIPAL_SLIDES.map((slide) => {
    const script = slide.lecternScript || {};
    const rawParas = Array.isArray(script.paragraphs) ? script.paragraphs : [];
    const filteredParas = excludeCuttable ? rawParas.filter((p) => !p?.cuttable) : rawParas;
    return {
      slideNumber: slide.number,
      page: script.page || slide.number,
      slideId: slide.id,
      navLabel: slide.navLabel,
      title: slide.title,
      heading: script.heading || `Slide ${slide.number}  ${slide.title}`,
      elapsedRange: script.elapsedRange || '',
      stageLabel: script.stageLabel || '',
      instruction: script.instruction || '',
      durationSeconds: Number(slide.durationSeconds) || 80,
      pauseSeconds: Number(slide.pauseSeconds) || 5,
      answeredParagraphs: Array.isArray(slide.answeredParagraphs) ? [...slide.answeredParagraphs] : [],
      dauchyParagraphRefs: Array.isArray(slide.dauchyParagraphRefs) ? [...slide.dauchyParagraphRefs] : [],
      paragraphs: filteredParas.map((p) => ({
        leadIn: String(p?.leadIn || ''),
        rest: String(p?.rest || ''),
        cuttable: Boolean(p?.cuttable)
      })),
      stageCue: String(script.stageCue || '')
    };
  });
}

/**
 * Resolve normalized [x, y] SVG coordinates and caption for the slide's orbital constellation.
 * @param {number|string} slideNumber
 */
export function getConstellationCoordinates(slideNumber) {
  const slide = getSlideByNumber(slideNumber);
  const constellation = slide?.constellation || {};
  const nodes = Array.isArray(constellation.nodes) ? constellation.nodes : [];

  const pointFor = (id, fallback) => {
    if (Array.isArray(constellation[id]) && constellation[id].length >= 2) {
      return [Number(constellation[id][0]), Number(constellation[id][1])];
    }
    const found = nodes.find((n) => n && n.id === id);
    if (found && Number.isFinite(Number(found.x)) && Number.isFinite(Number(found.y))) {
      return [Number(found.x), Number(found.y)];
    }
    return fallback;
  };

  return {
    mode: constellation.mode || 'triad',
    caption: constellation.caption || constellation.label || slide?.title || '',
    leg: pointFor('leg', [22, 48]),
    exec: pointFor('exec', [78, 48]),
    jud: pointFor('jud', [50, 20]),
    dom: pointFor('dom', [50, 80])
  };
}

/**
 * Clamp background piano volume strictly to a gentle ambient ceiling [0, maxVolume].
 */
export function clampMusicVolume(
  rawVolume,
  defaultVolume = PRESENTATION_META.backgroundMusic.defaultVolume,
  maxVolume = PRESENTATION_META.backgroundMusic.maxVolume
) {
  const cap = Number.isFinite(Number(maxVolume)) && Number(maxVolume) > 0 ? Number(maxVolume) : 0.35;
  const fallback =
    Number.isFinite(Number(defaultVolume)) && Number(defaultVolume) >= 0
      ? Math.min(Number(defaultVolume), cap)
      : 0.12;
  if (rawVolume === null || rawVolume === undefined || rawVolume === '') {
    return Number(fallback.toFixed(3));
  }
  const parsed = Number(rawVolume);
  if (!Number.isFinite(parsed)) {
    return Number(fallback.toFixed(3));
  }
  const clamped = Math.min(cap, Math.max(0, parsed));
  return Number(clamped.toFixed(3));
}

/**
 * Format accessible, human-readable status text for the low-volume background piano control.
 */
export function formatMusicStatusLabel({ playing = false, muted = false, volume = 0.12 } = {}) {
  const safeVol = clampMusicVolume(volume);
  const percent = Math.round(safeVol * 100);
  if (muted || percent === 0) {
    return {
      shortLabel: 'Piano · Muted',
      ariaLabel: 'Unmute Chopin Nocturne background music (shortcut B)',
      percent: 0
    };
  }
  if (playing) {
    return {
      shortLabel: `Nocturne · ${percent}%`,
      ariaLabel: `Mute Chopin Nocturne background music, playing softly at ${percent}% volume (shortcut B)`,
      percent
    };
  }
  return {
    shortLabel: `Play Nocturne · ${percent}%`,
    ariaLabel: `Play Chopin Nocturne background music softly at ${percent}% volume (shortcut B)`,
    percent
  };
}

/**
 * Determine whether the opening event poster stage should be skipped automatically.
 */
export function shouldBypassOpeningPoster(search = '', hash = '') {
  const qs = String(search || '');
  const hs = String(hash || '');
  if (
    /(?:^\?|&)autostart=1(?:&|$)/.test(qs) ||
    /(?:^\?|&)script=1(?:&|$)/.test(qs) ||
    /(?:^\?|&)dauchy=1(?:&|$)/.test(qs) ||
    qs.includes('sync=')
  ) {
    return true;
  }
  if (
    /^#slide-[1-7]$/.test(hs) ||
    hs === '#sources' ||
    hs === '#lectern-script' ||
    hs === '#dauchy-paper' ||
    /^#dauchy-para-(?:[1-9]|1[0-4])$/.test(hs)
  ) {
    return true;
  }
  return false;
}

/**
 * Retrieve normalized, slide-specific Presenter Tip metadata and cues for slide 1..7.
 */
export function getPresenterTipForSlide(slideNumber) {
  const slide = getSlideByNumber(slideNumber);
  const tip = slide?.presenterTip || {};
  const padded = String(slide.number).padStart(2, '0');
  const cues = Array.isArray(tip.cues)
    ? tip.cues.map((c) => ({
        label: String(c?.label || ''),
        text: String(c?.text || ''),
        isPauseCue: Boolean(c?.isPauseCue)
      }))
    : [];

  return {
    slideNumber: slide.number,
    kicker: `SLIDE ${padded} / 07 · ${tip.pacing || 'PODIUM CUE'}`.toUpperCase(),
    heading: String(tip.heading || slide.title),
    pacing: String(tip.pacing || ''),
    pauseActionSlide: tip.pauseActionSlide ? Number(tip.pauseActionSlide) : null,
    pauseSeconds: Number(slide.visualPauseSeconds || slide.pauseSeconds || 5),
    cues,
    guardrail: String(tip.guardrail || '')
  };
}

/**
 * Pure state machine for the slide-specific Presenter Tip disclosure (hover vs. pinned click).
 */
export function resolvePresenterTipState(
  currentState = { activeSlide: null, mode: 'closed' },
  action = { type: 'close' }
) {
  const prevSlide = currentState?.activeSlide ? Number(currentState.activeSlide) : null;
  const prevMode =
    currentState?.mode === 'hover' || currentState?.mode === 'pinned'
      ? currentState.mode
      : 'closed';
  const targetSlide =
    action?.slide !== undefined && action?.slide !== null ? Number(action.slide) : null;
  const validSlide =
    Number.isInteger(targetSlide) && targetSlide >= 1 && targetSlide <= PRINCIPAL_SLIDES.length
      ? targetSlide
      : null;

  switch (action?.type) {
    case 'hover-enter': {
      if (!validSlide) return { activeSlide: prevSlide, mode: prevMode };
      if (prevMode === 'pinned' && prevSlide === validSlide) {
        return { activeSlide: validSlide, mode: 'pinned' };
      }
      if (prevMode === 'pinned' && prevSlide !== null) {
        return { activeSlide: prevSlide, mode: 'pinned' };
      }
      return { activeSlide: validSlide, mode: 'hover' };
    }
    case 'hover-leave': {
      if (prevMode === 'hover' && (!validSlide || prevSlide === validSlide)) {
        return { activeSlide: null, mode: 'closed' };
      }
      return { activeSlide: prevSlide, mode: prevMode };
    }
    case 'click-toggle': {
      if (!validSlide) return { activeSlide: null, mode: 'closed' };
      if (prevMode === 'pinned' && prevSlide === validSlide) {
        return { activeSlide: null, mode: 'closed' };
      }
      return { activeSlide: validSlide, mode: 'pinned' };
    }
    case 'pin-open': {
      if (!validSlide) return { activeSlide: prevSlide, mode: prevMode };
      return { activeSlide: validSlide, mode: 'pinned' };
    }
    case 'slide-change':
    case 'close':
    default:
      return { activeSlide: null, mode: 'closed' };
  }
}

/**
 * Computes deterministic, subtle GSAP cross-fade + directional slide-in parameters
 * when moving between the 7 presentation sections.
 */
export function computeSlideTransitionSpec(
  fromSlide,
  toSlide,
  { reducedMotion = false, smooth = true } = {}
) {
  const total = PRINCIPAL_SLIDES.length;
  const from = Math.max(1, Math.min(total, Number(fromSlide) || 1));
  const to = Math.max(1, Math.min(total, Number(toSlide) || 1));

  if (reducedMotion || !smooth || from === to) {
    return {
      animate: false,
      fromSlide: from,
      toSlide: to,
      direction: 0,
      distance: 0,
      scrollDuration: 0,
      exitDuration: 0,
      exitOpacity: 1,
      exitY: 0,
      enterDelay: 0,
      enterDuration: 0,
      enterOpacity: 1,
      enterY: 0,
      childOpacity: 1,
      childOffsetY: 0,
      childDuration: 0,
      childStagger: 0,
      bgDuration: 0
    };
  }

  const direction = to > from ? 1 : -1;
  const distance = Math.abs(to - from);

  return {
    animate: true,
    fromSlide: from,
    toSlide: to,
    direction,
    distance,
    scrollDuration: distance > 1 ? 0.46 : 0.38,
    exitDuration: 0.2,
    exitOpacity: 0.38,
    exitY: direction * -12,
    enterDelay: 0.05,
    enterDuration: 0.36,
    enterOpacity: 0.42,
    enterY: direction * 14,
    childOpacity: 0.65,
    childOffsetY: direction * 8,
    childDuration: 0.32,
    childStagger: 0.03,
    bgDuration: 0.48
  };
}
