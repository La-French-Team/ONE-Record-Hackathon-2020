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
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { StatusColor } from 'const';
import moment from 'moment';

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

export default function Event({ event, isHighLighted, onEventClick }) {
  const classes = useStyles();

  const onClick = useCallback(() => {
    onEventClick(event.time);
  }, [event, onEventClick]);

  return (
    <Card className={classes.root} elevation={isHighLighted ? 3 : 0}>
      <CardHeader
        avatar={icons[event.level]}
        title={event.title.toUpperCase()}
      />
      <CardContent>
        <Typography variant='caption' component='p'>
          {moment(event.time).format('LLL')}
        </Typography>
        <Typography variant='body2' component='p'>
          {event.details}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={onClick}>
          Highlight
        </Button>
      </CardActions>
    </Card>
  );
}

Event.propTypes = {
  level: PropTypes.oneOf(['info', 'warning', 'error']),
};
