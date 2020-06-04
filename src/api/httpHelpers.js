import AuthService from './services/AuthService';
import Constants from '../constants/Constants';

export default function handleResponse(response, navigation=null) {

    if (isValidStatus(response.status)) {
        return response;
    }

    if (response.status === 401) {
        AuthService.logout(navigation);
    }

    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}

function isValidStatus(status) {
    return status >= 200 && status < 300;
}

export default function getHeaders(token) {
    return {
        'Authorization': Constants.JWT_PREFIX + token
    }
}