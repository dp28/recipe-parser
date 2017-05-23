import recipeForm from './templates/recipe-form.pug';

const popup = document.createElement('div');
popup.innerHTML = recipeForm({ name: 'test' });
document.body.appendChild(popup);

function extractTarget(func) {
  return event => func(event.target);
}

document.addEventListener('mouseover', extractTarget(highlightSiblings));
document.addEventListener('mouseout', extractTarget(restoreSiblings));

function highlightSiblings(element) {
  element.parentNode.childNodes.forEach(highlightElement.bind(null, 'green'));
  highlightElement('red', element);
}

function highlightElement(colour, element) {
  const { style } = element;
  if (style) {
    style.border = `1px solid ${colour}`;
  }
}

function restoreSiblings(element) {
  element.parentNode.childNodes.forEach(restoreElementStyles);
}

function restoreElementStyles(element) {
  const { style } = element;
  if (style) {
    style.border = '';
  }
}
