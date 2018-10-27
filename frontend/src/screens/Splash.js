import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
//import styles from '../assets/styles/core.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import NavigationIcon from '@material-ui/icons/Navigation';
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';
import {PrimarySearchAppBar} from '../components/appBar';


ScatterJS.plugins( new ScatterEOS() ); // Tell ScatterJS which plugins you are using.

const network = {
  blockchain:'eos',
  protocol:'https',
  host:'nodes.get-scatter.com',
  port:443,
  chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}


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
      <Button variant="extendedFab" aria-label="Delete" className={classes.button}  onClick={activateScatter}>
        <NavigationIcon className={classes.extendedIcon} />
        Scatter
      </Button>
        </Link>
      </div>
    </div>
  );
}


//scatter wallet integration
function activateScatter (){
  // First we need to connect to the user's Scatter.
  ScatterJS.scatter.connect('ECOES').then(connected => {

    // If the user does not have Scatter or it is Locked or Closed this will return false;
    while(!connected){
       return false;
    }
    const scatter = ScatterJS.scatter;
    // Now we need to get an identity from the user.
    // We're also going to require an account that is connected to the network we're using.
    const requiredFields = { accounts:[network] };
  

    const getter = () => {scatter.getIdentity(requiredFields).then(() => {

        // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
        // the user for their account name beforehand. They could still give you a different account.
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        console.log(account.name);
        return account.name


      
        
        
        // You can pass in any additional options you want into the eosjs reference.
        //const eosOptions = { expireInSeconds:60 };

        // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
        //const eos = scatter.eos(network, Eos, eosOptions);

        // ----------------------------
        // Now that we have an identity,
        // an EOSIO account, and a reference
        // to an eosjs object we can send a transaction.
        // ----------------------------

    
        // Never assume the account's permission/authority. Always take it from the returned account.
        //const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };

        /*eos.transfer(account.name, 'aromaticbeer', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
            // That's it!
            console.log(`Transaction ID: ${trx.transaction_id}`);
        }).catch(error => {
            console.error(error);
        });*/

    }).catch(error => {
        // The user rejected this request, or doesn't have the appropriate requirements.
        console.error(error);
    });
    
  }
  });


}
  

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons)
//export default activateScatter 