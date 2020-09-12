import React from 'react';
import { Grid, ListItem, makeStyles } from '@material-ui/core';
import ShipmentStatus from 'components/shipment/ShipmentStatus';
import LineChart from 'components/stats/LineChart/LineChart';
import Page from 'components/commons/Page/Page';
import ShipmentMap from 'components/shipment/ShipmentMap';
import Piece from 'components/piece/Piece';
import Event from 'components/event/Event';
import ResponsiveList from 'components/commons/ResponsiveList/ResponsiveList';
import { useRouteMatch } from 'react-router-dom';

const useStyle = makeStyles(() => ({
  mapContainer: {
    width: '100%',
    height: '600px',
  },
  detailsContainer: {
    height: 'fit-content',
  },
  chartContainer: {
    margin: '10px 0',
    height: '400px',
  },
}));

export default () => {
  const match = useRouteMatch();

  const shipmentId = match.params.id;

  const classes = useStyle();
  return (
    <Page pageName={`Shipment ${shipmentId} details`}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <PieceList />
        </Grid>
        <Grid container item xs={12} md={8} direction='column'>
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
  return (
    <ResponsiveList>
      {[0, 1, 2, 3, 4].map((_) => (
        <ListItem>
          <Piece />
        </ListItem>
      ))}
    </ResponsiveList>
  );
};

const EventList = () => {
  return (
    <ResponsiveList>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_) => (
        <ListItem>
          <Event />
        </ListItem>
      ))}
    </ResponsiveList>
  );
};

const ShipmentDetails = () => {
  const classes = useStyle();
  return (
    <Grid container>
      <Grid item xs={12} className={classes.chartContainer}>
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
      <Grid item xs={12} className={classes.chartContainer}>
        <LineChart
          series={[
            {
              id: 'Hygrometry',
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
    </Grid>
  );
};
