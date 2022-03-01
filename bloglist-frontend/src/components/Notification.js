import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ notification }) => {
  if (notification) {
    return <div className='error'>{notification}</div>
  }
  return null
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
