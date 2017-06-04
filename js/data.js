/**
 * @typedef {Object} Question
 * @property {string} type - [artist|genre]
 * @property {Object} answers
 * @property {number} answers.id
 * @property {Answer} answers.answer
 */

/**
 * @typedef {Object} Answer
 * @property {string} content
 * @property {string} label
 * @property {boolean} isCorrect
 */


export default Object.freeze({
  'question-1': {
    type: `artist`,
    label: `Кто исполняет эту песню?`,
    answers: {
      'answer-1': {
        content: `./img/pelageya.jpg`,
        label: `Пелагея`,
        isCorrect: true
      },
      'answer-2': {
        content: `./img/diviziya.jpg`,
        label: `Краснознаменная дивизия имени моей бабушки`,
        isCorrect: false
      },
      'answer-3': {
        content: `./img/diviziya.jpg`,
        label: `Lorde`,
        isCorrect: false
      }
    },
    next: `question-2`
  },
  'question-2': {
    type: `genre`,
    label: `Выберите инди-рок треки`,
    answers: {
      'answer-1': {
        content: `./audio/1.mp3`,
        isCorrect: true
      },
      'answer-2': {
        content: `./audio/2.mp3`,
        isCorrect: true
      },
      'answer-3': {
        content: `./audio/3.mp3`,
        isCorrect: false
      },
      'answer-4': {
        content: `./audio/3.mp4`,
        isCorrect: false
      }
    }
  }
});
