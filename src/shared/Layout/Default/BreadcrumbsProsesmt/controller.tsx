import { useRouter } from "next/router";
import { getAnaliseBreadcrumbsProsesmt } from "./Tabs/tecnico/analise_de_risco";
import { getSetorBreadcrumbsProsesmt } from "./Tabs/tecnico/analise_de_risco/setor";

export const transform = (staticStr: any, ...tags: any) => {
  let oneEmpty = false;
  for (let i = 0; i < tags.length; i++) {
    if (!tags[i]) oneEmpty = true;
  }

  if (oneEmpty) return null;

  let srt = staticStr[0];
  for (let i = 0; i < tags.length; i++) {
    srt += tags[i] + staticStr[i + 1];
  }
  return srt;
};

export const transformUrlValid = (staticStr: any, ...tags: any) => {
  let oneEmpty = false;
  for (let i = 0; i < tags.length; i++) {
    if (!tags[i]) oneEmpty = true;
  }

  if (oneEmpty) return null;

  let srt = staticStr[0];
  for (let i = 0; i < tags.length; i++) {
    srt += tags[i] + staticStr[i + 1];
  }
  return srt;
};

export const getBreadcrumbsProsesmt = () => {
  return [
    // Análise
    ...getAnaliseBreadcrumbsProsesmt(),
  ];
};
