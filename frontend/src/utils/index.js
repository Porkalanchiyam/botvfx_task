import { formatDistance } from "date-fns";

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/* fromat date */
export const formatDate = (date) => {
  if (date) {
    return formatDistance(new Date(date), new Date(), { addSuffix: true });
  }
  return "";
};

//Function to validate email
export const ValidateEmail = (email) => {
  let re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return Boolean(re.test(email));
};

export const getDefaultProfileImg = (username) => {
  return `https://avatars.dicebear.com/api/initials/${encodeURIComponent(
    username
  )}.svg`;
};

export const AlertProps = {
  vertical: {
    top: "top",
    bottom: "bottom",
  },
  horizontal: {
    left: "left",
    right: "right",
    center: "center",
  },
  severity: {
    success: "success",
    error: "error",
    warning: "warning",
    info: "info",
  },
};
export * from "./fetcher";
