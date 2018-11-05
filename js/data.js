const MATERIAL = {
  // listados de adj. y sus. https://bit.ly/2JB6mSP 
  0: { desc: 'adulto contento', p: 2, m: 3, c: 1, a: 0 },
  1: { desc: 'adulto indigando', p: 1, m: 0, c: 2, a: 3 },
  2: { desc: 'casas bonitas', p: 2, m: 3, c: 2, a: 0 },
  3: { desc: 'casas descuidadas', p: 1, m: 0, c: 3, a: 2 },
  4: { desc: 'jugadas agresivas', p: 0, m: 3, c: 0, a: 3 },
  5: { desc: 'jugadas impresionantes', p: 1, m: 3, c: 0, a: 0 }
};
const FACTS = [
  // - - DAY 1 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  [
    {
      who: candidateA,
      where: 'En debate',
      what: 'Hablando de propuestas para Economía',
      goal: GOAL_TYPE.c,
      goalAvoid: GOAL_TYPE.a,
      material: [0, 1, 2, 3],
      maxMaterial: 2,
      takeFrom: 'u',
      assignTo: 'a'
    },
    {
      who: candidateB,
      where: 'En debate',
      what: 'Hablando de propuestas para Economía',
      goal: GOAL_TYPE.a,
      goalAvoid: GOAL_TYPE.m,
      material: [0, 1, 2, 3],
      maxMaterial: 2,
      takeFrom: 'b',
      assignTo: 'u'
    },
    {
      who: 'Ecolín',
      where: 'En partido contra Brumas',
      what: 'Gana 2 a 0',
      material: [4, 5],
      maxMaterial: 1
    }
  ]
  // - - DAY 2 - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
];