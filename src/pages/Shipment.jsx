import React, { useEffect } from 'react';
import { Card, CardContent, Grid, ListItem, makeStyles, Typography } from '@material-ui/core';
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
import { useAsync } from 'hooks';
import Uld from 'components/uld/Uld';
import Skeleton from 'react-loading-skeleton';
import shipmentStore from 'stores/shipmentStore';

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

  shipmentStore.setAirwayBill(shipmentAWB);

  useEffect(() => {
    const loop = setInterval(() => {
      shipmentStore.nextStep();
    }, 100);
    return () => {
      clearInterval(loop);
    };
  }, [shipmentAWB]);

  const classes = useStyle();
  return (
    <Page pageName={`Shipment ${shipmentId} details`}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={2}>
          <ULDList />
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

const getULDFromOneRecord = () => {
  return fetch('http://onerecord.fr:8083/companies/airfrance/los/Uld_195302').then((response) => response.json());
};

const ULDList = () => {
  // TODO: Get multiple ULDs instead of one
  const { status, value, error } = useAsync(getULDFromOneRecord);
  return (
    <ResponsiveList>
      {status === 'pending' && <Skeleton count={5} />}
      {status === 'success' && <Uld uld={value} />}
      {status === 'error' && (
        <Card>
          <CardContent>
            <Typography>{error.message}</Typography>
          </CardContent>
        </Card>
      )}
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
