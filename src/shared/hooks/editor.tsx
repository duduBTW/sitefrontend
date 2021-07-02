import Cookies from "js-cookie";
import { instance } from "../services/api";

export const openEditor = (idAcao: string | number, id: string | number) => {
  // const { addFile, startWait, removeFile } = useDownload();
  // const { setAlert } = useAlert();

  // const download = () => {
  //   const fileId = startWait("Editor_Prosesmt.exe");

  //   instance
  //     .get("/editor/download")
  //     .then((res) => addFile(fileId, res.data.URL))
  //     .catch((error) => {
  //       setAlert({
  //         status: true,
  //         message: error.response?.data?.message,
  //         severity: "error",
  //       });
  //       removeFile(fileId);
  //     });
  // };

  window.location.href = `prosesmt://?idacao=${idAcao}?id=${id}?token=${Cookies.get(
    "Authorization"
  )}`;
};
