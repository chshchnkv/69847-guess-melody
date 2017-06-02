/**
 * Блок с содержимым экрана
 * @type {HTMLElement}
 */
const mainSection = document.querySelector(`section.main`);

/**
 * Показывает экран
 * @function
 * @param {DocumentFragment} screenElement - элемент экрана
 */
export default (screenElement) => {
  if (mainSection && mainSection.childElementCount > 0) {
    mainSection.replaceChild(screenElement, mainSection.firstElementChild);
  } else {
    mainSection.appendChild(screenElement);
  }
};
