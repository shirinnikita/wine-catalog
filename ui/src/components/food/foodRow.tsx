import * as React from 'react';
import { FoodPiece } from '../../model';

interface Props {
  foodPiece: FoodPiece;
}

export const FoodRow: React.StatelessComponent<Props> = ({foodPiece}) => {
  return (
    <tr>
      <td>
        <span>{foodPiece.id}</span>
      </td>
      <td>
        <span>{foodPiece.name}</span>
      </td>
      <td>

        <img src={foodPiece.img} className="avatar" />
      </td>
    </tr>
  );
};
