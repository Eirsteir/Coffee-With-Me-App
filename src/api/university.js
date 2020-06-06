import axios from 'axios';
import { getHeaders } from './httpHelpers';

const API_UNIVERSITY_URL = 'http://localhost:8080/api/social/universities';

export default {
    fetchUniversities: async (token, includeCampuses) => {
        return axios({
            method: 'GET',
            url: API_UNIVERSITY_URL + `?includeCampuses=${includeCampuses}`,
            headers: getHeaders(token)
        });
    },
}