import { flights, routes } from 'assets';
import moment from 'moment';

const { decorate, observable, action } = require('mobx');

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
    const extractFlightPoints = (points) =>
      points.result.response.data.flight.track.map((point) => ({
        pos: [point.longitude, point.latitude],
        hdg: point.heading,
      }));

    const extractRoutePoints = (route) =>
      route.coordinates.map((coordinate) => ({ pos: coordinate, hdg: null }));

    this.airWayBill = airWayBill;
    this.currentTime = this.airWayBill[this.airWayBill.length - 1]?.eta;

    // Retrieve flight playbacks by ID (e.g. KL643)
    this.#playbacks = [
      [], // Departure
      [], // Truck
      extractRoutePoints(routes.LeTraitCDG), // CDG
      [], // Truck
      // [],
      // [],
      extractRoutePoints(routes.CDGAMS), // AMS
      [], // Flight
      // [],
      // [],
      // [],
      extractFlightPoints(flights.KL643), // JFK
      [], // Truck
      extractRoutePoints(routes.JFKJFK),
      // [],
      extractRoutePoints(routes.JFKNewYork),
      [],
    ];

    this.stepNumber = airWayBill.length - 1;
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
      return 'arrived';
    }

    // Arrived at point of interest
    const isStepOver =
      this.#currentPointIndex === this.#playbacks[this.#playbackIndex].length;
    if (isStepOver) {
      this.increaseStepNumber();
      this.#playbackIndex++;
      this.#currentPointIndex = 0;

      // TODO: Emit events. Arrived at next point of interest
      return;
    }

    // Forward
    this.currentGeoLoc = this.#playbacks[this.#playbackIndex][
      this.#currentPointIndex++
    ];
    this.currentTime = moment(
      this.airWayBill[this.currentPointIndex]?.eta || this.currentTime,
    );
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
