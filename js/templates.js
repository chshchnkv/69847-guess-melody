/**
 * @function
 * @param {string} template
 * @return {DocumentFragment}
 */
export default (template) => {
  const container = document.createElement(`template`);
  container.innerHTML = template;
  return container.content;
};
