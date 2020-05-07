import React from "react";
import {connect} from "react-redux";
import { Link, Redirect } from "react-router-dom";
import {Button, Form, Spinner} from "react-bootstrap";
import * as actions from "../store/actions/auth"

class SignupForm extends React.Component {

    state = {
        username: "",
        email: "",
        password1: "",
        password2: ""
    };

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = e => {
        e.preventDefault();
        const {username, email, password1, password2} = this.state;
        this.props.signup(username, email, password1, password2);
    };

    render() {
        const {username, email, password1, password2} = this.state;
        const {error, loading, token} = this.props;

        if (token) {
            return <Redirect to='/' />
        }

        let errorMessage = null;
        if (error) {
            errorMessage = (
                <p>{error.message}</p>
            );
        }

        return (
            <div>
                {errorMessage}
                {loading ? (
                    <Spinner animation="border" />
                ) : (
                        <Form onSubmit={this.handleSubmit}>
                          <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                name="username"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                required
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                name="email"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="password1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Password"
                                value={password1}
                                name="password1"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Form.Group controlId="password2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                placeholder="Confirm Password"
                                value={password2}
                                name="password2"
                                onChange={this.handleChange}
                            />
                          </Form.Group>

                          <Button variant="primary" type="submit">
                            Signup
                          </Button>
                            <br/>
                          <p>You have account? plz <Link to='/login'>Login</Link></p>
                        </Form>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        error: state.error,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signup: (username, email, password1, password2) => dispatch(actions.authSignup(username, email, password1, password2))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);