import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';


class Navigation extends Component {
    render() {
        return (
                <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/food_page">Food</NavLink>
      <NavLink to="/vintages_page">Vintages</NavLink>
    </div>
        );
    }
  }

export default Navigation;