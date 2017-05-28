/**
 * Блок с содержимым экрана
 * @type {HTMLElement}
 */
const mainSection = document.querySelector(`section.main`);

/**
 * Показывает экран
 * @function
 * @param {HTMLElement} screenElement - элемент экрана
 */
export default (screenElement) => {
  if (mainSection && mainSection.childElementCount > 0) {
    mainSection.replaceChild(screenElement, mainSection.firstChild);
  } else {
    mainSection.appendChild(screenElement);
  }
};
