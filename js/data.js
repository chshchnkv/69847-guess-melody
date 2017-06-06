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
      content: `./audio/3.mp4`,
      isCorrect: false
    }]
  }]
});
