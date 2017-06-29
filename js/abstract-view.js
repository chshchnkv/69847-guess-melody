import createElement from './templates';

export default class AbstractView {
  /**
   * @get
   * @abstract
   * @type {string}
   */
  get template() {
    throw new Error(`Abstract call of AbstractView.template`);
  }

  /**
   * @get
   * @return {DocumentFragment|*}
   */
  get element() {
    if (!this._element) {
      this._element = this.render();
      this.bind();
    }
    return this._element;
  }

  /**
   * @function
   * @return {HTMLElement}
   */
  render() {
    return createElement(this.template);
  }

  /**
   * @function
   * @abstract
   */
  bind() {}
}
