const MATERIAL = {
  // adj. + n. https://bit.ly/2JB6mSP 

  // st material
  0: { desc: 'adultos contentos', pe1: 2, pe2: 3, ne1: 1, ne2: 0 },
  1: { desc: 'adultos indigandos', pe1: 1, pe2: 0, ne1: 2, ne2: 3 },
  2: { desc: 'casas bonitas', pe1: 2, pe2: 3, ne1: 2, ne2: 0 },
  3: { desc: 'casas descuidadas', pe1: 1, pe2: 0, ne1: 3, ne2: 2 },
  // 4: { desc: 'niños felices', pe1: 3, pe2: 3, ne1: 0, ne2: 0 },
  // 5: { desc: 'niños llorando', pe1: 0, pe2: 0, ne1: 0, ne2: 0 },
  6: { desc: 'familia feliz', pe1: 3, pe2: 3, ne1: 0, ne2: 0 },
  7: { desc: 'familia angustiada', pe1: 0, pe2: 1, ne1: 2, ne2: 1 },
  8: { desc: 'país pobre', pe1: 1, pe2: 1, ne1: 3, ne2: 2 },
  9: { desc: 'país tranquilo', pe1: 2, pe2: 2, ne1: 1, ne2: 1 },
  10: { desc: 'estudiantes talentosos', pe1: 3, pe2: 1, ne1: 2, ne2: 1 },
  11: { desc: 'estudiantes protestando', pe1: 1, pe2: 1, ne1: 2, ne2: 3 },
  12: { desc: 'empresas exitosas', pe1: 3, pe2: 1, ne1: 1, ne2: 0 },
  13: { desc: 'empresas quebradas', pe1: 1, pe2: 0, ne1: 3, ne2: 1 },
  14: { desc: 'inmigrantes desesperados', pe1: 0, pe2: 1, ne1: 3, ne2: 1 },
  15: { desc: 'soldados luchando', pe1: 0, pe2: 2, ne1: 2, ne2: 2 },

  // filling material
  p1: { desc: 'jugadas agresivas', pe1: 0, pe2: 3, ne1: 0, ne2: 3 },
  p2: { desc: 'jugadas bonitas', pe1: 1, pe2: 3, ne1: 0, ne2: 0 },
  c1: { desc: 'personas cantando', pe1: 2, pe2: 2, ne1: 0, ne2: 0 },
  c2: { desc: 'baile sensual', pe1: 3, pe2: 1, ne1: 0, ne2: 2 },
  j1: { desc: 'jugadas desempate', pe1: 3, pe2: 2, ne1: 1, ne2: 1 },
  j2: { desc: 'jugadas victoria', pe1: 3, pe2: 3, ne1: 0, ne2: 0 },
  g1: { desc: 'banda tocando', pe1: 0, pe2: 1, ne1: 2, ne2: 1 },
  g2: { desc: 'banda sonriendo', pe1: 2, pe2: 2, ne1: 0, ne2: 2 }
};
const FACTS = [
  // - - DAY 1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  [
    {
      who: candidateA,
      where: 'Debate canal 7',
      what: 'Habla de propuestas en política Económica',
      goal: GOAL_TYPE.pe2,
      goalAvoid: GOAL_TYPE.ne2,
      material: [0, 1, 12, 13],
      maxMaterial: 2,
      takeFrom: 'u',
      assignTo: 'a'
    },
    {
      who: candidateB,
      where: 'Debate canal 7',
      what: 'Habla de propuestas en política Económica',
      goal: GOAL_TYPE.ne2,
      goalAvoid: GOAL_TYPE.pe2,
      material: [0, 1, 12, 13],
      maxMaterial: 2,
      takeFrom: 'b',
      assignTo: 'u'
    },
    {
      who: 'Ecolín',
      where: 'Partido contra Brumas',
      what: 'Gana 2 a 0',
      material: ['p1', 'p2'],
      maxMaterial: 1
    }
  ],
  // - - DAY 2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  [
    {
      who: candidateA,
      where: 'Entrevista La AM',
      what: 'Habla de propuestas en política Exterior',
      goal: GOAL_TYPE.ne1,
      goalAvoid: GOAL_TYPE.pe1,
      material: [8, 7, 9, 6],
      maxMaterial: 3,
      takeFrom: 'u',
      assignTo: 'a'
    },
    {
      who: candidateB,
      where: 'Visita a Turema',
      what: 'Habla de propuestas en política Social',
      goal: GOAL_TYPE.ne1,
      goalAvoid: GOAL_TYPE.pe1,
      material: [3, 11, 2, 10],
      maxMaterial: 3,
      takeFrom: 'b',
      assignTo: 'u'
    },
    {
      who: 'Deiana Granar',
      where: 'Concierto en Cortimo',
      what: 'Gran espectáculo',
      material: ['c1', 'c2'],
      maxMaterial: 1
    }
  ],
  // - - DAY 3 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  [
    {
      who: candidateB,
      where: 'Entrevista en CJM',
      what: 'Habla de propuestas en política Exterior',
      goal: GOAL_TYPE.ne1,
      goalAvoid: GOAL_TYPE.pe2,
      material: [8, 9, 14, 15],
      maxMaterial: 4,
      takeFrom: 'b',
      assignTo: 'u'
    },
    {
      who: candidateA,
      where: 'Visita a Turema',
      what: 'Habla de propuestas en política Social',
      goal: GOAL_TYPE.pe1,
      goalAvoid: GOAL_TYPE.ne1,
      material: [10, 11, 2, 3],
      maxMaterial: 4,
      takeFrom: 'u',
      assignTo: 'a'
    },
    {
      who: 'Federico Grucho',
      where: 'Juego contra Hugo Morgan',
      what: 'Gana 18 a 12',
      material: ['j1', 'j2'],
      maxMaterial: 1
    },
    {
      who: 'Los Melaos',
      where: 'Premios Grammy',
      what: 'Nominados a mejor artista revelación',
      material: ['g1', 'g2'],
      maxMaterial: 1
    }
  ]
];