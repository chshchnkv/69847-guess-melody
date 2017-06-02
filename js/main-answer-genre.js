import getElementFromTemplate from './templates';

const answerTemplate = (id, value) => {
  return getElementFromTemplate(`
      <div class="genre-answer">
        <div class="player-wrapper"></div>
        <input type="checkbox" name="answer" value="${value}" id="${id}">
        <label class="genre-answer-check" for="${id}"></label>
      </div>  
  `);
};

export default answerTemplate;
