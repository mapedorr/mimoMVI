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
  // remove all the material from the previous fact
  conMaterialDispenser.find('.material-slot').remove();

  // pick the current fact and fill its material
  currentFact = dayFacts[currentFactIndex++];
  factsCount.text(`${currentFactIndex} / ${dayFacts.length}`);

  // fill and show the description of the fact
  factDesc.who.find('span').text(currentFact.who);
  factDesc.who.show();
  factDesc.where.find('span').text(currentFact.where);
  factDesc.where.show();
  factDesc.what.find('span').text(currentFact.what);
  factDesc.what.show();
  factDesc.goal.find('span').text((currentFact.goal) ?
    INTENTIONS[currentFact.goal]
    : 'Informar');
  factDesc.goal.show();

  // show the material available for the fact
  const dispenserBody = conMaterialDispenser.children('.body');
  currentFact.material.forEach((value, index, array) => {
    const createdElement = $(`
      <div class="material-slot">
        <p class="material-desc">${MATERIAL[value].desc}</p>
        <div class="sentibar">
          <div class="persuade cell">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].p}</div>
          </div>
          <div class="motivate cell">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].m}</div>
          </div>
          <div class="cajole cell">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].c}</div>
          </div>
          <div class="anger cell">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].a}</div>
          </div>
        </div>
      </div>
    `);

    // update the sentibars for each created material
    setSentibarValues({
      sentibar: createdElement.find('.sentibar'),
      material: MATERIAL[value]
    });

    dispenserBody.append(createdElement);
  });

  // show the material dispenser
  conMaterialDispenser.show();
  updateDebug();

  // fill the material selectors
  fillMaterials();

  if (currentFactIndex === dayFacts.length) {
    setButtonDisabled(nextFactButton);
  }
}