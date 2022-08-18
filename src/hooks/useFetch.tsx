/* eslint-disable */

import { useEffect, useState } from "react";

export function useFetch<
  _,
  T extends (url: string, ...args: any) => Promise<unknown>
>(
  key: string,
  query: T
): {
  data: Awaited<ReturnType<T>> | null;
  loading: boolean;
  error: any;
  mutate: () => Promise<any>;
} {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState<any | null>(null);

  const mutate = () =>
    query(key)
      .then((res) => {
        setData(res);
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setData(null);
        setLoading(false);
        setError(err);
      });

  useEffect(() => {
    mutate();
  }, [key]);

  return { data, loading, error, mutate };
}
