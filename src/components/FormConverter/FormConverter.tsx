// Arquivo components/FormConverter.tsx
import React, { useContext, useEffect } from 'react'
import styles from './FormConverter.module.css'
import { Box, FormControl, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { StatesContext } from '../../context/states'
import axios from 'axios'

function FormConverter() {

  const { state, setState } = useContext(StatesContext)

  const url = 'https://v6.exchangerate-api.com/v6/15c2121db9c8446ced6d37b1/latest/USD'

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        const { conversion_rates } = response.data
        setState(prevState => ({
          ...prevState,
          rates: conversion_rates
        }))
      })
      .catch(error => {
        console.error('Erro ao obter as taxas de câmbio:', error)
      });
  }, [])

  useEffect(() => {
    if (state.rates !== null && state.rates !== undefined) {
      const rateFrom: number = state.rates[state.fromCurrency] || 0;
      const rateTo: number = state.rates[state.toCurrency] || 0;
      setState(prevState => ({
        ...prevState,
        convetedAmount: ((state.amount / rateFrom) * rateTo).toFixed(2)
      }));
    }
  }, [state.amount, state.rates, state.fromCurrency, state.toCurrency]);

  return (
    <FormControl className={styles.formConverter} >
      <Box sx={{ textAlign: 'center' }}>
        <InputLabel htmlFor="my-input">Value</InputLabel>
        <Input
          sx={{ color: '#fff' }}
          type='number'
          value={state.amount}
          onChange={(e) => setState(prevState => ({
            ...prevState,
            amount: parseFloat(e.target.value)
          }))}
        />
      </Box>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Select Current"
        value={state.fromCurrency}
        onChange={(e) => setState(prevState => ({
          ...prevState,
          fromCurrency: e.target.value
        }))}
      >

        {Object.keys(state.rates).map((currency) => (
          <MenuItem value={currency} key={currency}>{currency}</MenuItem>
        ))}
      </Select>

      <Typography>to</Typography>

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Select Current"
        value={state.toCurrency}
        onChange={(e) => setState(prevState => ({
          ...prevState,
          toCurrency: e.target.value
        }))}
      >
        {Object.keys(state.rates).map((currency) => (
          <MenuItem value={currency} key={currency}>{currency}</MenuItem>
        ))}
      </Select>
      <Box sx={{ display:'flex', flexDirection:'column' }}>
        <Typography variant="body1" sx={{ flexWrap:'wrap' }}>
          {state.amount} {state.fromCurrency} = {state.convetedAmount} {state.toCurrency}.
        </Typography>
        <Typography variant="h4" sx={{ flexWrap:'wrap' }}>
          {state.convetedAmount} {state.toCurrency}
        </Typography>

      </Box>

    </FormControl>
  )
}

export default FormConverter
