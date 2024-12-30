import { Alert, AlertColor, AlertPropsColorOverrides, Snackbar, SnackbarCloseReason } from "@mui/material";
import React from "react";

import { OverridableStringUnion } from "@mui/types";

type Props = {
    severity: OverridableStringUnion<AlertColor, AlertPropsColorOverrides> | undefined;
    message: string;
}
{/** Severity : success, error, warning, info  */ }
const useToast = ({ severity, message }: Props) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant="filled"
                >
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default useToast;