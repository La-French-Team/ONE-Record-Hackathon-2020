import { Button, Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import React from 'react';
import PropTypes from 'prop-types';

const icons = {
  info: <InfoIcon color='primary' />,
  warning: <WarningIcon color='secondary' />,
  error: <ErrorIcon color='error' />,
};

const useStyles = makeStyles({
  info: { color: 'blue' },
  warning: { color: 'orange' },
  error: { color: 'red' },
  root: { height: '100%', width: '100%' },
  title: {
    fontSize: 14,
  },
});

export default function Event({ level = 'info' }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader avatar={icons[level]} title={level.toUpperCase()} />
      <CardContent>
        <Typography variant='body2' component='p'>
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
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
