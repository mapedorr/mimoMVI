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
      materialValues.push(sentibarValues);

      materialSum.p += sentibarValues.p;
      materialSum.m += sentibarValues.m;
      materialSum.c += sentibarValues.c;
      materialSum.a += sentibarValues.a;
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
    for (let i = materialValues.length - 2; i >= 0; i--) {
      const nextMaterial = materialValues[i + 1];
      const currentMaterial = materialValues[i];

      for (const emotion in recencySum) {
        if (recencySum.hasOwnProperty(emotion)) {
          const emotionSub = nextMaterial[emotion] - currentMaterial[emotion];
          recencySum[emotion] += emotionSub < 0 ? emotionSub : 0;
        }
      }
    }

    console.table(recencySum);
  }

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
