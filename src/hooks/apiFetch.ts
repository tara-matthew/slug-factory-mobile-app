import axios from "axios";

axios.defaults.baseURL = "http://slug-factory-api.test/api";
const fetchData = async (endpoints, method = "GET", params = null) => {
    if (Array.isArray(endpoints)) {
        return fetchMultipleEndpoints(endpoints, method);
    } else {
        return fetchSingleEndpoint(endpoints, method, params);
    }
};

const fetchSingleEndpoint = async (endpoint, method = "GET", params = null) => {
    const { data } = await axios({
        method: method,
        url: endpoint,
        data: params,
    });
    return data;
};

const fetchMultipleEndpoints = async (endpoints, method = "GET") => {
    const response = await Promise.all(
        endpoints.map(endpoint => axios({
            method: method,
            url: endpoint,
        })),
    );
    return response.map(({ data }) => data);
};

export default fetchData;
