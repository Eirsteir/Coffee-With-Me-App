import AuthService from './services/AuthService';

export default function handleResponse(response, navigation) {
   
    console.log(response);

    if (isValidStatus(response.status)) {
        return response;
    }

    if (response.status === 401) {
        AuthService.logout();
        navigation.navigate('Login');
    }

    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}

function isValidStatus(status) {
    return status >= 200 && status < 300;
}