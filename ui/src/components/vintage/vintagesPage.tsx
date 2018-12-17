import React, {Component, Fragment, FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



import {Vintage} from '../../model';
import {VintageFilter} from "./vintageFilter";


interface State {
    vintages: Vintage[];
}

interface Props {

}


interface Props3 {
    vintage: Vintage;
}

export const VintageRow: FunctionComponent<Props3> = ({vintage}) => {
    return (
        <TableRow>
           <TableCell>
                <img src={vintage.img} className="avatar"/>
            </TableCell>
            <TableCell>
                <Link to={`/vintage/${vintage.id}`}>{vintage.name}</Link>
            </TableCell>

            <TableCell>
                {vintage.year}
            </TableCell>
            <TableCell>
                {`${vintage.price}₽`}
            </TableCell>
            <TableCell>

                {(
                    vintage.ratings_count
                        ?
                        <div>
                        <Typography variant="h4" gutterBottom>
                            {(vintage.ratings_sum / vintage.ratings_count).toFixed(1)}
                        </Typography>
                            {`Over ${vintage.ratings_count} reviews`}
                        </div>
                        :
                        'No reviews yet')}

            </TableCell>
        </TableRow>
    );
};


export class VintagesPage extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {vintages: []};
        this.getNewData = this.getNewData.bind(this)
    }

    public getNewData(promise: Promise<Vintage[]>) {
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
                    {`Found ${this.state.vintages.length} vintages`}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Label</TableCell>
                                <TableCell>Wine</TableCell>
                                <TableCell>Year</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        {this.state.vintages.length > 0 ? <TableBody>
                            {
                                this.state.vintages.map((vintage) =>
                                    <VintageRow
                                        key={vintage.id}
                                        vintage={vintage}
                                    />
                                )
                            }
                        </TableBody>
                            :
                            'No vintages found'
                        }


                    </Table>
                </Paper>
            </Fragment>
        );
    }
};





