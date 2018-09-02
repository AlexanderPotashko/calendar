import {select, put/*, takeEvery*/} from 'redux-saga/effects'
import {INIT_MONTH_OBJECT} from '../../actions'

import createMonthObject from '../../../utils/createMonthObject' 

function* init(action) {
  const state = yield select()
  const {year, month} = action.payload
  const findCallback = (item) => (item.month === month && item.year === year)

  if (state.calendar.list.find(findCallback)) {
    return false
  }

  const monthObject = createMonthObject(year, month)

  yield put({type: INIT_MONTH_OBJECT, payload: {...action.payload, monthObject}})
}

function* calendar() {
  const date = new Date()

  yield init({
    payload: {
      year: date.getFullYear(),
      month: date.getMonth()
    }
  })
}

export default calendar
