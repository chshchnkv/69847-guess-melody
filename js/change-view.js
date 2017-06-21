/**
 * Блок с содержимым экрана
 * @type {HTMLElement}
 */
const appElement = document.querySelector(`.app`);

/**
 * @function
 * @param {AbstractView} view
 */
export default (view) => {
  appElement.replaceChild(view.element, appElement.firstElementChild);
};
