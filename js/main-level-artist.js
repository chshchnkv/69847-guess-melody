import getElementFromTemplate from './templates';
const levelTemplate = `\
<section class="main main--level main--level-artist">
  <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
    <circle
      cx="390" cy="390" r="370"
      class="timer-line"
      style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>

    <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
      <span class="timer-value-mins">02</span><!--
      --><span class="timer-value-dots">:</span><!--
      --><span class="timer-value-secs">00</span>
    </div>
  </svg>

  <div class="main-wrap">
    <div class="main-timer"></div>

    <h2 class="title main-title"></h2>
    <div class="player-wrapper"></div>
    <form class="main-list"></form>
  </div>  
</section>`;

/**
 * @param {string} id
 * @param {Answer} data
 * @return {DocumentFragment|null}
 */
const answerArtist = (id, data) => {
  return getElementFromTemplate(`\
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="${id}" name="answer" value="${id}" />
        <label class="main-answer" for="${id}">
          <img class="main-answer-preview" src="${data.content}">
          ${data.label}
        </label>
      </div>  
    `);
};

/**
 * @param {Question} question
 * @return {DocumentFragment}
 */
export default (question) => {
  const levelFragment = getElementFromTemplate(levelTemplate);
  const answersList = levelFragment.querySelector(`.main-list`);
  Object.keys(question.answers).forEach((key) => {
    answersList.appendChild(answerArtist(key, question.answers[key]));
  });

  answersList.addEventListener(`change`, (event) => {
    event.preventDefault();
    event.stopPropagation();
    let answerEvent = new CustomEvent(`answer`, {bubbles: true, cancelable: false, detail: event.target.id});
    answersList.dispatchEvent(answerEvent);
  });
  return levelFragment;
};
