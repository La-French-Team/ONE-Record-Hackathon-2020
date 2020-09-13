import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { observer } from 'mobx-react';
import shipmentStore from 'stores/shipmentStore';
import { Popover, StepIcon, Typography } from '@material-ui/core';
import plane from 'assets/plane.svg';
import truck from 'assets/truck.svg';
import LoInfoButton from 'components/commons/LoInfoButton/LoInfoButton';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  popOver: {
    padding: '1rem',
  },
  popOverCompanyData: {
    display: 'flex',
    minWidth: '150px',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  stepperButton: {
    cursor: 'pointer',
  },
}));

const ShipmentStep = ({ label, index, ...props }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const step = shipmentStore.airWayBill[index];
  console.log(index, step);

  const handleClick = (event) => {
    if (index <= shipmentStore.stepNumber) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <div onClick={handleClick} className={classes.stepperButton}>
        {label === 'Plane' && <StepIcon icon={<img src={plane} alt='Plane' height={30} />} />}
        {label === 'Truck' && <StepIcon icon={<img src={truck} alt='Truck' height={30} />} />}
        {label !== '' && label !== 'Plane' && label !== 'Truck' && <StepLabel {...props}>{label}</StepLabel>}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <div className={classes.popOver}>
          <div className={classes.popOverCompanyData}>
            <Typography variant='body2'>
              <strong>{step.actorName}</strong>
            </Typography>
            <LoInfoButton loType='Company' loUri={step.actorURI} />
          </div>
          {step.etd && (
            <Typography variant='body2'>
              <strong>ETD: </strong>
              {moment(step.etd).format('LLL')}
            </Typography>
          )}
          {step.eta && (
            <Typography variant='body2'>
              <strong>ETA: </strong>
              {moment(step.eta).format('LLL')}
            </Typography>
          )}
          <Typography variant='body1'>
            <strong>Shipment tmp at departure: </strong>
            {step.endTemperature ? step.endTemperature : '-'} °C
          </Typography>
          <Typography variant='body1'>
            <strong>Shipment tmp at arrival: </strong>
            {step.startTemperature ? step.startTemperature : '-'} °C
          </Typography>
          <Typography variant='body1'>
            <strong>External temparature: </strong>
            {step.externalTemperature ? step.externalTemperature : '-'} °C
          </Typography>
        </div>
      </Popover>
    </>
  );
};

function getSteps(airWayBill) {
  return airWayBill?.steps || [];
}

function ShipmentStatus({ airWayBill }) {
  const classes = useStyles();
  const steps = getSteps(airWayBill);

  return (
    <div className={classes.root}>
      <Stepper activeStep={shipmentStore.stepNumber}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={`${label}-${index}`} {...stepProps}>
              <ShipmentStep label={label} index={index} {...labelProps} />
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default observer(ShipmentStatus);
