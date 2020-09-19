import React, { useState, useEffect, useMemo } from 'react';
import Page from 'components/commons/Page/Page';
import { makeStyles } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import ShipmentCard from 'components/overview/ShipmentCard/ShipmenCard';
import ShipperShipmentCard from 'components/overview/ShipperShipmentCard';
import AirlineShipmentCard from 'components/overview/AirlineShipmentCard';
import GuestShipmentCard from 'components/overview/GuestShipmentCard';

import mockData from 'mocks/shipments';
import mockedData from 'mocks/shipments';

const useStyle = makeStyles(() => ({
  listTitle: {
    marginBottom: '1rem',
    marginLeft: '1rem',
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
      return <ShipperShipmentCard />;
    } else {
      return <ShipperShipmentCard />;
    }
  }, [type]);

  useEffect(() => {
    setShipments(
      ['057-35635677', '220-58358322'].map((waybillNumber) => {
        const shipment = mockData[waybillNumber]?.data || mockedData['057-35635677'].data;
        return {
          alertNb: shipment?.filter(({ startTemperature }) => startTemperature > 8 || startTemperature < 2).length || 0,
          waybillNumber: waybillNumber,
          loUri:
            waybillNumber === '057-35635677'
              ? 'https://onerecord.fr:8082/companies/bollore/los/Waybill_266895'
              : 'https://onerecord.fr:8082/companies/dbschenker/los/Waybill_124259',
        };
      })
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
