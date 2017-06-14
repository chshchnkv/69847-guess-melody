import assert from 'assert';
import data from './data';
import {getInitialState, increaseAnswersCount, setLevel, decreaseLivesCount, resetLivesCount, setTime, applyAnswer, RESULTS_LEVEL, MAX_LEVELS, MAX_TIME} from './state';

describe(`game`, () => {

  let initialState;
  beforeEach(() => {
    initialState = getInitialState();
  });

  describe(`getInitialState`, () => {
    it(`should return initial state`, () => {
      // const initialState = getInitialState();
      assert.equal(3, initialState.lives);
    });
  });

  describe(`increaseAnswersCount`, () => {
    it(`should increase answers count by 1`, () => {
      // const initialState = getInitialState();
      assert.equal(1, increaseAnswersCount(initialState).answers);
    });
  });

  describe(`decreaseLives`, () => {
    it(`should decrement lives by 1`, () => {
      // const initialState = getInitialState();
      assert.equal(2, decreaseLivesCount(initialState).lives);
    });
  });

  describe(`resetLives`, () => {
    it(`should set lives count to 2`, () => {
      // const initialState = getInitialState();
      assert.equal(2, resetLivesCount(initialState, 2).lives);
    });
  });

  describe(`setLevel`, () => {
    it(`should set level to given positive number`, () => {
      // const initialState = getInitialState();
      assert.equal(2, setLevel(initialState, 2).level);
    });

    it(`should not change level if number is negative`, () => {
      // const initialState = getInitialState();
      assert.equal(initialState.level, setLevel(initialState, -10).level);
    });

    it(`should contain max MAX_LEVELS levels`, () => {
      // const initialState = getInitialState();
      assert.equal(MAX_LEVELS, setLevel(initialState, MAX_LEVELS).level);
      assert.equal(RESULTS_LEVEL, setLevel(initialState, 666).level);
    });
  });

  describe(`setTime`, () => {
    it(`should set time to given number (from allowed range)`, () => {
      // const initialState = getInitialState();
      const timeValue = Math.floor(Math.random() * (MAX_TIME - 1) + 1);
      assert.equal(timeValue, setTime(initialState, timeValue).time);
    });

    it(`should not set negative time`, () => {
      // const initialState = getInitialState();
      assert.notEqual(true, setTime(initialState, -50).time < 0);
    });

    it(`should finish after 120 seconds`, () => {
      // const initialState = getInitialState();
      const finishedState = setTime(initialState, 120);
      assert.equal(120, setTime(finishedState, 121).time);
      assert.equal(120, setTime(finishedState, 90).time);
    });

    it(`should show results after 120 seconds`, () => {
      // const initialState = getInitialState();
      const finishedState = setTime(initialState, 120);
      assert.equal(RESULTS_LEVEL, finishedState.level);
    });
  });

  describe(`userAnswersQuestion`, () => {
    it(`should decrease lives if user answer is incorrect`, () => {
      // const initialState = getInitialState();
      const testQuestions = data.questions;

      const testQuestion = testQuestions[0];

      const userAnswer = {
        id: 2,
        content: `./img/diviziya.jpg`,
        label: `Lorde`,
        isCorrect: false
      };

      assert.equal(2, applyAnswer(initialState, testQuestion, userAnswer).lives);
    });

    it(`should decrease lives if user answer is partially correct`, () => {
      // const initialState = getInitialState();
      const testQuestions = data.questions;

      const testQuestion = testQuestions[1];

      const userAnswers = [{
        id: 1,
        content: `./audio/2.mp3`,
        isCorrect: true
      }, {
        id: 2,
        content: `./audio/3.mp3`,
        isCorrect: false
      }];

      assert.equal(2, applyAnswer(initialState, testQuestion, userAnswers).lives);
    });

    it(`should move user to next level for correct answer`, () => {
      // const initialState = getInitialState();
      const testQuestions = data.questions;

      const testQuestion = testQuestions[0];
      const userAnswer = {
        id: 0,
        content: `./img/pelageya.jpg`,
        label: `Пелагея`,
        isCorrect: true
      };

      assert.notEqual(initialState.level, applyAnswer(initialState, testQuestion, userAnswer).level);
    });

    it(`should show results screen after 3 errors`, () => {
      // const initialState = getInitialState();
      const testQuestions = data.questions;

      let question = testQuestions[0];
      let answer = {
        id: 1,
        content: `./img/diviziya.jpg`,
        label: `Краснознаменная дивизия имени моей бабушки`,
        isCorrect: false
      };
      let newState = applyAnswer(initialState, question, answer);
      assert.equal(question.next, newState.level);

      question = testQuestions[1];
      answer = {
        id: 2,
        content: `./audio/3.mp3`,
        isCorrect: false
      };
      newState = applyAnswer(newState, question, answer);
      assert.equal(question.next, newState.level);

      question = testQuestions[2];
      answer = {
        id: 2,
        content: `./img/mara.jpg`,
        label: `Мара`,
        isCorrect: false
      };
      newState = applyAnswer(newState, question, answer);
      assert.equal(RESULTS_LEVEL, newState.level);
    });
  });
});
