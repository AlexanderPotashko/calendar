import chunk from 'lodash/chunk'
import fill from 'lodash/fill'

export default function createMonthObject (year, month) {
  const dn = new Date(year, month, 1).getDay()
  const ident = ((!!dn && dn || 7) - 1)
  const len = new Date(year, month + 1, 0).getDate() + ident

  return chunk(
    fill(Array(len), null)
      .map((v, i) => (((i + 1) <= ident) ? v : ((i + 1) - ident))),
    7
  ) 
}
