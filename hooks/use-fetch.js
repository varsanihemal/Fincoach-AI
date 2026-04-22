import { useState } from "react";

const useFetch =(cb)=>{
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fn = async(...args)=>{ // Set loading state and reset error before making the API call
        //what is the ...args syntax? It is the rest parameter syntax in JavaScript, which allows a function to accept an indefinite number of arguments as an array. In this case, it allows the fn function to accept any number of arguments and pass them to the callback function cb when it is called. This is useful for making the useFetch hook flexible and reusable with different API calls that may require different parameters.
        setLoading(true);
        setError(null);

        try {
            const response = await cb(...args);
            setData(response);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return {data, loading, error, fn, setData};
}

export default useFetch;