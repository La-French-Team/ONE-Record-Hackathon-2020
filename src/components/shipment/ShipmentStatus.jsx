import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { observer } from 'mobx-react';
import shipmentStore from 'stores/shipmentStore';
import { StepIcon } from '@material-ui/core';
import plane from 'assets/plane.svg';
import truck from 'assets/truck.svg';

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
}));

function getSteps(airWayBill) {
  const playback = [[], null, [], [], [], null, [], [], [], [], null, [], null, [], null, []];
  // return airWayBill?.map((step) => step.point) || [];
  return [
    'Departure',
    'Truck',
    'CDG',
    '',
    '',
    'Truck',
    'AMS',
    '',
    '',
    '',
    'Plane',
    'JFK',
    'Truck',
    'Agent',
    'Truck',
    'Arrived',
  ];
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
              {label === 'Plane' && <StepIcon icon={<img src={plane} alt='Plane' height={30} />} />}
              {label === 'Truck' && <StepIcon icon={<img src={truck} alt='Truck' height={30} />} />}
              {label !== '' && label !== 'Plane' && label !== 'Truck' && <StepLabel {...labelProps}>{label}</StepLabel>}
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default observer(ShipmentStatus);
