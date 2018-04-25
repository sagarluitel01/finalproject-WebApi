import actionTypes from '../constants/actionTypes';
import runtimeEnv from '@mars/heroku-js-runtime-env';

function charitiesFetched(charities){
    return {
        type: actionTypes.FETCH_CHARITIES,
        movies: charities
    }
}

function charityFetched(charity){
    return {
        type: actionTypes.FETCH_CHARITY,
        selectedMovie: charity
    }
}

function charitySet(charity){
    return {
        type: actionTypes.SET_CHARITY,
        selectedMovie: charity
    }
}

export function setCharity(charity) {
    return dispatch => {
        dispatch(charitySet(charity));
    }
}

export function fetchCharities(){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/Charity/GetAll`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(charitiesFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}

export function fetchCharity(charityName){
    const env = runtimeEnv();
    return dispatch => {
        return fetch(`${env.REACT_APP_API_URL}/Charity/Get/${charityName}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            mode: 'cors'})
            .then( (response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then( (res) => {
                dispatch(charityFetched(res));
            })
            .catch( (e) => console.log(e) );
    }
}