// React
import React, { Component } from 'react';

// Packages
import { NavigationControl, ScaleControl } from 'mapbox-gl';
import { withTheme } from '@material-ui/core';
import ReactMapboxGl, { Layer, Feature, MapContext } from 'react-mapbox-gl';

// Assets
import { BoxIcon, PlaneIcon } from 'assets';

const MapboxGL = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZm1hdW5la28iLCJhIjoiY2tlc3lwMHZ2MTBmejJwbjA1MmpxZ2ltbSJ9.-cIjrVFjJrN9w-kOs-UPKA',
});

class Map extends Component {
  buildingsLayerPaint = {
    'fill-extrusion-color': '#aaa',
    'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'height']],
    'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 15.05, ['get', 'min_height']],
    'fill-extrusion-opacity': 0.6,
  };

  lineLayout = {
    'line-cap': 'round',
    'line-join': 'round',
  };

  linePaint = {
    'line-color': '#4790E5',
    'line-width': 12,
  };

  routes = this.props.routes?.map((points) => ({
    points:
      points.result.response.data.flight.track.map((point) => ({
        pos: [point.longitude, point.latitude],
        hdg: point.heading,
      })) || [],
  }));

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
          minZoom={15}
          paint={this.buildingsLayerPaint}
        />

        {this.routes.map(({ points }) => {
          console.log(points);
          return (
            <>
              <Layer type='line' layout={this.lineLayout} paint={this.linePaint}>
                <Feature coordinates={points.map((p) => p.pos)} />
              </Layer>
              <Layer
                id='box'
                images={['box-marker', BoxIcon]}
                layout={{
                  'icon-allow-overlap': true,
                  'icon-anchor': 'center',
                  'icon-image': 'box-marker',
                }}
                type='symbol'
              >
                <Feature coordinates={points[points.length - 1].pos} />
              </Layer>
              <MapContext.Consumer>
                {(map) => (
                  <Layer
                    id='plane'
                    images={['plane-marker', PlaneIcon]}
                    layout={{
                      'icon-allow-overlap': true,
                      'icon-anchor': 'center',
                      'icon-image': 'plane-marker',
                      'icon-offset': [8, 8],
                      'icon-rotate': points[points.length - 1].hdg - 45 - map.getBearing(),
                    }}
                    type='symbol'
                  >
                    <Feature coordinates={points[points.length - 1].pos} />
                  </Layer>
                )}
              </MapContext.Consumer>
            </>
          );
        })}
      </MapboxGL>
    );
  }
}

export default withTheme(Map);
