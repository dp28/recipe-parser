import recipeForm from './templates/recipe-form.pug';
import * as dom from './dom/css';
import { getXPathToElement, findByXPath } from './dom/xpath';
import {
  addEventListeners,
  addEventListener,
  removeEventListeners,
  extractTarget,
} from './dom/events';

const popup = document.createElement('div');
popup.innerHTML = recipeForm({ name: 'test' });
document.body.appendChild(popup);

dom.findAll('.replaceButton', popup).forEach((button) => {
  addEventListener('click', () => beginToChangeFieldSource(button.parentNode), button);
});

function beginToChangeFieldSource(field) {
  const listeners = {
    mouseover: extractTarget(highlightSiblings),
    mouseout: extractTarget(restoreSiblings),
    click: extractTarget((element) => {
      removeEventListeners(listeners);
      restoreSiblings(element);
      changeFieldSource(field, element);
    }),
  };

  setTimeout(() => addEventListeners(listeners));
}

function changeFieldSource(field, sourceElement) {
  const xpath = getXPathToElement(sourceElement);
  dom.find('.xpath', field).value = xpath;
  setTitle(xpath);
}

function setTitle(xpathToTitle) {
  const titleElement = findByXPath(xpathToTitle);
  dom.find('.titleField .value', popup).innerText = titleElement.innerText;
}

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
