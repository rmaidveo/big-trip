import {SHOW_TIME} from '../../constants.js';
import './toast.css';

const toastContainer = document.createElement(`div`);
toastContainer.classList.add(`toast-container`);
document.body.append(toastContainer);

const toast = (msg) => {
  const toastItem = document.createElement(`div`);
  toastItem.textContent = msg;
  toastItem.classList.add(`toast-item`);

  toastContainer.append(toastItem);

  setTimeout(() => {
    toastItem.remove();
  }, SHOW_TIME);
};

export {toast};
