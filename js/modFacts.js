/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: F A C T S
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const moduleFacts = {
  /**
   * Gets the UI elements related to the module, perform actions over them and
   * assign event listeners.
   */
  start: function() {
    dayCount = $('#day-count');
    factsCount = $('#facts-count');
    nextFactButton = $('#next-fact');
    conMaterialDispenser = $('#con-material-dispenser');
    factDesc = {
      who: $('#fact-desc #who'),
      where: $('#fact-desc #where'),
      what: $('#fact-desc #what'),
      goal: $('#fact-desc #goal'),
      goalAvoid: $('#fact-desc #goal #goal-avoid')
    };

    // hide elements that will only appear when the player ask for a fact
    factDesc.who.hide();
    factDesc.where.hide();
    factDesc.what.hide();
    factDesc.goal.hide();
    conMaterialDispenser.hide();

    // set event listeners
    nextFactButton.on('click', this.showCurrentNew);
  },

  /**
   * Sets the current day.
   */
  setDay: function() {
    dayCount.text(currentDay--);

    dayFacts = FACTS[MAX_DAYS - currentDay - 1];

    if (currentDay <= 0) {
      alert('the simulation has ended!');
    }
  },

  /**
   * Get the next fact from the array of facts for the day an updates the UI
   * based on that.
   */
  showCurrentNew: function() {
    // disable the button until the player record the news
    setButtonDisabled(nextFactButton);

    // remove all the material from the previous fact
    conMaterialDispenser.find('.material-slot').remove();
    factSlots = [];

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

    const goalSpan = factDesc.goal.find('span');
    goalSpan.text(currentFact.goal ? INTENTIONS[currentFact.goal] : 'Informar');
    goalSpan.removeClass();
    goalSpan.addClass(currentFact.goal + 'Color');

    if (currentFact.goalAvoid) {
      goalAvoidSpan = factDesc.goalAvoid.find('span');
      goalAvoidSpan.text(currentFact.goal ? INTENTIONS[currentFact.goalAvoid] : '');
      goalAvoidSpan.removeClass();
      goalAvoidSpan.addClass(currentFact.goalAvoid + 'Color');

      factDesc.goalAvoid.show();
    }
    else {
      factDesc.goalAvoid.hide();
    }

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

      // update the sentibar created
      setSentibarValues({
        sentibar: createdElement.find('.sentibar'),
        material: MATERIAL[value]
      });

      // save the reference to the sentibar
      factSlots.push(createdElement);

      dispenserBody.append(createdElement);
    });

    // show the material dispenser
    conMaterialDispenser.show();
    updateDebug();

    // fill the material selectors
    moduleMaterial.fillMaterials();

    if (currentFactIndex === dayFacts.length) {
      setButtonDisabled(nextFactButton);
    }
  }
};
