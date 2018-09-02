import React from "react";

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

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
        paddingBottom: 4,
        textDecoration: "none",
        color: "red !important"
    },
    divider: {
        width: 100,
        marginBottom: 12
    },
    link: {
        textDecoration: "none",
        color: "#777"
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
                            <Link
                                to={`/users/${post.owner.id}`}
                                className={classes.link}
                            >
                                {post.owner.username}
                            </Link>
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
                        <Link to={`/posts/${post.id}`} className={classes.link}>
                            {post.title}
                        </Link>
                    </Typography>
                    <Typography component="p">{post.text}</Typography>
                </Paper>
            ));
        return <div className={classes.root}>{postsList}</div>;
    }
}

export default withStyles(styles)(PostsList);
