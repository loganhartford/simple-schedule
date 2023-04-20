import View from './View.js';
import scheduleView from './scheduleView.js';

class SiteView extends View {
  // addClickHandler(handler) {
  //   document.addEventListener('click', function (e) {
  //     if (e.target.nodeName === 'INPUT') {
  //       const schedule = document.querySelector('.daily-schedule-form');
  //       const scheduleChildren = schedule.children;
  //       const scheduleInputs = this._getAllScheduleInputs(scheduleChildren);
  //       if (scheduleInputs) {
  //         console.log(scheduleInputs);
  //       }
  //     }
  //   });
  // }

  // _;

  // _getAllScheduleInputs(scheduleChildren) {
  //   for (let i = 0; i < scheduleChildren.length; i++) {
  //     if (scheduleChildren[i].className === 'input-col') {
  //       return scheduleChildren[i].children;
  //     }
  //   }
  //   return '';
  // }

  addClickHandler(handler) {
    document.addEventListener('click', function (e) {
      handler(e);
    });
  }
}

export default new SiteView();
