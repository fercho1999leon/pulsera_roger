import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Grid, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

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

export default function FormularioContactos(props){
    return (
        <ThemeProvider theme={theme}>
            <Grid
                container
                direction='row'
                justifyContent='space-evenly'
                component="form"
                autoComplete="off"
                spacing={2}
                id={props.idForm}
            >
                <Grid
                    item
                    xs={6}
                >
                    <TextField id="name" label="Nombre de contacto" variant="outlined" defaultValue={props.textname} required />
                </Grid>
                <Grid
                    item
                    xs={6}
                >
                    <TextField id="phone" type={'number'} label="Numero de contacto" defaultValue={props.numbercontact} variant="outlined" required />
                </Grid>
                <Grid
                    item
                    xs={12}
                >
                    <Button variant="contained" endIcon={<SaveIcon />} onClick={props.evento}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>

        </ThemeProvider>
    );

}