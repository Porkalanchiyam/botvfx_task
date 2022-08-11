/**
 * @author Porkalanchiyam
 * @email kalanchiyam1@gmail.com
 * @create 30/07/2022
 * @modify 30/07/2022
 * @desc Exporting all the components from /src/components
 */

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Grid } from "@mui/material";
import propTypes from "prop-types";
import { formatDate, getDefaultProfileImg } from "../utils";

const CustomCard = (props) => {
  const {
    title,
    date,
    onEdit,
    onView,
    createBy,
    onDelete,
    isUser,
    fname,
    lname,
    emailId,
  } = props;
  return (
    <Card
      // className={classes?.root}
      sx={{
        // maxWidth: 345,
        boxShadow:
          "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px",

        margin: "15px",
        "& .MuiAvatar-root": {
          borderRadius: "15%",
        },
        "&:hover": {
          "& .MuiIconButton-root": {
            visibility: "visible",
          },
        },
      }}
    >
      <CardContent>
        <Grid container>
          {isUser ? (
            <>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h6">
                  Name
                </Typography>
                <Typography
                  title={fname}
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="body1"
                >
                  {fname} &nbsp;{lname}
                </Typography>
              </Grid>{" "}
              <Grid item xs={12}>
                <Typography gutterBottom variant="h6">
                  Email
                </Typography>
                <Typography
                  title={emailId}
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="body1"
                >
                  {emailId}
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={8}>
                <Typography
                  title={title}
                  style={{
                    maxWidth: "100%",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  variant="body1"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography color="secondary" variant="body2" component="h2">
                  Created on <br />
                  <Typography sx={{ fontSize: "0.7rem" }}>
                    {" "}
                    {formatDate(date)}
                  </Typography>
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
      <CardHeader
        sx={{ padding: "10px" }}
        avatar={
          !isUser && (
            <Avatar aria-label="recipe" src={getDefaultProfileImg(createBy)} />
          )
        }
        action={
          <>
            <IconButton
              sx={{ visibility: "hidden" }}
              title="Edit"
              onClick={onDelete}
              aria-label="settings"
            >
              <DeleteIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
            <IconButton
              sx={{ visibility: "hidden" }}
              title="Edit"
              onClick={onEdit}
              aria-label="settings"
            >
              <EditIcon sx={{ width: "20px", height: "20px" }} />
            </IconButton>
            {!isUser && (
              <IconButton
                sx={{ visibility: "hidden" }}
                title="View"
                onClick={onView}
                aria-label="settings"
              >
                <VisibilityIcon sx={{ width: "20px", height: "20px" }} />
              </IconButton>
            )}
          </>
        }
        title={!isUser && "Created By"}
        subheader={!isUser && createBy}
      />
    </Card>
  );
};

CustomCard.propTypes = {
  onEdit: propTypes.func,
  onView: propTypes.func,
  title: propTypes.string,
  date: propTypes.number,
  createBy: propTypes.string,
  isUser: propTypes.bool,
  fname: propTypes.string,
  lname: propTypes.string,
  emailId: propTypes.string,
};

CustomCard.defaultProps = {
  onEdit: () => {},
  onView: () => {},
  title: "",
  date: 0,
  createBy: "",
  isUser: false,
  fname: "",
  lname: "",
  emailId: "",
};

export default CustomCard;
