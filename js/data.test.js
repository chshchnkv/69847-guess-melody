import assert from 'assert';
import data from './data';
import {initialState, setAnswers, setLevel, setLives, setTime, userAnswersQuestion, RESULTS_LEVEL} from './data';

const testQuestions = data.questions;

describe(`Game`, () => {
  it(`should return initial state`, () => {
    assert.equal(3, initialState.lives);
  });

  it(`should increment answers count by 1`, () => {
    assert.equal(1, setAnswers(initialState, 1).answers);
  });

  it(`should decrement lives by 1`, () => {
    assert.equal(2, setLives(initialState, -1).lives);
  });

  it(`should set lives count to 2`, () => {
    assert.equal(2, setLives(initialState, 2).lives);
  });

  it(`should set level to 2nd`, () => {
    assert.equal(2, setLevel(initialState, 2).level);
  });

  it(`should not set negative level`, () => {
    assert.notEqual(-1, Math.sign(setLevel(initialState, -1).level));
  });

  it(`should not set negative lives`, () => {
    assert.notEqual(-1, Math.sign(setLives(initialState, -1).lives));
  });

  it(`should set time to 42`, () => {
    assert.equal(42, setTime(initialState, 42).time);
  });

  it(`should not set negative time`, () => {
    assert.notEqual(-1, Math.sign(setTime(initialState, -50).time));
  });

  it(`should finish after 120 seconds`, () => {
    const finishedState = setTime(initialState, 120);
    assert.equal(120, setTime(finishedState, 121).time);
    assert.equal(120, setTime(finishedState, 90).time);
  });

  it(`should contain max 10 levels`, () => {
    assert.equal(10, setLevel(initialState, 10).level);
    assert.equal(RESULTS_LEVEL, setLevel(initialState, 666).level);
  });

  it(`should contain questions of both types`, () => {
    const artistQuestion = data.questions.filter((question) => {
      return question.type === `artist`;
    });

    const genreQuestion = data.questions.filter((question) => {
      return question.type === `genre`;
    });


    assert.equal(true, artistQuestion.length > 0 && genreQuestion.length > 0);
  });

  it(`should decrease lives if user answers incorrect`, () => {
    const testQuestion = testQuestions[0];

    const userAnswer = {
      id: 2,
      content: `./img/diviziya.jpg`,
      label: `Lorde`,
      isCorrect: false
    };

    assert.equal(2, userAnswersQuestion(initialState, testQuestion, userAnswer).lives);
  });

  it(`should decrease lives if user answers partially correct`, () => {
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

    assert.equal(2, userAnswersQuestion(initialState, testQuestion, userAnswers).lives);
  });

  it(`should move user to next level for correct answer`, () => {
    const testQuestion = testQuestions[0];
    const userAnswer = {
      id: 0,
      content: `./img/pelageya.jpg`,
      label: `Пелагея`,
      isCorrect: true
    };

    assert.notEqual(initialState.level, userAnswersQuestion(initialState, testQuestion, userAnswer).level);
  });

  it(`should show results after 120 seconds`, () => {
    const finishedState = setTime(initialState, 120);
    assert.equal(RESULTS_LEVEL, finishedState.level);
  });

  it(`should contain 3 options in 'artist' questions`, () => {
    const artistTypedQuestions = data.questions.filter((question) => question.type === `artist`);
    assert.equal(true, artistTypedQuestions.every((question) => question.answers.length === 3));
  });

  it(`should contain only 1 correct answer in 'artist' questions`, () => {
    const artistTypedQuestions = data.questions.filter((question) => question.type === `artist`);
    const getCorrectAnswers = (question) => question.answers.filter((answer) => answer.isCorrect);
    assert.equal(true, artistTypedQuestions.every((question) => getCorrectAnswers(question).length === 1));
  });

  it(`should contain 4 melodies in 'genre' questions`, () => {
    const genreTypedQuestions = data.questions.filter((question) => question.type === `genre`);
    assert.equal(true, genreTypedQuestions.every((question) => question.answers.length === 4));
  });

  it(`should show results screen after 3 errors`, () => {
    let question = testQuestions[0];
    let answer = {
      id: 1,
      content: `./img/diviziya.jpg`,
      label: `Краснознаменная дивизия имени моей бабушки`,
      isCorrect: false
    };
    let newState = userAnswersQuestion(initialState, question, answer);
    assert.equal(question.next, newState.level);

    question = testQuestions[1];
    answer = {
      id: 2,
      content: `./audio/3.mp3`,
      isCorrect: false
    };
    newState = userAnswersQuestion(newState, question, answer);
    assert.equal(question.next, newState.level);

    question = testQuestions[2];
    answer = {
      id: 2,
      content: `./img/mara.jpg`,
      label: `Мара`,
      isCorrect: false
    };
    newState = userAnswersQuestion(newState, question, answer);
    assert.equal(RESULTS_LEVEL, newState.level);
  });
});
