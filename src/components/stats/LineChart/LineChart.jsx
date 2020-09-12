import React from 'react';
import { Line, ResponsiveLine } from '@nivo/line';

/**
 *
 * @param {Object} props
 * @param {import('@nivo/line').Serie[]} props.series
 */
const LineChart = ({ series }) => (
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
    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
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

export default LineChart;
