import axios from "axios";

const fetchData = async (endpoints) => {
    if (Array.isArray(endpoints)) {
        const response = await Promise.all(
            endpoints.map((endpoint) => axios.get(endpoint))
        );
        return response.map(({ data }) => data);
    } else {
        const { data } = await axios.get(endpoints);
        return data;
    }
};

export default fetchData;
