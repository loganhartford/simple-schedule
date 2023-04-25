export let state = {
  startHour: 7,
  endHour: 23,
  timeDivisions: 30,
  activities: {},
};

/**
 * Read in the state from local storage and update the state object if it exists.
 */
export const retreiveExistingState = function () {
  const exisitingState = localStorage.getItem('state');
  console.log(exisitingState);
  state = exisitingState ? JSON.parse(exisitingState) : state;
};

/**
 * Set the state object back to default values and store this in local storage
 */
export const resetState = function () {
  state.startHour = 7;
  state.endHour = 23;
  state.timeDivisions = 30;
  state.activities = {};
  localStorage.setItem('state', JSON.stringify(state));
};

/**
 * Store the state object in local storage
 */
export const storeState = function () {
  localStorage.setItem('state', JSON.stringify(state));
};
