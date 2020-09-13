import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { StatusColor } from 'const';
import moment from 'moment';

/**
 *
 * @param {Object} props
 * @param {import('@nivo/line').Serie[]} props.series
 * @param {number} [props.min]
 * @param {number} [props.max]
 * @param {string} [props.verticalAxisName]
 * @param {import('@nivo/core').CartesianMarkerProps[]} [props.defaultMarkers]
 */
const LineChart = ({
  series,
  verticalAxisName = '',
  min = undefined,
  max = undefined,
  defaultMarkers = [],
}) => {
  /**
   * @type {import('@nivo/core').CartesianMarkerProps[]}
   */
  const markers = defaultMarkers;

  if (min) {
    markers.push({
      axis: 'y',
      value: min,
      lineStyle: { stroke: 'blue', strokeWidth: 1.5 },
      legend: `${min}°C`,
    });
    series.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        if (y < min) {
          markers.push({
            axis: 'x',
            value: x,
            lineStyle: { stroke: StatusColor.warning, strokeWidth: 1.5 },
          });
        }
      }),
    );
  }

  if (max) {
    markers.push({
      axis: 'y',
      value: max,
      lineStyle: { stroke: 'red', strokeWidth: 1.5 },
      legend: `${max}°C`,
    });

    series.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        if (y > max) {
          markers.push({
            axis: 'x',
            value: x,
            lineStyle: { stroke: StatusColor.warning, strokeWidth: 1.5 },
          });
        }
      }),
    );
  }

  return (
    <ResponsiveLine
      data={series}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false,
      }}
      curve='monotoneX'
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      xFormat={(time) => moment(time).format('LLL')}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        format: renderXFormat,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Time',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: verticalAxisName,
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel='y'
      pointLabelYOffset={-12}
      useMesh={true}
      markers={markers}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

let xFormatCounter = 0;
const renderXFormat = (time) => {
  let res = null;
  if (xFormatCounter === 0) {
    xFormatCounter = 0;
    res = moment(time).format('LLL');
  }
  xFormatCounter++;
  if (xFormatCounter === 3) {
    xFormatCounter = 0;
  }
  return res;
};

export default LineChart;
