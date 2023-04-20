import View from './View.js';

class ScheduleView extends View {
  addInputFocusHandler(handler) {
    const inputs = document.querySelectorAll('.schedule-input');
    inputs.forEach(input =>
      input.addEventListener('focus', function () {
        handler(true);
      })
    );

    inputs.forEach(input =>
      input.addEventListener('blur', function () {
        handler(false);
      })
    );
  }

  addKeypressHandler(handler) {
    const schedule = document.querySelector('.daily-schedule-form');
    schedule.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handler(true);
      }
    });
    schedule.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowUp') {
        handler(false);
      }
      if (e.key === 'ArrowDown') {
        handler(true);
      }
    });
  }

  renderSchedule(state) {
    console.log(state);
    const { timeDivisions, startHour, endHour, activities } = state;

    // The form element to add input elements to
    const form = document.querySelector('.daily-schedule-form');
    const labelCol = document.createElement('div');
    const inputCol = document.createElement('div');
    labelCol.className = 'label-col';
    inputCol.className = 'input-col';
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
    const [label, input] = this._createInputAndLabel(
      endHour,
      0,
      timeDivisions,
      activities
    );

    labelCol.appendChild(label);
    inputCol.appendChild(input);

    form.appendChild(inputCol);
    form.appendChild(labelCol);
  }

  _createInputAndLabel(hour, minute, timeDivisions, activities) {
    const time = this._formatTime(hour, minute);
    const label = document.createElement('label');
    label.innerText = time;
    label.id = time;
    label.className = 'schedule-label';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = time;
    input.step = timeDivisions * 60; // Delete this line later if unused
    input.className = 'schedule-input hover';
    input.autocomplete = 'off';

    input.value = time in activities ? activities[time] : '';
    input.style.borderBottom = input.value
      ? '1px solid var(--main-text-grey)'
      : '1px solid var(--light-grey)';

    return [label, input];
  }

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
