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
  sentibar.find('.cell .fill').height('0%');
}

function setSentibarValues(data) {
  emptySentibar(data.sentibar);

  data.sentibar.find('.persuade .value').text(data.material.p);
  data.sentibar
    .find('.persuade .fill')
    .height(
      `${(data.amplitudeLevel || MTL_AMP_PCT) * data.material.p}%`
    );

  data.sentibar.find('.motivate .value').text(data.material.m);
  data.sentibar
    .find('.motivate .fill')
    .height(
      `${(data.amplitudeLevel || MTL_AMP_PCT) * data.material.m}%`
    );

  data.sentibar.find('.cajole .value').text(data.material.c);
  data.sentibar
    .find('.cajole .fill')
    .height(
      `${(data.amplitudeLevel || MTL_AMP_PCT) * data.material.c}%`
    );

  data.sentibar.find('.anger .value').text(data.material.a);
  data.sentibar
    .find('.anger .fill')
    .height(
      `${(data.amplitudeLevel || MTL_AMP_PCT) * data.material.a}%`
    );
}

function getSentibarValues(sentibar) {
  return {
    p: parseInt(sentibar.find('.persuade .value').text()),
    m: parseInt(sentibar.find('.motivate .value').text()),
    c: parseInt(sentibar.find('.cajole .value').text()),
    a: parseInt(sentibar.find('.anger .value').text())
  };
}
