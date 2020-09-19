import React from 'react';
import { Typography, Link } from '@material-ui/core';
import Page from 'components/commons/Page/Page';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://onerecord.fr/'>
        The French Team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default () => {
  return (
    <Page pageName='Home'>
      <Typography variant='h4' component='h1' gutterBottom align='center'>
        ONE Record Hackathon 2020
      </Typography>
      <Copyright />
    </Page>
  );
};
