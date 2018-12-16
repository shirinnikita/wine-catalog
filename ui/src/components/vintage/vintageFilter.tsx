import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


interface VintageFilterState {
  nameFilter : string;
  page : number;
}

interface Props {
    sendNewData

}
export class VintageFilter extends Component <Props, VintageFilterState> {
  constructor(props) {
      super(props);
      this.state = { nameFilter : '', page : 0};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleSubmit(e) {
      e.preventDefault();
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

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
            <FormControl>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input type="text" value={this.state.nameFilter} onChange={this.handleChange} />
            </FormControl>
            <Button type="submit" variant="contained" >
                Search
            </Button>
            </form>
    );
  }
}