/**
 * @function
 * @param {string} template
 * @return {HTMLElement}
 */
export default (template) => {
  const div = document.createElement(`div`);
  div.innerHTML = template;
  return div.firstElementChild;
};
