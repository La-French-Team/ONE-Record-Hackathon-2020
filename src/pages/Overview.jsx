import React, { useState, useEffect, useMemo } from 'react';
import Page from 'components/commons/Page/Page';
import { makeStyles } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import ShipmentCard from 'components/overview/ShipmentCard/ShipmenCard';
import ShipperShipmentCard from 'components/overview/ShipperShipmentCard';
import AirlineShipmentCard from 'components/overview/AirlineShipmentCard';
import GuestShipmentCard from 'components/overview/GuestShipmentCard';

import mockData from 'mocks/shipments';

const useStyle = makeStyles((theme) => ({
  title: {
    textAlign: 'center',
  },
  shipments: {
    padding: '1rem',
  },
  cardLabel: {
    margin: 0,
    fontWeight: 'bold',
  },
  shipmentCard: {
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '2rem',
  },
  cardLink: {
    textDecoration: 'none',
  },
  listTitle: {
    marginBottom: '1rem',
  },
}));

export default () => {
  const classes = useStyle();
  const [shipments, setShipments] = useState([]);

  const { params } = useRouteMatch();
  const type = params.userType;

  const cardComponent = useMemo(() => {
    if (type === 'shipper') {
      return <ShipperShipmentCard />;
    } else if (type === 'airline') {
      return <AirlineShipmentCard />;
    } else {
      return <GuestShipmentCard />;
    }
  }, [type]);

  useEffect(() => {
    setShipments(
      ['057-35635677', '057-90104626'].map((waybillNumber) => {
        const shipment = mockData[waybillNumber];
        return {
          alertNb:
            shipment?.filter(
              ({ startTemperature }) =>
                startTemperature > 8 || startTemperature < 2,
            ).length || 0,
          waybillNumber: waybillNumber,
        };
      }),
    );
  }, []);

  return (
    <Page pageName='Overview'>
      <h2 className={classes.listTitle}>My shipments and their status</h2>
      {shipments.map((shipment) => (
        <ShipmentCard shipment={shipment} shipmentDescription={cardComponent} />
      ))}
    </Page>
  );
};
