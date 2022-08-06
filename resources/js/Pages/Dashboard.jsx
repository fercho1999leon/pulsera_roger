import React from 'react';
import ShowTable from '@/Components/ShowTable'
import Authenticated from '@/Layouts/Authenticated';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid } from "@mui/material";
import FormularioContactos from '@/Components/FormularioContactos';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

const theme = createTheme({
    typography: {
        fontFamily: 'Raleway, Arial',
        fontSize: 18,
    },
    palette: {
        primary: {
            main: '#123E66',
            darker: '#336666',
        },
        secondary: {
            main: "#FF5858",
            darker: "#336666"
        }
    },
});

const createContacts = (setShowMsg) => {
    const $form = document.getElementById('formularioCreate');
    if ($form.reportValidity()) {
        const $data = $form.elements;
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)__token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const bodydata = JSON.stringify({
            name: $data["name"].value,
            phone: $data["phone"].value
        });
        fetch('/contactos/create', {
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
                    document.location.reload();
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }

}

export default function Dashboard(props) {
    const [showMsg, setShowMsg] = React.useState(false);
    return (
        <Authenticated
            auth={props.auth}
            errors={props.errors}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <ThemeProvider theme={theme}>
                                <Grid
                                    item
                                    xs={12}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        color: '#123E66',
                                        fontWeight: 800,
                                        fontSize: '30px'
                                    }}
                                >
                                    <h1>FORMULARIO DE REGISTRO</h1>
                                </Grid>
                                <FormularioContactos idForm={"formularioCreate"} evento={(e) => {
                                    createContacts(setShowMsg);
                                }} />
                                {
                                    showMsg?<Grid
                                        item
                                        xs={12}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            color: '#123E66',
                                            fontWeight: 800,
                                            fontSize: '30px'
                                        }}
                                    >
                                        <ShowAlert msg={'Numero ya existe'}/>
                                    </Grid>
                                    :
                                    null
                                }
                                <Grid
                                    container
                                    direction='row'
                                    justifyContent='space-evenly'
                                    spacing={2}
                                >
                                    <Grid
                                        item
                                        xs={12}
                                    >
                                        <ShowTable ></ShowTable>
                                    </Grid>
                                </Grid>
                            </ThemeProvider>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}

const ShowAlert = (props) => {
    return (
        <Stack sx={{ width: '100%', paddingTop: '10px' }} spacing={2}>
            <Alert variant="filled" severity="error">
                {props.msg}
            </Alert>
        </Stack>
    );
}
