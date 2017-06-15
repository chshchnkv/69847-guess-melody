/**
 * @function
 * @param {string} template
 * @return {HTMLElement|Node|null}
 */
export default (template) => {
  const container = document.createElement(`template`);
  container.innerHTML = template;
  return container.content.children[0].cloneNode(true);
};
