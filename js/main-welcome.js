import showScreen from './show-screen';
import {getInitialState, setLevel} from './state';
import welcomeView from './welcome.view';

export default () => {
  welcomeView.onStart = () => {
    showScreen(setLevel(getInitialState(), 0));
  };
  return welcomeView.element;
};
