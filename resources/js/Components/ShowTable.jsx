import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import FormularioContactos from './FormularioContactos';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ShowUpdateContacts = (props) => {
  const [open, setOpen] = React.useState(false);
  const [showMsg, setShowMsg] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <ModeEditIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <FormularioContactos idForm={"formularioUpdate"} textname={props.nameContact} numbercontact={props.numberContact} evento={(e) => {
            updateContactos(props.formatData, props.idUpdate, handleClose, setShowMsg);
          }}></FormularioContactos>
          {
            showMsg ? <ShowAlert msg={'Numero ya existe'} /> : null
          }
        </Box>
      </Modal>
    </>
  );
}

function createData(name, phone, actions) {
  return { name, phone, actions };
}

const importContactos = (formatData) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  fetch('/contactos/read', {
    headers: {
      'X-CSRF-TOKEN': token,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  }).then(res => {
    return res.text();
  }).then(res => {
    try {
      const data = JSON.parse(res);
      formatData(data);
    }
    catch (error) {
      console.log(error);
    }
  });
}

const updateContactos = (formatData, id, handleClose, setShowMsg) => {
  const $form = document.getElementById('formularioUpdate');
  if ($form.reportValidity()) {
    const $data = $form.elements;
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const bodydata = JSON.stringify({
      id,
      name: $data["name"].value,
      phone: $data["phone"].value
    });
    fetch('/contactos/update', {
      headers: {
        'X-CSRF-TOKEN': token,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: bodydata
    }).then(res => {
      return res.text();
    }).then(res => {
      try {
        const data = JSON.parse(res);
        if (data.hasOwnProperty("msg")) {
          setShowMsg(true);
          setTimeout(() => {
            setShowMsg(false);
          }, 5000);
        } else {
          formatData(data);
          handleClose();
        }
      }
      catch (error) {
        console.log(error);
      }
    });
  }

}

const delectContactos = (formatData, id) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  const bodydata = JSON.stringify({
    id
  });
  fetch('/contactos/delete', {
    headers: {
      'X-CSRF-TOKEN': token,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: bodydata
  }).then(res => {
    return res.text();
  }).then(res => {
    try {
      const data = JSON.parse(res);
      formatData(data);
    }
    catch (error) {
      console.log(error);
    }
  });

}



export default function ShowTable(props) {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    importContactos(formatData);
  }, []);

  const formatData = (data) => {
    const arrayconstactos = [];
    data.map((e) => {
      arrayconstactos.push(createData(e['name'], e['phone'],
        <>
          <ShowUpdateContacts formatData={formatData} idUpdate={e['id']} nameContact={e['name']} numberContact={e['phone']} />
          <IconButton onClick={(evn) => {
            delectContactos(formatData, e['id']);
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      ));
    });
    setRows(arrayconstactos);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">N. Celular</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.phone}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const ShowAlert = (props) => {
  return (
    <Stack sx={{ width: '100%' , paddingTop:'10px'}} spacing={2}>
      <Alert variant="filled" severity="error">
        {props.msg}
      </Alert>
    </Stack>
  );
}