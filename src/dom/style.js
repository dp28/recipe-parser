export function highlightSiblings(element) {
  element.parentNode.childNodes.forEach(highlightElement);
}

export function highlightElement(element) {
  const { style } = element;
  if (style) {
    style.border = '1px solid green';
  }
}

export function restoreSiblings(element) {
  element.parentNode.childNodes.forEach(restoreElementStyles);
}

export function restoreElementStyles(element) {
  const { style } = element;
  if (style) {
    style.border = '';
  }
}
