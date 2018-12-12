import * as React from 'react';
import { Vintage } from '../../model';
import { API } from '../../api';

interface VintageFilterState {
  nameFilter : string;
  page : number;
}

interface Props {
    sendNewData

}
export class VintageFilter extends React.Component <Props, VintageFilterState> {
  constructor(props) {
      super(props);
      this.state = { nameFilter : '', page : 0};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(): void {
      this.handleSubmit()
  }

    handleSubmit() {
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
    this.setState({nameFilter: e.target.value});
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.nameFilter} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Find" />
      </form>
    );
  }
}