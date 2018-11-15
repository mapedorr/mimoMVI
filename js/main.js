/**
 * ╔═════════════════╗
 * ║ M.i.M.o. (v0.1) ║
 * ╚═════════════════╝
 * 
 * Pregunta que busca resolver el prototipo:
 * ¿Que se manipulen las emociones transmite el mensaje que queremos? ¿Es entretenido
 * hacerlo como lo planteamos?
 */

/**
 * C O N S T A N T S ──────────────────────────────────────────────────────────
 */
const candidateA = 'Fulano';
const candidateB = 'Sutano';
const MAX_DAYS = 3;
// sobre emociones: https://bit.ly/2G8qzAX
const INTENTIONS = {
  pe1: 'Alegría',
  pe2: 'Confianza',
  ne1: 'Miedo',
  ne2: 'Ira'
};
const GOAL_TYPE = {
  pe1: 'pe1',
  pe2: 'pe2',
  ne1: 'ne1',
  ne2: 'ne2'
};
const POPULATION = 20000;
const MTL_AMP_LEVELS = 3;
const MTL_AMP_PCT = 100 / MTL_AMP_LEVELS;
const NEWS_IMPACT = [200, 1000];

/**
 * V A R I A B L E S ──────────────────────────────────────────────────────────
 */
let currentDay = 0;
let currentFact = null;
let currentFactIndex = 0;
let votingIntentions = {
  a: POPULATION * 0.4,
  b: POPULATION * 0.4,
  u: POPULATION * 0.2
};
let dayFacts = null;
let debugShowNumbers = false;
let debugShowSum = false;
let affectedPeople = [];
let candidateAIncrease = 0;
let candidateBIncrease = 0;
let candidateAStart = -1;
let candidateBStart = -1;

/**
 * U I   E L E M E N T S ──────────────────────────────────────────────────────
 */
// - - - module: facts
let dayCount = null;
let factsCount = null;
let factDesc = null;
let nextFactButton = null;
let conMaterialDispenser = null;
let factSlots = [];
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
let endDayButtonDesc = null;
// - - - debug
let showNumbersCheck = null;
let showSumCheck = null;

/**
 * F U N C T I O N S ──────────────────────────────────────────────────────────
 */
function turnOnMimo() {
  // initialize global variables
  currentDay = MAX_DAYS;

  // store UI elements
  // module: facts
  moduleFacts.start();

  // module: material
  moduleMaterial.start();

  // module: send
  modulePreview.start();

  // module: results
  moduleResults.start();

  // debug
  showNumbersCheck = $('#debug-show-numbers');
  showSumCheck = $('#debug-show-sum');

  showNumbersCheck.val([debugShowNumbers ? 'showNumbers' : '']);
  showSumCheck.val([debugShowSum ? 'showSum' : '']);
  updateDebug();

  // set event listeners
  showNumbersCheck.on('click', toggleShowNumbers);
  showSumCheck.on('click', toggleShowSum);

  startGame();
}

function startGame() {
  moduleFacts.setDay();

  // disable the <select> for fact materials
  moduleMaterial.disableMaterial();

  // set values for SEND's sentibar
  emptySentibar(modSendSentibar);
  emptySentibar(modSumSentibar);

  // set values for voting intention
  moduleResults.updateVotingIntentions();

  // disable buttons
  setButtonEnabled(recButton);
  setButtonEnabled(endDayButton);
}

function getVotingPercentage(amount) {
  return Math.round((amount / POPULATION) * 100);
}

function setButtonEnabled(button, enable) {
  if (enable) {
    button.removeAttr('disabled');
  } else {
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
  debugShowNumbers === true
    ? allSentibarsNumbers.show()
    : allSentibarsNumbers.hide();

  debugShowSum === true ? conDebugSum.show() : conDebugSum.hide();
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
