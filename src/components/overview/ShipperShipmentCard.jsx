import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Chip, Avatar, makeStyles } from '@material-ui/core';
import LoInfoButton from 'components/commons/LoInfoButton/LoInfoButton';

const useStyle = makeStyles((theme) => ({
  cardLabel: {
    margin: 0,
    fontWeight: 'bold',
  },
}));

const ShipperShipmentCard = ({ shipment }) => {
  const classes = useStyle();
  const { params } = useRouteMatch();
  console.log(shipment)
  return (
    <>
      <Chip
        avatar={<Avatar>{shipment.alertNb}</Avatar>}
        label='Alerts'
        color={shipment.alertNb === 0 ? 'default' : 'secondary'}
        variant='outlined'
      />
      <span>
        <strong>AirWaybill </strong>
        <Link
          to={`/${params.userType}/shipments/${shipment.waybillNumber}`}
          className={classes.cardLink}
        >
          <span style={{ marginRight: '15px', lineHeight: '34px' }} className={classes.cardLabel}>{shipment.waybillNumber}</span>
        </Link>
        <LoInfoButton loUri={shipment.loUri} loType={"AirWaybill"}></LoInfoButton>
      </span>
    </>
  );
};

export default ShipperShipmentCard;
