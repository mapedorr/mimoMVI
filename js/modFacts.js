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
      goalAvoid: $('#fact-desc #goal #goal-avoid'),
      status: $('#status')
    };

    // hide elements that will only appear when the player ask for ne2 fact
    this.hideFactDesc();

    // set event listeners
    nextFactButton.on('click', this.showCurrentNew);
  },

  /**
   * Sets the current day.
   */
  setDay: function() {
    dayCount.text(currentDay--);

    if (currentDay < 0) {
      setButtonEnabled(nextFactButton);
      factsCount.hide();

      setTimeout(() => {
        if (candidateAStart >= candidateBStart) {
          alert(`Las elecciones se han llevado a cabo. Gracias a usted ${candidateA} es el nuevo presidente de Elplatanal.`);
        }
        else {
          alert(`Las elecciones se han llevado a cabo. Por su culpa ${candidateB} es el nuevo presidente de Elplatanal.`);
        }
      }, 1000);
    }
    else {
      dayFacts = FACTS[MAX_DAYS - currentDay - 1];
      factsCount.text(`0 / ${dayFacts.length}`);
    }
  },

  /**
   * Get the next fact from the array of facts for the day an updates the UI
   * based on that.
   */
  showCurrentNew: function() {
    // disable the button until the player record the news
    setButtonEnabled(nextFactButton);

    // remove all the material from the previous fact
    conMaterialDispenser.find('.material-slot').remove();
    factSlots = [];

    // pick the current fact and fill its material
    currentFact = dayFacts[currentFactIndex++];
    factsCount.text(`${currentFactIndex} / ${dayFacts.length}`);

    // fill and show the description of the fact
    moduleFacts.fadeFactDesc();
    factDesc.who.find('span').text(currentFact.who);
    factDesc.who.show();
    factDesc.where.find('span').text(currentFact.where);
    factDesc.where.show();
    factDesc.what.find('span').text(currentFact.what);
    factDesc.what.show();

    if (currentFact.goal) {
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
    }
    else {
      factDesc.goal.hide();
    }

    factDesc.status.find('span').text('En edición');
    factDesc.status.show();

    // show the material available for the fact
    const dispenserBody = conMaterialDispenser.children('.body');
    currentFact.material.forEach((value, index, array) => {
      const createdElement = $(`
      <div class="material-slot">
        <p class="material-desc">${MATERIAL[value].desc}</p>
        <div class="sentibar">
          <div class="pe1 cell" title="${INTENTIONS.pe1}">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].pe1}</div>
          </div>
          <div class="pe2 cell" title="${INTENTIONS.pe2}">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].pe2}</div>
          </div>
          <div class="ne1 cell" title="${INTENTIONS.ne1}">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].ne1}</div>
          </div>
          <div class="ne2 cell" title="${INTENTIONS.ne2}">
            <div class="fill"></div>
            <div class="value">${MATERIAL[value].ne2}</div>
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
      setButtonEnabled(nextFactButton);
    }
  },

  reset: function() {
    conMaterialDispenser.find('.material-slot').remove();
    factSlots = [];
    conMaterialDispenser.hide();
  },

  hideFactDesc: function() {
    factDesc.who.hide();
    factDesc.where.hide();
    factDesc.what.hide();
    factDesc.goal.hide();
    factDesc.status.hide();
    conMaterialDispenser.hide();
  },

  fadeFactDesc: function(out) {
    if (out === true) {
      factDesc.who.fadeTo(200, 0.5);
      factDesc.where.fadeTo(200, 0.5);
      factDesc.what.fadeTo(200, 0.5);
      factDesc.goal.fadeTo(200, 0.5);
    }
    else {
      factDesc.who.fadeTo(200, 1);
      factDesc.where.fadeTo(200, 1);
      factDesc.what.fadeTo(200, 1);
      factDesc.goal.fadeTo(200, 1);
    }
  }
};
