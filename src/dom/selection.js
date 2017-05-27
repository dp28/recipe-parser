import * as style from './style';
import { getXPathToElement, getXPathToSiblings } from './xpath';
import { addEventListeners, removeEventListeners, extractTarget } from './events';

const HighlightSingleElement = { highlight: style.highlightElement, restore: style.restoreElement };
const HighlightSiblings = { highlight: style.highlightSiblings, restore: style.restoreSiblings };

export function requestPathToElement() {
  return waitForClick(HighlightSingleElement).then(extractTarget(getXPathToElement));
}

export function requestPathToList() {
  return waitForClick(HighlightSiblings).then(extractTarget(getXPathToSiblings));
}

function waitForClick({ highlight, restore }) {
  const onClick = buildClickListener();
  const listeners = buildSelectionListeners({ highlight, restore, onClick: onClick.listener });
  addEventListeners(listeners);
  onClick.promise.then(() => removeEventListeners(listeners));
  return onClick.promise;
}

function buildSelectionListeners({ highlight, restore, onClick }) {
  return {
    mouseover: extractTarget(highlight),
    mouseout: extractTarget(restore),
    click: {
      useCapture: true,
      listener: (event) => {
        event.preventDefault();
        restore(event.target);
        onClick(event);
      },
    },
  };
}

function buildClickListener() {
  let listener;
  const promise = new Promise((resolve) => {
    listener = resolve;
  });

  return { listener, promise };
}
