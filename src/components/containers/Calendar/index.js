import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import WithStyles from '../../../utils/WithStyles'

import WeekDays from '../../presentational/WeekDays'
import Weeks from './Weeks'

import styles from './styles.scss'

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

@connect((state) => ({month: state.calendar.month}))
@WithStyles(styles)
class Calendar extends React.Component {
  static propTypes = {
    styles: PropTypes.func,
    month: PropTypes.number
  }

  render() {
    const {styles, month} = this.props

    return (<section className={styles('container')}>
      <h1 className={styles('title')}>{monthNames[month]}</h1>
      <WeekDays />
      <Weeks />
    </section>)
  }
}

export default Calendar
