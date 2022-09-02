import { useState, useCallback } from "react";
import axios from "axios";

////custom hook
export const useHttpGetRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getRequest = useCallback(async (url) => {
    setLoading(true);
    try {
      const res = await axios.get(url);

      if (!res.ok) {
        throw new Error(res.message);
      }
      return res.data;
    } catch (error) {
      setError(error.message || "Something went wronge");
    }
    setLoading(false);
  }, []);
  const clearError = () => {
    setError(null);
  };

  return { loading, error, getRequest, clearError };
};

export const useHttpPostRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const postRequest = useCallback(async (url, body) => {
    setLoading(true);
    try {
      const res = await axios.post(url, body);

      if (!res.ok) {
        throw new Error(res.message);
      }
      return res.data;
    } catch (error) {
      setError(error.message || "Something went wronge");
    }
    setLoading(false);
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { loading, error, postRequest, clearError };
};
