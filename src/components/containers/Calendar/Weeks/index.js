import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import WithStyles from '../../../../utils/WithStyles'
import {reminderCreate, reminderUpdate, reminderDelete} from '../../../../store/actions'
import {getCurrentMonth, getReminders} from '../../../../store/selectors'

import Dialog from '../../../presentational/Dialog'

import Day from '../Day'
import ReminderForm from '../Form'
import ReminderList from '../List'

import styles from './styles.scss'

@connect(
  (state) => ({
    reminders: state.reminders,
    weeks: getCurrentMonth(state.calendar),
    month: state.calendar.month,
    year: state.calendar.year
  }),
  (dispatch) => ({
    reminderCreate: bindActionCreators(reminderCreate, dispatch),
    reminderUpdate: bindActionCreators(reminderUpdate, dispatch),
    reminderDelete: bindActionCreators(reminderDelete, dispatch)
  })
)
@WithStyles(styles)
class Weeks extends React.Component {
  static propTypes = {
    reminderCreate: PropTypes.func,
    reminderUpdate: PropTypes.func,
    reminderDelete: PropTypes.func,
    styles: PropTypes.func,
    reminders: PropTypes.array,
    weeks: PropTypes.array,
    year: PropTypes.number,
    month: PropTypes.number
  }

  constructor (props) {
    super(props)

    this.state = {
      isDialogOpen: false 
    }
  }

  getDate (day) {
    const {month, year} = this.props

    return `${day}/${month + 1}/${year}`
  }

  getReminder (id) {
    const {reminders} = this.props

    return reminders.find((item) => (item.id === id))
  }

  onDayClick = (e, {date}) => {
    e.stopPropagation()

    const {reminders} = this.props

    this.setState({
      date,
      isDialogOpen: true,
      reminders: getReminders(date, reminders),
      formType: 'list'
    })
  }

  onReminderClick = (e, {date, id}) => {
    e.stopPropagation()

    this.setState({
      isDialogOpen: true,
      date,
      reminder: this.getReminder(id),
      formType: 'form'
    })
  }

  onDialogClose = (e) => {
    e.stopPropagation()

    this.setState({isDialogOpen: false})
  }

  onAdd = (date) => {
    this.setState({
      isDialogOpen: true,
      date,
      reminder: undefined,
      formType: 'form'
    })
  }

  onEdit = (date, id) => {
    this.setState({
      isDialogOpen: true,
      date,
      reminder: this.getReminder(id),
      formType: 'form'
    })
  }

  onDelete = (id) => {
    this.props.reminderDelete({id})
    this.setState({isDialogOpen: false})
  }

  onSubmit = ({id, date, text, color, start, end}) => {
    if (id) {
      this.props.reminderUpdate({id, date, text, color, start, end})
    } else {
      this.props.reminderCreate({date, text, color, start, end})
    }

    this.setState({isDialogOpen: false})
  }

  render() {
    const {styles, weeks, reminders} = this.props

    return (
      <section className={styles('container')}>
        <Dialog
          fullScreen={false}
          onClose={this.onDialogClose}
          isOpen={this.state.isDialogOpen}
        >
          {(this.state.formType === 'form')
            ? (<ReminderForm 
              date={this.state.date}
              reminder={this.state.reminder}
              onSubmit={this.onSubmit}
            />)
            : (<ReminderList
                date={this.state.date}
                reminders={this.state.reminders}
                onAdd={this.onAdd}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
            />)
          }
        </Dialog>
        {weeks.map((week, key) => (
          <div className={styles('week')} key={key}>
            {week.map((day, k) => (<Day
              key={`${key}-${k}`}
              date={this.getDate(day)}
              reminders={getReminders(this.getDate(day), reminders)}
              onDayClick={this.onDayClick}
              onReminderClick={this.onReminderClick}
              dayNum={day}
            />))}
          </div>
        ))} 
      </section>
    )
  }
}

export default Weeks 
