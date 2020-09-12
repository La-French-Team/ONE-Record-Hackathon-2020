import React from 'react';
import { Grid, Typography, useMediaQuery, Box } from '@material-ui/core';
import ShipmentStatus from 'components/shipment/ShipmentStatus';
import LineChart from 'components/stats/LineChart/LineChart';
import Page from 'components/commons/Page/Page';
import ShipmentMap from 'components/shipment/ShipmentMap';
import Piece from 'components/piece/Piece';
import Event from 'components/event/Event';

export default () => {
  return (
    <Page pageName='Shipment details'>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <PieceList />
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
          <EventList />
        </Grid>
      </Grid>
    </Page>
  );
};

const PieceList = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('xs'));
  const direction = matches ? 'row' : 'column';
  return (
    <Grid container direction={direction}>
      {[0, 1, 2, 3, 4].map((_) => (
        <Grid item md={12}>
          <Piece />
        </Grid>
      ))}
    </Grid>
  );
};

const EventList = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('xs'));
  const direction = matches ? 'row' : 'column';
  return (
    <Grid container direction={direction}>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_) => (
        <Grid item md={12}>
          <Event />
        </Grid>
      ))}
    </Grid>
  );
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
