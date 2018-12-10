import * as React from 'react';
import { Vintage } from '../../model';
import { API } from '../../api';
import { VintagesHeader } from './vintagesHeader';
import { VintageRow } from './vintageRow';

interface State {
  vintages: Vintage[];
}
interface Props {

}
export class VintagePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { vintages: [] };
  }

  public componentDidMount() {
    API.fetchVintages()
      .then((vintages) => {
        this.setState({ vintages });
      });
  }

  public render() {
    return (
      <div className="row">
        <h2>Vintages</h2>
        <table className="table">
          <thead>
            <VintagesHeader />
          </thead>
          <tbody>
            {
              this.state.vintages.map((vintage) =>
                <VintageRow
                  key={vintage.id}
                  vintage={vintage}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
};
