import Container from "@mui/material/Container";

const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column"
};

const ContainerComponent = ({ style = {}, isCenter, maxWidth="md", children }) => {
  return (
    <Container
      maxWidth={maxWidth}
      style={
        isCenter
          ? {...centerStyle, ...style}
          : {...style}
      }
    >
      {children}
    </Container>
  );
};

export default ContainerComponent;
