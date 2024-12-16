export const fetchData = async <T>(url: string): Promise<{ data: T | null; error: string | null }> => {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
      }

      const data: T = await response.json();
      return { data, error: null };
  } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "An unknown error occurred.";
      return { data: null, error };
  }
};
