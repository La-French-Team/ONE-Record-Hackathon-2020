import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  makeStyles,
  Typography,
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import PropTypes from 'prop-types';
import { StatusColor } from 'const';

const icons = {
  info: <InfoIcon style={{ color: StatusColor.info }} />,
  warning: (
    <WarningIcon
      style={{
        color: StatusColor.warning,
      }}
    />
  ),
  error: (
    <ErrorIcon
      style={{
        color: StatusColor.error,
      }}
    />
  ),
};

const useStyles = makeStyles({
  root: { height: '100%', width: '100%' },
  title: {
    fontSize: 14,
  },
});

export default function Event({ event }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={icons[event.level]}
        title={event.title.toUpperCase()}
      />
      <CardContent>
        <Typography variant='caption' component='p'>
          {new Date(event.timestamp).toLocaleString()}
        </Typography>
        <Typography variant='body2' component='p'>
          {!!event.details &&
            `Maximum temperature ${event.details.threshold}°C exceeded: ${event.details.value}°C`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Learn More</Button>
      </CardActions>
    </Card>
  );
}

Event.propTypes = {
  level: PropTypes.oneOf(['info', 'warning', 'error']),
};
