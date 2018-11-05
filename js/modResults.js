/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ╠═0 MODULE: R E S U L T S
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 */

const moduleResults = {
  /**
   * Gets the UI elements related to the module, perform actions over them and
   * assign event listeners.
   */
  start: function() {
    endDayButton = $('#end-day');
    votingGroups = {
      a: $('#groupA'),
      b: $('#groupB'),
      u: $('#groupU')
    };
    endDayButtonDesc = $('#end-day-desc');

    endDayButtonDesc.hide();

    // set event listeners
    endDayButton.on('click', this.nextDay);
  },

  /**
   * Sets the values for voting intentions based on the impact of the news.
   */
  updateVotingIntentions: function() {
    const votingPctA = `${getVotingPercentage(votingIntentions.a)}%`;
    const votingPctB = `${getVotingPercentage(votingIntentions.b)}%`;
    const votingPctU = `${getVotingPercentage(votingIntentions.u)}%`;

    votingGroups.a.children('h3').text(votingPctA);
    votingGroups.a.children('h2').text(`${candidateA}.`);
    votingGroups.a.children('.fill').css('width', votingPctA);

    votingGroups.b.children('h3').text(votingPctB);
    votingGroups.b.children('h2').text(`${candidateB}.`);
    votingGroups.b.children('.fill').css('width', votingPctB);

    votingGroups.u.children('h3').text(votingPctU);
    votingGroups.u.children('.fill').css('width', votingPctU);
  },

  /**
   * Based on the value of each emotion, modify the voting intention of people.
   *
   * @param {*} newsEmotion
   */
  calculateNewsImpact: function(newsEmotion) {
    let highestValue = 0;
    let lowestValue = MTL_AMP_LEVELS * currentFact.maxMaterial;

    for (const emotionKey in newsEmotion) {
      if (newsEmotion.hasOwnProperty(emotionKey)) {
        if (newsEmotion[emotionKey] > highestValue) {
          if (highestValue < lowestValue) {
            lowestValue = highestValue;
          }

          highestValue = newsEmotion[emotionKey];
        } else if (newsEmotion[emotionKey] < lowestValue) {
          lowestValue = newsEmotion[emotionKey];
        }
      }
    }

    if (newsEmotion[currentFact.goalAvoid] === highestValue) {
      // a loser is you!
      // take a GREAT random number of people and affect their voting intention
      // opposed to the fact purpose
      const peopleToAffect = randomInt(GREAT_IMPACT[0], GREAT_IMPACT[1]);
      votingIntentions[currentFact.assignTo] -= peopleToAffect;
      votingIntentions[currentFact.takeFrom] += peopleToAffect;
    } else {
      // check if the highest emotion matches the target emotion
      if (newsEmotion[currentFact.goal] === highestValue) {
        // a winner is you!
        // take a GREAT random number of people and affect their voting intention
        // according to the fact purpose
        const peopleToAffect = randomInt(GREAT_IMPACT[0], GREAT_IMPACT[1]);
        votingIntentions[currentFact.takeFrom] -= peopleToAffect;
        votingIntentions[currentFact.assignTo] += peopleToAffect;
      } else {
        // take a NORMAL random number of people and affect their voting intention
        // according to the fact purpose
        const peopleToAffect = randomInt(NORMAL_IMPACT[0], NORMAL_IMPACT[1]);
        votingIntentions[currentFact.takeFrom] -= peopleToAffect;
        votingIntentions[currentFact.assignTo] += peopleToAffect;
      }
    }

    // update the UI so the player can see how her actions affected the voting
    // intentions
    this.updateVotingIntentions();
  },

  /**
   * Ends the day by calculating how the voting intentions changed.
   */
  nextDay: function() {
    moduleFacts.setDay();
    moduleFacts.hideFactDesc();
    endDayButtonDesc.hide();
  }
};
