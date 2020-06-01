export function handleResponse(response) {
    return response.then(data => {

        if (!response.ok) {
            if (response.status === 401) {
                logout();
                this.props.history.push("/");
            }

            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        return data;
    });
}