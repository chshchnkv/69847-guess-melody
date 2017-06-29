import welcomePresenter from './welcome/welcome';
import resultsPresenter from './results/results';
import GamePresenter from './game/game';
import Model from './model';
import ModelAdapter from './model-adapter';
import {QuestionType} from './data';
import {MAX_TIME} from './game/state';

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

const PRELOAD_TIMEOUT = 10000;

const preloadAudio = (src) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    audio.preload = `auto`;
    audio.oncanplay = () => {
      clearTimeout(timer);
      resolve(audio);
    };
    audio.src = src;
    const timer = setTimeout(() => {
      resolve(audio);
    }, PRELOAD_TIMEOUT);
  });
};

/**
 * @function
 * @param {Question} question
 * @return {Promise}
 */
const preloadQuestionAudio = (question) => {
  return new Promise((resolve, reject) => {
    if (question.type === QuestionType.ARTIST) {
      preloadAudio(question.content).then((audio) => {
        question.audio = audio;
        resolve(question);
      });
    } else if (question.type === QuestionType.GENRE) {
      Promise.all(question.answers.map((it) => {
        return preloadAudio(it.content)
          .then((audio) => {
            it.audio = audio;
          });
      }))
        .then(() => {
          resolve(question);
        });
    }
  });
};

const defaultAdapter = new class extends ModelAdapter {
  preprocess(data) {
    return new Promise((resolve, reject) => {
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
          if (dataQuestion.src.trim() === ``) {
            return;
          }
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

      Promise.all(questions.map(preloadQuestionAudio))
        .then(() => {
          resolve(preprocessed);
        });
    });
  }
}();

const statsAdapter = new class extends ModelAdapter {
  preprocess(data) {
    for (let result of data) {
      if (!(`time` in result)) {
        result.time = MAX_TIME;
      }

      if (!(`score` in result)) {
        result.score = 0;
      }
    }
    return data;
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
          if (results.answers > 0) {
            const resultsWithLessScore = fullResults.filter((it) => it.score < results.score);
            results.percent = fullResults.length > 0 ? Math.min(100, Math.trunc(resultsWithLessScore.length / fullResults.length * 100)) : 100;
          }
          presenter.init(results);
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
