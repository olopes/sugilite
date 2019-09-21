import React from "react"
import PropTypes from 'prop-types'
import GemstoneForm from './GemstoneForm'
import GemstoneList from './GemstoneList'

class GemstoneApp extends React.Component {
  render () {
    return (
      <div>
        <GemstoneForm></GemstoneForm>
        <GemstoneList></GemstoneList>
      </div>
    );
  }
}

export default GemstoneApp
