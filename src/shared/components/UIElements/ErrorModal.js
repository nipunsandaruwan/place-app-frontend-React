import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorModal = (props) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    // <Modal
    //   onCancel={props.onClear}
    //   header="An Error Occurred!"
    //   show={!!props.error}
    //   footer={<button onClick={props.onClear}>Okay</button>}
    // >
    //   <p>{props.error}</p>
    // </Modal>

    // <Button variant="outlined" onClick={handleClickOpen}>
    //     Slide in alert dialog
    //   </Button>

    <Dialog
      open={props.error ? true : false}
      TransitionComponent={Transition}
      keepMounted
      // onClose={props.setError(null)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"An Error Occurred...!"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.error}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClear}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal;
