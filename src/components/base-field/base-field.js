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
      addClickListener('.replace', () => updateSelection(replacePath));
      addClickListener('.add', () => updateSelection(appendPath));
    };

    function addClickListener(selector, listener) {
      const toClick = find(selector, element);
      if (toClick) {
        addEventListener('click', listener, toClick);
      }
    };

    function updateSelection(updatePath) {
      render({ editing: true });
      setTimeout(() => {
        requestSelection().then(path => {
          updatePath(path);
          evaluate();
          onUpdate(field);
          render();
        });
      });
    };

    function replacePath(path) {
      field.paths = [path];
    };

    function appendPath(path) {
      field.paths.push(path);
    };

    function evaluate() {
      value = parseField(field);
    };

    evaluate();
    render();
    return element;
  };
}
