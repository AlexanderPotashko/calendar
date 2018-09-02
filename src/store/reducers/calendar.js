import {createReducer} from '../utils'
import {INIT_MONTH_OBJECT} from '../actions'

const initialState = {
  year: -1,
  month: -1,
  list: []
}

export default createReducer(initialState, {
  [INIT_MONTH_OBJECT]: (state, {payload}) => ({
    ...state,
    year: payload.year,
    month: payload.month,
    list: state.list.concat(payload)
  })
})
