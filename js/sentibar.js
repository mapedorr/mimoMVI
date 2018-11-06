/**
 * ╔═════════════════╗
 * ║ S E N T I B A R ║
 * ╚═════════════════╝
 */

/**
 * Set the value and fill percentage of all the elements in the sentibar to 0.
 * @param {jQuery.Element} sentibar
 */
function emptySentibar(sentibar) {
  sentibar.find('.cell .value').text(0);
  sentibar.find('.cell .fill').css('height', '0%');
}

function setSentibarValues(data) {
  emptySentibar(data.sentibar);

  const sentibarPersuade = data.sentibar.find('.pe1');
  const sentibarMotivate = data.sentibar.find('.pe2');
  const sentibarCajole = data.sentibar.find('.ne1');
  const sentibarAnger = data.sentibar.find('.ne2');

  const pctPersuade = Math.round((data.amplitudeLevel || MTL_AMP_PCT) * data.material.pe1);
  const pctMotivate = Math.round((data.amplitudeLevel || MTL_AMP_PCT) * data.material.pe2);
  const pctCajole = Math.round((data.amplitudeLevel || MTL_AMP_PCT) * data.material.ne1);
  const pctAnger = Math.round((data.amplitudeLevel || MTL_AMP_PCT) * data.material.ne2);

  sentibarPersuade.data('pct', pctPersuade);
  sentibarPersuade.children('.value').text(data.material.pe1);
  sentibarPersuade.children('.fill').css('height', `${pctPersuade}%`);
  
  sentibarMotivate.data('pct', pctMotivate);
  sentibarMotivate.children('.value').text(data.material.pe2);
  sentibarMotivate.children('.fill').css( 'height', `${pctMotivate}%` );
  
  sentibarCajole.data('pct', pctCajole);
  sentibarCajole.children('.value').text(data.material.ne1);
  sentibarCajole.children('.fill').css( 'height', `${pctCajole}%` );
  
  sentibarAnger.data('pct', pctAnger);
  sentibarAnger.children('.value').text(data.material.ne2);
  sentibarAnger.children('.fill').css( 'height', `${pctAnger}%` );
}

function getSentibarValues(sentibar) {
  return {
    pe1: parseInt(sentibar.find('.pe1 .value').text()),
    pe2: parseInt(sentibar.find('.pe2 .value').text()),
    ne1: parseInt(sentibar.find('.ne1 .value').text()),
    ne2: parseInt(sentibar.find('.ne2 .value').text())
  };
}

function getSentibarPercentages(sentibar) {
  return {
    pe1: parseInt(sentibar.find('.pe1').data('pct')),
    pe2: parseInt(sentibar.find('.pe2').data('pct')),
    ne1: parseInt(sentibar.find('.ne1').data('pct')),
    ne2: parseInt(sentibar.find('.ne2').data('pct'))
  };
}
