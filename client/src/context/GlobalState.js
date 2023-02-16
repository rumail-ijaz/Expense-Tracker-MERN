import React, {createContext, useReducer} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'
// initial state
const initialState={
    transactions:[
        // { id: 1, text: 'Flower', amount: -20 },
        // { id: 2, text: 'Salary', amount: 300 },
        // { id: 3, text: 'Book', amount: -10 },
        // { id: 4, text: 'Camera', amount: 150 }
    ],
    error:null,
    loading:true
}

// create context
export const GlobalContext= createContext(initialState)

// provider component
export const GlobalProvider =({ children })=>{
    const [state, dispatch] = useReducer(AppReducer, initialState)

    // Actions

    async function getTransactions() {
        try {
            const response = await axios.get('/api/v1/transactions')
            dispatch({type:'GET_TRANSACTIONS', payload:response.data.data})

        } catch (err) {
            dispatch({type:'TRANSACTION_ERROR', payload:err.response.data.error})
        }
    }
    async function deleteTransaction(id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)
            dispatch({type:'DELETE_TRANSACTION', payload:id})

        } catch (err) {
            dispatch({type:'TRANSACTION_ERROR', payload:err.response.data.error})
        }
    } 

    async function addTransaction(transaction) {
        const config ={
            headers:{
                'Content-Type': 'application/json'
            }
        }

        try {
            const response = await axios.post('/api/v1/transactions', transaction, config)
            console.log(response.data.data,'data');
            dispatch({type:'ADD_TRANSACTION', payload:response.data.data})
            
        } catch (err) {
            dispatch({type:'TRANSACTION_ERROR', payload:err.response.data.error})
        }
    }  

    return(
        <GlobalContext.Provider value={{
            transactions:state.transactions,
            error:state.error,
            loading:state.loading,
            getTransactions,
            deleteTransaction,
            addTransaction
            }}>{children}</GlobalContext.Provider>
    )

}