import React from 'react'
import PropTypes from 'prop-types'

import WithStyles from '../../../utils/WithStyles'

import styles from './styles.scss'

const names = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

@WithStyles(styles)
class WeekDays extends React.Component {
  static propTypes = {
    styles: PropTypes.func
  }

  render() {
    const {styles} = this.props

    return (<header className={styles('container')}>
      {names.map((name, key) => (<div className={styles('dayName')} key={key}>
        {name}
      </div>))}
    </header>)
  }
}

export default WeekDays
