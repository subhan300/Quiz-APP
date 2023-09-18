import { Grid, Typography,Container,Hidden } from '@mui/material'
import stylesheet from '../styles/solution.module.css'
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import React from 'react'
export default function Solution() {
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
  return (
    <Container maxWidth='lg'>
    <Grid  container className={stylesheet.container}>
      <Grid item xs={12} md={6} spacing={10}>
        <h2 className={stylesheet.heading}>A scalable English testing solution for any organization</h2>     
        <div style={{paddingTop:"30px"}}>
            <p  className={stylesheet.paragraph}>
            We have helped over 3,000 schools and organizations around the world define proficiency benchmarks using our English level test.
            </p>
        </div>
        <div style={{paddingBottom:"50px"}}>
        <button className={stylesheet.assessment__Btn}>English assessment solutions</button>
        </div>
      </Grid>
         <Grid item xs={12} md={6} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <img src='https://a.storyblok.com/f/71234/391x318/af480f62c1/s4-desktop-image.svg'></img>
      </Grid>
    </Grid>
    </Container>
  )
}