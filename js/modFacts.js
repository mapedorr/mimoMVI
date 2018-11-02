/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: F A C T S
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

/**
 * Sets the current day.
 */
function setDay() {
  dayCount.text(currentDay--);

  dayFacts = FACTS[MAX_DAYS - currentDay - 1];

  if (currentDay <= 0) {
    alert('the simulation has ended!');
  }
}
/**
 * Get the next fact from the array of facts for the day an updates the UI
 * based on that.
 */
function showCurrentNew() {
  // pick the current fact and fill its material
  currentFact = dayFacts[currentFactIndex++];
  factsCount.text(`${currentFactIndex} / ${dayFacts.length}`);

  // fill and show the description of the fact
  factDesc.who.find('span').text(currentFact.who);
  factDesc.who.show();
  factDesc.what.find('span').text(currentFact.what);
  factDesc.what.show();
  
  // fill the material selectors
  fillMaterials();

  if (currentFactIndex === dayFacts.length) {
    setButtonDisabled(nextFactButton);
  }
}