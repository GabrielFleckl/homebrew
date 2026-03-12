import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios/api";

const useMedals = (userId) => {
  const [medals, setMedals] = useState([]);
  const [pagination, setPagination] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");

  const fetchMedals = useCallback(async () => {
    try {
      const response = await api.get(
        `/api/medals?filters[users_permissions_user][id][$eq]=${userId}&populate=*`,
        [token]
      );

      const medalResponse = response.data.data;
      const metaResponse = response.data.meta;

      setMedals(medalResponse);
      setPagination(metaResponse);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMedals();
  }, [fetchMedals]);

  return {
    medals,
    pagination,
    loading,
    error,
    refetch: fetchMedals,
  };
};

export default useMedals;
