import LevelView from './level.view';
import AnswerArtistView from './answer-artist.view';
import initializePlayer from '../player';

export default class LevelArtistView extends LevelView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `
      <section class="main main--level main--level-artist">      
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
    initializePlayer(element.querySelector(`.player-wrapper`), this.question.content, true);
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
}
