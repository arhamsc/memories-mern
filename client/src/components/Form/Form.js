import React, { useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { useState } from 'react';
import { createPost, updatePost } from '../../redux/actions/posts';
import { useNavigate } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const dispatch = useDispatch();
    const post = useSelector((state) =>
        currentId ? state.posts.posts.find((p) => p._id === currentId) : null,
    ); //returns 1 post
    const classes = useStyles();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(
                updatePost(currentId, {
                    ...postData,
                    name: user?.result?.name,
                }),
            );
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
        
        }
        clear();
    };

    if (!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign In to create your own memories and like other's
                    memories.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper className={classes.paper} elevation={6}>
            <form
                autoComplete="off"
                noValidate
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
            >
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Creating'} a Memory
                </Typography>
                <TextField
                    name="title"
                    variant="outlined"
                    label="Title"
                    fullWidth
                    value={postData.title}
                    onChange={
                        (e) =>
                            setPostData({ ...postData, title: e.target.value }) //copy and change only the specific property
                    }
                />
                <TextField
                    name="message"
                    variant="outlined"
                    label="Message"
                    fullWidth
                    value={postData.message}
                    onChange={
                        (e) =>
                            setPostData({
                                ...postData,
                                message: e.target.value,
                            }) //copy and change only the specific property
                    }
                />
                <TextField
                    name="tags"
                    variant="outlined"
                    label="Tags"
                    fullWidth
                    value={postData.tags}
                    onChange={
                        (e) =>
                            setPostData({
                                ...postData,
                                tags: e.target.value.split(','),
                            }) //copy and change only the specific property
                    }
                />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                        }
                    />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    fullWidth
                >
                    Submit
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={clear}
                    fullWidth
                >
                    Clear
                </Button>
            </form>
        </Paper>
    );
};

export default Form;
