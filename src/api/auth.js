export default {
    authenticate: (email, password) => {
        const body = {
            email: email,
            password: password
        }

        return axios({
            method: 'POST',
            url: 'http://localhost:8080/api/auth',
            body: body
        });
    },
    getHeaders: (token) => {
        return {
            'Authorization': token
        }
    }
}