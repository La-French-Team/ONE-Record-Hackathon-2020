import { Button, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import Page from 'components/commons/Page/Page';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  linkButton: {
    textDecoration: 'none',
  },
  item: {
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'space-around',
  },
}));

export default () => {
  const classes = useStyles();
  return (
    <Page pageName='Login'>
      <Grid container spacing={10} justify='space-between'>
        <Grid item className={classes.item} xs={12}>
          <h2>Sign In</h2>
        </Grid>
        <Grid item className={classes.item} xs={4}>
          <Button variant='contained' color='primary' component={RouterLink} to='shipper/overview'>
            <h2>I am a shipper</h2>
          </Button>
        </Grid>
        <Grid item className={classes.item} xs={4}>
          <Button variant='contained' color='primary' component={RouterLink} to='airline/overview'>
            <h2>I am an airline</h2>
          </Button>
        </Grid>
        <Grid item className={classes.item} xs={4}>
          <Button variant='contained' color='primary' component={RouterLink} to='guest/overview'>
            <h2>I am a guest</h2>
          </Button>
        </Grid>
        <Grid
          item
          justify='space-around'
          alignItems='center'
          className={classes.item}
          xs={12}
        >
          <Button variant='contained' color='secondary'>
            <h2>Sign up</h2>
          </Button>
        </Grid>
      </Grid>
    </Page>
  );
};
