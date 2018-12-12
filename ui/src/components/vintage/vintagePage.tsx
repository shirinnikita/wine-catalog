import * as React from 'react';
import { Vintage } from '../../model';
import { VintageRow } from './vintageRow';
import { VintageFilter} from "./vintageFilter";

interface State {
  vintages: Vintage[];
}

interface Props {

}
export class VintagePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { vintages: [] };
    this.getNewData = this.getNewData.bind(this)
  }

  public getNewData(promise : Promise<Vintage[]>) {
    promise.then(res => {
      console.log(res);
      this.setState({vintages: res})
    }
    )
  }

  public render() {
    return (
      <div className="row">
        <h2>Vintages</h2>
        <VintageFilter sendNewData={this.getNewData}/>
        <table className="table">
          <thead>
                <tr>
      <th>Id</th>
      <th>Name</th>
      <th>Year</th>
      <th>Img</th>

      <th>Wines</th>
    </tr>
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
