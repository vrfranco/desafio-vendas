'use client';

import Image from 'next/image'
import styles from './page.module.css'
import Produto from '@/components/produto'
import { Box, Button, Container, Grid, Paper, Typography, styled } from '@mui/material'
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home(){

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {

    fetch('http://localhost:3000/produtos').then((r) => r.json()).then((item) => {
      setProdutos(item);
    });

  }, [produtos])


  return (
    <Container>
      <Typography style={{
        fontWeight: 900,
        fontSize: 30,
        textAlign: 'center',
        marginTop: 40,
        padding: 0,
        color: '#004ec4'
      }}>
        Desafio da Imagetech 
      </Typography>

      <Typography style={{
        fontWeight: 900,
        fontSize: 60,
        textAlign: 'center',
        margin: 0,
        padding: 0,
        color: 'white'
      }}>
        Lista de Compra de Produtos
      </Typography>

      <Box textAlign={"center"}>
        <Link href="/usuario">
          <Button>Acessar o Administrativo</Button>
        </Link>
      </Box>

      <Grid container spacing={4} marginTop={2}>
        
        {produtos.map((item, key) => (
          <Grid key={key} item xs={4} md={4}>
            <Produto item={item}></Produto>
          </Grid>        
        ))}

      </Grid>
    </Container>
  )
}
