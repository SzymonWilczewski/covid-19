import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  getCountry,
  getComments,
  deleteComment,
  postComment,
  countrySelector,
} from "../state/ducks/country";
import { useLocation, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const Country = ({
  country,
  getCountry,
  getComments,
  deleteComment,
  postComment,
}) => {
  const { pathname } = useLocation();

  useEffect(
    () => getCountry(pathname.slice(-2)) && getComments(pathname.slice(-2)),
    [getCountry, getComments, pathname]
  );

  return (
    <div style={{ textAlign: "center" }}>
      <List>
        <h1>{country?.name}</h1>
        <ListItemText>Population: {country?.population}</ListItemText>
        <ListItemText>
          Updated at: {country?.updated_at?.slice(0, 10)}
        </ListItemText>
        <ListItemText>Today deaths: {country?.today?.deaths}</ListItemText>
        <ListItemText>Today cases: {country?.today?.confirmed}</ListItemText>
        <ListItemText>
          Total deaths: {country?.latest_data?.deaths}
        </ListItemText>
        <ListItemText>
          Total cases: {country?.latest_data?.confirmed}
        </ListItemText>
        <ListItemText>
          Total recovered: {country?.latest_data?.recovered}
        </ListItemText>
        <ListItemText>
          Total critical: {country?.latest_data?.critical}
        </ListItemText>
        <ListItemText>
          Cases per million people:{" "}
          {country?.latest_data?.calculated?.cases_per_million_population}
        </ListItemText>
      </List>
      <Link to={`/countries/${country?.code}/edit`}>
        <IconButton>
          <EditIcon />
        </IconButton>
      </Link>
      {country.comments && country.comments.length > 0 && (
        <List>
          <h3>Comments:</h3>
          {country.comments.map((comment) => (
            <ListItemText key={comment.id}>
              {comment.body}
              <IconButton
                onClick={() =>
                  window.confirm(
                    `Are you sure you want to delete ${comment.body}?`
                  ) && deleteComment(comment)
                }
              >
                <DeleteIcon />
              </IconButton>
            </ListItemText>
          ))}
        </List>
      )}
      <br />
      <InputLabel>Add comment:</InputLabel>
      <br />
      <TextField
        placeholder="Comment"
        name="comment"
        onKeyDown={(e) =>
          e.key === "Enter" &&
          postComment({
            id: uuidv4(),
            code: country.code,
            body: e.target.value,
          })
        }
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    country: countrySelector(state),
  };
};

const mapDispatchToProps = {
  getCountry,
  getComments,
  deleteComment,
  postComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Country);
