import React, { createContext, useState, ReactNode } from "react"

type UseType = {
  amount: number
  MyCurrente: number
  CurrenteConverter: number
  
  fromCurrency: string
  toCurrency: string

  convetedAmount:string
  rates: { [key: string]: number };
}

type propsContext = {
  state: UseType
  setState: React.Dispatch<React.SetStateAction<UseType>>
}

const DEFAULT_VALUE: propsContext = {
  state: {
    amount: 1,
    MyCurrente: 0,
    CurrenteConverter: 0,

    fromCurrency: 'BRL',
    toCurrency: 'USD',

    convetedAmount: '',
    rates: {}
  },
  setState: () => {
},
}

const StatesContext = createContext<propsContext>(DEFAULT_VALUE)

const StateContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<UseType>({ ...DEFAULT_VALUE.state })
  return (
    <StatesContext.Provider value={{ state, setState }}>
      {children}
    </StatesContext.Provider>
  )
}

export { StatesContext, StateContextProvider }
