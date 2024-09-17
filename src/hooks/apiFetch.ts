import axios from "axios";
import {useState} from "react";

const fetchData = async (endpoints) => {
    try {
        // Check if the input is an array (multiple requests) or a single request object
        if (Array.isArray(endpoints)) {
            const response = await Promise.all(
                endpoints.map((endpoint) => axios.get(endpoint))
            );
            return response.map(({ data }) => data.data);
        } else {
            const { data } = await axios.get(endpoints);
            // Return the data directly if it's a single endpoint
            return data.data;
        }
    } catch (error) {
        console.error("Error fetching data", error);
        throw error; // Handle the error as needed
    } 
};

export default fetchData;
