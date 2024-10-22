import { useState,useEffect } from "react";

export const useFilteredData = (fetchFunction: (filters: any) => Promise<any>) => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({});
    const [appliedFilters, setAppliedFilters] = useState({});
  

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchFunction(appliedFilters);
                setData(result);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, [appliedFilters,fetchFunction]);
    return {
        data,filters,setFilters,appliedFilters,setAppliedFilters
    }
}