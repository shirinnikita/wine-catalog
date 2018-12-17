import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

import GrapesPage from './components/grapes'
import FoodPage from "./components/food";
import {VintagePage, VintagesPage} from "./components/vintage";

import Navigation from "./components/navigation";
import Error from "./components/error"


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
                        <Route path="/food_page" component={FoodPage}/>
                        <Route path="/vintages_page" component={VintagesPage}/>
                        <Route path="/grapes_page" component={GrapesPage}/>
                        <Route path="/vintage/:id" component={VintagePage}/>
                        <Route component={Error}/>
                    </Switch>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default App;