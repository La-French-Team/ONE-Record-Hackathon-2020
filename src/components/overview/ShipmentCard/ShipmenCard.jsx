import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Card, makeStyles } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyle = makeStyles((theme) => ({
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
    "box-shadow":
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  cardLink: {
    textDecoration: 'none',
    margin: '1rem',
  },
  listTitle: {
    marginBottom: '1rem',
  },
}));
/**
 *
 * @param {Object} props
 * @param {Object} props.shipment
 * @param {JSX.Element} props.shipmentDescription
 */
const ShipmentCard = ({ shipment, shipmentDescription }) => {
  const { params } = useRouteMatch();
  const classes = useStyle();
  return (
    <Card className={classes.shipmentCard}>
      {React.cloneElement(shipmentDescription, { shipment })}
      <ChevronRightIcon />
    </Card>
  );
};

export default ShipmentCard;
