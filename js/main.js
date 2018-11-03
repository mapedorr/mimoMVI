/**
 * ╔═════╗
 * ║ ??? ║
 * ╚═════╝
 */

/**
 * C O N S T A N T S ──────────────────────────────────────────────────────────
 */
const candidateA = 'Fulano';
const candidateB = 'Sutano';
const MAX_DAYS = 8;
const INTENTIONS = {
  p: 'Persuadir',
  m: 'Motivar',
  c: 'Engañar',
  a: 'Enojar'
};
const GOAL_TYPE = {
  p: 'p',
  m: 'm',
  c: 'c',
  a: 'a'
};
const MATERIAL = {
  // listados de adj. y sus. https://bit.ly/2JB6mSP 
  0: { desc: 'adulto contento', p: 2, m: 3, c: 1, a: 0 },
  1: { desc: 'adulto indigando', p: 1, m: 0, c: 3, a: 3 },
  2: { desc: 'casas bonitas', p: 2, m: 3, c: 2, a: 0 },
  3: { desc: 'casas descuidadas', p: 1, m: 0, c: 2, a: 2 },
  4: { desc: 'jugadas agresivas', p: 0, m: 3, c: 0, a: 3 },
  5: { desc: 'jugadas impresionantes', p: 1, m: 3, c: 0, a: 0 }
};

const FACTS = [
  // d1
  [
    {
      who: candidateA,
      where: 'En debate',
      what: 'Hablando de propuestas para Economía',
      goal: GOAL_TYPE.c,
      material: [0, 1, 2, 3]
    },
    {
      who: candidateB,
      where: 'En debate',
      what: 'Hablando de propuestas para Economía',
      goal: GOAL_TYPE.a,
      material: [0, 1, 2, 3]
    },
    {
      who: 'Ecolín',
      where: 'En partido contra Brumas',
      what: 'Gana 2 a 0',
      material: [4, 5]
    }
  ]
  // d2
  
];
const POPULATION = 20000;
const MTL_AMPLITUDE_LEVEL = 100 / 3;
const PRV_AMPLITUDE_LEVEL = 100 / 12;

/**
 * V A R I A B L E S ──────────────────────────────────────────────────────────
 */
let currentDay = MAX_DAYS;
let votingIntentions = {
  a: POPULATION * 0.4,
  b: POPULATION * 0.4,
  n: POPULATION * 0.2
};
let dayFacts = null;
let currentFact = null;
let currentFactIndex = 0;
let debugShowNumbers = false;
let debugShowSum = false;

/**
 * U I   E L E M E N T S ──────────────────────────────────────────────────────
 */
// - - - module: facts
let dayCount = null;
let factsCount = null;
let factDesc = null;
let nextFactButton = null;
let conMaterialDispenser = null;
// - - - module: material
let modMaterial = null;
let materialSelects = null;
let materialSentibars = null;
// - - - module: send
let modSendSentibar = null;
let recButton = null;
let modSumSentibar = null;
let conDebugSum = null;
// - - - module: results
let endDayButton = null;
let votingGroups = null;
// - - - debug
let showNumbersCheck = null;
let showSumCheck = null;

/**
 * F U N C T I O N S ──────────────────────────────────────────────────────────
 */
function turnOnMimo() {
  // store UI elements
  // module: facts
  dayCount = $('#day-count');
  factsCount = $('#facts-count');
  nextFactButton = $('#next-fact');
  conMaterialDispenser = $('#con-material-dispenser');
  factDesc = {
    who: $('#fact-desc #who'),
    where: $('#fact-desc #where'),
    what: $('#fact-desc #what'),
    goal: $('#fact-desc #goal')
  };

  factDesc.who.hide();
  factDesc.where.hide();
  factDesc.what.hide();
  factDesc.goal.hide();
  conMaterialDispenser.hide();

  // module: material
  modMaterial = $('.mod-mtl');
  materialSelects = modMaterial.find('select');
  materialSentibars = modMaterial.find('.sentibar');

  // module: send
  modSendSentibar = $('#mod-preview-sentibar');
  recButton = $('#rec');
  modSumSentibar = $('#mod-sum-sentibar');
  conDebugSum = $('#con-debug-sum');

  // module: results
  endDayButton = $('#end-day');
  votingGroups = {
    a: $('#groupA'),
    b: $('#groupB'),
    n: $('#groupN')
  };

  // debug
  showNumbersCheck = $('#debug-show-numbers');
  showSumCheck = $('#debug-show-sum');

  showNumbersCheck.val([(debugShowNumbers) ? 'showNumbers' : '']);
  showSumCheck.val([(debugShowSum) ? 'showSum' : '']);
  updateDebug();

  // set event listeners
  nextFactButton.on('click', showCurrentNew);
  showNumbersCheck.on('click', toggleShowNumbers);
  showSumCheck.on('click', toggleShowSum);

  startGame();
}

function startGame() {
  setDay();

  // disable the <select> for fact materials
  materialSentibars.hide();
  disableMaterial();

  // set values for SEND's sentibar
  emptySentibar(modSendSentibar);
  emptySentibar(modSumSentibar);

  // set values for voting intention
  votingGroups.a.children('h3').text(`${getVotingPercentage(votingIntentions.a)}%`);
  votingGroups.a.children('h2').text(`${candidateA}.`);
  votingGroups.b.children('h3').text(`${getVotingPercentage(votingIntentions.b)}%`);
  votingGroups.b.children('h2').text(`${candidateB}.`);
  votingGroups.n.children('h3').text(`${getVotingPercentage(votingIntentions.n)}%`);

  // disable buttons
  setButtonDisabled(recButton);
  setButtonDisabled(endDayButton);
}

function getVotingPercentage(amount) {
  return amount / POPULATION * 100;
}

function setButtonDisabled(button, enable) {
  if (enable) {
    button.removeAttr('disabled');
  }
  else {
    button.attr('disabled', 'disabled');
  }
}

function toggleShowNumbers() {
  debugShowNumbers = !debugShowNumbers;
  updateDebug();
}

function toggleShowSum() {
  debugShowSum = !debugShowSum;
  updateDebug();
}

function updateDebug() {
  const allSentibarsNumbers = $('.sentibar .value');
  (debugShowNumbers === true) ?
    allSentibarsNumbers.show() :
    allSentibarsNumbers.hide();

  (debugShowSum === true) ? conDebugSum.show() : conDebugSum.hide();
}