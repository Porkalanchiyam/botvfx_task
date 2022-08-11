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
import { InputComp, CustomCard, CustomDialog, Loader } from "../components";
import { AlertProps } from "../utils";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPost, fetchUser, userApiHandler } from "../Apis";
import router from "../config/router";
import { useAlert } from "../providers/AlertProvider";

const Post = (props) => {
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
  } = useQuery(["post"], fetchPost, {
    refetchOnWindowFocus: true,
    cacheTime: Infinity,
    staleTime: Infinity,
  });

  // <--------------------- Hooks ------------>
  const { setAlertInfo } = useAlert();
  const navigate = useNavigate();
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [postName, setPostName] = React.useState("");
  const [error, setError] = React.useState({
    postName: false,
    user: false,
  });
  const [editId, setEditId] = React.useState(null);
  const [user, setUser] = React.useState("");

  // <--------------------- Handlers ------------>

  const onChange = (e) => {
    setPostName(e.target.value);
    setError(false);
  };

  const PostCreation = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    if (postName.length > 0 && user) {
      let filter = {};
      let method = "POST";
      let route = router.Api.Post.Add;
      if (editId) {
        filter.id = editId;
        method = "PUT";
        route = router.Api.Post.Update;
      }

      let post = {
        content: postName,
        createdBy: user,
        ...filter,
      };
      let apiCall = await userApiHandler(route, method, post, postrefetch);
      if (!apiCall.success) {
        setAlertInfo({
          severity: "error",
          msg: apiCall.errMsg,
        });
      } else {
        handleClose();
        setAlertInfo({
          severity: "success",
          msg: `Post ${editId ? "Upated" : "Created"} Successfully`,
        });
        setEditId(null);
        setPostName("");
        setUser("");
        setOpen(false);
      }
    } else {
      setError({
        postName: !postName ? true : false,
        user: !user ? true : false,
      });
    }
  };

  const onEditPost = (post) => {
    setPostName(post.content);
    setEditId(post.id);
    setUser(post.owner?.id);
    setOpen(true);
  };
  const onDeletePost = async (post) => {
    await userApiHandler(
      router.Api.Post.Delete,
      "DELETE",
      {
        id: post.id,
      },
      postrefetch
    );
    setAlertInfo({
      severity: "success",
      msg: "Post deleted Successfully!",
    });
  };

  const onViewPost = (post) => {
    navigate(`/viewPost/${post.id}`);
  };

  //<-------------Life cycles ---------->

  useEffect(() => {
    if (!postLoading) {
      if (postData.success) {
        setPosts(postData.data);
      } else {
        setAlertInfo({
          severity: "error",
          msg: postData.errMsg,
        });
      }
    }
  }, [postData]);
  // <--------------------- rendere ------------>

  if (postLoading) return <Loader loadingText="Fetching Posts.." />;
  return (
    <div>
      <Grid sx={{ padding: 8 }} container direction={"row"} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">Posts</Typography>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "flex-end " }} item xs={6}>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={PostCreation}
          >
            Create Post
          </Button>
        </Grid>
        {posts.map((post, i) => (
          <Grid key={post.id} item xs={4}>
            <CustomCard
              title={post.content}
              date={post?.createdAt}
              createBy={post?.owner?.firstName}
              onEdit={() => onEditPost(post, i)}
              onView={() => onViewPost(post)}
              onDelete={() => onDeletePost(post)}
            />
          </Grid>
        ))}

        <CustomDialog open={open} onClose={handleClose}>
          <div style={{ width: "500px" }}>
            <DialogTitle>
              {editId ? "Update Post" : "Create New Post"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText gutterBottom>Post Content</DialogContentText>
              <InputComp
                value={postName}
                onChange={onChange}
                name={"postName"}
                helperText={"Enter Post Name"}
                error={error?.postName}
                minRows={2}
                multiline
              />
              <Typography sx={{ mt: "5px" }}>
                Select Owner of the Content
              </Typography>
              <FormControl sx={{ m: 1, width: "100%" }}>
                <Select
                  value={user}
                  onChange={(event) => {
                    setUser(event.target.value);
                  }}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {userData?.data?.map((user) => {
                    return (
                      <MenuItem value={user.id}>{user?.firstName}</MenuItem>
                    );
                  })}
                </Select>
                {error?.user && (
                  <FormHelperText>
                    Please select owner of the post
                  </FormHelperText>
                )}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {editId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </div>
        </CustomDialog>
      </Grid>
    </div>
  );
};

export default Post;
