import {getInitialState, applyAnswer, tick, RESULTS_LEVEL} from './state';
import LevelGenreView from './level-genre.view';
import LevelArtistView from './level-artist.view';
import changeView from '../change-view';
import application from '../application';
import AbstractPresenter from '../abstract-presenter';
import {QuestionType} from '../data';

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
    this._tickInterval = setInterval(() => {
      this.state = tick(this.state);
      if (this.isFinished) {
        this.finishGame();
      }
    }, 1000);
    this.changeState(this.state);
  }

  /**
   * Проверяет закончилась ли игра
   * @get
   * @return {boolean}
   */
  get isFinished() {
    return this.state.level === RESULTS_LEVEL;
  }

  /**
   * Завершает игру
   * @function
   */
  finishGame() {
    clearInterval(this._tickInterval);
    application.constructor.showResults({answers: this.state.answers, percent: 60});
  }

  /**
   * @function
   * @param {number} level
   * @return {Question|null}
   */
  getLevelQuestion(level) {
    if (level < this._data.questions.length) {
      return this._data.questions[level];
    }
    return null;
  }

  /**
   * Показ нужной вьюхи в зависимости от состояния игры
   * @function
   * @override
   * @param {State} state
   */
  changeState(state) {
    this.state = state;

    const question = this.getLevelQuestion(this.state.level);
    if (question) {
      this.view = question.type === QuestionType.ARTIST ? new LevelArtistView(question) : new LevelGenreView(question);

      this.view.onAnswer = (answers) => {
        this.changeState(applyAnswer(this.state, question, answers));
      };

      changeView(this.view);
    } else {
      this.finishGame();
    }
  }
}

export default GamePresenter;
