import "../styles/globals.css";
import { alertPropsLAyout, useAlertProvider } from "@/shared/Alert/controller";
import { createContext, Dispatch, SetStateAction, useContext } from "react";
//@ts-ignore
var def: {
  alert: alertPropsLAyout;
  setAlert: Dispatch<SetStateAction<alertPropsLAyout>>;
} = {};
const AlertContext = createContext(def);

export const useAlert = () => {
  return useContext(AlertContext);
};

function MyApp({ Component, pageProps }) {
  const alert = useAlertProvider();

  return (
    <div style={{ maxWidth: 1366, margin: "0px auto", padding: 30 }}>
      <AlertContext.Provider value={alert}>
        <Component {...pageProps} />
      </AlertContext.Provider>
    </div>
  );
}

export default MyApp;
