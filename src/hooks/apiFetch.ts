import axios from "axios";

axios.defaults.baseURL = process.env.EXPO_PUBLIC_API_URL;
const fetchData = async (endpoints, method = "GET", params = null, headers = {}) => {
    if (Array.isArray(endpoints)) {
        return fetchMultipleEndpoints(endpoints, method);
    } else {
        return fetchSingleEndpoint(endpoints, method, params, headers);
    }
};

const fetchSingleEndpoint = async (endpoint, method = "GET", params = null, headers = {}) => {
    const { data } = await axios({
        method: method,
        url: endpoint,
        data: params,
        headers: headers,
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
