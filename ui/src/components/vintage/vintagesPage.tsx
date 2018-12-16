import React, { Component, Fragment, FunctionComponent} from 'react';
import {Link} from 'react-router-dom'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


import { Vintage } from '../../model';
import { VintageFilter} from "./vintageFilter";


interface State {
  vintages: Vintage[];
}

interface Props {

}



interface Props3 {
  vintage: Vintage;
}

 const VintageRow: FunctionComponent<Props3> = ({vintage}) => {
  return (
    <TableRow>
      <TableCell>
        <span>{vintage.id}</span>
      </TableCell>
      <TableCell>
       <Link to={`/vintage/${vintage.id}`}>{vintage.name}</Link>
      </TableCell>
        <TableCell>
        <span>{vintage.year}</span>
      </TableCell>
      <TableCell>

        <img src={vintage.img} className="avatar" />
      </TableCell>
             <TableCell>

        <span>{JSON.stringify(vintage)}</span>
      </TableCell>
    </TableRow>
  );
};


export class VintagesPage extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { vintages: [] };
    this.getNewData = this.getNewData.bind(this)
  }

  public getNewData(promise : Promise<Vintage[]>) {
    promise.then(res => {
      console.log(res);
      this.setState({vintages: res})
    }
    )
  }

  public render() {
    return (
        <Fragment>
            <VintageFilter sendNewData={this.getNewData}/>
        <Paper>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell>Calories</TableCell>
            <TableCell>Fat (g)</TableCell>
            <TableCell>Carbs (g)</TableCell>
            <TableCell>Protein (g)</TableCell>
          </TableRow>
        </TableHead>

          <TableBody>
            {
              this.state.vintages.map((vintage) =>
                <VintageRow
                  key={vintage.id}
                  vintage={vintage}
                />
              )
            }
          </TableBody>
        </Table>
      </Paper>
      </Fragment>
    );
  }
};
