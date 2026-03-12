import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios/api";

const useRankingId = (userId) => {
  const [username, setUsername] = useState();
  const [RegistrationDate, setRegistrationDate] = useState();
  const [bio, setBio] = useState();
  const [instagramURL, setInstagramURL] = useState();
  const [birthday, setBirthday] = useState();
  const [categories, setCategories] = useState();
  const [completedSubcategories, setCompletedSubcategories] = useState();
  const [equipment, setEquipment] = useState("");
  const [brewfatherURL, setBrewfatherURL] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");

  const fetchUserRanking = useCallback(async () => {
    try {
      const rankingUserDetails = await api.get(
        `/api/user-subcategories/ranking/${userId}`
      );

      setUsername(rankingUserDetails.data.username);
      setBio(rankingUserDetails.data.bio);
      setRegistrationDate(rankingUserDetails.data.RegistrationDate);
      setInstagramURL(rankingUserDetails.data.instagramURL);
      setBirthday(rankingUserDetails.data.birthday);
      setCompletedSubcategories(rankingUserDetails.data.completedSubcategories);
      setCategories(rankingUserDetails.data.categories);
      setEquipment(rankingUserDetails.data.equipment);
      setBrewfatherURL(rankingUserDetails.data.brewfatherURL);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchUserRanking();
  }, [fetchUserRanking]);

  return {
    username,
    categories,
    RegistrationDate,
    bio,
    instagramURL,
    birthday,
    completedSubcategories,
    loading,
    equipment,
    brewfatherURL,
    error,
  };
};

export default useRankingId;
