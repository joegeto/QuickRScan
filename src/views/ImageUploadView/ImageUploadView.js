import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import compose from "recompose/compose";
import Paper from "@material-ui/core/Paper";
import Header from "views/Navigation/Header.js";
import ImageDropZone from "./ImageDropZone";
import { hist } from "../../index";

const useStyles = (theme) => ({
  contentOverlay: {
    height: 1000,
    display: "flex",
    justifyContent: "center",
  },
  content: {
    display: "flex",
    marginTop: 200,
    justifyContent: "center",
  },
});

class UploadImageView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // hist.push("/result");
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.userInfo.isLoggedIn ? (
          <div>
            <Header
              isUserAuthenticated={this.props.userInfo.isLoggedIn}
              userInfo={this.props.userInfo}
            />

            <div className={classes.paper}>
              <Paper className={classes.contentOverlay}>
                <div className={classes.content}>
                  {/* <div>
                    {JSON.stringify(this.props.userInfo.isLoggedIn)}
                    {this.props.userInfo.userName}
                    {this.props.userInfo.token}
                    Hiiiii
                  </div>
                  <br /> */}
                  {/* <UploadImage /> */}
                  <ImageDropZone userInfo={this.props.userInfo} />
                </div>
              </Paper>
            </div>
          </div>
        ) : (
          <div>You must log in!!</div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {};
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userStore,
  };
};

export default compose(
  withStyles(useStyles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(UploadImageView);
