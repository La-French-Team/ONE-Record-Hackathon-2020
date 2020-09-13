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
  root: { 
    height: '100%',
    width: '100%',
    "box-shadow":
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
  },
  title: {
    fontSize: 14,
  },
  header: {
    padding: "15px",
    "font-weight": 600,
    "font-size": "18px",
    "border-bottom": "solid 1px lightgrey",
  },
});

export default function Event({ event, isHighLighted, onEventClick }) {
  const classes = useStyles();

  const onClick = useCallback(() => {
    onEventClick(event.time);
  }, [event, onEventClick]);

  return (
    <Card className={classes.root} elevation={isHighLighted ? 3 : 0} style={isHighLighted ? {borderRight: 'solid 5px #2196f3'} : {}}>
      <CardHeader
        className={classes.header}
        avatar={icons[event.level]}
        title={<strong style={{ fontSize: "16px", lineHeight: "34px" }}>{event.title.toUpperCase()}</strong>}
      />
      <CardContent style={{'padding-bottom': 0}}>
        <Typography variant='caption' component='p'>
          {moment(event.time).format('LLL')}
        </Typography>
        <Typography variant='body2' component='p'>
          {event.details}
        </Typography>
      </CardContent>
      <CardActions >
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
