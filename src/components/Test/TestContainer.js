import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as testActions from '../../reducers/test'

import Test from './Test'

const { number, func } = PropTypes
const propTypes = {
  clicks: number.isRequired,
  testClick: func.isRequired,
}

const TestContainer = ({ clicks, testClick }) => (
  <Test clicks={clicks} onClick={testClick} />
)

TestContainer.propTypes = propTypes

const mapState = state => state.test
const bindActions = dispatch => bindActionCreators(testActions, dispatch)
export default connect(mapState, bindActions)(TestContainer)
