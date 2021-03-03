import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";

export default function AlertDialog(props) {
  const [token, setToken] = useContext(AuthContext);
  const decodedToken = jwt_decode(token);
  const { id_usuario } = decodedToken;
  const [deleted, setDeleted] = useState("no");
  const { url, logOut } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteBand = async () => {
    await fetch(`${url}${id_usuario}`, {
      method: "DELETE",
      headers: {
        // "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    handleClose();
    logOut();
    window.location.reload();
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Borrar perfil
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que quieres borrar el perfil?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            NO
          </Button>
          <Button onClick={deleteBand} color="primary" autoFocus>
            SI
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
