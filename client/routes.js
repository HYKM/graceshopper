import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import AllBooks from './components/AllBooks'
import SingleBook from './components/SingleBook'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Confirmation from './components/Confirmation'
import Admin from './components/Admin'
import AllUsers from './components/AllUsers'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props
    const {isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* <Route path='/guest/cart' component={} */}
        <Route exact path="/books" component={AllBooks} />
        <Route path="/books/:bookId" component={SingleBook} />

        {isLoggedIn &&
          isAdmin && (
            <Switch>
              {/* Only for admin */}
              <Route path="/:userId/cart" component={Cart} />
              <Route exact path="/admin/users" component={AllUsers} />
              <Route exact path="/home" component={Admin} />
              <Route path="/checkout" component={Checkout} />
              <Route path="/confirmation" component={Confirmation} />
            </Switch>
          )}

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path="/:userId/cart" component={Cart} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/confirmation" component={Confirmation} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
