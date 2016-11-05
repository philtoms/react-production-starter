// Posts
export const LOAD_POSTS_REQUEST = 'PostList/LOAD_POSTS_REQUEST'
export const LOAD_POSTS_SUCCESS = 'PostList/LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAILURE = 'PostList/LOAD_POSTS_FAILURE'

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null
}

export default function posts (state = initialState, action) {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case LOAD_POSTS_SUCCESS:
      return { ...state,
        data: action.payload,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case LOAD_POSTS_FAILURE:
      return { ...state,
        error: action.payload}
    default:
      return state
  }
}

// Example of a co-located selector
export const selectPosts = state => state.posts

export function loadPosts () {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest
    dispatch({ type: LOAD_POSTS_REQUEST })
    return axios.get(`${protocol}://${host}/api/v0/posts`)
      .then(res => {
        dispatch({
          type: LOAD_POSTS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now()
          }
        })
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${LOAD_POSTS_SUCCESS}: `, error)
        dispatch({
          type: LOAD_POSTS_FAILURE,
          payload: error,
          error: true
        })
      })
  }
}

