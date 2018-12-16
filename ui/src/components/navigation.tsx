import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



class Navigation extends Component {
   render() {
       return (<AppBar position="static" color="default" >
           <Toolbar>
               <Typography variant="h6" color="inherit" noWrap >
                   Wine catalog
               </Typography>
               <NavLink to="/food_page" style={{ textDecoration: 'none' }}>
                   <Button>Food</Button>
               </NavLink>
               <NavLink to="/vintages_page" style={{ textDecoration: 'none' }} >
                   <Button>Vintages</Button>
               </NavLink>
           </Toolbar>
       </AppBar>)

   }
/*    render() {
        return (
                <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/food_page">Food</NavLink>
      <NavLink to="/vintages_page">Vintages</NavLink>
    </div>
        );
    }*/
  }

export default Navigation;