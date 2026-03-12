import { useState, useEffect, useCallback } from "react";

import apiPublic from "../lib/axios/apiPublic";

const useBlogPosts = () => {
  const [post, setPosts] = useState([]);
  const [pagination, setPagination] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await apiPublic.get("/api/posts?populate=*");

      const postResponse = response.data.data;
      const metaResponse = response.data.meta;

      setPosts(postResponse);
      setPagination(metaResponse);

      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    post,
    pagination,
    loading,
    error,
    refetch: fetchPosts,
  };
};

export default useBlogPosts;
