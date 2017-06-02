import getElementFromTemplate from './templates';
import showScreen from './show-screen';
import genreScreen from './main-level-genre';
import answerArtist from './main-answer-artist';

const levelFragment = getElementFromTemplate(`\
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

    <h2 class="title main-title">Кто исполняет эту песню?</h2>
    <div class="player-wrapper"></div>
    <form class="main-list"></form>
  </div>  
</section>`);

const answersList = levelFragment.querySelector(`.main-list`);
answersList.appendChild(answerArtist(`answer-1`, `val-1`, `Пелагея`));
answersList.appendChild(answerArtist(`answer-2`, `val-2`, `Краснознаменная дивизия имени моей бабушки`));
answersList.appendChild(answerArtist(`answer-2`, `val-2`, `Lorde`));

const onAnswerChange = (event) => {
  event.preventDefault();
  showScreen(genreScreen);
};

answersList.addEventListener(`change`, onAnswerChange);

export default levelFragment;
