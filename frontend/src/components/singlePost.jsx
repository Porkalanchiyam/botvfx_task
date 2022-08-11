import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MessageIcon from "@mui/icons-material/Message";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getDefaultProfileImg } from "../utils";
import InputComp from "./input";
import { fetchUser, userApiHandler } from "../Apis";
import router from "../config/router";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAlert } from "../providers/AlertProvider";
import {
  Badge,
  Button,
  Divider,
  FormControl,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function SinglePost(props) {
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
  const { postData, postrefetch } = props;
  const { content, owner, comments, id } = postData || {};
  const { setAlertInfo } = useAlert();
  const [expanded, setExpanded] = React.useState(false);
  const [comment, setComment] = React.useState("");
  const [commentid, setCommentId] = React.useState("");
  const [user, setUser] = React.useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onEnter = async () => {
    let filter = {};
    let url = router.Api.Comment.Add;
    let method = "POST";
    if (commentid) {
      filter.id = commentid;
      url = router.Api.Comment.Update;
      method = "PUT";
    }
    let payload = {
      content: comment,
      createdBy: user || owner?.id,
      postId: id,
      ...filter,
    };

    let apiCall = await userApiHandler(url, method, payload, postrefetch);
    if (!apiCall.success) {
      setAlertInfo({
        severity: "error",
        msg: apiCall.errMsg,
      });
    } else {
      setAlertInfo({
        severity: "success",
        msg: `Comment Added Successfully`,
      });
      setComment("");
      setUser("");
    }
  };

  const handleClick = (val, id, ownerId) => {
    setComment(val);
    setCommentId(id);
    setUser(ownerId);
  };
  if (!content)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>No Post to Show.</h1>
      </div>
    );
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500] }}
            src={getDefaultProfileImg(owner?.firstName)}
          />
        }
        title={owner?.firstName}
        subheader={owner?.createdAt}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Comments">
          <Badge badgeContent={comments?.length} color="secondary">
            <MessageIcon />
          </Badge>
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <InputComp
            value={comment}
            name="comment"
            onChange={onChange}
            id="comment"
            multiline
            minRows={4}
          />
          <Typography sx={{ mt: "5px" }}>
            Select Owner of the Comment
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
                return <MenuItem value={user.id}>{user?.firstName}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <div
            style={{
              margin: "5px",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button variant={"outlined"} color={"primary"} onClick={onEnter}>
              save
            </Button>
          </div>

          <Typography sx={{ marginTop: "10px" }} paragraph>
            Comments:
          </Typography>
          {comments?.length > 0 ? (
            <>
              {comments?.map((val) => (
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemText
                      primary={val?.content}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            Commented By
                          </Typography>
                          {` — ${val?.owner?.firstName}`}
                        </React.Fragment>
                      }
                    />
                    <ListItemButton
                      onClick={() =>
                        handleClick(val?.content, val?.id, val?.owner?.id)
                      }
                    >
                      <EditOutlinedIcon />
                    </ListItemButton>
                  </ListItem>

                  <Divider variant="inset" component="li" />
                </List>
              ))}
            </>
          ) : (
            <span
              sx={{
                display: "flex",
                justifyContent: "center",
                fontSize: "12px",
              }}
            >
              No comments
            </span>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default SinglePost;
