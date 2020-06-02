import AuthService from './services/AuthService';

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