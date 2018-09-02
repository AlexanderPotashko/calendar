import {all} from 'redux-saga/effects'

import calendar from './calendar'

export default function* rootSaga() {
  yield all([calendar()])
}
