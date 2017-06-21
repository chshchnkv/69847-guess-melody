export default class AbstractPresenter {
  /**
   * @function
   * @abstract
   */
  init() {
    throw new Error(`Abstract call of AbstractPresenter.init`);
  }
}
