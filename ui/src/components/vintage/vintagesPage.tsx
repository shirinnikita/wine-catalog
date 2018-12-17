import React, {Component, Fragment, FunctionComponent} from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


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

const VintageRow: FunctionComponent<Props3> = ({vintage}) => {
    return (
        <TableRow>
            <TableCell>
                {vintage.id}
            </TableCell>

            <TableCell>
                <Link to={`/vintage/${vintage.id}`}>{vintage.name}</Link>
            </TableCell>

            <TableCell>
                {vintage.year}
            </TableCell>

            <TableCell>
                <img src={vintage.img} className="avatar"/>
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
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
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





