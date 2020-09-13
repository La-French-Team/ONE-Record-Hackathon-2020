import Map from 'components/stats/Map/Map';
import React from 'react';

export default function ShipmentMap({ airWayBill }) {
  const { playbacks, data } = airWayBill;

  const flightPlaybacks =
    playbacks?.filter((points) => points.length > 0 && points.some((point) => point.hdg !== null)) || [];
  const routePlaybacks =
    playbacks?.filter((points) => points.length > 0 && points.some((point) => point.hdg === null)) || [];

  return <Map flights={flightPlaybacks} routes={routePlaybacks} interests={data} />;
}
