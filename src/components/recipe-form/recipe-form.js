import template from './recipe-form.pug';
import * as dom from '../../dom/css';
import { TextField } from '../text-field/text-field';
import { ListField } from '../list-field/list-field';

export function RecipeForm(fieldMap, onUpdate) {
  const element = document.createElement('div');

  function updateField(field) {
    fieldMap[field.name] = field;
    onUpdate(fieldMap);
    render();
  }

  function render() {
    element.innerHTML = template();
    const form = dom.find('#form', element);
    Object.values(fieldMap).forEach((field) => {
      form.appendChild(renderField(field, updateField))
    });
  }

  render();
  return element;
}

const FieldComponents = {
  text: TextField,
  list: ListField,
}

function renderField(field, updateField) {
  return FieldComponents[field.type](field, updateField);
}
