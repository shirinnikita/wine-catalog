import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';


const type_to_name = {
    1: 'Red',
    2: 'White',
    3: 'Sparkling',
    4: 'Rose',
    5: 'Desert',
    6: 'Port'
};

interface VintageFilterState {
    nameFilter: string;
    page: number;
}

interface Props {
    sendNewData

}

export class VintageFilter extends Component <Props, VintageFilterState> {
    constructor(props) {
        super(props);
        this.state = {nameFilter: '', page: 0};
        this.updateTable = this.updateTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateTable() {
        const promise = fetch(
            'http://localhost:5000/api/list_vintages',

            {
                method: 'POST',
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(this.state)
            }
        ).then(response => response.json());
        this.props.sendNewData(promise)

    }

    handleChange(e) {
        e.preventDefault();
        this.setState({nameFilter: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('vintages', JSON.stringify(this.state));
        this.updateTable()

    }


    componentWillMount() {
        this.setState(JSON.parse(localStorage.getItem('vintages')) as VintageFilterState, this.updateTable);
        Object.keys(type_to_name).forEach((key) => {console.log(type_to_name[key])});
    }


    render() {
        return (
            <Grid container spacing={24}>

                <Grid item xs={12}>
                 <FormControlLabel
          control={
            <Checkbox
              // checked={this.state.checkedB}
              // onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
                 /></Grid>
                {Object.keys(type_to_name).forEach((key) => {<Grid item xs={12}>
                 <FormControlLabel
          control={
            <Checkbox
              // checked={this.state.checkedB}
              // onChange={this.handleChange('checkedB')}
              value="checkedB"
              color="primary"
            />
          }
          label="Primary"
                 /></Grid>})})
                <Grid item xs={12}>
                <FormControl>
                    <InputLabel htmlFor="component-simple">Name</InputLabel>
                    <Input type="text" value={this.state.nameFilter} onChange={this.handleChange}/>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Button onClick={this.handleSubmit} variant="contained">
                    Search
                </Button>
                </Grid>

            </Grid>
        );
    }
}