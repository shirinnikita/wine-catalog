import * as React from 'react';
import { FoodPiece } from '../../model';
import { API } from '../../api';
import { FoodHeader } from './foodHeader';
import { FoodRow } from './foodRow';

interface State {
  foodpieces: FoodPiece[];
}
interface Props {

}
export class FoodPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { foodpieces: [] };
  }

  public componentDidMount() {
    API.fetchFood()
      .then((foodpieces) => {
        this.setState({ foodpieces });
      });
  }

  public render() {
    return (
      <div className="row">
        <h2>Food list</h2>
        <table className="table">
          <thead>
            <FoodHeader />
          </thead>
          <tbody>
            {
              this.state.foodpieces.map((foodpiece) =>
                <FoodRow
                  key={foodpiece.id}
                  foodpiece={foodpiece}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
};
