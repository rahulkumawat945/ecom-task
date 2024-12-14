import { useState, useEffect, useCallback } from 'react';

type FetchOptions = {
  url: string;
  methodType?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | null;
};

type FetchResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

function useFetch<T>({ url, methodType = 'GET', body = null }: FetchOptions): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log("🚀 ~ fetchData ~ CALLED WITH:", url)

    try {
      const options: RequestInit = {
        method: methodType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);
      console.log("🚀 ~ fetchData ~ result:", response)

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result: T = await response.json();
      console.log("🚀 ~ fetchData ~ result:", result)
      setData(result);
    } catch (err: unknown) {
      console.log("🚀 ~ fetchData ~ err:", err)
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, [url, methodType, body]);

  useEffect(() => {
    if (url) fetchData();
    console.log("🚀 ~ useEffect ~ url:", url)
  }, []);

  return { data, isLoading, error, refetch: fetchData };
}

export {useFetch};
