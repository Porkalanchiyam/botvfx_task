import React, { useEffect } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { ValidateEmail } from "../utils";
import InputComp from "./input";
import { useAlert } from "../providers/AlertProvider";

const CreateAccount = (props) => {
  const { user, userId, handleClose, userApiHandler, refetch, Url, Method } =
    props;

  const { setAlertInfo } = useAlert();

  //<---------Hooks--------->
  const [state, setState] = React.useState({
    fname: "",
    lname: "",
    email: "",
  });
  const [error, setError] = React.useState({
    fname: false,
    email: false,
  });

  //<------------Handlers ---------->
  const onSubmit = async () => {
    const { email, lname, fname } = state;
    if (fname && email) {
      //to check if the email is valid
      let emailvalid = ValidateEmail(state?.email);
      if (emailvalid) {
        let id = {};
        //if edit sending id in payload
        if (userId) {
          id = { id: userId };
        }
        const payload = {
          firstName: fname,
          emailId: email,
          lastName: lname,
          ...id,
        };

        let apiCall = await userApiHandler(Url, Method, payload, refetch);
        if (!apiCall.success) {
          setAlertInfo({
            severity: "error",
            msg: apiCall.errMsg,
          });
        } else {
          handleClose();
          setAlertInfo({
            severity: "success",
            msg: `User ${userId ? "Upated" : "Created"} Successfully`,
          });
        }
      } else {
        setError({
          name: false,
          email: true,
        });
      }
    } else {
      //to find empty fields
      let emptySate = ["name", "email"].find((key) => !state[key]);
      setError({
        ...error,
        [emptySate]: true,
      });
    }
  };

  //onChange handler
  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    setError({
      ...error,
      [e.target.name]: false,
    });
  };

  //<-----------Life cycles------->
  useEffect(() => {
    if (Object.keys(user).length > 0 && userId) {
      setState({
        fname: user.firstName,
        lname: user.lastName,
        email: user.emailId,
      });
    }
  }, [user, userId]);

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center">
      <Grid item xs={10}>
        <Card sx={{ boxShadow: "none" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {userId ? "Update User" : "Create New User"}
            </Typography>
            <InputComp
              value={state?.fname}
              error={error?.fname}
              name="fname"
              top_title="First Name"
              onChange={onChange}
              helperText="Please enter your First Name"
              id="name"
            />
            <InputComp
              value={state?.lname}
              name="lname"
              top_title="Last Name"
              onChange={onChange}
              id="name"
            />
            <InputComp
              value={state?.email}
              error={error?.email}
              name="email"
              top_title="Email"
              onChange={onChange}
              helperText="Please enter your Valid email"
              id="email"
            />
          </CardContent>
          <CardActions>
            <Button variant={"contained"} color={"primary"} onClick={onSubmit}>
              {userId ? "Update" : "Create"}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateAccount;
