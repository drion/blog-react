import React from "react";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

import postActions from "../_actions/post.actions";

import { getAllComments, retrievePost } from "../_reducers/";

const styles = {
    root: {
        width: 600,
        margin: "24px auto"
    },
    buttons: {
        textAlign: "right"
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

class PostPage extends React.Component {
    state = {
        comment: ""
    };

    componentDidMount() {
        this.props.getAllPosts();
        this.props.getPostComments(this.props.match.params.id);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleComment = () =>
        this.props
            .createComment({
                text: this.state.comment,
                post: this.props.match.params.id
            })
            .then(() => this.setState({ comment: "" }));

    render() {
        const { post, comments, classes } = this.props;
        return (
            <div className={classes.root}>
                {post && (
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
                            <Link
                                to={`/posts/${post.id}`}
                                className={classes.link}
                            >
                                {post.title}
                            </Link>
                        </Typography>
                        <Typography
                            component="p"
                            dangerouslySetInnerHTML={{ __html: post.text }}
                        />
                    </Paper>
                )}
                {comments && (
                    <div>
                        <h3>Comments:</h3>
                        {comments.length === 0 ? (
                            <p>No comments to display</p>
                        ) : (
                            comments.map(comment => (
                                <Paper className={classes.paper} elevation={1}>
                                    <div className={classes.paperHeader}>
                                        <Typography component="p">
                                            <Link
                                                to={`/users/${
                                                    comment.owner.id
                                                }`}
                                                className={classes.link}
                                            >
                                                {comment.owner.username}
                                            </Link>
                                        </Typography>
                                        <Typography component="p">
                                            {new Date(comment.created_at)
                                                .toISOString()
                                                .replace("-", "/")
                                                .split("T")[0]
                                                .replace("-", "/")}
                                        </Typography>
                                    </div>
                                    <Divider className={classes.divider} />
                                    <Typography component="p">
                                        {comment.text}
                                    </Typography>
                                </Paper>
                            ))
                        )}
                    </div>
                )}
                <TextField
                    id="comment"
                    label="Leave comment"
                    multiline
                    rows={5}
                    value={this.state.comment}
                    onChange={this.handleChange("comment")}
                    className={classes.textField}
                    margin="normal"
                    fullWidth
                />
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleComment}
                        disabled={!this.state.comment}
                    >
                        Leave comment
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => ({
    comments: getAllComments(state),
    post: retrievePost(state, props.match.params.id)
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        {
            getAllPosts: postActions.getAllPosts,
            getPostComments: postActions.getPostComments,
            createComment: postActions.createComment
        }
    )(PostPage)
);
