import * as React from 'react';
import {Grape, Vintage} from "../model";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import {Link, RouteComponentProps} from "react-router-dom";
import Input from "@material-ui/core/Input";
import {VintagesPage} from "./vintage";
import {VintageRow} from "./vintage/vintagesPage"
import {Component} from "react";
import {Fragment} from "react";
import {VintageFilter} from "./vintage/vintageFilter";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";


interface State {
    elems: Vintage[];
    nameFilter: string;
}

interface Props {
}

interface Params {
    id: string,
}




export class GrapesFilter extends Component<RouteComponentProps & Props, State> {
    constructor(props) {
        super(props);
        this.state = {elems: [], nameFilter: ''};
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount() {
        fetch(
            'http://localhost:5000/api/gv/' + String((this.props.match.params as Params).id),
            {
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            }
        ).then(response => response.json())
            .then(r => this.setState(r));
    }

    handleChange(e) {
        this.setState({nameFilter: e.target.value});
    }

       public componentDidMount() {
        fetch('http://localhost:5000/api/filter_by_grapes/')
            .then(response => response.json())
            .then((res) => {
                this.setState({elems: res});
            });
    }

    public render() {
        return (
            <Fragment>
                <Paper>

                    < Input
                        type="text"
                        value={this.state.nameFilter}
                        onChange={this.handleChange}
                    />

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
                        <TableBody>
                            {
                                this.state.elems
                                    .filter(e => (e.name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) > -1))
                                    .map((vintage) =>
                                        <VintageRow
                                            key={vintage.id}
                                            vintage={vintage}
                                        />
                                    )
                            }
                        </TableBody>
                        }


                    </Table>
                </Paper>
            </Fragment>
        );
    }
};


export default GrapesFilter;
