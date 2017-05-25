export function findAll(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

export function find(selector, root = document) {
  return root.querySelector(selector);
}
