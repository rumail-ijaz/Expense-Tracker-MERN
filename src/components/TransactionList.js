import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'
import Transaction from './Transaction'

const TransactionList = () => {
  const {transactions} = useContext(GlobalContext)
  console.log(transactions,'state');
  return (
    <> 
    <h3>History</h3>
    <ul className="list">
    {transactions.map((transaction,i) => (
      <Transaction transaction={transaction} key={transaction.id}/>
    ))}
     
    </ul>
    </>
  )
}

export default TransactionList