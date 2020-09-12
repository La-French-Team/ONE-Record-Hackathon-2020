import React from 'react';
import { Line } from '@nivo/line';

/**
 *
 * @param {Object} props
 * @param {import('@nivo/line').Serie[]} props.series
 */
const LineChart = ({ series }) => (
  <>
    <Line
      width={900}
      height={400}
      margin={{ top: 20, right: 20, bottom: 60, left: 80 }}
      data={series}
      animate={true}
      enableSlices={'x'}
      curve='monotoneX'
      xScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
      }}
      axisLeft={{
        legend: 'linear scale',
        legendOffset: 12,
      }}
      axisBottom={{
        legend: 'linear scale',
        legendOffset: -12,
      }}
    />
  </>
);

export default LineChart;
