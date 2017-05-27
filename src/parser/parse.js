import { findByXPath, findAllByXPath } from '../dom/xpath';

export function buildFieldParser(name, type, path) {
  return { name, type, path };
}

const Parsers = {
  text: parseTextField,
  list: parseListField,
}

export function parse({ fields }) {
  return Object.values(fields).reduce(appendParsedField, {});
}

function appendParsedField(result, field) {
  result[field.name] = parseField(field);
  return result;
}

export function parseField({ type, paths }) {
  const parser = Parsers[type];
  if (parser && paths) {
    return parser(paths);
  }
}

function mapIfDefined(map, value) {
  return value !== undefined ? map(value) : value;
}

function parseTextField(paths) {
  return paths.reduce((text, path) => {
    const element = findByXPath(path);
    return element ? `${text} ${getTextContent(element)}` : text;
  }, '');
}

function parseListField(paths) {
  return paths.reduce((list, path) => (
    list.concat(
      findAllByXPath(path).map(getTextContent)
    )
  ), []);
}

function getTextContent(element) {
  return element.innerText;
}
