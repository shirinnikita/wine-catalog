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
import {Vintage} from '../../model'

import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";

interface Props {

}

interface Params {
    id: string
}


export class VintagePage extends Component<RouteComponentProps & Props, Vintage> {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            wines: {
                id: '',
                name: '',
                style: '',
                ratings_count: 0,
                ratings_sum: 0,
                styles: {name: '', food_collection: [], grapes_collection: []}
            },
            img: '',
            name: '',
            year: '',
            reviews_collection: [],
            ratings_count: 0,
            ratings_sum: 0,
            price: 0
        }
    }


    componentWillMount() {
        fetch(
            'http://localhost:5000/api/vintage/' + String((this.props.match.params as Params).id),
            {
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
            }
        ).then(response => response.json())
            .then(r => this.setState(r));
    }

    static formatReview(review: Review) {
        return (<div>
                <ListItem key={review.id} style={{alignItems: "flex-start"}}>

                    <ListItemAvatar>
                        <Avatar src={review.users.img}/>
                    </ListItemAvatar>
                    <ListItemText
                        primary={`${review.users.alias}, ${review.rating}`}
                        secondary={
                            <React.Fragment>
                                <Typography component="span" style={{display: 'inline'}} color="textPrimary">
                                    {review.note}
                                </Typography>

                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider/></div>
        )
    }

    render() {
        return (<div style={{display: 'flex'}}>
                <Paper style={{minWidth: '20em'}}>
                    <img style={{marginLeft: 'auto', marginRight: 'auto'}} src={this.state.img}/>
                    <Divider/>
                    {this.state.wines.style ?
                        <div>{'Made of:'}
                            {
                                this.state.wines.styles.grapes_collection.map((g) => {
                                    return <Link to={`/filter_grapes/${g.id}`}> {g.name}</Link>
                                })
                            }
                            <Divider/>
                            {'Good complements are:'}
                            {this.state.wines.styles.food_collection.map((fp) => {
                                return <Link to={`/filter_foods/${fp.id}`}> {fp.name}</Link>
                            })}
                            <Divider/>
                            {'More with style'}
                            <Link to={`/filter_styles/${this.state.wines.style}`}> {this.state.wines.styles.name}</Link>
                        </div>
                        :
                        'No style'
                    }
                    <Divider/>
                    {this.state.price != 0 ?
                        (<div><Typography variant="h4" gutterBottom> {`${this.state.price}₽`}</Typography>
                            < Divider/>
                        </div>)
                        :
                        <div/>
                    }
                    {(
                        this.state.ratings_count
                            ?
                            <div>
                                <Typography variant="h4" gutterBottom>
                                    {(this.state.ratings_sum / this.state.ratings_count).toFixed(1)}
                                </Typography>
                                {`Over ${this.state.ratings_count} reviews`}
                            </div>
                            :
                            'No reviews yet')}
                    <Divider/>
                    <Link to={`/filter_wines/${this.state.wines.id}`}> More years</Link>

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