import * as model from './model.js';
import headerView from './views/headerView.js';
import scheduleView from './views/scheduleView.js';

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
  }
};

const init = function () {
  model.retreiveExistingState();
  headerView.renderConfigForm();
  scheduleView.renderSchedule(model.state);
  headerView.addResetHandler(controlReset);
  scheduleView.addKeypressHandler(controlFormNavigation);
};

init();

/*
Next Steps:
- figure out what data strucure to store the schedule and the state and stor it on each submit
- sotre the data with locat storage
- make the reset clear the data from local storage and clear the schedule
- make the start and endtime update work
  - don't want it ot clear the form entries that already exist if you change the time window
- make the time divisions work
- add some way to group units of time together, wither automatically or manually
  -coule try using shadow instead of underline to show the input elemens
  -when you want to combin elements, but them into a div and give them the same soutline
*/
