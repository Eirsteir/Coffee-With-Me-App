export default function handleResponse(response) {
   
    console.log(response);

    if (isValidStatus(response.status)) {
        return response;
    }

    if (response.status === 401) {
        // logout();
        // this.props.history.push("/");
    }

    const error = (response && response.message) || response.statusText;
    return Promise.reject(error);
}

function isValidStatus(status) {
    return status >= 200 && status < 300;
}