import changeView from '../change-view';
import welcomeView from './welcome.view';
import app from '../application';

class Welcome {
  constructor() {
    this.view = welcomeView;
  }

  init() {
    changeView(this.view);

    this.view.onStart = () => {
      app.showGame();
    };
  }
}

const welcome = new Welcome();
export default welcome;
