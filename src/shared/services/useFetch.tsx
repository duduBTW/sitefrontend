import { useEffect, useState } from "react";
import useSWR from "swr";
import { instance } from "./api";

export function useFetch<Data = any>(url: string) {
  const { data, error, mutate } = useSWR<Data>(
    url,
    async (url) => {
      const response = await instance.get(url);

      return response.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  return { data, error, mutate };
}

export function useFetchSelect<Data = any>(
  url: string,
  label: string,
  value: string,
  forMatFun?: (data: any) => string
) {
  const [options, setOptions] = useState<
    // SelectOptionModel[] | null | undefined
    any[] | null | undefined
  >();

  const { data, error, mutate } = useSWR<Data>(
    url,
    async (url) => {
      const response = await instance.get(url);

      return response.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setOptions(
        data.map((item) => ({
          label: forMatFun ? forMatFun(item) : item[label],
          value: item[value],
          AGTDESCOBRIGATORIA: item?.AGTDESCOBRIGATORIA,
        }))
      );
    }
  }, [data]);

  return { options };
}
