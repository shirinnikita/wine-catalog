import React, {Component} from 'react';
import {RouteComponentProps} from 'react-router';
import {Review} from '../../model'
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import Typography from '@material-ui/core/Typography';

interface Props {

}

interface State {
    img: string;
    name: string;
    year: string;
    reviews_collection: Review[]
}

interface Params {
    id: string
}


export class VintagePage extends Component<RouteComponentProps & Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            img: 'https://cdn.newsapi.com.au/image/v1/9fdbf585d17c95f7a31ccacdb6466af9',
            name: 'TestName', year: 'TestYear', reviews_collection: [
                {
                    id: 10,
                    user_id: 10,
                    vintage_id: 10,
                    note: 'hello',
                    rating: 3,
                },
                {
                    id: 10,
                    user_id: 10,
                    vintage_id: 10,
                    note: 'hello',
                    rating: 3,
                },
                {
                    id: 10,
                    user_id: 10,
                    vintage_id: 10,
                    note: 'hello',
                    rating: 3,
                },
                {
                    id: 10,
                    user_id: 10,
                    vintage_id: 10,
                    note: 'hello',
                    rating: 3,
                },
            ]
        };
    }

    // componentDidMount() {
    //     console.log('MOUNTING')
    //     fetch(
    //         `http://localhost:5000/api/vintage/${(this.props.match.params as Params).id}`,
    //     ).then(response => response.json())
    //         .then(r => this.setState(r));
    //     console.log("DONE")
    // }

    static formatReview(review: Review) {
        return (<div>
            <ListItem key={review.id} style={{alignItems: "flex-start"}}>
        <ListItemText
          primary={JSON.stringify(review)}
          secondary={
            <React.Fragment>
              <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                {JSON.stringify(review)}
              </Typography>
              {JSON.stringify(review)}
            </React.Fragment>
          }
        />
      </ListItem>
            <Divider /></div>
        )
    }

    render() {

        return (<div style={{display: 'flex'}}>
                        <Paper>
                            <img style={{height: 200, width: 200}} src={this.state.img}/>
                        </Paper>
                        <Paper>
                            <List>
                            {this.state.reviews_collection.map(VintagePage.formatReview)}
                            </List>
                        </Paper>
            </div>
        );

    }
}