import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import styles from '../assets/styles/core.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import ScatterJS from 'scatter-js/dist/scatter.esm';
import NavigationIcon from '@material-ui/icons/Navigation';



const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});


function FloatingActionButtons(props) {

  const { classes } = props;
  return (
    <div className='stckbg'>
        <div className='loginbutt'>
        <Link to="/home">
      <Button variant="extendedFab" aria-label="Delete" className={classes.button}  onClick={deployScatter}>
        <NavigationIcon className={classes.extendedIcon} />
        Scatter
      </Button>
        </Link>
      </div>
    </div>
  );
}


//scatter wallet integration
function deployScatter(props) {
  ScatterJS.scatter.connect("ECOES").then(connected => {
    console.log("deploying scatter wallet");
      if(!connected) {
          // User does not have Scatter installed/unlocked.
          return false;
      }
    
      ScatterJS.scatter.getIdentity().then(identity => {
        }).catch(error => {})
  });
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(FloatingActionButtons);