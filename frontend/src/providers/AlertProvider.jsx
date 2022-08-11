import React, { useState } from "react";

import { Alert } from "../components";

export const AlertContext = React.createContext({
  setAlertInfo: () => {},
});

const AlertProvider = ({ children }) => {
  const [alertInfo, setAlertInfo] = useState({
    horizontal: "left",
    msg: "",
    open: false,
    severity: "success",
    vertical: "top",
  });

  const onclose = () => {
    setAlertInfo({
      horizontal: "left",
      msg: "",
      open: false,
      severity: "success",
      vertical: "top",
    });
  };

  return (
    <AlertContext.Provider
      value={{
        setAlertInfo: (val) => {
          setAlertInfo({
            open: val?.open ?? true,
            horizontal: val?.horizontal || "right",
            vertical: val?.vertical || "bottom",
            severity: val?.severity || "success",
            msg: val.msg,
          });
        },
      }}
    >
      {alertInfo.open ? <Alert {...alertInfo} onclose={onclose} /> : null}
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => React.useContext(AlertContext);

export default AlertProvider;
