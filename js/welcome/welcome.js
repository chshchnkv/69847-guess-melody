import changeView from '../change-view';
import welcomeView from './welcome.view';
import Application from '../application';

class WelcomePresenter {
  constructor() {
    this.view = welcomeView;
    changeView(this.view);

    this.view.onStart = () => {
      Application.showGame();
    };
  }
}

export default WelcomePresenter;
