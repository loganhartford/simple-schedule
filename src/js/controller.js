import 'core-js/stable';
import * as model from './model.js';
import headerView from './views/headerView.js';
import scheduleView from './views/scheduleView.js';

/**
 * If the schedule form in focused, prevent the hover effect.
 * Otherwise, enable it. 'hover' class enables hover effect.
 * @param {boolean} focused - schedule form state
 * @returns {null}
 */
const controlInputEffects = function (event, focused) {
  const inputs = document.querySelectorAll('.schedule-input');
  if (focused) {
    inputs.forEach(input => {
      if (input.classList.contains('hover')) {
        input.classList.remove('hover');
      }
    });
    return;
  }
  // unfocused
  inputs.forEach(input => {
    if (!input.classList.contains('hover')) {
      input.classList.add('hover');
    }
  });
  // Also want to store the input infomation when the form is unfocused
  const activeInput = event.target;
  _updateActivities(activeInput);
  model.storeState();
};

const controlInputDeletion = function () {
  const activeInput = document.activeElement;
  activeInput.value = '';
  _updateActivities(activeInput);
  model.storeState();
};

/**
 * Clear the schedule view->
 * Stores the data from the config form in the state object->
 * Renders the schdedule view with the new state information
 */
const controlConfigSubmission = function () {
  const startHour = document.querySelector('.start-time-select').value;
  const endHour = document.querySelector('.end-time-select').value;
  const timeDivisions = document.querySelector('.time-div-select').value;
  /*
  For each feild of the the config form, check to see if it 
  if it has been changed from the default state. If it hasn't,
  we don't want to change the state.
  */
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

/**
 * When the reset button is pressed, clear the schedule view->
 * Clear the state object->
 * Render the schedule with the default state information->Attach handlers to newly created inputs.
 */
const controlReset = function () {
  scheduleView.clearSchedule();
  model.resetState();
  scheduleView.renderSchedule(model.state);
  scheduleView.addInputFocusHandler(controlInputEffects);
  scheduleView.addInputDeleteKeypressHandler(controlInputDeletion);
};

/**
 * Controls user navigation up or down the schedule, and modifies the activities object in the state object to refelct schedule view.
 * @param {boolean} increment - whether or not the user wants to navigat up or down
 * @returns {null}
 */
const controlFormNavigation = function (increment) {
  const activeInput = document.activeElement;
  const activeID = activeInput.id;

  // Update state.activites with the inputs information
  _updateActivities(activeInput);

  // Seperate the hour and min from the input ID
  const activeHour = +activeID.slice(0, activeID.indexOf(':'));
  const activeMin = +activeID.slice(activeID.indexOf(':') + 1);

  // if we are at the end of the schedule
  if (activeHour === model.state.endHour) {
    activeInput.blur();
    return;
  }

  // Need to move the focus to the next input based on increment and timeDiv
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

/**
 * Store the active input value in state.activites if it exists,
 * if empty, remove from state.activites if present.
 * Also update the cell styling in each case.
 * @param {HTML Input Element} activeInput
 * @returns
 */
const _updateActivities = function (activeInput) {
  // If the user has typed something in the input, add it to activities
  if (activeInput.value) {
    model.state.activities[activeInput.id] = activeInput.value;
    activeInput.style.borderBottom = '1px solid var(--main-text-grey)';
    return;
  }
  // If the prev active cell is empty, remove it from activies if it was there
  if (activeInput.id in model.state.activities) {
    delete model.state.activities[activeInput.id];
  }
  activeInput.style.borderBottom = '1px solid var(--light-grey)';
};

/**
 * Initialize the application
 */
const init = function () {
  model.retreiveExistingState();
  headerView.renderConfigForm();
  headerView.addFormSubmitHandler(controlConfigSubmission);
  headerView.addResetHandler(controlReset);
  scheduleView.renderSchedule(model.state);
  scheduleView.addKeypressHandler(controlFormNavigation);
  scheduleView.addInputFocusHandler(controlInputEffects);
  scheduleView.addInputDeleteKeypressHandler(controlInputDeletion);
};

init();

///////////////////////////////////////////////////////////
/**
 * Fixing flexbox gap property missing in some Safari versions
 */
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

/*
Next Steps:
*/
