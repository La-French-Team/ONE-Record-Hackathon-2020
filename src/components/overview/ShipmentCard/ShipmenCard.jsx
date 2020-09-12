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
  },
  cardLink: {
    textDecoration: 'none',
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
    <Link
      to={`/${params.userType}/shipments/${shipment.waybillNumber}`}
      className={classes.cardLink}
    >
      <Card className={classes.shipmentCard}>
        {React.cloneElement(shipmentDescription, { shipment })}
        <ChevronRightIcon />
      </Card>
    </Link>
  );
};

export default ShipmentCard;
