export function findByXPath(xpath) {
  const result = evaluateXPath(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE);
  return result.singleNodeValue;
}

export function findAllByXPath(xpath) {
  const nodes = evaluateXPath(xpath, XPathResult.ORDERED_NODE_ITERATOR_TYPE);
  const elements = [];
  let element = nodes.iterateNext();
  while (element) {
    elements.push(element);
    element = nodes.iterateNext();
  }
  return elements;
}

function evaluateXPath(xpath, resultType) {
  return document.evaluate(xpath, document, null, resultType, null);
}

export function getXPathToSiblings(element) {
  return getPathTo(element, '', true);
}

export function getXPathToElement(element) {
  return getPathTo(element);
}

function getPathTo(element, pathSoFar = '', includeSiblings = false) {
  if (element.id !== '') {
    return `id("${element.id}")${pathSoFar}`;
  }
  if (element === document.body) {
    return `${element.tagName}${pathSoFar}`;
  }

  const parentIndex = includeSiblings ? '' : `[${getIndexWithinSiblings(element) + 1}]`;
  return getPathTo(element.parentNode, `/${element.tagName}${parentIndex}${pathSoFar}`);
}

function getIndexWithinSiblings(element) {
  let index = 0;
  const siblings = element.parentNode.childNodes;
  for (let nodeIndex = 0; nodeIndex < siblings.length; nodeIndex += 1) {
    const sibling = siblings[nodeIndex];
    if (sibling === element) {
      break;
    }
    if (areSameType(element, sibling)) {
      index += 1;
    }
  }
  return index;
}

function areSameType(element, node) {
  return node.nodeType === Node.ELEMENT_NODE && node.tagName === element.tagName;
}
