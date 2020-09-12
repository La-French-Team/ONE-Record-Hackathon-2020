import React from 'react';
import {
  Grid,
  Typography,
  useMediaQuery,
  Box,
  makeStyles,
} from '@material-ui/core';
import ShipmentStatus from 'components/shipment/ShipmentStatus';
import LineChart from 'components/stats/LineChart/LineChart';
import Page from 'components/commons/Page/Page';
import ShipmentMap from 'components/shipment/ShipmentMap';
import Piece from 'components/piece/Piece';
import Event from 'components/event/Event';

const useStyle = makeStyles(() => ({
  fullHeightContainer: {
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    flex: '2 2 auto',
    maxHeight: '50%',
  },
  detailsContainer: {
    flex: '1 1 auto',
    height: '0',
  },
}));

export default () => {
  const classes = useStyle();
  return (
    <Page pageName='Shipment details'>
      <Grid container spacing={0} className={classes.fullHeightContainer}>
        <Grid item xs={12} md={2}>
          <PieceList />
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={8}
          direction='column'
          className={classes.fullHeightContainer}
        >
          <Grid item>
            <ShipmentStatus />
          </Grid>
          <Grid item className={classes.mapContainer}>
            <ShipmentMap />
          </Grid>
          <Grid item className={classes.detailsContainer}>
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
  const classes = useStyle();
  return (
    <Grid container className={classes.fullHeightContainer}>
      <Grid item xs={12} md={6} style={{ height: '100%' }}>
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
