import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, phone) {
  return { name, phone };
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



export default function BasicTable() {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    importContactos(formatData);
  }, []);

  const formatData = (data) => {
    const arrayconstactos = [];
    data.map((e) => {
      arrayconstactos.push(createData(e['name'], e['phone']));
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}