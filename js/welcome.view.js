import AbstractView from './abstract-view';
import logo from './logo';
// import createElement from './templates';

import {MAX_TIME} from './state';

class WelcomeView extends AbstractView {
  /**
   * @get
   * @override
   * @type {string}
   */
  get template() {
    return `\
      <section class="main main--welcome">
        <button class="main-play">Начать игру</button>
        <h2 class="title main-title">Правила игры</h2>
        <p class="text main-text">
          Правила просты&nbsp;— за&nbsp;${Math.trunc(MAX_TIME / 60)} минуты дать
          максимальное количество правильных ответов.<br>
          Удачи!
        </p>
      </section>`.trim();
  }

  /**
   * @function
   * @override
   */
  render() {
    const welcomeScreen = super.render();
    welcomeScreen.insertBefore(logo(), welcomeScreen.firstElementChild);
    return welcomeScreen;
  }

  /**
   * @function
   * @override
   */
  bind() {
    const playButtonElement = this.element.querySelector(`.main-play`);
    playButtonElement.addEventListener(`click`, (event) => {
      event.preventDefault();
      this.onStart();
    });
  }

  /**
   * @function
   */
  onStart() {}
}

const welcomeView = new WelcomeView();
export default welcomeView;
