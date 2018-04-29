import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchProduct} from "../actions/charityActions";

//support routing by creating a new component

class Product extends Component {

    componentDidMount() {
        const {dispatch} = this.props;
        if (this.props.selectedProduct == null)
            dispatch(fetchProduct(this.props.productName));
    }

    render() {
        const DetailInfo = ({currentCharity: currentProduct}) => {
            if (!currentProduct) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Product Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentProduct.imageUrl} thumbnail/></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentProduct.productName}</ListGroupItem>
                        <ListGroupItem>{currentProduct.About}</ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'}/> {currentProduct.Amount} </h4></ListGroupItem>
                    </ListGroup>
                </Panel>
            );
        };
        return (
            <DetailInfo currentProduct={this.props.selectedProduct}/>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    return {
        selectedProduct: state.product.selectedProduct,
        productName: ownProps.match.params.productName
    }
}

export default withRouter(connect(mapStateToProps)(Product));