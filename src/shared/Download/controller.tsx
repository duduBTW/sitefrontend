import { useState } from "react";
// import { v4 as uuidv4 } from "uuid";

export interface DownloadModel {
  fileName: string;
  type: "starting" | "downloading";
  fileLink?: string;
  id?: string;
  extract?: boolean;
}

const useDownloadProvider = () => {
  const [files, setFiles] = useState<DownloadModel[]>([
    // {
    //   fileLink: "/ideaIC-2020.3.2.exe",
    //   fileName: "ideaIC-2020.3.2.exe",
    //   id: uuidv4(),
    // },
    // {
    //   fileLink: "/VirtualBox-6.1.16-140961-Win.exe",
    //   fileName: "VirtualBox-6.1.16-140961-Win.exe",
    //   id: uuidv4(),
    // },
  ]);

  const removeFile = (id: string) =>
    setFiles((oldFiles) => oldFiles.filter((file) => file.id !== id));

  const addFile = (id: string, fileLink: string, extract: boolean = false) => {
    setFiles((oldFiles) =>
      oldFiles.map((file) =>
        file.id === id
          ? { ...file, type: "downloading", fileLink, extract }
          : file
      )
    );

    // setFiles((oldFiles) => [...oldFiles, { ...file, id: uuidv4() }]);
  };

  const startWait = (fileName: string) => {
    // const id = uuidv4();
    const id = "";
    setFiles((oldFiles) => [...oldFiles, { id, type: "starting", fileName }]);

    return id;
  };

  return { files, removeFile, addFile, startWait };
};

export default useDownloadProvider;
