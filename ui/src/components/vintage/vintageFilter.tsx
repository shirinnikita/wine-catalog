import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';


const type_to_name = {
    '1': 'Red',
    '2': 'White',
    '3': 'Sparkling',
    '4': 'Rose',
    '5': 'Desert',
    '6': 'Port'
};

const sorts = {
    '1': 'Price ascending',
    '2': 'Price descending',
    '3': 'Rating ascending',
    '4': 'Rating descending',
    '5': 'Reviews ascending',
    '6': 'Reviews descending'
};

const initial_state = {
    nameFilter: '',
    page: 0,
    wine_types: {'1': false, '2': false, '3': false, '4': false, '5': false, '6': false},
    price_from: 0,
    price_to: 10000,
    min_rating: 0,
    sort_by: '4',
};


interface IFields {
    [name: string]: boolean
}

interface VintageFilterState {
    nameFilter: string;
    page: number;
    wine_types: IFields,
    price_from: number,
    price_to: number,
    min_rating: number,
    sort_by: string,
}

interface Props {
    sendNewData
}

function get_initial_state(): VintageFilterState {
    return JSON.parse(JSON.stringify(initial_state))
}

export class VintageFilter extends Component <Props, VintageFilterState> {
    constructor(props) {
        super(props);
        this.state = get_initial_state();
        this.updateTable = this.updateTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addWineTypeFilter = this.addWineTypeFilter.bind(this);
        this.resetState = this.resetState.bind(this);
        this.changeRating = this.changeRating.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
        this.changeMaxPrice = this.changeMaxPrice.bind(this);
        this.changeMinPrice = this.changeMinPrice.bind(this);
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

    changeRating(e) {
        console.log(this.state);
        e.preventDefault();
        this.setState({min_rating: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('vintages', JSON.stringify(this.state));
        this.updateTable()

    }

    changeFilter(e) {
        e.preventDefault();
        this.setState({sort_by: e.target.value});
    }


    componentWillMount() {
        this.setState(JSON.parse(localStorage.getItem('vintages')) as VintageFilterState, this.updateTable);

    }

    addWineTypeFilter = name => event => {
        let prev_state = this.state.wine_types;
        prev_state[name] = event.target.checked;
        this.setState({wine_types: prev_state});
    };

    resetState() {
        this.setState(get_initial_state());
        localStorage.setItem('vintages', JSON.stringify(initial_state));
    }

    changeMinPrice(e) {
        e.preventDefault();
        this.setState({price_from: e.target.value});
    }

    changeMaxPrice(e) {
        e.preventDefault();
        this.setState({price_to: e.target.value});
    }

    render() {
        return (<div>
                <FormControl>
                    <FormGroup>
                        <FormLabel>Wine type</FormLabel>
                        {Object.keys(this.state.wine_types).map(
                            key => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.wine_types[key]}
                                            onChange={this.addWineTypeFilter(key)}
                                            value="checked"
                                            color="primary"
                                        />
                                    }

                                    key={`wine_type:${key}`}
                                    label={type_to_name[key]}
                                />
                            )
                        )}
                    </FormGroup>
                </FormControl>

                <FormControl>
                    <FormControl>
                        <InputLabel
                            htmlFor="component-simple"> Price from </InputLabel>
                        <Input
                            type="text"
                            value={this.state.price_from}
                            onChange={this.changeMinPrice}
                        />

                    </FormControl>

                    <FormControl>
                        <InputLabel
                            htmlFor="component-simple"> Price to </InputLabel>
                        <Input
                            type="text"
                            value={this.state.price_to}
                            onChange={this.changeMaxPrice}
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="age-simple">Min rating</InputLabel>
                        <NativeSelect
                            value={String(this.state.min_rating)}
                            onChange={this.changeRating}
                        >
                            {Array(11).fill(0).map((v, i) =>
                                <option key={`${i / 2}`} value={i / 2}>{i / 2}</option>)}
                        </NativeSelect>
                    </FormControl>
                    <FormControl>
                        <InputLabel htmlFor="age-simple">Sort by</InputLabel>
                        <NativeSelect
                            value={String(this.state.sort_by)}
                            onChange={this.changeFilter}
                        >
                            {Object.keys(sorts).map(
                                key => (
                                    <option
                                        key={sorts[key]}
                                        value={key}
                                    >
                                        {sorts[key]}
                                    </option>
                                )
                            )}
                        </NativeSelect>
                    </FormControl>
                </FormControl>
                < FormControl>
                    < InputLabel
                        htmlFor="component-simple"> Name </InputLabel>
                    < Input
                        type="text"
                        value={this.state.nameFilter}
                        onChange={this.handleChange}
                    />
                    <Button
                        onClick={this.handleSubmit}
                        variant="contained">
                        Search
                    </Button>
                    <Button
                        onClick={this.resetState}
                        variant="contained">
                        Reset
                    </Button>
                </FormControl>

            </div>

        )
            ;
    }
}