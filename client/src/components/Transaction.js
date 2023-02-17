import React,{useContext} from 'react'
import { GlobalContext } from '../context/GlobalState'

const Transaction = ({transaction}) => {
  const {deleteTransaction, editTransaction} = useContext(GlobalContext)

  const sign = transaction.amount < 0 ? '-' : '+'

  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
        {transaction.text} <span>{sign}${Math.abs(transaction.amount)}</span>
        <button 
        onClick={()=> deleteTransaction(transaction._id)}
        className="delete-btn">x</button>
        <button 
        onClick={()=> editTransaction(transaction)}
        className="delete-btn edit-btn">Edit</button>
    </li> 
  )
}

export default Transaction