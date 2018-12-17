import * as React from 'react';
import {Grape} from "../model";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import Input from "@material-ui/core/Input";


interface State {
    elems: Grape[];
    nameFilter: string;
}

interface Props {

}

export class GrapesPage extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {elems: [], nameFilter: ''};
        this.handleChange = this.handleChange.bind(this)
    }

    public componentDidMount() {
        fetch('http://localhost:5000/api/list_grapes')
            .then(response => response.json())
            .then((res) => {
                this.setState({elems: res});
            });
    }

    handleChange(e) {
        this.setState({nameFilter: e.target.value});
    }

    public render() {
        return (
            <Paper>
                < Input
                    type="text"
                    value={this.state.nameFilter}
                    onChange={this.handleChange}
                />

                <Grid container spacing={16}>
                    <Grid item xs={12} md={6}>
                        <div>
                            <List>
                                {this.state.elems
                                    .filter(e => (e.name.toLowerCase().indexOf(this.state.nameFilter.toLowerCase()) > -1))
                                    .map((e) => {
                                        return (
                                            <Link to={`filter_grapes/${e.id}`}>
                                                <ListItem>
                                                    <ListItemText
                                                        primary={e.name}
                                                    />
                                                </ListItem>
                                            </Link>
                                        )
                                    })}
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default GrapesPage;
