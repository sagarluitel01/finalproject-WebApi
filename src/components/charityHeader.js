import React, { Component } from 'react';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from "react-redux";
import { withRouter } from "react-router-dom";
import {logoutUser} from "../actions/authActions";

class MovieHeader extends Component {

    logout(){
        this.props.dispatch(logoutUser());
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Vacuum Master
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <LinkContainer to="/charityList">
                            <NavItem eventKey={1} disabled={!this.props.loggedIn}>Charity List </NavItem>
                        </LinkContainer>
                        <LinkContainer to={'/Charity/Get/'+ (this.props.selectedCharitie ? this.props.selectedCharitie.charityName: '')}>
                            <NavItem eventKey={2} disabled={!this.props.loggedIn}>Charity Detail</NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signin">
                            <NavItem eventKey={3}>{this.props.loggedIn ? <button onClick={this.logout.bind(this)}>Logout</button> : 'Login'}</NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar>
                <header className="App-header">
                    <h1 className="App-title">{(this.props.selectedCharitie ? this.props.selectedCharitie.charityName : '')}</h1>
                </header>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        loggedIn: state.auth.loggedIn,
        username: state.auth.username,
        selectedCharitie: state.charity.selectedCharitie,
    }
}

export default withRouter(connect(mapStateToProps)(MovieHeader));