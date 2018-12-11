import * as React from 'react';
import { FoodPiece } from '../../model';
import { API } from '../../api';
import { FoodHeader } from './foodHeader';
import { FoodRow } from './foodRow';

interface State {
  foodPieces: FoodPiece[];
}
interface Props {

}
export class FoodPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { foodPieces: [] };
  }

  public componentDidMount() {
    API.fetchFood()
      .then((res) => {
        this.setState({ foodPieces: res });
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
              this.state.foodPieces.map((foodPiece) =>
                <FoodRow
                  key={foodPiece.id}
                  foodPiece={foodPiece}
                />
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
};
