import { RecipeForm } from './components/recipe-form/recipe-form';
import { TextField } from './components/text-field/text-field';
import { registerFunctions, connect } from './messaging/rpc';
import { findBestParser } from './parser';

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

const EmptyParser = {
  url: URL,
  fields: RecipeFields.reduce(appendFieldInOrder, {}),
};

call('fetchRecipeParser')
  .then(findBestParser)
  .then(loadPopup);

function loadPopup({ parser, output } = { parser: EmptyParser, output: {} }) {
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
