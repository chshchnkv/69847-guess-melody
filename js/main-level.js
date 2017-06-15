import showScreen from './show-screen';
import LevelGenreView from './level-genre.view';
import LevelArtistView from './level-artist.view';
import {applyAnswer} from './state';

export default (state, question) => {
  const levelView = question.type === `artist` ? new LevelArtistView(question) : new LevelGenreView(question);
  levelView.onAnswer = (answers) => {
    showScreen(applyAnswer(state, question, answers));
  };
  return levelView.element;
};
