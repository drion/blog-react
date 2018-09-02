import React from "react";

import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import { getAllPosts } from "../_reducers/";

const styles = {
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    paper: {
        padding: "4px 12px",
        maxWidth: 600,
        width: "100%",
        marginBottom: 12
    },
    paperHeader: {
        display: "flex",
        justifyContent: "space-between",
        paddingBottom: 4
    },
    divider: {
        width: 100,
        marginBottom: 12
    }
};

class PostsList extends React.Component {
    state = {};

    render() {
        const { posts, classes } = this.props;
        let postsList = <p>No posts to display</p>;
        if (posts.length > 0)
            postsList = posts.map(post => (
                <Paper className={classes.paper} elevation={1}>
                    <div className={classes.paperHeader}>
                        <Typography component="p">
                            {post.owner.username}
                        </Typography>
                        <Typography component="p">
                            {new Date(post.created_at)
                                .toISOString()
                                .replace("-", "/")
                                .split("T")[0]
                                .replace("-", "/")}
                        </Typography>
                    </div>
                    <Divider className={classes.divider} />
                    <Typography variant="headline" component="h3">
                        {post.title}
                    </Typography>
                    <Typography component="p">{post.text}</Typography>
                </Paper>
            ));
        return <div className={classes.root}>{postsList}</div>;
    }
}

const mapStateToProps = state => ({
    posts: getAllPosts(state)
});

export default withStyles(styles)(connect(mapStateToProps)(PostsList));
