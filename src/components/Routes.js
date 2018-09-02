import React from 'react'
import Loadable from 'react-loadable'

import Spinner from './presentational/Spinner'

const CalendarPage = Loadable({
  loader: () => import(/* webpackChunkName: 'Dashboard' */ './pages/Calendar'),
  loading: Spinner,
  delay: 300
});

const Routes = () => (
  <div className='app'>
    <CalendarPage />
  </div>
);

export default Routes
