import UNIVERSITY from '../university';
import TOKEN from '../token';
import Constants from '../../constants/Constants';


class UniversityService {

    static fetchUniversities = async (includeCampuses) => {
        return TOKEN.get(Constants.AUTH_TOKEN).then((token) => {
            return UNIVERSITY.fetchUniversities(token, includeCampuses)
                .then((response) => {return response.data});
        });
    }

}

export default UniversityService;