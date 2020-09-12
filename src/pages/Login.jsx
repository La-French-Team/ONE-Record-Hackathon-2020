import { Button, Container, Grid } from '@material-ui/core';
import React from 'react';

export default () => {
  return (
    <Container>
      <Grid container spacing={12}>
        <Grid item xs={4}>
          <Button>
            <h2>Login as shipper</h2>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button>
            <h2>Login as airline</h2>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button>
            <h2>Login as guest</h2>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button>
            <h2>Sign up</h2>
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
