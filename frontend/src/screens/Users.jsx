import React, { useEffect } from "react";
import { Button, Typography, Grid } from "@mui/material";
import { CustomCard, CustomDialog, CreateAccount, Loader } from "../components";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../utils";
import router from "../config/router";
import { useAlert } from "../providers/AlertProvider";
import { fetchUser, userApiHandler } from "../Apis";

const Home = (props) => {
  //<--------------React QUery ------->
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery(["users"], fetchUser, {
    refetchOnWindowFocus: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // <--------------------- Hooks ------------>

  const { setAlertInfo } = useAlert();
  const history = useNavigate();
  const [users, setUsers] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editUser, setEditUser] = React.useState({});
  const [userId, setUserId] = React.useState("");

  // <--------------------- Handlers ------------>

  const PostCreation = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onEditPost = (post) => {
    let user = users.find((val) => val.id === post.id);
    setEditUser(user);
    setUserId(post.id);
    setOpen(true);
  };
  const onDelete = async (post) => {
    await userApiHandler(
      router.Api.User.Delete,
      "DELETE",
      {
        id: post.id,
      },
      refetch
    );
    setAlertInfo({
      severity: "success",
      msg: "User deleted Successfully!",
    });
  };

  //<-------------Life cycles ---------->
  useEffect(() => {
    if (!isLoading) {
      if (userData.success) {
        setUsers(userData.data);
      } else {
        setAlertInfo({
          severity: "error",
          msg: userData.errMsg,
        });
      }
    }
  }, [userData]);

  // <--------------------- rendere ------------>
  if (isLoading) return <Loader loadingText="Fetching Users.." />;
  return (
    <div>
      <Grid sx={{ padding: 8 }} container direction={"row"} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">Users Lists</Typography>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "flex-end " }} item xs={6}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={PostCreation}
          >
            Create User
          </Button>
        </Grid>
        {users.map((user, i) => (
          <Grid key={user.id} item xs={3}>
            <CustomCard
              isUser={true}
              fname={user.firstName}
              lname={user.lastName}
              emailId={user.emailId}
              onEdit={() => onEditPost(user, i)}
              onDelete={() => onDelete(user, i)}
            />
          </Grid>
        ))}

        <CustomDialog open={open} onClose={handleClose}>
          <CreateAccount
            userApiHandler={userApiHandler}
            refetch={refetch}
            user={editUser}
            userId={userId}
            Url={userId ? router.Api.User.Update : router.Api.User.Add}
            Method={userId ? "PUT" : "POST"}
            handleClose={handleClose}
          />
        </CustomDialog>
      </Grid>
    </div>
  );
};

export default Home;
