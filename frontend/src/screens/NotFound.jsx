import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { styled } from '@mui/material/styles';

import { Container } from "../components";
import router from "../config/router";

const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));


const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Container isCenter style={{ marginTop: "150px", textAlign: "center" }}>
      <Typography variant="h3" gutterBottom component="div">
        404 - Page not found
      </Typography>
      <Div>Go to&nbsp;
        <span
          onClick={() => navigate(router.Home.path)}
          style={{
            cursor: "pointer",
            color: "blue",
          }}
        >
          home Page
        </span>
      </Div>
    </Container>
  )
};

export default NotFound;
