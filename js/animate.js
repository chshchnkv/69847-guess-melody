export const getAnimation = (step, stepDuration, steps) => ({
  step, stepDuration, steps
});

export const animate = (animation, callback, callbackEnd) => {
  const interval = setInterval(() => {
    const nextStep = animation.step + 1;
    if (nextStep <= animation.steps) {
      animation = getAnimation(nextStep, animation.stepDuration, animation.steps);
      callback(animation);
    } else {
      stopFn();
      if (typeof callbackEnd === `function`) {
        callbackEnd();
      }
    }
  }, animation.stepDuration);

  const stopFn = () => clearInterval(interval);

  return stopFn;
};
