import {
    FETCH_ALL,
    CREATE,
    UPDATE,
    DELETE,
    LIKE,
} from '../../constants/actionTypes';

const reducers = (posts = [], action) => {
    //posts is the state.
    switch (action.type) {
        case FETCH_ALL:
            return action.payload; //we are first only taking the data in App and then also just forwarding the payload as it is.
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
        case LIKE:
            return posts.map((post) =>
                post._id === action.payload._id ? action.payload : post,
            ); //Payload is the new post
        case DELETE:
            return posts.filter((post) => post._id !== action.payload); //payload is the id itself
        default:
            return posts;
    }
};

export default reducers;
