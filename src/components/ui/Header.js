import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Zoom,
  makeStyles,
  Fab,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  appbar: {
    // zIndex: theme.zIndex.modal + 1,
  },
  toolbarMargin: {
    ...theme.mixins.toolbar,
    // marginBottom: '3em',
    // [theme.breakpoints.down('md')]: {
    //   marginBottom: '2em',
    // },
    // [theme.breakpoints.down('xs')]: {
    //   marginBottom: '1.25em',
    // },
  },
  logo: {
    height: '7em',
    [theme.breakpoints.down('md')]: {
      height: '6em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '4.5em',
    },
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      '#back-to-top-anchor'
    );

    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role='presentation'>
        {children}
      </div>
    </Zoom>
  );
}

export default function Header(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e, value) => {
    setValue(value);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpen(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpen(false);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === '/services' && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === '/revolution' && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === '/about' && value !== 3) {
      setValue(3);
    } else if (window.location.pathname === '/contact' && value !== 4) {
      setValue(4);
    }
  }, [value]);

  return (
    <>
      <AppBar position='fixed' className={classes.appbar}>
        <Toolbar disableGutters>
          <Button
            component={Link}
            to='/'
            disableRipple
            onClick={() => setValue(0)}
            className={classes.logoContainer}
          >
            <img src={logo} className={classes.logo} alt='company logo' />
          </Button>
          <Tabs
            onChange={handleChange}
            value={value}
            className={classes.tabContainer}
            indicatorColor='primary'
          >
            <Tab className={classes.tab} component={Link} to='/' label='Home' />
            <Tab
              className={classes.tab}
              component={Link}
              label='Services'
              to='/services'
              aria-owns={anchorEl ? 'simple-menu' : undefined}
              aria-haspopup={anchorEl ? 'true' : undefined}
              onMouseOver={(event) => handleClick(event)}
            />
            <Tab
              className={classes.tab}
              component={Link}
              to='/revolution'
              label='The Revolution'
            />
            <Tab
              className={classes.tab}
              component={Link}
              to='/about'
              label='About Us'
            />
            <Tab
              className={classes.tab}
              component={Link}
              to='/contact'
              label='Contact Us'
            />
          </Tabs>
          <Button
            variant='contained'
            color='secondary'
            className={classes.button}
            component={Link}
            to='/estimate'
          >
            Free Estimate
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            classes={{ paper: classes.menu }}
            MenuListProps={{ onMouseLeave: handleClose }}
            elevation={0}
          >
            <MenuItem
              component={Link}
              to='/services'
              onClick={() => {
                handleClose();
                setValue(1);
              }}
              classes={{ root: classes.menuItem }}
            >
              Services
            </MenuItem>
            <MenuItem
              component={Link}
              to='/customsoftware'
              onClick={() => {
                handleClose();
                setValue(1);
              }}
              classes={{ root: classes.menuItem }}
            >
              Software development
            </MenuItem>
            <MenuItem
              component={Link}
              to='/mobileapps'
              onClick={() => {
                handleClose();
                setValue(1);
              }}
              classes={{ root: classes.menuItem }}
            >
              Mobile App development
            </MenuItem>
            <MenuItem
              component={Link}
              to='/website'
              onClick={() => {
                handleClose();
                setValue(1);
              }}
              classes={{ root: classes.menuItem }}
            >
              Website development
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' className={classes.toolbarMargin} />
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
