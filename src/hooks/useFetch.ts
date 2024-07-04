import { useEffect, useState } from "react";

const baseURL = "http://192.168.0.15/api"
const useFetch = (url: string) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${baseURL}/${url}`)
            .then((res) => res.json())
            .then((data) => {
                setError(data.error)
                setData(data.data)
                setLoading(false)
            })
    }, [url]);

    return { data, loading, error };
};

export default useFetch;
