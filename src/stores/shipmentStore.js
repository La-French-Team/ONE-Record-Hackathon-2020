import { flights, routes } from 'assets';

const { decorate, observable, action, toJS } = require('mobx');

class ShipmentStore {
  airWayBill;
  events = [];
  selectedUld = null;
  currentGeoLoc = { lon: 0, lat: 0, hdg: null };
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

    const extractRoutePoints = (route) => route.coordinates.map((coordinate) => ({ pos: coordinate, hdg: null }));

    this.airWayBill = airWayBill;

    // Retrieve flight playbacks by ID (e.g. KL643)
    this.#playbacks = [
      extractRoutePoints(routes.LeTraitCDG),
      extractRoutePoints(routes.CDGAMS),
      extractFlightPoints(flights.KL643),
      extractRoutePoints(routes.JFKJFK),
      extractRoutePoints(routes.JFKNewYork),
    ];

    console.table(this.#playbacks);
  }

  setSelectedUld(uld) {
    this.selectedUld = uld;
  }

  addEvent(event) {
    this.events.push(event);
  }

  increaseStepNumber() {
    if (this.stepNumber === this.airWayBill.length - 1) {
      console.warn('Calling increase but already at max');
      return;
    }
    this.stepNumber++;
  }

  setStepNumber(number) {
    this.stepNumber = number;
  }

  nextStep() {
    // if (this.stepNumber >= this.airWayBill.length - 1) {
    //   // Arrived !
    //   return 'arrived';
    // }

    if (this.#playbackIndex > this.#playbacks.length - 1) {
      console.log('Arrived !');
      return 'arrived';
    }

    // const isInWarehouse = this.airWayBill[this.stepNumber].location.latitude !== null;
    // if (isInWarehouse) {
    //   // TODO: Simulate checkins, transfer, etc.
    //   // Go to next step
    //   this.increaseStepNumber();
    //   // Get next playback
    //   // this.#currentPlayback = this.nextPlayback();
    //   return;
    // }

    // Arrived at point of interest
    const isStepOver = this.#currentPointIndex === this.#playbacks[this.#playbackIndex].length;
    if (isStepOver) {
      // this.increaseStepNumber();
      this.#playbackIndex++;
      this.#currentPointIndex = 0;

      // TODO: Emit events. Arrived at next point of interest
      // Get next playback
      // this.#currentPlayback = this.nextPlayback().points;
      return;
    }

    // Forward
    this.currentGeoLoc = this.#playbacks[this.#playbackIndex][this.#currentPointIndex++];
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
