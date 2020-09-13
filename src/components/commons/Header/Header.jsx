import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Popover,
  Grid,
  FormGroup,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import settingsStore from 'stores/settingsStore';
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
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  popoverContent: {
    padding: theme.spacing(2)
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

const Header = observer(({ pageName = '' }) => {
  const classes = useStyles();
  const { params } = useRouteMatch();

  const [popoverAnchorEl, setPopoverAnchorEl] = React.useState(null);

  const handlePopoverButtonClick = (event) => {
    setPopoverAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPopoverAnchorEl(null);
  };

  const popoverOpen = Boolean(popoverAnchorEl);
  const popoverId = popoverOpen ? 'account-menu-popover' : undefined;

  const handleSwitchChange = () => {
    settingsStore.toggleTheme()
  }

  const onReplay = useCallback(() => {
    shipmentStore.reset();
  }, []);

  return (
    <AppBar position='static'>
      <Toolbar className={classes.flex}>
        <div className={classes.flex}>
          <Button className={classes.menuButton} component={RouterLink} to='/'>
            <img
              src={`${process.env.PUBLIC_URL}/one-track.png`}
              className={classes.logo}
              alt='onecargo-logo'
            />
          </Button>
          <Typography variant='h6' className={classes.title}>
            {pageName}
          </Typography>
        </div>

        <Button onClick={onReplay} variant='contained' color='secondary'>
          Replay
        </Button>

        <Button
          aria-label='account of current user'
          aria-controls='menu-appbar'
          aria-haspopup='true'
          color='inherit'
          onClick={handlePopoverButtonClick}
        >
          <AccountCircle />
          <Typography>&nbsp;{getUserName(params.userType)}</Typography>
        </Button>
        <Popover
          id={popoverId}
          open={popoverOpen}
          anchorEl={popoverAnchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Grid container direction='column' className={classes.popoverContent}>
            <FormGroup column>
              <FormControlLabel
                control={<Switch checked={settingsStore.darkTheme} onChange={handleSwitchChange} name="darkThemeToggle" />}
                label="Dark theme"
              />
            </FormGroup>
          </Grid>
        </Popover>
      </Toolbar>
    </AppBar>
  );
});

export default Header;
