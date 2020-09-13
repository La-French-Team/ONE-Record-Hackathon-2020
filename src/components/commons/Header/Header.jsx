import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, useRouteMatch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import shipmentStore from 'stores/shipmentStore';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: '#fff',
    padding: '10px',
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: '40px',
    width: 'auto',
    scale: '',
    objectFit: 'cover',
  },
}));

const getUserName = (userType) => {
  if (userType === 'shipper') {
    return 'Gerrard Benson';
  } else if (userType === 'airline') {
    return 'Daniel Ware';
  }
  return 'Guest';
};

const Header = ({ pageName = '' }) => {
  const classes = useStyles();
  const { params } = useRouteMatch();

  const onReplay = useCallback(() => {
    shipmentStore.reset();
  }, []);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/'>
          <Button className={classes.menuButton}>
            <img
              src={`${process.env.PUBLIC_URL}/one-track.png`}
              className={classes.logo}
              alt='onecargo-logo'
            />
          </Button>
        </Link>
        <Typography variant='h6' className={classes.title}>
          {pageName}
        </Typography>

        <Button onClick={onReplay}>Replay</Button>

        <Button
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
          <Typography>&nbsp;{getUserName(params.userType)}</Typography>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
