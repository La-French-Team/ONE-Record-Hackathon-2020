import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

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
    height: '30px',
    width: 'auto',
    scale: '',
    objectFit: 'cover',
  },
}));

const Header = ({ pageName = '' }) => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Link to='/'>
          <IconButton edge='start' className={classes.menuButton}>
            <img
              src={`${process.env.PUBLIC_URL}/logo192.png`}
              className={classes.logo}
              alt='onecargo-logo'
            />
          </IconButton>
        </Link>
        <Typography variant='h6' className={classes.title}>
          {pageName}
        </Typography>

        <IconButton
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
