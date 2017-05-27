import { findByXPath, findAllByXPath } from '../dom/xpath';

export function buildFieldParser(name, type, path) {
  return { name, type, path };
}

const Parsers = {
  text: path => mapIfDefined(getTextContent, findByXPath(path)),

  list: path => mapIfDefined(
    elements => elements.map(getTextContent),
    findAllByXPath(path)
  ),
}

export function parse(fields) {
  return fields.reduce(appendParsedField, {});
}

function appendParsedField(result, field) {
  result[field.name] = parseField(field);
  return result;
}

export function parseField({ type, path }) {
  const parser = Parsers[type];
  if (parser && path) {
    return parser(path);
  }
}

function mapIfDefined(map, value) {
  return value !== undefined ? map(value) : value;
}

function getTextContent(element) {
  return element.innerText;
}
