import React,{useState, useContext, useEffect} from 'react'
import { GlobalContext } from '../context/GlobalState'

const AddTransaction = () => {
  const [text, setText] = useState('')
  const [amount, setAmount] = useState(0)
  const {addTransaction, edit} = useContext(GlobalContext)

  useEffect(() => {
    if(Object.keys(edit).length!=0){
      setAmount(edit.amount)
      setText(edit.text)
    }
    
  }, [edit])
  

  const onSubmit = (e)=>{
    e.preventDefault()

    const newTransaction ={
      // id:Math.floor(Math.random()*100000000),
      text,
      amount:+amount
    }

    if(edit._id){
      const update={
        _id:edit._id,
        text,
        amount
      }
      addTransaction(update)
    }
    else{
      addTransaction(newTransaction)
    }

    setText('')
    setAmount(0)
  }
  return (
    <>
    <h3>Add new transaction</h3>
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="text">Text</label>
        <input type="text" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Enter text..." />
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount <br />
          (negative - expense, positive - income)</label>
        <input type="number" value={amount} onChange={(e)=> setAmount(e.target.value)} placeholder="Enter amount..." />
      </div>
      <button className="btn">Add transaction</button>
    </form>
    </>
  )
}

export default AddTransaction