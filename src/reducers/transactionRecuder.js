import constants from '../constants/actionTypes'

var initialState = {
    transaction: localStorage.getItem('transaction') ? localStorage.getItem('transaction') : ''
}

export default (state = initialState, action) => {

    var updated = Object.assign({}, state);

    switch(action.type) {
        case constants.CREATE_TRANSACTION:
            updated['transaction'] = action.transaction;
            return updated;

        default:
            return state;
    }
}