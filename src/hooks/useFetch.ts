// import {useEffect, useMemo, useState} from "react";
//
// const baseURL = "https://ghif128xv9.sharedwithexpose.com/api"
//
// const useFetch = (url: string, options) => {
//     console.log(options);
//     const [data, setData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//
//         try {
//             const response = fetch(`${baseURL}/${url}`, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json",
//                 }, ...options,
//             });
//             // if (!response.ok) {
//             //     // Create an error object to throw
//             //     const error = new Error(`HTTP error! status: ${response.status}`);
//             //     // Attach status code to the error object
//             //     (error as any).status = response.status;
//             //     throw error;
//             // }
//             const result = await response.json();
//             console.log(result);
//             setData(result.data)
//         } catch (error) {
//             console.log(error);
//             setError(error.message);
//         } finally {
//             setLoading(false);
//         }
//     fetchData();
//
//
//     return { data, loading, error };
// };
//
// export default useFetch;
