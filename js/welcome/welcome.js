import changeView from '../change-view';
import welcomeView from './welcome.view';
import application from '../application';
import AbstractPresenter from '../abstract-presenter';

class WelcomePresenter extends AbstractPresenter {
  /**
   * @function
   * @override
   */
  init() {
    this.view = welcomeView;
    changeView(this.view);

    this.view.onStart = () => {
      application.constructor.showGame();
    };
  }
}

const welcomePresenter = new WelcomePresenter();
export default welcomePresenter;
