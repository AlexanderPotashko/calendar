import React from 'react'
import PropTypes from 'prop-types'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import withMobileDialog from '@material-ui/core/withMobileDialog'

const ResponsiveDialog = ({fullScreen, isOpen, onClose, children}) => (
  <Dialog
    fullScreen={fullScreen}
    open={isOpen}
    onClose={onClose}
  >
    <DialogContent>
      {children}
    </DialogContent>
  </Dialog>
)

ResponsiveDialog.propTypes = {
  onClose: PropTypes.func,
  fullScreen: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool,
  children: PropTypes.object
};

export default withMobileDialog()(ResponsiveDialog)
