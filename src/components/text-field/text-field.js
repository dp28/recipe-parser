import template from './text-field.pug';
import * as dom from '../../dom/css';
import { highlightElement, restoreElementStyles } from '../../dom/style';
import { getXPathToElement, findByXPath } from '../../dom/xpath';
import {
  addEventListeners,
  addEventListener,
  removeEventListeners,
  extractTarget,
} from '../../dom/events';

export function TextField(field, onUpdate) {
  const element = document.createElement('div');
  element.classList.add('field');

  function render({ editing } = { editing: false }) {
    element.innerHTML = template({ field, editing });
    const updateButton = dom.find('.updateButton', element);
    addEventListener('click', beginToChangeXPath, updateButton);
  }

  function evaluate() {
    const sourceElement = findByXPath(field.xpath);
    field.value = sourceElement ? sourceElement.innerText : null;
  }

  function beginToChangeXPath() {
    render({ editing: true });

    const listeners = {
      mouseover: extractTarget(highlightElement),
      mouseout: extractTarget(restoreElementStyles),
      click: {
        useCapture: true,
        listener: (event) => {
          event.preventDefault();
          const newSourceElement = event.target;
          removeEventListeners(listeners);
          restoreElementStyles(newSourceElement);
          updateXPath(newSourceElement);
        },
      },
    };

    setTimeout(() => addEventListeners(listeners));
  }

  function updateXPath(sourceElement) {
    field.xpath = getXPathToElement(sourceElement);
    evaluate();
    onUpdate(field);
    render();
  }

  evaluate();
  render();
  return element;
}
