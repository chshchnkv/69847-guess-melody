/**
 * @typedef {Object} State
 * @property {string} level
 * @property {number} lives
 * @property {number} time
 * @property {number} answers
 * @type {State}
 */
export const initialState = Object.freeze({
  level: 0,
  lives: 3,
  time: 0,
  answers: 0
});

export const MAX_TIME = 120;
export const MAX_LEVELS = 10;
export const RESULTS_LEVEL = MAX_LEVELS + 1;

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
  const toLevel = (typeof level === `undefined`) || (state.lives === 0) ? RESULTS_LEVEL : Math.max(0, Math.min(RESULTS_LEVEL, level));
  return Object.assign({}, state, {level: toLevel});
};

/**
 * @function
 * @param {State} state
 * @param {number} lives
 * @return {State}
 */
export const setLives = (state, lives) => {
  const newLivesCount = lives >= 0 ? lives : state.lives + lives;
  return Object.assign({}, state, {lives: Math.max(0, newLivesCount)});
};

/**
 * @function
 * @param {State} state
 * @param {number} answers
 * @return {State}
 */
export const setAnswers = (state, answers) => {
  return Object.assign({}, state, {answers: Math.max(0, answers)});
};


/**
 * @function
 * @param {State} state
 * @param {Question} question
 * @param {Answer[] | Answer} answers
 * @return {State}
 */
export const userAnswersQuestion = (state, question, answers) => {
  const isCorrect = isAnswerCorrect(question, [].concat(answers));
  let resultState = setAnswers(state, isCorrect ? state.answers + 1 : state.answers);
  resultState = setLives(resultState, isCorrect ? state.lives : -1);
  resultState = setLevel(resultState, question.next);

  return Object.assign({}, state, resultState);
};

/**
 * @function
 * @param {Question} question
 * @param {Answer[]} answers
 * @return {boolean}
 */
export const isAnswerCorrect = (question, answers) => {
  const compareAnswers = (a1, a2) => a1.id - a2.id;

  const correctAnswers = question.answers.filter((answer) => answer.isCorrect).sort(compareAnswers);

  if (correctAnswers.length !== answers.length) {
    return false;
  }

  const givenAnswers = answers.slice(0).sort(compareAnswers);
  return givenAnswers.every((answer, index) => answer.id === correctAnswers[index].id);
};

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} type - [artist|genre]
 * @property {Answer[]} answers
 * @property {number} next
 */

/**
 * @typedef {Object} Answer
 * @property {number} id
 * @property {string} content
 * @property {string} label
 * @property {boolean} isCorrect
 */


export default Object.freeze({
  questions: [{
    id: 0,
    type: `artist`,
    label: `Кто исполняет эту песню?`,
    answers: [{
      id: 0,
      content: `./img/pelageya.jpg`,
      label: `Пелагея`,
      isCorrect: true
    }, {
      id: 1,
      content: `./img/diviziya.jpg`,
      label: `Краснознаменная дивизия имени моей бабушки`,
      isCorrect: false
    }, {
      id: 2,
      content: `./img/diviziya.jpg`,
      label: `Lorde`,
      isCorrect: false
    }],
    next: 1
  }, {
    id: 1,
    type: `genre`,
    label: `Выберите инди-рок треки`,
    answers: [{
      id: 0,
      content: `./audio/1.mp3`,
      isCorrect: true
    }, {
      id: 1,
      content: `./audio/2.mp3`,
      isCorrect: true
    }, {
      id: 2,
      content: `./audio/3.mp3`,
      isCorrect: false
    }, {
      id: 3,
      content: `./audio/4.mp3`,
      isCorrect: false
    }],
    next: 2
  }, {
    id: 2,
    type: `artist`,
    label: `Кто исполняет эту песню?`,
    answers: [{
      id: 0,
      content: `./img/linda.jpg`,
      label: `Линда`,
      isCorrect: true
    }, {
      id: 1,
      content: `./img/masha-medvedi.jpg`,
      label: `Маша и Медведи`,
      isCorrect: false
    }, {
      id: 2,
      content: `./img/mara.jpg`,
      label: `Мара`,
      isCorrect: false
    }],
    next: 3
  }, {
    id: 3,
    type: `genre`,
    label: `Выберите гоа-транс треки`,
    answers: [{
      id: 0,
      content: `./audio/5.mp3`,
      isCorrect: false
    }, {
      id: 1,
      content: `./audio/6.mp3`,
      isCorrect: true
    }, {
      id: 2,
      content: `./audio/7.mp3`,
      isCorrect: false
    }, {
      id: 3,
      content: `./audio/8.mp4`,
      isCorrect: false
    }]
  }]
});
