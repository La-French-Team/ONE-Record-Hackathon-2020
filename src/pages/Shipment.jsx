import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import ShipmentStatus from 'components/shipment/ShipmentStatus';
import LineChart from 'components/stats/LineChart/LineChart';
import Page from 'components/commons/Page/Page';

export default () => {
  return (
    <Page pageName='Shipment details'>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <Typography>Left</Typography>
        </Grid>
        <Grid container item xs={12} md={8} direction='column'>
          <Grid item>
            <ShipmentStatus />
          </Grid>
          <Grid item>
            <ShipmentMap />
          </Grid>
          <Grid item>
            <ShipmentDetails />
          </Grid>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography>Right</Typography>
        </Grid>
      </Grid>
    </Page>
  );
};

const PieceList = () => {
  return null;
};

const ShipmentMap = () => {
  return <Typography>ShipmentMap</Typography>;
};
const ShipmentDetails = () => {
  return (
    <Grid container>
      <Grid item xs={12} md={6} style={{ maxHeight: '300px' }}>
        <LineChart
          series={[
            {
              id: 'Internal temperature',
              data: [
                { x: 0, y: 7 },
                { x: 1, y: 5 },
                { x: 2, y: 11 },
                { x: 3, y: 9 },
                { x: 4, y: 13 },
                { x: 7, y: 16 },
                { x: 9, y: 12 },
              ],
            },
          ]}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        test
      </Grid>
    </Grid>
  );
};
