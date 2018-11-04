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
      n: $('#groupN')
    };

    // set event listeners
    endDayButton.on('click', this.nextDay);
  },

  /**
   * Sets the values for voting intentions based on the impact of the news.
   */
  updateVotingIntentions: function() {
    votingGroups.a.children('h3').text(`${getVotingPercentage(votingIntentions.a)}%`);
    votingGroups.a.children('h2').text(`${candidateA}.`);
    votingGroups.b.children('h3').text(`${getVotingPercentage(votingIntentions.b)}%`);
    votingGroups.b.children('h2').text(`${candidateB}.`);
    votingGroups.n.children('h3').text(`${getVotingPercentage(votingIntentions.n)}%`);
  },

  /**
   * Ends the day by calculating how the voting intentions changed.
   */
  nextDay: function() {
    // TODO: ???
  }
};
