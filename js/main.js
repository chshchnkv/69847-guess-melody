/**
 * Created by stanislavchashchnikov on 24.05.17.
 */

/**
 * Блок с содержимым экрана
 * @type {Element}
 */
const mainSection = document.querySelector(`section.main`);

/**
 * Элемент со всеми шаблонами
 * @type {Element}
 */
const templates = document.getElementById(`templates`);

/**
 * Генерирует элемент по указанному шаблону
 * @function
 * @param {HTMLElement} template - элемент со всеми шаблонами
 * @param {number} [index = 0] - индекс в шаблоне
 * @return {Node|*}
 */
const elementFromTemplate = (template, index = 0) => {
  if (template) {
    const contents = (`content` in template) ? template.content.children : template.children;
    if (index >= 0 && index < contents.length) {
      return contents[index].cloneNode(true);
    }
  }
  return null;
};

/**
 * Массив всех экранов приложения
 * @type {HTMLElement[]}
 */
const gameScreens = [
  elementFromTemplate(templates, 5),
  elementFromTemplate(templates, 0),
  elementFromTemplate(templates, 4),
  elementFromTemplate(templates, 0),
  elementFromTemplate(templates, 4),
  elementFromTemplate(templates, 0),
  elementFromTemplate(templates, 4),
  elementFromTemplate(templates, 0),
  elementFromTemplate(templates, 4),
  elementFromTemplate(templates, 0),
  elementFromTemplate(templates, 4),
  elementFromTemplate(templates, 2),
  elementFromTemplate(templates, 3)
];

/**
 * Возвращает элемент экрана
 * @function
 * @param {number} number - номер экрана в массиве
 * @return {HTMLElement|*}
 */
const getScreen = (number) => {
  if (number >= 0 && number < gameScreens.length) {
    return gameScreens[number];
  }
  return null;
};

/**
 * Показывает экран по номеру
 * @function
 * @param {number} number - номер экрана
 */
const showScreen = (number = 0) => {
  if (mainSection && mainSection.childElementCount > 0) {
    mainSection.replaceChild(getScreen(number), mainSection.firstChild);
  } else {
    mainSection.appendChild(getScreen(number));
  }
};

/**
 * Текущий активный экран
 * @type {number}
 */
let activeScreen = -1;

/**
 * Возвращает номер следующего экрана, если он есть - иначе последний
 * @return {number}
 */
const nextScreen = () => {
  if (activeScreen < gameScreens.length - 1) {
    activeScreen = activeScreen + 1;
  }
  return activeScreen;
};

/**
 * Возвращает номер предыдущего экрана, если он есть - иначе первый
 * @return {number}
 */
const prevScreen = () => {
  if (activeScreen > 0) {
    activeScreen = activeScreen - 1;
  }
  return activeScreen;
};

document.addEventListener(`DOMContentLoaded`, () => {
  showScreen(nextScreen());
});

document.addEventListener(`keydown`, (event) => {
  if (event.altKey) {
    if (event.keyCode === 39) {
      event.preventDefault();
      showScreen(nextScreen());
    } else if (event.keyCode === 37) {
      showScreen(prevScreen());
      event.preventDefault();
    }
  }
});
