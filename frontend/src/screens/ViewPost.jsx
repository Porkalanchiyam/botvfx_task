import React, { useEffect } from "react";
import {
  Button,
  Typography,
  Grid,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import {
  InputComp,
  CustomCard,
  CustomDialog,
  Loader,
  SinglePost,
} from "../components";
import { AlertProps } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchUser, userApiHandler } from "../Apis";
import router from "../config/router";
import { useAlert } from "../providers/AlertProvider";

const ViewPost = (props) => {
  //<----------------Router hooks---->
  const params = useParams();
  //<------------React Query --------->
  //for users
  const {
    isLoading,
    data: userData,
    refetch,
  } = useQuery(["users"], fetchUser, {
    refetchOnWindowFocus: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  //for post
  const {
    isLoading: postLoading,
    data: postData,
    refetch: postrefetch,
  } = useQuery([`post:${params.id}`], () => fetchPost(params.id), {
    refetchOnWindowFocus: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // <--------------------- Hooks ------------>
  const { setAlertInfo } = useAlert();
  const navigate = useNavigate();

  //<-------------Life cycles ---------->

  // <--------------------- rendere ------------>

  if (postLoading) return <Loader loadingText="Fetching Posts.." />;
  return (
    <div>
      <SinglePost postData={postData?.data} postrefetch={postrefetch} />
    </div>
  );
};

export default ViewPost;
