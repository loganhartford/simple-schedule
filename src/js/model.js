export let state = {
  startHour: 7,
  endHour: 23,
  timeDivisions: 15,
  activities: {},
};

export const retreiveExistingState = function () {
  const exisitingState = localStorage.getItem('state');
  console.log(exisitingState);
  state = exisitingState ? JSON.parse(exisitingState) : state;
};

export const resetState = function () {
  state.startHour = 7;
  state.endHour = 23;
  state.timeDivisions = 30;
  state.activities = {};
  localStorage.setItem('state', JSON.stringify(state));
};

export const storeState = function () {
  localStorage.setItem('state', JSON.stringify(state));
};
