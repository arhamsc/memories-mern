import {
    FETCH_ALL,
    FETCH_BY_SEARCH,
    FETCH_POST,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    END_LOADING,
    START_LOADING,
    COMMENT,
} from '../../constants/actionTypes';
import * as api from '../../api';

//Action Creators
export const getPosts = (page) => async (dispatch) => {
    //this is a thunk
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPosts(page); //this contains the data of posts and total pages and current page
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING });
    }
};

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.fetchPost(id);
        //console.log(data)
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error.message);
        dispatch({ type: END_LOADING });
    }
};

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {
            data: { data },
        } = await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.createPost(post);
        dispatch({
            type: CREATE,
            payload: data,
        });
        navigate(`/posts/${data._id}`);
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
        dispatch({ type: END_LOADING });
    }
};

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);

        dispatch({
            type: UPDATE,
            payload: data,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);

        dispatch({
            type: LIKE,
            payload: data,
        });
    } catch (error) {
        console.log(error);
    }
};

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        dispatch({ type: COMMENT, payload: data });
        return data.comment;
    } catch (error) {
        console.log(error);
    }
};
