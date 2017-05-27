import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';
import { registerFunctions, connect } from './messaging/rpc';

const Connection = connect();

const URL = {
  host: location.host,
  path: location.pathname,
};

const RecipeFields = [
  { name: 'title', type: 'text', paths: [] },
  { name: 'ingredients', type: 'list', paths: [] },
  { name: 'method', type: 'list', paths: [] },
];

call('fetchRecipeParser')
  .then(parser => parser || buildEmptyRecipeParser())
  .then(loadPopup);

function loadPopup(parser) {
  const popup = buildPopup(parser)
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
    url: URL,
    fields: RecipeFields.reduce(appendFieldInOrder, {}),
  }
}

function appendFieldInOrder(object, field, order) {
  object[field.name] = { ...field, order };
  return object;
}

function buildPopup(parser) {
  return RecipeForm(parser.fields, (fields) => {
    call('updateRecipeParser', { ...parser, fields });
  });
}

function call(functionName, ...args) {
  return Connection.call(functionName, URL, ...args);
}
