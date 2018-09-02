import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'

import calendar from './calendar'
import reminders from './reminders'

const rootReducer = combineReducers({
  form: formReducer,
  calendar,
  reminders
})

export default rootReducer
