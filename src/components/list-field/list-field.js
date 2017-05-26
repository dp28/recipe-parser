import template from './list-field.pug';
import * as dom from '../../dom/css';
import { highlightSiblings, restoreSiblings } from '../../dom/style';
import { getXPathToSiblings } from '../../dom/xpath';
import { parseField } from '../../parser';
import {
  addEventListeners,
  addEventListener,
  removeEventListeners,
  extractTarget,
} from '../../dom/events';

export function ListField(field, onUpdate) {
  const element = document.createElement('div');
  element.classList.add('field', field.name);

  function render({ editing } = { editing: false }) {
    element.innerHTML = template({ field, editing });
    const updateButton = dom.find('.updateButton', element);

    addEventListener('click', beginToChangeXPath, updateButton);
  }

  function evaluate() {
    field.value = parseField(field)
  }

  function beginToChangeXPath() {
    render({ editing: true });

    const listeners = {
      mouseover: extractTarget(highlightSiblings),
      mouseout: extractTarget(restoreSiblings),
      click: {
        useCapture: true,
        listener: (event) => {
          event.preventDefault();
          const newSourceElement = event.target;
          removeEventListeners(listeners);
          restoreSiblings(newSourceElement);
          updateXPath(newSourceElement);
        },
      },
    };

    setTimeout(() => addEventListeners(listeners));
  }

  function updateXPath(sourceElement) {
    field.path = getXPathToSiblings(sourceElement);
    evaluate();
    onUpdate(field);
    render();
  }

  evaluate();
  render();
  return element;
}
