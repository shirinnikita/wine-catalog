import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import GrapesPage from './components/grapes'
import {VintagePage, VintagesPage} from "./components/vintage";
import {FoodsPage} from "./components/foods";

import Navigation from "./components/navigation";
import Error from "./components/error"
import {GrapesFilter} from './components/filterGrapes'
import FoodFilter from "./components/filterFood";
import {StylesFilter} from "./components/filterStyle";
import StylesPage from "./components/styles";
import WineFilter from './components/filterWine'
import WinesPage from "./components/wines";


const theme = createMuiTheme({
        palette: {
            primary: blue,
        },
        typography: {
            useNextVariants: true,
        },
        overrides: {
            MuiFormGroup:{
                root: {
                    display: "flex"
                }
            },
            MuiFormControl: {
                root: {
                    marginRight: "10px",
                }
            },
            MuiButton: {
                root: {
                    margin: "10px",
                    padding: "10px",
                }
            },
            MuiAppBar: {
                root: {
                    marginBottom: "10px",
                }
            },
            MuiFormControlLabel: {
                root: {
                    marginBottom: "0px",
                }
            },
            MuiPaper: {
                root: {
                    margin: "15px",
                    padding: "30px"
,               }
            }
        },

    }
);


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider theme={theme}>
                    <Navigation/>
                    <Switch>
                        <Route path="/" component={VintagesPage} exact />
                        <Route path="/food_page" component={FoodsPage}/>
                        <Route path="/vintages_page" component={VintagesPage}/>
                        <Route path="/grapes_page" component={GrapesPage}/>
                        <Route path="/styles_page" component={StylesPage}/>


                        <Route path="/wines_page" component={WinesPage}/>
                        <Route path="/vintage/:id" component={VintagePage}/>

                        <Route path="/filter_foods/:id" component={FoodFilter}/>
                        <Route path="/filter_styles/:id" component={StylesFilter}/>

                        <Route path="/filter_wines/:id" component={WineFilter}/>

                        <Route path="/filter_grapes/:id" component={GrapesFilter}/>
                        <Route component={Error}/>
                    </Switch>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;