/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: M A T E RI A L
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

/**
 * Disables and cleans all the <selects> in the module.
 */
function disableMaterial() {
  materialSelects.children('[value!="null"]').remove();
  materialSelects.attr('disabled', 'disabled');
}

/**
 * Fills the <select> elemnts based on the material related to the current fact.
 */
function fillMaterials() {
  // clean the current material
  disableMaterial();

  const factMaterialAmount = currentFact.material.length;

  materialSelects.each(function(elementIndex) {
    if (elementIndex < factMaterialAmount) {
      const element = $(this);
      const sentibar = $(materialSentibars[elementIndex]);

      currentFact.material.forEach((value, index, array) => {
        element.append(
          `<option value='${value}'>${MATERIAL[value].desc}</option>`
        );
      });

      element.removeAttr('disabled');
      element.change({ slot: elementIndex + 1 }, setMaterialInSlot);

      // show the sentibar related to the material
      emptySentibar(sentibar);
      sentibar.show();
    }
  });
}

/**
 * Get the data from the selected material and disables it so two or more slots
 * can share the same material.
 * 
 * @param {jQuery.Event} event
 */
function setMaterialInSlot(event) {
  const sentibar = $(materialSentibars[event.data.slot - 1]);

  if (event.target.dataset.previousValue) {
    // enable all the <option> that match the previous value of the slot
    setOptionsDisabled(event.target.dataset.previousValue);
  }

  if (event.target.value === 'null') {
    event.target.dataset.previousValue = null;
    emptySentibar(sentibar);
  }
  else {
    event.target.dataset.previousValue = event.target.value;
    setOptionsDisabled(event.target.value, true);
  
    setSentibarValues({
      sentibar: sentibar,
      material: MATERIAL[parseInt(event.target.value)]
    });
  }

  // update the emotional preview for the current material setup
  updatePreview();
}

/**
 * Disables or enables all the <option> elements that match the value received
 * as parameter.
 * 
 * @param {string} value the value to look for in all the <option> elements.
 * @param {boolean} disable determines if the option have to be disabled
 */
function setOptionsDisabled(value, disable) {
  const options = materialSelects.children(`[value='${value}']`);
  if (disable === true) {
    options.attr('disabled', 'disabled');
  }
  else {
    options.removeAttr('disabled');
  }
}