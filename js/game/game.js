import {getLevelQuestion} from '../data';
import {getInitialState, applyAnswer} from './state';
import LevelGenreView from './level-genre.view';
import LevelArtistView from './level-artist.view';
import changeView from '../change-view';
import app from '../application';

class Game {
  constructor() {

  }

  init(state = getInitialState()) {
    this.state = state;
    const question = getLevelQuestion(this.state.level);
    if (question) {
      this.view = question.type === `artist` ? new LevelArtistView(question) : new LevelGenreView(question);

      this.view.onAnswer = (answers) => {
        this.init(applyAnswer(this.state, question, answers));
      };

      changeView(this.view);
    } else {
      app.showResults({answers: this.state.answers, percent: 60});
    }
  }
}

const game = new Game();
export default game;
