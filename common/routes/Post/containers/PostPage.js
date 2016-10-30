import { provideHooks } from 'redial'
import { connect } from 'react-redux'
import { loadPost } from '../actions'
import { selectCurrentPost } from '../reducer'
import Layout from '../components/Layout'

const redial = {
  fetch: ({ dispatch, params: { slug } }) => dispatch(loadPost(slug))
}

const mapStateToProps = state => selectCurrentPost(state)

export default provideHooks(redial)(connect(mapStateToProps)(Layout))
