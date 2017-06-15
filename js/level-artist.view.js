import LevelView from './level.view';
import AnswerArtistView from './answer-artist.view';
import {MAX_TIME_MINS} from './state';

export default class LevelArtistView extends LevelView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--level main--level-artist">
        <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
          <circle
            cx="390" cy="390" r="370"
            class="timer-line"
            style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
      
          <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
            <span class="timer-value-mins">${MAX_TIME_MINS}</span><!--
            --><span class="timer-value-dots">:</span><!--
            --><span class="timer-value-secs">00</span>
          </div>
        </svg>
      
        <div class="main-wrap">
          <div class="main-timer"></div>
      
          <h2 class="title main-title"></h2>
          <div class="player-wrapper"></div>
          <form class="main-list"></form>
        </div>  
      </section>
    `.trim();
  }

  /**
   * @function
   * @override
   * @return {HTMLElement}
   */
  render() {
    const element = super.render();
    element.querySelector(`.main-title`).innerText = this.question.label;

    const answersList = element.querySelector(`.main-list`);
    this.question.answers.forEach((answer) => {
      const answerView = new AnswerArtistView(answer);
      answerView.onAnswer = (answerData) => this.onAnswer([answerData]);
      this.answerViews.push(answerView);
      answersList.appendChild(answerView.element);
    });
    return element;
  }

  onAnswer(answers) {};
}
