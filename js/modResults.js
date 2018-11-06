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
    const votingPctA = getVotingPercentage(votingIntentions.a);
    const votingPctB = getVotingPercentage(votingIntentions.b);
    const votingPctU = getVotingPercentage(votingIntentions.u);
    const votingPctAText = `${votingPctA}%`;
    const votingPctBText = `${votingPctB}%`;
    const votingPctUText = `${votingPctU}%`;

    if (candidateAStart === -1) {
      candidateAStart = votingPctA;
      candidateBStart = votingPctB;
    } else {
      candidateAIncrease = votingPctA;
      candidateBIncrease = votingPctB;
    }

    votingGroups.a.children('h3').text(votingPctAText);
    votingGroups.a.children('h2').text(`${candidateA}.`);
    votingGroups.a.children('.fill').css('width', votingPctAText);

    votingGroups.b.children('h3').text(votingPctBText);
    votingGroups.b.children('h2').text(`${candidateB}.`);
    votingGroups.b.children('.fill').css('width', votingPctBText);

    votingGroups.u.children('h3').text(votingPctUText);
    votingGroups.u.children('.fill').css('width', votingPctUText);
  },

  /**
   * Based on the percentage of each emotion, modify the voting intention of people.
   *
   * @param {*} newsEmotionPcts
   */
  calculateNewsImpact: function(newsEmotionPcts) {
    let peopleSuccess = 0;
    let peopleFailure = 0;
    const avoidPct = newsEmotionPcts[currentFact.goalAvoid];
    const goalPct = newsEmotionPcts[currentFact.goal];

    // check if the player succeeded
    if (avoidPct > goalPct) {
      // - - - a loser is you! - - -
      alert('¡Tenga cuidado! Ha generado una emoción no deseada.');

      // take a range to calculate the impact based on the percentage of the emotion
      peopleFailure = this.getPeopleNumber(avoidPct);

      if (votingIntentions[currentFact.assignTo] >= peopleFailure) {
        votingIntentions[currentFact.assignTo] -= peopleFailure;
        votingIntentions[currentFact.takeFrom] += peopleFailure;
      }
    } else {
      // - - - a winner is you! - - -

      // take a range to calculate the impact based on the percentage of the emotion
      peopleSuccess = this.getPeopleNumber(goalPct);

      if (votingIntentions[currentFact.takeFrom] >= peopleSuccess) {
        votingIntentions[currentFact.takeFrom] -= peopleSuccess;
        votingIntentions[currentFact.assignTo] += peopleSuccess;
      }
    }

    for (const group in votingIntentions) {
      if (votingIntentions.hasOwnProperty(group)) {
        votingIntentions[group] = Math.max(votingIntentions[group], 0);
      }
    }

    // update the UI so the player can see how her actions affected the voting
    // intentions
    this.updateVotingIntentions();
  },

  /**
   * Generates a random number from a range that is calculated based on a percentage.
   * @param {Number} percentageRange The percentage used to calculated the range
   * to use to get a random number.
   */
  getPeopleNumber: function(percentageRange) {
    const from = (NEWS_IMPACT[1] * percentageRange) / 100 + NEWS_IMPACT[0];
    const to = percentageRange >= 50 ? NEWS_IMPACT[1] : NEWS_IMPACT[0];

    return randomInt(from, to);
  },

  /**
   * Ends the day by calculating how the voting intentions changed.
   */
  nextDay: function() {
    setButtonEnabled(endDayButton);

    // show feedbak to the player about her efficiency
    let message = '';
    if (candidateAStart < candidateAIncrease) {
      message = `¡Muy bien! La intención de voto por ${candidateA} ha aumentado un ${candidateAIncrease -
        candidateAStart}%`;
    }
    else {
      message = `¡Pilas! La intención de voto por ${candidateA} ha disminuido en ${candidateAIncrease -
        candidateAStart}%`;
    }
    alert(message);

    currentFactIndex = 0;
    candidateAStart = getVotingPercentage(votingIntentions.a);
    candidateBStart = getVotingPercentage(votingIntentions.b);

    moduleFacts.hideFactDesc();
    endDayButtonDesc.hide();
    setButtonEnabled(nextFactButton, true);

    moduleFacts.setDay();
  }
};
