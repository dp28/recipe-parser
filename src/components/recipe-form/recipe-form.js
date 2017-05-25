import template from './recipe-form.pug';
import * as dom from '../../dom/css';
import { TextField } from '../text-field/text-field';

export function RecipeForm(model, onUpdate) {
  const element = document.createElement('div');

  function updateTitle(title) {
    Object.assign(model, { title });
    onUpdate(model);
    render();
  }

  function render() {
    element.innerHTML = template({ model });
    const form = dom.find('#form', element);
    const title = TextField(model.title, updateTitle);
    form.appendChild(title);
  }

  render();
  return element;
}
