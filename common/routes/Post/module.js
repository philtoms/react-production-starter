import memoize from '../../utils/memoize'

// Single Post
export const LOAD_POST_REQUEST = 'Post/LOAD_POST_REQUEST'
export const LOAD_POST_SUCCESS = 'Post/LOAD_POST_SUCCESS'
export const LOAD_POST_FAILURE = 'Post/LOAD_POST_FAILURE'

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  title: '',
  content: ''
}

export default function currentPost (state = initialState, action) {
  switch (action.type) {
    case LOAD_POST_REQUEST:
      return { ...state,
        isLoading: true,
        error: null}
    case LOAD_POST_SUCCESS:
      return { ...state,
        title: action.payload.title,
        content: action.payload.content,
        lastFetched: action.meta.lastFetched,
        isLoading: false}
    case LOAD_POST_FAILURE:
      return { ...state,
        error: action.payload }
    default:
      return state
  }
}

// Example of a co-located selector
export const selectCurrentPost = state => state.currentPost

const action = memoize((slug, dispatch, getState, {axios}) => {
  const { protocol, host } = getState().sourceRequest
  dispatch({ type: LOAD_POST_REQUEST })
  return axios.get(`${protocol}://${host}/api/v0/posts/${slug}`)
    .then(res => {
      dispatch({
        type: LOAD_POST_SUCCESS,
        payload: res.data,
        meta: {
          lastFetched: Date.now()
        }
      })
    })
    .catch(error => {
      console.error(`Error in reducer that handles ${LOAD_POST_SUCCESS}: `, error)
      dispatch({
        type: LOAD_POST_FAILURE,
        payload: error,
        error: true
      })
    })
})

export function loadPost (slug) {
  return (...args) => action(slug, ...args)
}
