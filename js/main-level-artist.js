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
 * @param {Answer} data
 * @return {DocumentFragment|null}
 */
const answerArtist = (data) => {
  return getElementFromTemplate(`\
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="a${data.id}" name="answer" value="${data.id}" />
        <label class="main-answer" for="a${data.id}">
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
  question.answers.forEach((answer) => {
    answersList.appendChild(answerArtist(answer));
  });

  answersList.addEventListener(`change`, (event) => {
    event.preventDefault();
    event.stopPropagation();
    let answerEvent = new CustomEvent(`answer`, {bubbles: true, cancelable: false, detail: [question.answers[event.target.value]]});
    answersList.dispatchEvent(answerEvent);
  });
  return levelFragment;
};
