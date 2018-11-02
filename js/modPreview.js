/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: P R E V I E W
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

/**
 * Calculates the resultant of emotional addition of the material and updates
 * the UI.
 */
function updatePreview(ignoreSubtraction) {
  const materialSum = { p: 0, m: 0, c: 0, a: 0 };
  let materialValues = [];
  let recencySum = { p: 0, m: 0, c: 0, a: 0 };

  // sum all the values per emotion
  materialSelects.each((index, element) => {
    if (!element.disabled && element.value !== 'null') {
      const sentibarValues = MATERIAL[parseInt(element.value)];

      materialSum.p += sentibarValues.p;
      materialSum.m += sentibarValues.m;
      materialSum.c += sentibarValues.c;
      materialSum.a += sentibarValues.a;
      materialValues.push(sentibarValues);
    }
  });

  // set the values of the addition in the debug UI
  setSentibarValues({
    sentibar: modSumSentibar,
    material: materialSum,
    amplitudeLevel: PRV_AMPLITUDE_LEVEL
  });

  // compute the subtraction of recency effect
  if (materialValues.length > 1) {
    materialValues.forEach((sentibar, index, array) => {
      if (index < array.length - 1) {
        recencySum.p -= sentibar.p;
        recencySum.m -= sentibar.m;
        recencySum.c -= sentibar.c;
        recencySum.a -= sentibar.a;
      } else {
        recencySum.p += sentibar.p;
        recencySum.m += sentibar.m;
        recencySum.c += sentibar.c;
        recencySum.a += sentibar.a;
      }
    });
  }

  console.table(recencySum);

  // subtract the recency values to the material sum
  materialSum.p += recencySum.p;
  materialSum.m += recencySum.m;
  materialSum.c += recencySum.c;
  materialSum.a += recencySum.a;

  setSentibarValues({
    sentibar: modSendSentibar,
    material: materialSum,
    amplitudeLevel: PRV_AMPLITUDE_LEVEL
  });

  setButtonDisabled(recButton, materialValues.length > 0);
}

/**
 * Records the news and delivers it to the emition centers.
 */
function recordNews() {}
