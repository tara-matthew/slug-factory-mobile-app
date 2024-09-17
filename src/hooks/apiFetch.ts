import axios from "axios";

const fetchData = async (endpoints) => {
    try {
        // Check if the input is an array (multiple requests) or a single request object
        if (Array.isArray(endpoints)) {
            const response = await Promise.all(
                endpoints.map((endpoint) => axios.get(endpoint))
            );
            return response.map(({ data }) => data);
        } else {
            const { data } = await axios.get(endpoints);
            // Return the data directly if it's a single endpoint
            return data;
        }
    } catch (error) {
        throw error; // Handle the error as needed
    }
};

export default fetchData;
