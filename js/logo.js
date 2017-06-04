import getElementFromTemplate from './templates';

const logoTemplate = `\
  <section class="logo" title="Угадай мелодию">
    <h1>Угадай мелодию</h1>
  </section>`;

export default () => {
  return getElementFromTemplate(logoTemplate);
};
