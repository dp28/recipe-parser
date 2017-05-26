import template from './recipe-form.pug';
import * as dom from '../../dom/css';
import { TextField } from '../text-field/text-field';
import { ListField } from '../list-field/list-field';

export function RecipeForm(model, onUpdate) {
  const element = document.createElement('div');

  function updateProperty(propertyName) {
    return (property) => {
      Object.assign(model, { [propertyName]: property });
      onUpdate(model);
      render();
    };
  }

  function render() {
    element.innerHTML = template({ model });
    const form = dom.find('#form', element);
    form.appendChild(TextField(model.title, updateProperty('title')));
    form.appendChild(ListField(model.ingredients, updateProperty('ingredients')));
    form.appendChild(ListField(model.method, updateProperty('method')));
  }

  render();
  return element;
}
