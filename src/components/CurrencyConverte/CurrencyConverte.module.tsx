import React from 'react'
import styles from './CurencyConverte.module.css'
import { Container } from '@mui/material'
import FormConverter from '../FormConverter/FormConverter'


const CurrencyConverte = () => {

    return (

        <Container  className={styles.container}>
            <h1 className={styles.title}>Converter</h1>
            <FormConverter/>
        </Container>
    )
}

export default CurrencyConverte