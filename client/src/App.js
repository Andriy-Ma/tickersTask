import React from 'react';
import Mainlist from './components/mainListOfTickers';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';

const useStyles = makeStyles(() => ({
  app: {
      padding: '0% 15%'
  }
}));

function App() {

  const classes = useStyles();

  return (
    <Box className={classes.app}>
      <Mainlist/>
    </Box>
  );
}

export default App;
