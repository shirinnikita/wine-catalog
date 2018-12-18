import * as React from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

interface Props {

}

interface State {
    username: string,
    pass: string,
    success: boolean,
};


class RegisterForm extends React.Component <Props, State> {

    constructor(props) {
        super(props);
        this.state = {username: '', pass: '', success: false};
        this.changeName = this.changeName.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changePass = this.changePass.bind(this)

    }

    changeName(e) {
        e.preventDefault();
        this.setState({username: e.target.value});
    };

    changePass(e) {
        e.preventDefault();
        this.setState({pass: e.target.value});
        console.log(this.state)
    };

    handleSubmit(e) {
        e.preventDefault();
        this.setState({success: true});
        fetch(
            'http://localhost:5000/api/register',

            {
                method: 'POST',
                headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                body: JSON.stringify(this.state)
            }
        ).then(response => console.log(response));
    };

    render() {
        return (this.state.success  ? 'SUCCESS' :
            <div>< FormControl>
            < InputLabel
                htmlFor="component-simple"> Username </InputLabel>
            < Input
                type="username"
                value={this.state.username}
                onChange={this.changeName}
            />
        </FormControl>
            <FormControl>
                < InputLabel
                    htmlFor="component-simple"> Password </InputLabel>

                < Input
                    type="password"
                    value={this.state.pass}
                    onChange={this.changePass}
                />
            </FormControl>
            <Button
                onClick={this.handleSubmit}
                variant="contained">
                Register
            </Button>
        </div>)
    }
}

export default RegisterForm;
