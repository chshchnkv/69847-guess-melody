import {getInitialState, applyAnswer, tick, MAX_TIME, RESULTS_LEVEL} from './state';
import LevelGenreView from './level-genre.view';
import LevelArtistView from './level-artist.view';
import changeView from '../change-view';
import application from '../application';
import AbstractPresenter from '../abstract-presenter';
import {QuestionType} from '../data';
import timer from '../timer';
import timerView from './timer.view';

class GamePresenter extends AbstractPresenter {
  constructor(data) {
    super();
    this._data = data;
  }

  /**
   * Стартует игру
   * @function
   * @override
   * @param {State} [state = getInitialState()]
   */
  init(state = getInitialState()) {
    this.state = state;
    this.changeState(this.state);
    this.timerStop = timer(MAX_TIME, () => this.finishGame());
    this._tickInterval = setInterval(() => {
      this.state = tick(this.state);
    }, 1000);
  }

  /**
   * Завершает игру
   * @function
   */
  finishGame() {
    this.timerStop();
    clearInterval(this._tickInterval);
    application.constructor.showResults({answers: this.state.answers, time: this.state.time, score: this.state.score});
  }

  /**
   * @function
   * @param {number} level
   * @return {Question|null}
   */
  getLevelQuestion(level) {
    return level < this._data.questions.length ? this._data.questions[level] : null;
  }

  /**
   * Показ нужной вьюхи в зависимости от состояния игры
   * @function
   * @override
   * @param {State} state
   */
  changeState(state) {
    this.state = state;

    if (this.state.level !== RESULTS_LEVEL) {
      const question = this.getLevelQuestion(this.state.level);
      let answerTime = 0;
      this.view = question.type === QuestionType.ARTIST ? new LevelArtistView(question, timerView) : new LevelGenreView(question, timerView);

      this.view.onAnswer = (answers) => {
        this.view.stopPlayback();
        this.changeState(applyAnswer(this.state, question, answers, new Date() - answerTime));
      };

      answerTime = new Date();
      changeView(this.view);
    } else {
      this.finishGame();
    }
  }
}

export default GamePresenter;
