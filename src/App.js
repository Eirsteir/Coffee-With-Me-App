import React from 'react'
import { StatusBar } from 'react-native'

import { connect } from 'react-redux'
import { Auth } from './api/services/AuthService'
import UserService from './api/services/UserService';

import Tabs from './auth/Tabs'
import Nav from './screens/Nav'

class App extends React.Component {
  state = {
    user: {},
    isLoggedIn: false,
    isLoading: true
  }

  async componentDidMount() {
    StatusBar.setHidden(true)
    try {
      const user = await UserService.currentAuthenticatedUser()
      this.setState({ user, isLoading: false })
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }

  async componentWillReceiveProps(nextProps) {
    try {
      const user = await UserService.fetchUserData()
      this.setState({ user })
    } catch (err) {
      this.setState({ user: {} })
    }
  }
  
  render() {
    if (this.state.isLoading) return null
  
    let loggedIn = false
    if (this.state.user.username) {
      loggedIn = true
    }
    if (loggedIn) {
      return (
        <Nav />
      )
    }
    return (
      <Tabs />
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App)