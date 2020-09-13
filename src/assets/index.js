import boxImage from './box.svg';
import planeImage from './plane.svg';
import airportImage from './airport.svg';
import startEndImage from './start_end.svg';
import truckImage from './truck.svg';
import warehouseImage from './warehouse.svg';
import uldImage from './uld.svg';

import FlightPlaybackAF570 from './flight-playback-2576f644-af570-20200910.json';
import FlightPlaybackKL643 from './flight-playback-257924d5-kl643-20200911.json';
import FlightPlaybackLH8290 from './flight-playback-2575adf4-lh8290-20200910.json';

import LeTraitCDG from './route-playback-le-trait-CDG.json';
import CDGAMS from './route-playback-CDG-AMS.json';
import JFKNewYork from './ors__v2_directions_get_1599934104836.json';
import JFKJFK from './ors__v2_directions_get_1599934045185.json';
import BabberichFRA from './ors__v2_directions_get_1599987139613.json';
import CAIFarm from './ors__v2_directions_get_1599987494323.json';

export const BoxIcon = new Image();
BoxIcon.height = 24;
BoxIcon.width = 24;
BoxIcon.src = boxImage;

export const PlaneIcon = new Image();
PlaneIcon.height = 32;
PlaneIcon.width = 32;
PlaneIcon.src = planeImage;

export const AirportIcon = new Image();
AirportIcon.height = 32;
AirportIcon.width = 32;
AirportIcon.src = airportImage;

export const StartEndIcon = new Image();
StartEndIcon.height = 32;
StartEndIcon.width = 32;
StartEndIcon.src = startEndImage;

export const TruckIcon = new Image();
TruckIcon.height = 32;
TruckIcon.width = 32;
TruckIcon.src = truckImage;

export const WarehouseIcon = new Image();
WarehouseIcon.height = 32;
WarehouseIcon.width = 32;
WarehouseIcon.src = warehouseImage;

export const UldIcon = new Image();
UldIcon.height = 32;
UldIcon.width = 32;
UldIcon.src = uldImage;

const flights = {
  KL643: FlightPlaybackKL643,
  AF570: FlightPlaybackAF570,
  LH8290: FlightPlaybackLH8290,
};

const routes = {
  LeTraitCDG,
  CDGAMS,
  JFKNewYork,
  JFKJFK,
  BabberichFRA,
  CAIFarm,
};

export { flights, routes };
