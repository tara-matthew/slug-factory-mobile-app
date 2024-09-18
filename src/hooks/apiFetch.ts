import axios from "axios";

axios.defaults.baseURL = 'http://slug-factory-api.test/api';
const fetchData = async (endpoints, method = 'GET', params = null) => {
    if (Array.isArray(endpoints)) {
        const response = await Promise.all(
            endpoints.map((endpoint) => axios({
                method: method,
                url: endpoint,
                data: params
            }))
        );
        return response.map(({ data }) => data);
    } else {
        const { data } = await axios({
            method: method,
            url: endpoints,
            data: params
        });
        return data;
    }
};

export default fetchData;
