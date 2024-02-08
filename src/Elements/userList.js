import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Rating,
} from "@mui/material";
import ROUTE from "../Config/constant";

export default function UserList() {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {[...new Array(10)].map((_, index) => (
        <React.Fragment key={index}>
          <ListItem
            alignItems="flex-start"
            sx={{ cursor: "pointer" }}
            onClick={() =>
              window.open(ROUTE.DETAIL.replace(":id", index + 1), "_blank")
            }
          >
            <ListItemAvatar>
              <Avatar alt="Arun" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={"Arun Kataria " + (index + 1)}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Software Engineer
                  </Typography>
                  {" — I'll be able to complete the given task on time…"}
                </React.Fragment>
              }
            />
            <Rating name="read-only" value={index} readOnly sx={{ pt: 1 }} />
          </ListItem>
          <Divider variant="inset" component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
