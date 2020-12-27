import Abstract from "../view/abstract.js";
export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`
};

export const render = (container, element, place) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newElement, oldElement) => {
  if (oldElement instanceof Abstract) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof Abstract) {
    newElement = newElement.getElement();
  }
  const container = oldElement.parentElement;
  if (container === null || oldElement === null || newElement === null) {
    throw new Error(`Can't replace unexisting elements`);
  }
  container.replaceChild(newElement, oldElement);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof Abstract)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};
