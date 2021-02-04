import React from 'react';
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Zoom,
  makeStyles,
  Fab,
  Typography,
} from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
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
      <div onClick={handleClick} role='presentation' className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}

export default function Header(props) {
  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h3' color='secondary'>
            MUI Development
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar id='back-to-top-anchor' />
      <ScrollTop {...props}>
        <Fab color='secondary' size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
