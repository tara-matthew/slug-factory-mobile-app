import { useEffect, useState } from "react";

const baseURL = "http://192.168.0.15/api"
const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${baseURL}/${url}`, {
            method: 'GET', // This is the default method, but you can specify it if needed.
            headers: {
                'Content-Type': 'application/json', // Adjust the content type if necessary
                'Authorization': 'Bearer your_token_here', // Add any other headers you need
                // Add more headers as needed
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setError(data.error)
                setData(data.data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
