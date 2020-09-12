import { flights, routes } from 'assets';

const { decorate, observable, action } = require('mobx');

class ShipmentStore {
  airWayBill;
  events = [];
  selectedUld = null;
  currentGeoLoc = { lon: 0, lat: 0, hdg: 90 };
  stepNumber = 0;

  #state = 'moving';

  #currentPlayback = null;
  #currentPointIndex = 0;
  #flightPlaybacks = [];
  #routesPlaybacks = [];

  setAirwayBill(airWayBill) {
    this.airWayBill = airWayBill;
    // A location might be an airplane ID (e.g. KL643)
    const locations = airWayBill.map((step) => step.location.type);

    // Retrieve flight playbacks by ID (e.g. KL643)
    this.#flightPlaybacks = Object.entries(flights)
      .filter(([key]) => locations.includes(key))
      // Retrieve flightPlayback data
      .map(([, value]) => value)
      .map((points) => ({
        points: points.result.response.data.flight.track.map((point) => ({
          pos: [point.longitude, point.latitude],
          hdg: point.heading,
        })),
      }));

    //TODO: Filter per airwaybill
    this.#routesPlaybacks = Object.values(routes).map(({ coordinates }) => ({
      points: coordinates.map((coordinate) => ({ pos: coordinate })),
    }));
    this.#currentPlayback = this.#routesPlaybacks[0].points;
  }

  setSelectedUld(uld) {
    this.selectedUld = uld;
  }

  addEvent(event) {
    this.events.push(event);
  }

  increaseStepNumber() {
    this.stepNumber++;
  }

  setStepNumber(number) {
    this.stepNumber = number;
  }

  nextStep() {
    if (this.#state === 'moving') {
      if (!this.#currentPlayback) {
        this.#currentPlayback = this.nextPlayback();
        return;
      }
      if (this.#currentPointIndex === this.#currentPlayback.length - 1) {
        this.#currentPlayback = this.nextPlayback();
        this.#currentPointIndex = 0;
        this.increaseStepNumber();
        return;
      }

      const obj = this.#currentPlayback[this.#currentPointIndex];
      console.log(obj);
      console.log(this.#currentPlayback);
      this.currentGeoLoc = this.#currentPlayback[++this.#currentPointIndex];
    } else {
      // TODO: Simulate checkins, transfer, etc.
    }
  }

  nextPlayback() {
    if (true) {
    }
  }

  reset() {
    this.stepNumber = 0;
    this.selectedUld = null;
    this.airWayBill = null;
    this.events = [];
  }
}

decorate(ShipmentStore, {
  airWayBill: observable,
  events: observable,
  stepNumber: observable,
  currentGeoLoc: observable,
  selectedUld: observable,
  nextStep: action,
});

export default new ShipmentStore();
