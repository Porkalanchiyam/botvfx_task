import ButtonMui from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

const Button = ({ loading, children, ...remProps }) => {

  if (loading) {
    return (
      <ButtonMui
        {...remProps}
        disabled
        startIcon={<CircularProgress color="inherit" size={12} />}
      >
        {children}
      </ButtonMui>
    );
  }

  return (
    <ButtonMui {...remProps}>
      {children}
    </ButtonMui>
  );
};

export default Button;
