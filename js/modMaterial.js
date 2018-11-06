/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: M A T E RI A L
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const moduleMaterial = {
  /**
   * Gets the UI elements related to the module, perform actions over them and
   * assign event listeners.
   */
  start: function() {
    modMaterial = $('.mod-mtl');
    materialSelects = modMaterial.find('select');
    materialSentibars = modMaterial.find('.sentibar');

    materialSentibars.hide();
  },

  /**
   * Disables and cleans all the <selects> in the module.
   */
  disableMaterial: function() {
    materialSelects.children('[value!="null"]').remove();
    materialSelects.attr('disabled', 'disabled');
    materialSentibars.hide();
  },

  /**
   * Fills the <select> elemnts based on the material related to the current fact.
   */
  fillMaterials: function() {
    // clean the current material
    this.disableMaterial();

    const factMaterialAmount = currentFact.maxMaterial;
    const self = this;

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
        element.change({ slot: elementIndex + 1, module: self }, self.setMaterialInSlot);

        // show the sentibar related to the material
        emptySentibar(sentibar);
        sentibar.show();
      }
    });
  },

  /**
   * Get the data from the selected material and disables it so two or more slots
   * can share the same material.
   *
   * @param {jQuery.Event} event
   */
  setMaterialInSlot: function(event) {
    const sentibar = $(materialSentibars[event.data.slot - 1]);

    if (event.target.dataset.previousValue) {
      // enable all the <option> that match the previous value of the slot
      event.data.module.setOptionsDisabled(event.target.dataset.previousValue);

      // show the material as available in the FACT module
      factSlots[event.target.dataset.previousIndex].css('opacity', 1);
    }

    if (event.target.value === 'null') {
      delete event.target.dataset.previousValue;
      delete event.target.dataset.previousIndex;
      emptySentibar(sentibar);
    } else {
      event.target.dataset.previousValue = event.target.value;
      event.data.module.setOptionsDisabled(event.target.value, true);

      setSentibarValues({
        sentibar: sentibar,
        material: MATERIAL[event.target.value]
      });

      // update the UI so the selected material is shown as disabled in the FACT
      // module
      event.target.dataset.previousIndex = event.target.selectedOptions[0].index - 1;
      factSlots[event.target.dataset.previousIndex].css('opacity', 0.5);
    }

    // update the emotional preview for the current material setup
    modulePreview.updatePreview();
  },

  /**
   * Disables or enables all the <option> elements that match the value received
   * as parameter.
   *
   * @param {string} value the value to look for in all the <option> elements.
   * @param {boolean} disable determines if the option have to be disabled
   */
  setOptionsDisabled: function(value, disable) {
    const options = materialSelects.children(`[value='${value}']`);
    if (disable === true) {
      options.attr('disabled', 'disabled');
    } else {
      options.removeAttr('disabled');
    }
  },

  reset: function() {
    materialSelects.each((index, element) => {
      delete element.dataset.previousValue;
      delete element.dataset.previousIndex;
    });

    this.disableMaterial();
    materialSentibars.each((index, element) => {
      emptySentibar($(element));
    });
  }
};
