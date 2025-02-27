import { useEffect, useState } from "react";

const localCache = {};

export const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    errors: null,
  });

  useEffect(() => {
    getFetch();
  }, [url]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      errors: null,
    });
  };

  const getFetch = async () => {
    if (localCache[url]) {
      console.log("Usando Cache");
      setState({
        data: localCache[url],
        isLoading: false,
        hasError: false,
        errors: null,
      });
      return;
    }

    setLoadingState();

    const response = await fetch(url);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (!response.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        errors: {
          code: response.status,
          message: response.statusText,
        },
      });
      return;
    }

    const data = await response.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      errors: null,
    });

    //Manejo del Cache
    localCache[url] = data;
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
