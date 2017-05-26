import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';
import { registerFunctions, connect } from './messaging/rpc';

const Connection = connect();
const Host = location.host;

call('fetchRecipeParser')
  .then(recipe => recipe || buildEmptyRecipeParser())
  .then(loadPopup);

function loadPopup(recipe) {
  const popup = RecipeForm(recipe, updateRecipe);
  document.body.appendChild(popup);

  togglePopup();

  registerFunctions({ togglePopup });

  function togglePopup() {
    const { style } = popup;
    const isHidden = style.display && style.display === 'none';
    style.display = isHidden ? 'block' : 'none';
  }
}

function buildEmptyRecipeParser() {
  return {
    title: { name: 'title' },
    ingredients: { name: 'ingredients' },
    method: { name: 'method' },
  };
}

function updateRecipe(recipe) {
  call('updateRecipeParser', recipe);
}

function call(functionName, ...args) {
  return Connection.call(functionName, Host, ...args);
}
