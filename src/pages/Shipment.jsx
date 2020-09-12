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
import moment from 'moment';

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
  const shipmentAWB = mockData[shipmentId] || mockData['057-35635677']; // Fallback on not yet mocked data

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
          verticalAxisName={'Température (°C)'}
          series={[
            {
              id: 'Internal temperature',
              data: Array.from(Array(20), (_, index) => ({
                x: moment('2020-09-12T15:24:45Z')
                  .add(index * 240, 's')
                  .toDate(),
                y: Math.random() * 10,
              })),
            },
          ]}
          min={2}
          max={8}
        />
      </Grid>
      <Grid item xs={12} className={classes.chartContainer}>
        <LineChart
          verticalAxisName='Hygrometry (%)'
          series={[
            {
              id: 'Hygrometry',
              data: Array.from(Array(20), (_, index) => ({
                x: moment('2020-09-12T15:24:45Z')
                  .add(index * 240, 's')
                  .toDate(),
                y: Math.random() * 25,
              })),
            },
          ]}
        />
      </Grid>
    </Grid>
  );
};
