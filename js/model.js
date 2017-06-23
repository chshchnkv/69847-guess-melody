import {ModelAdapter} from './model-adapter';

const defaultAdapter = new class extends ModelAdapter {}();

export default class Model {
  /**
   * @get
   * @type {string}
   * @throws Error
   */
  get urlRead() {
    throw new Error(`Abstract call of Model.urlRead`);
  }

  /**
   * @get
   * @type {string}
   * @throws Error
   */
  get urlWrite() {
    throw new Error(`Abstract call of Model.urlWrite`);
  }

  /**
   * @function
   * @param {ModelAdapter} adapter
   * @return {Promise}
   */
  load(adapter = defaultAdapter) {
    return fetch(this.urlRead)
      .then((resp) => resp.json())
      .then(adapter.preprocess);
  }

  send(data, adapter = defaultAdapter) {

  }
}
