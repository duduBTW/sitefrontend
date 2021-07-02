import { useEffect, useRef, useState } from "react";
import { SelectOptionModel } from "../Form/model";
import { useFetch } from "../services/useFetch";
import { ufs } from "@/shared/services/ufs.json";
import { instance } from "../services/api";
import { useAlert } from "pages/_app";

export interface TipoEnderecoModel {
  EndDescricao: string;
  Assina: string;
}

export interface EnderecoModel {
  Endereco: string;
  Complemento: string;
  Bairro: string;
  Estado: string;
  Cidade: string;
}

interface SchemaEnderecoModel {
  tipo?: string;
  enderecoItem?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
}

/**
 * Utils para formularios
 * @param string defData
 * @param SchemaEnderecoModel model
 *
 * @returns
 *  tipoEnderecoOptions -Tipos de endereço. (ex: Rua, Avenida etc)
 *  autoCompleteCEP - Função usura o modelo para preencher os campos
 *  loadingCEP - se a função para preencher os campos está carregando
 */
const useTipoEndereco = ({
  defData,
  model: { tipo, enderecoItem, bairro, cidade, estado },
}: {
  defData?: string;
  model?: SchemaEnderecoModel;
}) => {
  const [tipoEnderecoOptions, settipoEndereco] = useState<
    SelectOptionModel[] | null | undefined
  >();
  const [loadingCEP, setLoadingCEP] = useState(false);
  const oldValueCEP = useRef(defData);

  const { setAlert } = useAlert();

  const { data } = useFetch<TipoEnderecoModel[]>(`/profissionais/tipoendereco`);

  useEffect(() => {
    if (data) {
      settipoEndereco(
        data.map((item) => ({
          label: item.EndDescricao,
          value: item.EndDescricao,
        }))
      );
    }
  }, [data]);

  const autoCompleteCEP = (cep: string, setValue: any) => {
    console.log(oldValueCEP.current);
    if (cep && cep !== oldValueCEP.current) {
      oldValueCEP.current = cep;

      setLoadingCEP(true);
      instance
        .get<EnderecoModel>(`/viaCEP/ConsultaCEP/${cep}`)
        .then(function (response) {
          setLoadingCEP(false);

          let endereco = response.data.Endereco.split(" ");
          if (tipoEnderecoOptions && response.data.Endereco)
            tipoEnderecoOptions.map((itemEnd) => {
              if (itemEnd.value === endereco[0]) {
                setValue(tipo, itemEnd.value, {
                  shouldValidate: true,
                });
                endereco.shift();
                response.data.Endereco = endereco.join(" ");
              }
            });

          if (enderecoItem)
            setValue(enderecoItem, response.data.Endereco, {
              shouldValidate: true,
            });

          if (bairro)
            setValue(bairro, response.data.Bairro, {
              shouldValidate: true,
            });

          if (cidade)
            setValue(cidade, response.data.Cidade, {
              shouldValidate: true,
            });

          if (estado)
            setValue(estado, response.data.Estado, {
              shouldValidate: true,
            });
        })
        .catch(function (_) {
          setLoadingCEP(false);
          setAlert({
            status: true,
            message: "CEP não encontrado",
            severity: "warning",
          });
        });
    }
  };

  return { tipoEnderecoOptions, autoCompleteCEP, loadingCEP };
};

export const useEstadoOptions = (): SelectOptionModel[] => {
  return ufs.map((uf) => ({
    label: uf.sigla,
    value: uf.sigla,
  }));
};

export default useTipoEndereco;
