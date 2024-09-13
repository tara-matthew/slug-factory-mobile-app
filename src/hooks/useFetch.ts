import {useEffect, useMemo, useState} from "react";

const baseURL = "http://khxmdwcdgp.sharedwithexpose.com/api"
const useFetch = (url: string, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`${baseURL}/${url}`, {
                    headers: {
                        "Content-Type": "application/json",
                    }, ...options,
                });
                const result = await response.json();
                setData(result.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();

    }, [url, options]);

    return { data, loading, error };
};

export default useFetch;
