// React
import React, { Component, Fragment } from 'react';

// Packages
import { LngLatBounds, NavigationControl, ScaleControl } from 'mapbox-gl';
import { withTheme } from '@material-ui/core';
import ReactMapboxGl, { Layer, Feature, MapContext } from 'react-mapbox-gl';

// Assets
import { AirportIcon, PlaneIcon, StartEndIcon, TruckIcon, WarehouseIcon } from 'assets';
import shipmentStore from 'stores/shipmentStore';
import { observer } from 'mobx-react';

const MapboxGL = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZm1hdW5la28iLCJhIjoiY2tlc3lwMHZ2MTBmejJwbjA1MmpxZ2ltbSJ9.-cIjrVFjJrN9w-kOs-UPKA',
});

const lineLayout = {
  'line-cap': 'round',
  'line-join': 'round',
};

const flightLinePaint = {
  'line-color': '#4790E5',
  'line-width': 12,
};

const routeLinePaint = {
  'line-color': '#15b33f',
  'line-width': 12,
};

class Map extends Component {
  buildingsLayerPaint = {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
    'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
    'fill-extrusion-opacity': 0.6,
  };

  interests = this.props.interests || [];
  flights = this.props.flights || [];
  routes = this.props.routes || [];

  computeBoundingBox = () => {
    const lnglats = [
      ...this.routes.reduce((acc, points) => [...acc, ...points.map((p) => p.pos)], []),
      ...this.flights.reduce((acc, points) => [...acc, ...points.map((p) => p.pos)], []),
    ];

    const bounds = lnglats.reduce((bounds, coords) => bounds.extend(coords), new LngLatBounds(lnglats[0], lnglats[0]));

    return bounds.toArray();
  };

  handleStyleLoad = (map) => {
    map.addControl(new NavigationControl()).addControl(new ScaleControl(), 'bottom-right');
    map.addImage('plane-marker', PlaneIcon);
  };

  render() {
    return (
      <MapboxGL
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
        fitBounds={this.computeBoundingBox()}
        fitBoundsOptions={{
          padding: this.props.theme.spacing(3),
        }}
        style='mapbox://styles/mapbox/streets-v11' // eslint-disable-line react/style-prop-object
        onStyleLoad={this.handleStyleLoad}
      >
        <Layer
          id='3d-buildings'
          sourceId='composite'
          sourceLayer='building'
          filter={['==', 'extrude', 'true']}
          type='fill-extrusion'
          minZoom={15}
          paint={this.buildingsLayerPaint}
          tolerance={3.5}
        />

        <PointsOfInterest interests={this.interests} />
        <Routes routes={this.routes} />
        <Flights flights={this.flights} />
        <CurrentVehicle />
      </MapboxGL>
    );
  }
}

const Flights = ({ flights }) => {
  return flights.map((points, index) => {
    return (
      <Fragment key={index}>
        <Layer type='line' layout={lineLayout} paint={flightLinePaint}>
          <Feature coordinates={points.map((p) => p.pos)} />
        </Layer>

        <Layer
          id={`flight-start-${index}`}
          images={['airport-marker', AirportIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
            'icon-image': 'airport-marker',
          }}
          type='symbol'
        >
          <Feature coordinates={points[0].pos} />
          <Feature coordinates={points[points.length - 1].pos} />
        </Layer>
      </Fragment>
    );
  });
};

const CurrentVehicle = observer(() => {
  const isPlane = shipmentStore.currentGeoLoc?.hdg !== null;
  // const isPlane = true;

  return isPlane ? (
    <MapContext.Consumer>
      {(map) => (
        <Layer
          id='plane'
          images={['plane-marker', PlaneIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'center',
            'icon-image': 'plane-marker',
            'icon-rotate': shipmentStore.currentGeoLoc?.hdg - 45 - map.getBearing(),
          }}
          type='symbol'
        >
          <Feature coordinates={shipmentStore.currentGeoLoc?.pos} />
        </Layer>
      )}
    </MapContext.Consumer>
  ) : (
    <Layer
      id='truck'
      images={['truck-marker', TruckIcon]}
      layout={{
        'icon-allow-overlap': true,
        'icon-anchor': 'bottom',
        'icon-image': 'truck-marker',
      }}
      type='symbol'
    >
      <Feature coordinates={shipmentStore.currentGeoLoc?.pos} />
    </Layer>
  );
});

const Routes = ({ routes }) => {
  return routes.map((points, index) => {
    return (
      <Fragment key={index}>
        <Layer type='line' layout={lineLayout} paint={routeLinePaint}>
          <Feature coordinates={points.map((p) => p.pos)} />
        </Layer>
        <Layer
          id={`route-start-${index}`}
          images={['warehouse-marker', WarehouseIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
            'icon-image': 'warehouse-marker',
          }}
          type='symbol'
        >
          <Feature coordinates={points[0].pos} />
          <Feature coordinates={points[points.length - 1].pos} />
        </Layer>
      </Fragment>
    );
  });
};

const PointsOfInterest = ({ interests }) => {
  return interests
    .filter((interest) => interest.location.latitude !== null)
    .map((interest, index) => {
      return (
        <Layer
          key={`${interest.point}-${index}`}
          id={`${interest.point}-${index}`}
          images={['start-end-marker', StartEndIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
            'icon-image': 'start-end-marker',
          }}
          type='symbol'
        >
          <Feature coordinates={[interest.location.longitude, interest.location.latitude]} />
        </Layer>
      );
    });
};

export default withTheme(Map);
