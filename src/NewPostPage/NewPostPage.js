import React from "react";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

import postActions from "../_actions/post.actions";

import { getCurrentUser } from "../_reducers/";

import history from "../_helpers/history";

const styles = {
    root: {
        maxWidth: 700,
        margin: "0 auto"
    },
    textField: {},
    editorClassName: {
        border: "1px solid #ddd",
        padding: "0 8px",
        minHeight: 300
    },
    toolbarClassName: {
        border: "1px solid #ddd"
    },
    buttons: {
        textAlign: "right",
        margin: "8px 0"
    },
    button: {
        marginLeft: 8
    }
};

class NewPostPage extends React.Component {
    state = {
        data: {
            title: "",
            editorState: EditorState.createEmpty()
        },
        errors: {}
    };

    handleCreate = () => {
        const { data } = this.state;
        const { currentUser } = this.props;

        const postData = {
            title: data.title
        };
        const rawContentState = convertToRaw(
            data.editorState.getCurrentContent()
        );

        postData.text = draftToHtml(rawContentState);
        console.log(data);

        this.props
            .createPost(postData)
            .then(() => history.push(`/users/${currentUser.id}`));
    };

    handleCancel = () => history.push(`/users/${this.props.currentUser.id}`);

    handleChange = name => e => {
        e.persist();
        this.setState(prevState => ({
            data: {
                ...prevState.data,
                [name]: e.target.value
            }
        }));
    };

    onEditorStateChange = editorState =>
        this.setState(prevState => ({
            data: { ...prevState.data, editorState }
        }));

    render() {
        const { classes } = this.props;
        const { data, errors } = this.state;

        return (
            <div className={classes.root}>
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={data.title}
                    onChange={this.handleChange("title")}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <Editor
                    editorState={data.editorState}
                    toolbarClassName={classes.toolbarClassName}
                    wrapperClassName={classes.editorWrapper}
                    editorClassName={classes.editorClassName}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <div className={classes.buttons}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={this.handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleCreate}
                    >
                        Create
                    </Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    currentUser: getCurrentUser(state)
});

export default withStyles(styles)(
    connect(
        mapStateToProps,
        { createPost: postActions.createPost }
    )(NewPostPage)
);
