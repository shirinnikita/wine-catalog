import * as React from 'react';
import { FoodPiece } from '../../model';
import { FoodRow } from './foodRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


interface State {
  foodPieces: FoodPiece[];
}
interface Props {

}
export class FoodPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { foodPieces: [] };
  }

  public componentDidMount() {
    fetch('http://localhost:5000/api/list_food')
        .then(response => response.json())
        .then((res) => {
          this.setState({ foodPieces: res });
        });
  }

  public render() {
    return (
        <Paper>
            <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.foodPieces.length > 0 ? <TableBody>
                            {
              this.state.foodPieces.map((foodPiece) =>
                <FoodRow
                  key={foodPiece.id}
                  foodPiece={foodPiece}
                />
              )
            }

                        </TableBody>
                            :
                            'No vintages found'
                        }


                    </Table>
        </Paper>
    );
  }
};
