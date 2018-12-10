import * as React from 'react';
import { FoodPiece } from '../../model';

interface Props {
  foodpiece: FoodPiece;
}

export const FoodRow: React.StatelessComponent<Props> = ({foodpiece}) => {
  return (
    <tr>
      <td>
        <span>{foodpiece.id}</span>
      </td>
      <td>
        <span>{foodpiece.name}</span>
      </td>
      <td>

        <img src={foodpiece.img} className="avatar" />
      </td>
    </tr>
  );
};
