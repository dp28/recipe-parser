import baseTemplate from './base-field.pug';
import { restoreElementStyles } from '../../dom/style';
import { find } from '../../dom/css';
import { parseField } from '../../parser';
import {
  addEventListeners,
  addEventListener,
  removeEventListeners,
  extractTarget,
} from '../../dom/events';

export function BaseField({ template, requestSelection }) {
  return (field, onUpdate) => {
    const element = document.createElement('div');
    element.classList.add('field', field.name);
    let value;

    function render({ editing } = { editing: false }) {
      replaceHTML({ editing });
      updateListeners();
    };

    function replaceHTML({ editing }) {
      const params = { field, editing, value };
      element.innerHTML = baseTemplate({
        ...params, subTemplate: template(params)
      });
    }

    function updateListeners() {
      const updateButton = find('.updateButton', element);
      addEventListener('click', updateSelection, updateButton);
    };

    function updateSelection() {
      render({ editing: true });
      setTimeout(() => {
        requestSelection().then(updatePath);
      });
    };

    function updatePath(path) {
      field.path = path;
      evaluate();
      onUpdate(field);
      render();
    };

    function evaluate() {
      value = parseField(field);
    };

    evaluate();
    render();
    return element;
  };
}
