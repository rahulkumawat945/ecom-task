import { useState, useEffect, useCallback } from 'react';

type FetchOptions = {
  url: string;
  methodType?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, unknown> | null;
  noInitialLoad?: boolean;
};

type FetchResponse<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
};

function useFetch<T>({ url, methodType = 'GET', body = null, noInitialLoad = false}: FetchOptions): FetchResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const options: RequestInit = {
        method: methodType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
      };

      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err: unknown) {
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
    if (url && !noInitialLoad) fetchData();
  }, []);

  return { data, isLoading, error, refetch: fetchData };
}

export {useFetch};
