import {createReducer} from '../utils'
import {REMINDER_CREATE, REMINDER_DELETE, REMINDER_UPDATE} from '../actions'
import uuid from 'uuid/v4'

const reminder = (date) => ({
  id: uuid(),
  text: uuid().slice(0, 10),
  color: 'color-1',
  start: '12:00',
  end: '13:00',
  date
})

const initialState = [
  reminder('1/9/2018'),
  reminder('1/9/2018'),
  reminder('1/9/2018'),
  reminder('1/9/2018'),
  reminder('10/9/2018'),
  reminder('10/9/2018'),
  reminder('12/9/2018'),
  reminder('15/9/2018'),
  reminder('19/9/2018'),
  reminder('20/9/2018'),
  reminder('21/9/2018'),
  reminder('21/9/2018'),
  reminder('21/9/2018'),
  reminder('21/9/2018'),
  reminder('21/9/2018'),
  reminder('22/9/2018'),
  reminder('30/9/2018')
]

export default createReducer(initialState, {
  [REMINDER_DELETE]: (state, {payload}) => state
    .filter((item) => (item.id !== payload.id)),
  [REMINDER_CREATE]: (state, {payload}) => state.concat({
    id: uuid(),
    text: payload.text,
    color: payload.color,
    start: payload.start,
    end: payload.end,
    date: payload.date
  }),
  [REMINDER_UPDATE]: (state, {payload}) => state.map(
    (item) => {
      if (item.id === payload.id) {
        return {
          ...item,
          text: payload.text,
          color: payload.color,
          date: payload.date,
          start: payload.start,
          end: payload.end
        }
      }

      return item
    }
  )
})
