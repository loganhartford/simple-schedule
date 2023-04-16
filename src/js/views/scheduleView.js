import View from './View.js';

class ScheduleView extends View {
  addKeypressHandler(handler) {
    const schedule = document.querySelector('.daily-schedule-form');
    schedule.addEventListener('keypress', function (e) {
      console.log(e.key);
      if (e.key === 'Enter') {
        handler(true);
      }
    });
    schedule.addEventListener('keydown', function (e) {
      console.log(e.key);
      if (e.key === 'ArrowUp') {
        handler(false);
      }
      if (e.key === 'ArrowDown') {
        handler(true);
      }
    });
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

  renderSchedule(timeDivisions, startHour, endHour) {
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
          timeDivisions
        );

        labelCol.appendChild(label);
        inputCol.appendChild(input);
      }
    }
    const [label, input] = this._createInputAndLabel(endHour, 0, timeDivisions);

    labelCol.appendChild(label);
    inputCol.appendChild(input);

    form.appendChild(inputCol);
    form.appendChild(labelCol);
  }

  _createInputAndLabel(hour, minute, timeDivisions) {
    const time = this._formatTime(hour, minute);
    const label = document.createElement('label');
    label.innerText = time;
    label.id = time;
    label.className = 'schedule-label';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = time;
    input.step = timeDivisions * 60; // Delete this line later if unused
    input.className = 'schedule-input';
    input.autocomplete = 'off';
    return [label, input];
  }

  _formatTime(hour, minute) {
    // const hourStr = hour < 10 ? `${hour}` : `${hour}`;
    const minuteStr = minute < 10 ? `0${minute}` : `${minute}`;
    return `${hour}:${minuteStr}`;
  }
}

export default new ScheduleView();
