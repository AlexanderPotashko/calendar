import React from 'react'
import PropTypes from 'prop-types'

import {FaCaretDown} from 'react-icons/fa'

import WithStyles from '../../../../utils/WithStyles'

import styles from './styles.scss'

const noop = () => {}

const MoreButton = ({onClick, className}) => (
  <div
    onClick={onClick}
    onKeyDown={noop}
    className={className}
    role='textbox'
    tabIndex='0'
  >
    <FaCaretDown />
  </div>
)

MoreButton.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  count: PropTypes.number
}

const Reminder = ({onClick, className, text}) => (
  <div
    onClick={onClick}
    onKeyDown={noop}
    className={className}
    role='textbox'
    tabIndex='0'
  >
    {text}
  </div>
)

Reminder.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  text: PropTypes.string
}

@WithStyles(styles)
class Day extends React.Component {
  static propTypes = {
    styles: PropTypes.func.isRequired,
    date: PropTypes.string,
    dayNum: PropTypes.number,
    reminders: PropTypes.array,
    onDayClick: PropTypes.func,
    onReminderClick: PropTypes.func
  }

  render() {
    const {date, dayNum, styles, onDayClick, onReminderClick} = this.props
    const hasData = !!dayNum

    return (
      <div
        onClick={(e) => onDayClick(e, {date})}
        onKeyDown={noop}
        className={styles('day', {'withData': hasData})}
        role='textbox'
        tabIndex='0'
      >
        <span className={styles('number')}>{dayNum}</span>
        {hasData && (
          <div className={styles('content')}>
            {this.props.reminders.map(
              ({id, color, text}, key) => (key < 3) 
                ? (<Reminder 
                  key={key}
                  onClick={(e) => onReminderClick(e, {date, id})}
                  className={styles('reminder', color)}
                  text={text}
                />)
                : null
            )}
            {(this.props.reminders.length > 3)
              ? (<MoreButton
                onClick={(e) => onDayClick(e, {date})}
                className={styles('more')}
              />)
              : null
            }
          </div>
        )}
      </div>
    )
  }
}

export default Day
