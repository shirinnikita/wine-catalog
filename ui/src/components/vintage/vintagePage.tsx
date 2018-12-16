import React, {Component} from 'react';
import { RouteComponentProps } from 'react-router';
import { Review } from '../../model'
import {formatError} from "awesome-typescript-loader/dist/helpers";

interface Props {

}

interface State {
    img: string;
    name: string;
    year: string;
    reviews_collection : Review[]
}

interface Params {
    id : string
}



export class VintagePage extends Component<RouteComponentProps & Props, State>{
      constructor(props) {
          super(props);
          this.state = { img: '', name: '', year: '', reviews_collection: []};
      }
    componentDidMount() {
        console.log('MOUNTING')
        fetch(
            `http://localhost:5000/api/vintage/${(this.props.match.params as Params).id}`,

          ).then(response => response.json())
            .then(r => this.setState(r));
        console.log("DONE")
    }

    static formatReview(review : Review) {
        return (
            <div key={review.id}>
                {JSON.stringify(review)}
            </div>
        )
    }
    render() {
        return this.state.reviews_collection.map(VintagePage.formatReview);

    }
}