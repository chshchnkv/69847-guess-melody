/**
 * Created by stanislavchashchnikov on 24.05.17.
 */

/**
 * Блок с содержимым экрана
 * @type {HTMLElement}
 */
const mainSection = document.querySelector(`section.main`);

/**
 * Элемент со всеми шаблонами
 * Note: в Safari ошибка, если const называется так же как идентификатор запрашиваемого элемента
 * @type {HTMLElement}
 */
const allTemplates = document.getElementById(`templates`);

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
  elementFromTemplate(allTemplates, 5),
  elementFromTemplate(allTemplates, 0),
  elementFromTemplate(allTemplates, 4),
  elementFromTemplate(allTemplates, 0),
  elementFromTemplate(allTemplates, 4),
  elementFromTemplate(allTemplates, 0),
  elementFromTemplate(allTemplates, 4),
  elementFromTemplate(allTemplates, 0),
  elementFromTemplate(allTemplates, 4),
  elementFromTemplate(allTemplates, 0),
  elementFromTemplate(allTemplates, 4),
  elementFromTemplate(allTemplates, 2),
  elementFromTemplate(allTemplates, 3)
];

/**
 * Возвращает элемент экрана
 * @function
 * @param {number} number - номер экрана в массиве
 * @return {HTMLElement|*}
 */
const getScreenElement = (number) => {
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
    mainSection.replaceChild(getScreenElement(number), mainSection.firstChild);
  } else {
    mainSection.appendChild(getScreenElement(number));
  }
};

/**
 * Текущий активный экран
 * @type {number}
 */
let activeScreenIndex = -1;

/**
 * Переключает на следующие inc экранов впрерёд/назад от текущего
 * @function
 * @param {number} [inc = 1]
 */
const switchScreen = (inc = 1) => {
  activeScreenIndex = inc > 0 ? Math.min(activeScreenIndex + inc, gameScreens.length - 1) : Math.max(activeScreenIndex + inc, 0);
  showScreen(activeScreenIndex);
};

/**
 * @enum
 */
const keys = {
  left: 37,
  right: 39
};

document.addEventListener(`keydown`, (event) => {
  if (event.altKey) {
    switch (event.keyCode) {
      case keys.left: {
        event.preventDefault();
        switchScreen(-1);
        break;
      }
      case keys.right: {
        event.preventDefault();
        switchScreen();
        break;
      }
    }
  }
});
