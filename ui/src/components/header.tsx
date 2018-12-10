import * as React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.StatelessComponent<{}> = () => {
  return (
    <div className="row col-12">
      <h2>Wine-catalog</h2>
      <Link className="nav-link" to="/vintages"> Vintages </Link>
      <Link className="nav-link" to="/food"> Food </Link>
    </div>
  );
}