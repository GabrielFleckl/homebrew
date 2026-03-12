import { useState, useEffect, useCallback } from "react";
import api from "../lib/axios/api";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState("");
  const [totalCompleted, setTotalCompleted] = useState();
  const [bio, setBio] = useState("");
  const [registerDate, setRegisterDate] = useState("");
  const [instagramURL, setInstagramURL] = useState("");
  const [brewfatherURL, setBrewfatherURL] = useState("");
  const [birthday, setBirthday] = useState("");
  const [equipment, setEquipment] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("jwt");

  const fetchCategories = useCallback(async () => {
    try {
      const categoryResponse = await api.get("/api/categories?populate=*");

      const response = categoryResponse.data.categories;
      const id = categoryResponse.data.userId;
      const username = categoryResponse.data.username;
      const totalCompleted = categoryResponse.data.completedSubcategories;
      const bio = categoryResponse.data.bio;
      const registerDate = categoryResponse.data.RegistrationDate;
      const instagramURL = categoryResponse.data.instagramURL;
      const brewfatherURL = categoryResponse.data.brewfatherURL;
      const birthday = categoryResponse.data.birthday;
      const equipment = categoryResponse.data.equipment;

      setRegisterDate(registerDate);
      setBio(bio);
      setCategories(response);
      setUserId(id);
      setUsername(username);
      setTotalCompleted(totalCompleted);
      setInstagramURL(instagramURL);
      setBrewfatherURL(brewfatherURL);
      setBirthday(birthday);
      setEquipment(equipment);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    setCategories,
    username,
    userId,
    totalCompleted,
    bio,
    registerDate,
    instagramURL,
    brewfatherURL,
    equipment,
    birthday,
    loading,
    error,
    refetch: fetchCategories,
  };
};

export default useCategories;
