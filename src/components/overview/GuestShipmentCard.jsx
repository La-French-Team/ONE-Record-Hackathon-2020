import React from 'react';
import { Chip, Avatar, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  cardLabel: {
    margin: 0,
    fontWeight: 'bold',
  },
}));

const GuestShipmentCard = ({ shipment }) => {
  const classes = useStyle();
  return (
    <>
      <Chip
        avatar={<Avatar>{shipment.alertNb}</Avatar>}
        label='Alerts'
        color={shipment.alertNb === 0 ? 'default' : 'secondary'}
        variant='outlined'
      />
      <p className={classes.cardLabel}>{shipment.waybillNumber}</p>
      {/* TODO:: Add QRCode */}
    </>
  );
};

export default GuestShipmentCard;
