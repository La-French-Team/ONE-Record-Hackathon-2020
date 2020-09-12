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
import { events } from 'data_mock';
import mockData from 'mocks/shipments';

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
  const shipmentAWB = mockData[shipmentId];

  const classes = useStyle();
  return (
    <Page pageName={`Shipment ${shipmentId} details`}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <PieceList />
        </Grid>
        <Grid container item xs={12} md={8} direction='column'>
          <Grid item>
            <ShipmentStatus airWayBill={shipmentAWB} />
          </Grid>
          <Grid item className={classes.mapContainer}>
            <ShipmentMap airWayBill={shipmentAWB} />
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
      {events.map((event) => (
        <ListItem>
          <Event event={event} />
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
              data: Array.from(Array(20), (_, index) => ({
                x: index,
                y: Math.random() * 25,
              })),
            },
          ]}
          min={6}
          max={15.3}
        />
      </Grid>
      <Grid item xs={12} className={classes.chartContainer}>
        <LineChart
          series={[
            {
              id: 'Hygrometry',
              data: Array.from(Array(20), (_, index) => ({
                x: index,
                y: Math.random() * 25,
              })),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
