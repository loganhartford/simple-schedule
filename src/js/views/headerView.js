import View from './View.js';

class HeaderView extends View {
  /**
   * Add event handler function to the sumbit event on the configuration form.
   * @param {Event Handler Function} handler - Fucntion called after and event
   */
  addFormSubmitHandler(handler) {
    const form = document.querySelector('.config-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  /**
   * Add event handler function to the click even on the reset button.
   * @param {Event Handler Function} handler - Fucntion called after and event
   */
  addResetHandler(handler) {
    const resetBtn = document.querySelector('.reset-btn');
    resetBtn.addEventListener('click', handler);
  }

  /**
   * Creates the start time and end time select options for the config form.
   * The rest is written in index.html.
   */
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

  resetConfigForm() {
    const configSelects = document.querySelectorAll('.config-form-select');
    const configDefaults = document.querySelectorAll('#default');
    for (let i = 0; i < configDefaults.length; i++) {
      configSelects[i].value = configDefaults[i].value;
    }
  }
}

export default new HeaderView();
