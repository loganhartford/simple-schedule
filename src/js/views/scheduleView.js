import View from './View.js';

class ScheduleView extends View {
  /**
   * Attach handler function to the schedule input elements on focus and blur.
   * @param {Event Handler Function} handler - Fucntion called after and event
   */
  addInputFocusHandler(handler) {
    const inputs = document.querySelectorAll('.schedule-input');
    // Focus handler
    inputs.forEach(input =>
      input.addEventListener('focus', function (e) {
        const focused = true;
        handler(e, focused);
      })
    );
    // Blur handler
    inputs.forEach(input =>
      input.addEventListener('blur', function (e) {
        const focused = false;
        handler(e, focused);
      })
    );
  }

  /**
   * Add a handler funciton to key press events on form. Specifically "Enter" and the up/down arrow keys. Both navigate the schedule.
   * @param {Event Handler Function} handler - Fucntion called after and event
   */
  addKeypressHandler(handler) {
    const schedule = document.querySelector('.daily-schedule-form');
    // Enter handling
    schedule.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handler(true);
      }
    });
    // Up/down arrow handling
    schedule.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        handler(false);
      }
      if (e.key === 'ArrowDown') {
        handler(true);
      }
    });
  }

  /**
   * Render the schedule according the the application state object.
   * @param {Object} state - applicaiton state object
   */
  renderSchedule(state) {
    const { timeDivisions, startHour, endHour, activities } = state;

    // The form element to add input elements to
    const form = document.querySelector('.daily-schedule-form');
    // Make columns for grid styling
    const labelCol = document.createElement('div');
    const inputCol = document.createElement('div');
    labelCol.className = 'label-col';
    inputCol.className = 'input-col';
    // Create all of the input and label elements for the schedule
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += timeDivisions) {
        const [label, input] = this._createInputAndLabel(
          hour,
          minute,
          timeDivisions,
          activities
        );

        labelCol.appendChild(label);
        inputCol.appendChild(input);
      }
    }
    // Create the last time stamp manually
    const [label, input] = this._createInputAndLabel(
      endHour,
      0,
      timeDivisions,
      activities
    );

    labelCol.appendChild(label);
    inputCol.appendChild(input);

    // Append the columns
    form.appendChild(inputCol);
    form.appendChild(labelCol);
  }

  /**
   * Create and return the label and input elements for a particular time in the schedule.
   * @param {Integer} hour - Hour of the schedule
   * @param {Integer} minute - Minute of the schedule
   * @param {Integer} timeDivisions - Time divisions of the schedule
   * @param {Object} activities - Object contatining schedule activities
   * @returns {list} [label, input] - HTML Elements
   */
  _createInputAndLabel(hour, minute, timeDivisions, activities) {
    const time = this._formatTime(hour, minute);
    // Label creation
    const label = document.createElement('label');
    label.innerText = time;
    label.id = time;
    label.className = 'schedule-label';

    // Input creation
    const input = document.createElement('input');
    input.type = 'text';
    input.id = time;
    input.step = timeDivisions * 60; // Delete this line later if unused
    input.className = 'schedule-input hover';
    input.autocomplete = 'off';

    // if there is an activities already associated with that time, update the input value
    input.value = time in activities ? activities[time] : '';
    // Set border style based on value
    input.style.borderBottom = input.value
      ? '1px solid var(--main-text-grey)'
      : '1px solid var(--light-grey)';

    return [label, input];
  }

  /**
   * Returns a properly formatted time string, based on the hour and minute provided.
   * @param {Integer} hour - Hour of the schedule
   * @param {Integer} minute - Minute of the schedule
   * @returns String - EX: "5:00"
   */
  _formatTime(hour, minute) {
    // const hourStr = hour < 10 ? `${hour}` : `${hour}`;
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    return `${hour}:${minuteStr}`;
  }

  clearSchedule() {
    const form = document.querySelector('.daily-schedule-form');
    form.innerHTML = '';
  }
}

export default new ScheduleView();
