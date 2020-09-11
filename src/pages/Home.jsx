import { Container, Box, Typography, Link } from '@material-ui/core';
import React from 'react';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        The French Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default () => {
  return (
    <Container maxWidth='sm'>
      <Box my={4}>
        <Typography variant='h4' component='h1' gutterBottom align='center'>
          ONE Record Hackathon 2020
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
};
