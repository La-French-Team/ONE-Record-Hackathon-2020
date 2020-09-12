// React
import React, { Component, Fragment } from 'react';

// Packages
import { NavigationControl, ScaleControl } from 'mapbox-gl';
import { withTheme } from '@material-ui/core';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';

// Assets
import { BoxIcon, StartEndIcon, TruckIcon, WarehouseIcon } from 'assets';

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
  flights = this.props.flights?.map((points) => ({
    points:
      points.result.response.data.flight.track.map((point) => ({
        pos: [point.longitude, point.latitude],
        hdg: point.heading,
      })) || [],
  }));
  routes = this.props.routes || [];

  handleStyleLoad = (map) => {
    map.addControl(new NavigationControl()).addControl(new ScaleControl(), 'bottom-right');
  };

  render() {
    return (
      <MapboxGL
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
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
          minZoom={20}
          paint={this.buildingsLayerPaint}
          tolerance={3.5}
        />

        <Routes routes={this.routes} />
        <Flights flights={this.flights} />
        <PointsOfInterest interests={this.interests} />
      </MapboxGL>
    );
  }
}

const Flights = ({ flights }) => {
  return flights.map(({ points }, index) => {
    return (
      <Fragment key={index}>
        <Layer type='line' layout={lineLayout} paint={flightLinePaint}>
          <Feature coordinates={points.map((p) => p.pos)} />
        </Layer>

        <Layer
          id={`flight-start-${index}`}
          images={['start-end-marker', StartEndIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
            'icon-image': 'start-end-marker',
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

const Routes = ({ routes }) => {
  return routes.map(({ coordinates }, index) => {
    console.log(coordinates[0]);
    return (
      <Fragment key={index}>
        <Layer type='line' layout={lineLayout} paint={routeLinePaint}>
          <Feature coordinates={coordinates} />
        </Layer>
        <Layer
          id={`route-start-${index}`}
          images={['warehouse-marker', StartEndIcon]}
          layout={{
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
            'icon-image': 'warehouse-marker',
          }}
          type='symbol'
        >
          <Feature coordinates={coordinates[0]} />
          <Feature coordinates={coordinates[coordinates.length - 1]} />
        </Layer>
      </Fragment>
    );
  });
};

const PointsOfInterest = ({ interests }) => {
  console.table(interests);
  return interests
    .filter((interest) => interest.location.latitude !== null)
    .map((interest, index) => {
      console.log(interest, `${interest.point}-${index}`, interest.location.type);
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
