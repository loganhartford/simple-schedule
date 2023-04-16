import View from './View.js';

class HeaderView extends View {
  addFormSubmitHandler(handler) {
    const form = document.querySelector('.config-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  addResetHandler(handler) {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', handler);
  }

  renderConfigForm() {
    const startSelect = document.querySelector('.start-time-select');
    const endSelect = document.querySelector('.end-time-select');
    for (let hour = 0; hour <= 24; hour++) {
      const option = document.createElement('option');
      option.className = 'config-option';
      option.textContent = `${hour}:00`;
      const optionCopy = option.cloneNode(true);
      startSelect.appendChild(option);
      endSelect.appendChild(optionCopy);
    }
  }
}

export default new HeaderView();
