import template from './text-field.pug';
import * as dom from '../../dom/css';
import { highlightElement, restoreElementStyles } from '../../dom/style';
import { getXPathToElement } from '../../dom/xpath';
import { parseField } from '../../parser';
import {
  addEventListeners,
  addEventListener,
  removeEventListeners,
  extractTarget,
} from '../../dom/events';

export function TextField(field, onUpdate) {
  const element = document.createElement('div');
  element.classList.add('field');
  let value;

  function render({ editing } = { editing: false }) {
    element.innerHTML = template({ field, editing, value });
    const updateButton = dom.find('.updateButton', element);
    addEventListener('click', beginToChangeXPath, updateButton);
  }

  function evaluate() {
    value = parseField(field);
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
    field.path = getXPathToElement(sourceElement);
    evaluate();
    onUpdate(field);
    render();
  }

  evaluate();
  render();
  return element;
}
