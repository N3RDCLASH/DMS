import { Dialog, DialogContent, IconButton, makeStyles, Slide, Typography } from '@material-ui/core'
import React from 'react'
import componentStyles from "assets/theme/components/dialog.js";
import { Clear } from '@material-ui/icons';

const useStyles = makeStyles(componentStyles);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
function ModalForm({ handleClose, children, open, submit, headerText }) {
    const classes = useStyles()
    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <div className={classes.dialogHeader}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.dialogTitle}
                    >
                        {headerText ?? "Form"}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <Clear />
                    </IconButton>
                </div>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </div>
    )
}

export default ModalForm
