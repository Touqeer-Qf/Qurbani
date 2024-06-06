import { Close } from '@mui/icons-material';
import { Box, Dialog, DialogTitle, IconButton, Grid, Typography, DialogContent, DialogActions, Button } from '@mui/material';
import colors from '../style/colors';


function ConfirmationDialog({ open, onClose, action, title, btn }) {

  return (
    <Dialog
      data-testId="dialog-box"
      maxWidth="xs"
      open={open}
      sx={{ '& .MuiDialog-paper': { width: '80%', height: "auto", borderRadius: 2, py: { xs: 2, md: 4 }, px: { xs: 3, md: 6 } } }}
    >
      <IconButton data-testId="close-dialog" color="primary" onClick={() => onClose()} sx={{ position: 'absolute', right: 13, top: 13 }}>
        <Close />
      </IconButton>
      <DialogContent sx={{ pt: 1 }}>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography variant='h5' fontWeight="bold">{title}?</Typography>

        </Box>
        <Box display="flex" justifyContent="center">
          You won't be able to revert this!
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Button
          onClick={() => { action(); onClose() }}
          variant='contained'
          sx={{
            textTransform: 'capitalize',
            minWidth: '100px',
            boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
            fontSize: 12, fontWeight: 'bold',
            backgroundColor: btn ? colors.accepted : colors.danger, color: colors.opalBg,
            "&:hover": {
              backgroundColor: btn ? colors.accepted : colors.danger,
            }
          }}>
          {btn ? btn : "Delete"}
        </Button>

      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog