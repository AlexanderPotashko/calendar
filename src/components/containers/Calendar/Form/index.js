import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {reduxForm, Field} from 'redux-form'
import TimePicker from 'rc-time-picker'
import moment from 'moment'

import WithStyles from '../../../../utils/WithStyles'

import styles from './styles.scss'

const format = 'HH:mm'

const hasColor = (form, name) => (
  !!form && !!form.values && !!form.values.color && form.values.color === name
)

// validate
const required = value => value ? undefined : 'Required'
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength30 = maxLength(30)

const colorRadio = (name, className) => (
  <label className={className} htmlFor={name}>
    <Field
      id={name}
      name='color'
      component='input'
      type='radio'
      value={name}
    />
    <div />
  </label>
)

@connect((state) => ({
  form: state.form.reminderForm
}))
@WithStyles(styles)
class ReminderForm extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    reminder: PropTypes.object,
    styles: PropTypes.func,
    handleSubmit: PropTypes.func,
    change: PropTypes.func,
    form: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.state = {
      start: '12:00',
      end: '16:00'
    }
  }

  componentDidMount () {
    const {reminder, change} = this.props

    if (reminder) {
      change('date', reminder.date)
      change('id', reminder.id)
      change('text', reminder.text)
      change('color', reminder.color)
      change('start', reminder.start)
      change('end', reminder.end)
    } else {
      change('start', this.state.start)
      change('end', this.state.end)
      change('date', this.props.date)
    }
  }

  onChange = (name, value, props) => {
    const val = value.format(format)

    props.input.onChange(val)

    this.setState({[name]: val})
  }

  getTimepickerValue = (value) => {
    const [hour, minute] = (value !== '')
      ? value.split(' ')[0].split(':')
      : [0, 0]

    return moment().hour(hour).minute(minute)
  }

  timepicker (name, className) {
    return (props) => (<TimePicker
      name={name}
      showSecond={false}
      defaultValue={this.getTimepickerValue(props.defaultValue)}
      className={className}
      onChange={(value) => this.onChange(name, value, props)}
      format={format}
      inputReadOnly
    />)
  }

  renderRadioInput (name) {
    const {form, styles} = this.props

    return colorRadio(
      name,
      styles(
        'color',
        name,
        {'checked': hasColor(form, name)}
      )
    )
  }

  render () {
    const {handleSubmit, styles} = this.props

    return (
      <form onSubmit={handleSubmit} className={styles('form')}>
        <div className={styles('hidden')}>
          <Field name='date' component='input' />
          <Field name='id' component='input' />
        </div>
        <div className={styles('group')}>
          <label className={styles('label')} htmlFor='text'>Text</label>
          <div>
            <Field
              id='text'
              name='text'
              className={styles('text')}
              component='input'
              validate={[required, maxLength30]}
            />
          </div>
        </div>
        <div className={styles('group')}>
          <label className={styles('label')} htmlFor='color'>Color</label>
          <div className={styles('colors')}>
            {this.renderRadioInput('color-1')}
            {this.renderRadioInput('color-2')}
            {this.renderRadioInput('color-3')}
            {this.renderRadioInput('color-4')}
            {this.renderRadioInput('color-5')}
          </div>
        </div>
        <div className={styles('group')}>
          <div className={styles('label')}>Time Range</div>
          <div className={styles('timepickers')}>
            <Field
              name='start'
              component={this.timepicker('start', styles('timepicker'))}
              defaultValue={this.state.start}
              validate={required}
            />
            <Field
              name='end'
              component={this.timepicker('end', styles('timepicker'))}
              defaultValue={this.state.end}
              validate={required}
            />
          </div>
        </div>
        <div className={styles('group')}>
          <button type='submit' className={styles('button')} id='login'>
            Submit
          </button>
        </div>
      </form>
    )
  }
}

export default reduxForm({ form: 'reminderForm' })(ReminderForm)
