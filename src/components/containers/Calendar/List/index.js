import React from 'react'
import PropTypes from 'prop-types'
import {IconContext} from 'react-icons'
import {FaPlus, FaPencilAlt, FaTrash} from 'react-icons/fa'

import WithStyles from '../../../../utils/WithStyles'

import styles from './styles.scss'

@WithStyles(styles)
class List extends React.Component {
  static propTypes = {
    date: PropTypes.string,
    styles: PropTypes.func,
    reminders: PropTypes.array,
    onAdd: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func
  }

  render() {
    const {date, styles, reminders} = this.props

    return (
      <section className={styles('container')}>
        <div className={styles('title')}>
          <div>{date}</div>
          <div><FaPlus onClick={() => this.props.onAdd(date)} /></div>
        </div>
        {!!reminders && reminders.map(
          (item, key) => (
            <div className={styles('item')} key={key}>
              <div className={styles('text')}>{item.text}</div>
              <div className={styles('buttons')}>
                <FaPencilAlt onClick={() => this.props.onEdit(date, item.id)} />
                <IconContext.Provider value={{className: styles('trash')}}>
                <FaTrash onClick={() => this.props.onDelete(item.id)} />
                </IconContext.Provider>
              </div>
            </div>
          )
        )}
      </section>
    )
  }
}

export default List 
