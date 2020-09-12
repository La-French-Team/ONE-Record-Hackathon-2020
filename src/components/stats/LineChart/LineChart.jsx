import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import { StatusColor } from 'const';

/**
 *
 * @param {Object} props
 * @param {import('@nivo/line').Serie[]} props.series
 * @param {number} [props.min]
 * @param {number} [props.max]
 */
const LineChart = ({ series, min = undefined, max = undefined }) => {
  /**
   * @type {import('@nivo/core').CartesianMarkerProps[]}
   */
  const markers = [];

  if (min) {
    markers.push({
      axis: 'y',
      value: min,
      lineStyle: { stroke: 'blue', strokeWidth: 2 },
      legend: 'Minimum allowed',
    });
    series.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        if (y < min) {
          markers.push({
            axis: 'x',
            value: x,
            lineStyle: { stroke: StatusColor.warning, strokeWidth: 2 },
          });
        }
      }),
    );
  }

  if (max) {
    markers.push({
      axis: 'y',
      value: max,
      lineStyle: { stroke: 'red', strokeWidth: 2 },
      legend: 'Maximum allowed',
    });

    series.forEach(({ data }) =>
      data.forEach(({ x, y }) => {
        if (y > max) {
          markers.push({
            axis: 'x',
            value: x,
            lineStyle: { stroke: StatusColor.warning, strokeWidth: 2 },
          });
        }
      }),
    );
  }

  return (
    // <Line
    //   width={900}
    //   height={400}
    //   data={series}
    //   animate={true}
    //   enableSlices={'x'}
    //   curve='monotoneX'
    //   xScale={{
    //     type: 'linear',
    //     min: 0,
    //     max: 'auto',
    //   }}
    //   axisLeft={{
    //     legend: 'linear scale',
    //     legendOffset: 12,
    //   }}
    //   axisBottom={{
    //     legend: 'linear scale',
    //     legendOffset: -12,
    //   }}
    // />

    <ResponsiveLine
      data={series}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false,
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: 'bottom',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'transportation',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        orient: 'left',
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'count',
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

export default LineChart;
