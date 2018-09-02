import {createAction} from '../utils'

export const INIT_MONTH_OBJECT = 'INIT_MONTH_OBJECT'
export const REMINDER_CREATE = 'REMINDER_CREATE'
export const REMINDER_DELETE = 'REMINDER_DELETE'
export const REMINDER_UPDATE = 'REMINDER_UPDATE'

export const initMonthObject = () => createAction(INIT_MONTH_OBJECT)
export const reminderCreate = ({color, date, start, end, text}) =>
  createAction(REMINDER_CREATE, {color, date, start, end, text})
export const reminderDelete = ({id}) => createAction(REMINDER_DELETE, {id})
export const reminderUpdate = ({id, color, date, start, end, text}) =>
  createAction(REMINDER_UPDATE, {id, color, date, start, end, text})
