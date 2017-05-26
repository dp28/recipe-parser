import template from './list-field.pug';
import * as dom from '../../dom/css';
import { highlightSiblings, restoreSiblings } from '../../dom/style';
import { getXPathToSiblings, findAllByXPath } from '../../dom/xpath';
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
    const sourceElements = findAllByXPath(field.xpath);
    field.value = sourceElements ? sourceElements.map(e => e.innerText) : null;
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
    field.xpath = getXPathToSiblings(sourceElement);
    evaluate();
    onUpdate(field);
    render();
  }

  evaluate();
  render();
  return element;
}
