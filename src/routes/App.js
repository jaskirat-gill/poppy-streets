import React from "react";
import { CssBaseline, makeStyles } from "@material-ui/core";
import LandingPage from '../components/LandingPage';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },

}));

// Starting point for website. Calls landingPage component
export default function App() {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <LandingPage />
    </div>
  )
}