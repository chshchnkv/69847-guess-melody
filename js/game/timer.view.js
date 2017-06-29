import createElement from '../templates';
import {MAX_TIME_MINS} from './state';

const timerTemplate = `\
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" class="timer" viewBox="0 0 780 780">
      <circle
        cx="390" cy="390" r="370"
        class="timer-line"
        style="filter: url(.#blur); transform: rotate(-90deg) scaleY(-1); transform-origin: center"></circle>
          
      <foreignObject width="100%" height="40px" y="-30">
        <div class="timer-value" xmlns="http://www.w3.org/1999/xhtml">
          <span class="timer-value-mins">${MAX_TIME_MINS}</span><!--
          --><span class="timer-value-dots">:</span><!--
          --><span class="timer-value-secs">00</span>
        </div>      
      </foreignObject>
    </svg>  
  </div>
`.trim();

const timerElement = createElement(timerTemplate);
export default timerElement;
