import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { observer } from 'mobx-react';
import shipmentStore from 'stores/shipmentStore';

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
  return (
    airWayBill
      ?.filter((step) => step.location.type !== 'Truck')
      .map((step) => step.point) || []
  );
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
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}

export default observer(ShipmentStatus);
