import { flights, routes } from 'assets';
import moment from 'moment';

const { decorate, observable, action, toJS } = require('mobx');

class ShipmentStore {
  airWayBill;
  events = [];
  selectedUld = null;
  currentGeoLoc = { lon: 0, lat: 0, hdg: null };
  currentTime = moment(0);
  stepNumber = 0;

  #playbacks = [];
  #playbackIndex = 0;
  #currentPointIndex = 0;

  setAirwayBill(airWayBill) {
    this.airWayBill = airWayBill.data;
    this.currentTime = this.airWayBill[0]?.timestamp;

    this.#playbacks = airWayBill.playbacks;
    this.stepNumber = airWayBill.steps.length - 1;
    this.#playbackIndex = this.#playbacks.length - 1;
    this.#currentPointIndex = this.#playbacks[this.#playbackIndex].length - 1;
  }

  setSelectedUld(uld) {
    this.selectedUld = uld;
  }

  addEvent(event) {
    this.events.push(event);
  }

  increaseStepNumber() {
    if (this.stepNumber === this.airWayBill.length - 1) {
      // console.warn('Calling increase but already at max');
      return;
    }
    this.stepNumber++;
  }

  setStepNumber(number) {
    this.stepNumber = number;
  }

  nextStep() {
    // if([this.#playbacks[this.#playbackIndex]].length === 0) {
    // TODO: multiple steps, send events, etc.
    //   return;
    // }

    if (this.#playbackIndex > this.#playbacks.length - 1) {
      this.increaseStepNumber();
      // console.log('Arrived !');
      return 'arrived';
    }

    // Arrived at point of interest
    const isStepOver = this.#currentPointIndex === this.#playbacks[this.#playbackIndex].length;
    if (isStepOver) {
      this.increaseStepNumber();
      this.#playbackIndex++;
      this.#currentPointIndex = 0;

      // TODO: Emit events. Arrived at next point of interest
      return;
    }

    // Forward
    this.currentGeoLoc = this.#playbacks[this.#playbackIndex][this.#currentPointIndex++];
    this.currentTime = moment(this.airWayBill[this.#playbackIndex]?.eta || this.currentTime);
  }

  reset() {
    this.stepNumber = 0;
    this.#playbackIndex = 0;
    this.#currentPointIndex = 0;
    this.currentTime = moment(0);
  }
}

decorate(ShipmentStore, {
  airWayBill: observable,
  events: observable,
  stepNumber: observable,
  currentGeoLoc: observable,
  selectedUld: observable,
  nextStep: action,
  currentTime: observable,
});

export default new ShipmentStore();
