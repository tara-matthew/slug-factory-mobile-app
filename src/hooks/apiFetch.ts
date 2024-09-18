import axios from "axios";

const fetchData = async (endpoints) => {
    try {
        if (Array.isArray(endpoints)) {
            const response = await Promise.all(
                endpoints.map((endpoint) => axios.get(endpoint))
            );
            return response.map(({ data }) => data);
        } else {
            const { data } = await axios.get(endpoints);
            return data;
        }
    } catch (error) {
        throw error;
    }
};

export default fetchData;
