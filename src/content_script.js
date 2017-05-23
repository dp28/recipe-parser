import { getPathToSiblings } from './dom/xpath';

function extractTarget(func) {
  return event => func(event.target);
}

function logResult(func) {
  return (...args) => console.log(func(...args));
}

document.addEventListener('mouseover', extractTarget(highlightSiblings));
document.addEventListener('mouseout', extractTarget(restoreSiblings));
document.addEventListener('click', extractTarget(logResult(getPathToSiblings)));

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
