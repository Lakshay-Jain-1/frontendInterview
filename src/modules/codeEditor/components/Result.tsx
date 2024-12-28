import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { resetResult } from "../../../store/slices/technicalRoundSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Result() {
  const success: boolean = useSelector(
    (state: RootState) => state.technical.successful
  );
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    dispatch(resetResult());
  };

  return (
    <>
        {success?<img  style={{zIndex:3,position:"absolute",top:0,width:"90vw",height:"90vh"}}src="successful.gif"></img>:""}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {success
              ? "Your code is perfect !! BRAVOOOOOOO"
              : "Your code has some issues !! Better Luck next time...."}
             
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
