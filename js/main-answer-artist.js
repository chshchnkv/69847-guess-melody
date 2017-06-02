import getElementFromTemplate from './templates';

const answerTemplate = (id, value, label) => {
  return getElementFromTemplate(`\
      <div class="main-answer-wrapper">
        <input class="main-answer-r" type="radio" id="${id}" name="answer" value="${value}" />
        <label class="main-answer" for="${id}">
          <img class="main-answer-preview" src="">
          ${label}
        </label>
      </div>  
  `);
};

export default answerTemplate;
