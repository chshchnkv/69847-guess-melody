import {isAnswerCorrect} from './data';
/**
 * @typedef {Object} State
 * @property {string} level
 * @property {number} lives
 * @property {number} time
 * @property {number} answers
 */

export const MAX_TIME = 120;
export const MAX_TIME_MINS = Math.trunc(MAX_TIME / 60);
export const MAX_LEVELS = 10;
export const WELCOME_LEVEL = -1;
export const RESULTS_LEVEL = MAX_LEVELS + 1;

/**
 * @function
 * @return {State}
 */
export const getInitialState = () => {
  return Object.freeze({
    level: WELCOME_LEVEL,
    lives: 3,
    time: 0,
    answers: 0
  });
};

/**
 * @function
 * @param {State} state
 * @param {number} time
 * @return {State}
 */
export const setTime = (state, time) => {
  const newTime = Math.max(0, state.time >= MAX_TIME ? MAX_TIME : time);
  const newState = Object.assign({}, state, {time: newTime});
  return newTime >= MAX_TIME ? setLevel(newState, RESULTS_LEVEL) : newState;
};

/**
 * @function
 * @param {State} state
 * @param {number} [level = RESULTS_LEVEL]
 * @return {State}
 */
export const setLevel = (state, level) => {
  const toLevel = (typeof level === `undefined`) || (state.lives === 0) ? RESULTS_LEVEL : Math.max(WELCOME_LEVEL, Math.min(RESULTS_LEVEL, level));
  return Object.assign({}, state, {level: toLevel});
};

/**
 * @function
 * @private
 * @param {State} state
 * @param {number} count
 * @return {State}
 */
const _setLivesCount = (state, count) => {
  return Object.assign({}, state, {lives: Math.max(0, count)});
};

/**
 * @function
 * @param {State} state
 * @return {State}
 */
export const decreaseLivesCount = (state) => {
  return _setLivesCount(state, state.lives - 1);
};

/**
 * @function
 * @param {State} state
 * @param {number} [lives]
 * @return {State}
 */
export const resetLivesCount = (state, lives) => {
  return _setLivesCount(state, lives);
};

/**
 * @function
 * @param {State} state
 * @param {number} answers
 * @return {State}
 */
const _setAnswersCount = (state, answers) => {
  return Object.assign({}, state, {answers: Math.max(0, answers)});
};

/**
 * @function
 * @param {State} state
 * @return {State}
 */
export const increaseAnswersCount = (state) => {
  return _setAnswersCount(state, state.answers + 1);
};


/**
 * @function
 * @param {State} state
 * @param {Question} question
 * @param {Answer[] | Answer} answers
 * @return {State}
 */
export const applyAnswer = (state, question, answers) => {
  let resultState = isAnswerCorrect(question, answers) ? increaseAnswersCount(state) : decreaseLivesCount(state);
  resultState = setLevel(resultState, question.next);

  return Object.assign({}, state, resultState);
};
