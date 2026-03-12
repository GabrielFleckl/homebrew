import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios/api";
import { formatUsername } from "../lib/utils";

const useMe = () => {
  const [currentUser, setCurrentUser] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");

  const fetchMe = useCallback(async () => {
    try {
      const response = await api.get(`/api/users/me`, [token]);

      const userResponse = response.data;

      setCurrentUser(userResponse);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  const registerDate = currentUser?.createdAt
    ? new Date(currentUser.createdAt).toLocaleDateString("pt-BR", {
        timeZone: "America/Sao_Paulo",
      })
    : null;

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  return {
    currentUser: currentUser
      ? {
          ...currentUser,
          username: formatUsername(currentUser.username),
          registerDate,
        }
      : null,
    loading,
    error,
    refetch: fetchMe,
  };
};

export default useMe;
