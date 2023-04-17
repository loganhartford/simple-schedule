import * as model from './model.js';
import headerView from './views/headerView.js';
import scheduleView from './views/scheduleView.js';

const controlConfigSubmission = function () {
  const startHour = document.querySelector('.start-time-select').value;
  const endHour = document.querySelector('.end-time-select').value;
  const timeDivisions = document.querySelector('.time-div-select').value;
  console.log(startHour, endHour, timeDivisions);
  model.state.startHour =
    startHour === 'Start time...'
      ? model.state.startHour
      : +startHour.slice(0, startHour.indexOf(':'));
  model.state.endHour =
    endHour === 'End time...'
      ? model.state.endHour
      : +endHour.slice(0, endHour.indexOf(':'));
  model.state.timeDivisions =
    timeDivisions === 'Time Divisions...'
      ? model.state.timeDivisions
      : +timeDivisions;

  scheduleView.clearSchedule();
  model.storeState();
  scheduleView.renderSchedule(model.state);
};

const controlReset = function () {
  scheduleView.clearSchedule();
  model.resetState();
  scheduleView.renderSchedule(model.state);
};

const controlFormNavigation = function (increment) {
  const activeInput = document.activeElement;
  const activeID = activeInput.id;

  _updateActivities(activeInput);

  const activeHour = +activeID.slice(0, activeID.indexOf(':'));
  const activeMin = +activeID.slice(activeID.indexOf(':') + 1);
  console.log(activeHour, activeMin);
  if (activeHour === model.state.endHour) {
    activeInput.blur();
    return;
  }
  const timeDiv = model.state.timeDivisions;
  let newMin, newHour;
  newHour = activeHour;
  if (increment) {
    newMin = activeMin + timeDiv;
    if (newMin === 60) {
      newHour = activeHour + 1;
      newMin = '00';
    }
  } else {
    newMin = activeMin - timeDiv;
    if (newMin < 0) {
      newHour = activeHour - 1;
      newMin = 60 - timeDiv;
    }
    newMin = newMin == 0 ? '00' : newMin;
  }

  const newID = `${newHour}:${newMin}`;
  const nextInput = document.getElementById(newID);

  nextInput.focus();
  model.storeState();
};

const _updateActivities = function (activeInput) {
  if (activeInput.value) {
    model.state.activities[activeInput.id] = activeInput.value;
    console.log(model.state);
    console.log(model.state.activities[activeInput.id]);
    activeInput.style.borderBottom = '1px solid var(--main-text-grey)';
    return;
  }
  activeInput.style.borderBottom = '1px solid var(--light-grey)';
};

const init = function () {
  model.retreiveExistingState();
  headerView.renderConfigForm();
  scheduleView.renderSchedule(model.state);
  headerView.addFormSubmitHandler(controlConfigSubmission);
  headerView.addResetHandler(controlReset);
  scheduleView.addKeypressHandler(controlFormNavigation);
};

init();

/*
Next Steps:
-When it reloads, the entries loose their darkened underlines
-disable the hover effect when one of the entry cells is focused
- try and figure out a non-cancer way to center the schedule properly

*/
