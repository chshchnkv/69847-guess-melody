import welcomePresenter from './welcome/welcome';
import resultsPresenter from './results/results';
import GamePresenter from './game/game';
import Model from './model';
import ModelAdapter from './model-adapter';
import {QuestionType} from './data';

/**
 * @enum {string}
 */
const ControllerId = {
  WELCOME: ``,
  GAME: `game`,
  RESULTS: `results`
};

/**
 * @function
 * @param {string} hash
 * @return {string}
 */
const getPresenterIdFromHash = (hash) => hash.replace(`#`, ``);

const defaultAdapter = new class extends ModelAdapter {
  preprocess(data) {
    const preprocessed = {questions: []};
    const questions = preprocessed.questions;
    const questionsCount = data.length;
    Object.keys(data).forEach((questionKey, dataQuestionIndex) => {

      const dataQuestion = data[questionKey];

      const modelQuestion = {
        id: dataQuestionIndex,
        type: dataQuestion.type,
        label: dataQuestion.question
      };

      if (dataQuestion.type === QuestionType.ARTIST) {
        modelQuestion.content = dataQuestion.src;
      }

      const modelAnswers = [];

      dataQuestion.answers.forEach((dataAnswer, dataAnswerIndex) => {
        const modelAnswer = {
          id: dataAnswerIndex,
          content: dataAnswer.src,
        };

        if (dataQuestion.type === QuestionType.GENRE) {
          modelAnswer.isCorrect = dataAnswer.genre === dataQuestion.genre;
        } else if (dataQuestion.type === QuestionType.ARTIST) {
          modelAnswer.content = dataAnswer.image.url;
          modelAnswer.label = dataAnswer.title;
          modelAnswer.isCorrect = dataAnswer.isCorrect;
        }

        modelAnswers.push(modelAnswer);
      });

      modelQuestion.answers = modelAnswers;
      if (dataQuestionIndex < questionsCount - 1) {
        modelQuestion.next = dataQuestionIndex + 1;
      }

      questions.push(modelQuestion);
    });
    return preprocessed;
  }
}();

const statsAdapter = new class extends ModelAdapter {
  preprocess(data) {
    return data.filter((item) => typeof item.time !== `undefined`);
  }
}();

/**
 * @class
 */
class Application {
  constructor() {
    /**
     * @type {Model}
     */
    this.model = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/questions`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/69847`;
      }
    }();

    this.stats = new class extends Model {
      get urlRead() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/69847`;
      }

      get urlWrite() {
        return `https://intensive-ecmascript-server-btfgudlkpi.now.sh/guess-melody/stats/69847`;
      }
    }();

    window.onhashchange = () => this.changeController(getPresenterIdFromHash(location.hash));
  }

  /**
   * Обрабатывает хэш и показывает сразу нужный презентер
   * @function
   */
  init() {
    this.model.load(defaultAdapter)
      .then((data) => this.setup(data))
      .then(() => this.changeController(getPresenterIdFromHash(location.hash)));
  }

  setup(data) {
    /**
     * @enum {AbstractPresenter}
     */
    this.routes = {
      [ControllerId.WELCOME]: welcomePresenter,
      [ControllerId.RESULTS]: resultsPresenter,
      [ControllerId.GAME]: new GamePresenter(data)
    };
  }

  /**
   * @function
   * @param {string} [route = ``]
   */
  changeController(route = ``) {
    const routeId = route.split(`/`)[0];
    /** @type {AbstractPresenter} */
    const presenter = this.routes[routeId];

    if (routeId === ControllerId.RESULTS) {
      const results = JSON.parse(atob(location.hash.split(`/`)[1]));
      this.stats.send(results)
        .then(() => this.stats.load(statsAdapter))
        .then((fullResults) => {
          const sorted = fullResults.slice(0);
          sorted.sort((a, b) => b.date - a.date);
          presenter.init(sorted.slice(0, 3));
        });
    } else {
      presenter.init();
    }
  }

  /**
   * @function
   */
  static showWelcome() {
    location.hash = ControllerId.WELCOME;
  }

  /**
   * @function
   */
  static showGame() {
    location.hash = ControllerId.GAME;
  }

  /**
   * @function
   * @param {Results} resultsData
   */
  static showResults(resultsData) {
    location.hash = `${ControllerId.RESULTS}/${btoa(JSON.stringify(resultsData))}`;
  }
}

/**
 * @type {Application}
 */
const application = new Application();
export default application;
