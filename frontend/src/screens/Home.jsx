import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Button, Container } from "../components";
import router from "../config/router";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container isCenter>
      <Typography
        sx={{ textAlign: "center", mb: 5, mt: "150px" }}
        component="h1"
        variant="h5"
      >
        Welcome to {process.env.APP_NAME}
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate(router.User.path);
        }}
      >
        Get Started
      </Button>
    </Container>
  );
};

export default HomePage;
