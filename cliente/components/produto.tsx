'use client';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Divider, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Produto({item}: {item: any}) {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={{padding: 10}}>

      <Box style={{backgroundColor: 'red'}}></Box>
      
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent={'space-between'}>
          <Typography gutterBottom variant="h5" component="div">
            {item.nome}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {item.descricao}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="large" onClick={handleClickOpen}>Comprar por R$ {item.valor}</Button>
      </CardActions>

      <Dialog open={open} onClose={handleClose} maxWidth={'xs'}>
        <DialogTitle>Realização do Pedido</DialogTitle>
        <DialogContent>
          <DialogContentText style={{marginBottom: 20}}>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>

          <Stack spacing={2}>
            <TextField
              required
              id="outlined-required"
              label="Nome do Cliente"
              fullWidth
              defaultValue="Digite o nome do Cliente"
            />

            <TextField
              required
              id="outlined-required"
              label="Email do Cliente"
              fullWidth
              defaultValue="Digite o email do Cliente"
            />

            <TextField
              required
              id="outlined-required"
              label="CPF do Cliente"
              fullWidth
              defaultValue="Digite o CPF do Cliente"
            />

            <fieldset style={{borderRadius: 5}}>
              <legend>Informações do Pedido</legend>

              <Stack spacing={3} padding={1}>
                {item.tipo == 'Configuravel' && 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tamanho</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={'P'}
                      label="Tamanho"
                      onChange={() => { }}
                    >
                      <MenuItem value={'P'}>P</MenuItem>
                      <MenuItem value={'M'}>M</MenuItem>
                      <MenuItem value={'G'}>G</MenuItem>
                      <MenuItem value={'GG'}>GG</MenuItem>
                    </Select>
                  </FormControl>
                }


                {item.tipo == 'Configuravel' && 
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Cor</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={'Amarelo'}
                      label="Cor"
                      onChange={() => { }}
                    >
                      <MenuItem value={'Amarelo'}>Amarelo</MenuItem>
                      <MenuItem value={'Preto'}>Preto</MenuItem>
                      <MenuItem value={'Azul'}>Azul</MenuItem>
                    </Select>
                  </FormControl>
                }

                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Selecione a quantidade"
                  fullWidth
                  type="number"
                  
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </fieldset>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}