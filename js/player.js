import {getAnimation, animate} from './animate';

const updateState = (element, player) => {
  element.querySelector(`.player-status`).style.width =
      `${parseInt(player.currentTime * 100 / player.duration, 10)}%`;
};


const syncState = (player, element) => {
  const button = element.querySelector(`button`);
  button.innerHTML = player.paused ? `Play` : `Stop`;
  element.classList.toggle(`player--is-playing`, !player.paused);
};


const switchState = (state, player, element) => {
  if (player.paused) {
    player.play();
    state.stopAnimation = animate(
        getAnimation(player.currentTime, 1000, player.duration),
        (animation) => updateState(element, player));
  } else {
    player.pause();
    state.stopAnimation();
    state.stopAnimation = null;
  }

  syncState(player, element);
};


const destroyPlayer = (element, state) => {
  const player = element.querySelector(`audio`);
  const button = element.querySelector(`button`);

  if (state.stopAnimation) {
    state.stopAnimation();
  }

  player.removeAttribute(`src`);
  button.onclick = null;
  element.innerHTML = ``;
  state = null;

  return true;
};


export default (element, file, autoplay = false, controllable = true) => {
  let state = {};

  const content = document.querySelector(`template`)
    .content
    .querySelector(`.player`)
    .cloneNode(true);
  const player = content.querySelector(`audio`);
  const button = content.querySelector(`button`);

  const audio = new Audio();
  audio.oncanplay = () => {
    if (controllable) {
      button.onclick = () => switchState(state, audio, content);
    }

    if (autoplay) {
      switchState(state, audio, content);
    }
  };
  content.replaceChild(audio, player);
  element.appendChild(content);
  element.classList.toggle(`player--no-controls`, !controllable);
  audio.src = file;

  return () => destroyPlayer(element, state);
};
