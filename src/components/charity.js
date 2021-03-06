import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchCharity} from "../actions/charityActions";

//support routing by creating a new component

class Charity extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedCharitie == null)
            dispatch(fetchCharity(this.props.charityName));
    }

    render() {
        const DetailInfo = ({currentCharity}) => {
            if (!currentCharity) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Charity Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentCharity.imageUrl} thumbnail/></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentCharity.charityName}</ListGroupItem>
                        <ListGroupItem>{currentCharity.About}</ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentCharity.Amount} </h4></ListGroupItem>
                    </ListGroup>
                </Panel>
            );
        };
        return (
            <DetailInfo currentCharity={this.props.selectedCharitie}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedCharitie: state.charity.selectedCharitie,
        charityName: ownProps.match.params.charityName
    }
}

export default withRouter(connect(mapStateToProps)(Charity));