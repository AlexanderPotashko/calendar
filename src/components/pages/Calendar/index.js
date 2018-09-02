import React, {Component} from 'react'
import Helmet from 'react-helmet'

import Calendar from '../../containers/Calendar'
import * as metadata from '../../../metadata'

class CalendarPage extends Component {
  render() {
    return (
      <div>
        <Helmet
          title={`${metadata.title} - Calendar`}
          meta={metadata.meta}
          link={metadata.link}
          script={metadata.script}
          noscript={metadata.noscript}
        />
        <Calendar />
      </div>
    )
  }
}

export default CalendarPage 
