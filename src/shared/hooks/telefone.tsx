import { useEffect, useState } from "react";
import { SelectOptionModel } from "../Form/model";
import { useFetch } from "../services/useFetch";

export interface TelefoneModel {
  TELDESCRICAO: string;
  ASSINA?: any;
}

const useTipoTelefone = () => {
  const [tipoTelefone, settipoTelefone] = useState<
    SelectOptionModel[] | null | undefined
  >();

  const { data } = useFetch<TelefoneModel[]>(`/telefone/tipos`);

  useEffect(() => {
    if (data) {
      settipoTelefone(
        data.map((item) => ({
          label: item.TELDESCRICAO,
          value: item.TELDESCRICAO,
        }))
      );
    }
  }, [data]);

  return tipoTelefone;
};

export default useTipoTelefone;
