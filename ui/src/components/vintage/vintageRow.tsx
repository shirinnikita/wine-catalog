import * as React from 'react';
import { Vintage } from '../../model';

interface Props {
  vintage: Vintage;
}

export const VintageRow: React.StatelessComponent<Props> = ({vintage}) => {
  return (
    <tr>
      <td>
        <span>{vintage.id}</span>
      </td>
      <td>
        <span>{vintage.name}</span>
      </td>
        <td>
        <span>{vintage.year}</span>
      </td>
      <td>

        <img src={vintage.img} className="avatar" />
      </td>
             <td>

        <span>{JSON.stringify(vintage)}</span>
      </td>
    </tr>
  );
};
