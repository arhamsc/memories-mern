import {
    FETCH_ALL,
    FETCH_POST,
    FETCH_BY_SEARCH,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
    START_LOADING,
    END_LOADING,
    COMMENT,
} from '../../constants/actionTypes';

const reducers = (
    state = { isLoading: true, posts: [], post: null },
    action,
) => {
    //state is the state.
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case END_LOADING:
            return {
                ...state,
                isLoading: false,
            };
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }; //we are first only taking the data in App and then also just forwarding the payload as it is.
        case FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload,
            };
        case FETCH_POST:
            return {
                ...state,
                post: action.payload.data,
            };
        case CREATE:
            return { ...state, posts: [...state, action.payload] };
        case UPDATE:
        case LIKE:
            return {
                ...state,
                posts: state.posts.map((post) =>
                    post._id === action.payload._id ? action.payload : post,
                ),
            }; //Payload is the new post
        case COMMENT:
            return {
                ...state,
                post: state.posts.map((post) => {
                    //if the post received a comment just now then return that
                    if (post._id === action.payload._id) {
                        return action.payload;
                    }
                    return post;
                }),
            };
        case DELETE:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload,
                ),
            }; //payload is the id itself
        default:
            return state;
    }
};

export default reducers;
