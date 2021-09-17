export function newElement(name = 'div', attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(key, attributes[key]);
  });

  node.append(...childs);
  return node;
}
