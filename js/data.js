/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} label
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

export const QuestionType = {
  GENRE: `genre`,
  ARTIST: `artist`
};

const data = Object.freeze({
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
      content: `./img/lorde.png`,
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
      isCorrect: false
    }, {
      id: 1,
      content: `./img/masha-medvedi.jpg`,
      label: `Маша и Медведи`,
      isCorrect: true
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

export default data;

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
