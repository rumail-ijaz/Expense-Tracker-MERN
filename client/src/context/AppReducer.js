
export default (state, action)=>{
    switch(action.type){
        case 'GET_TRANSACTIONS' :
            return {
                ...state,
                loading:false,
                transactions:action.payload
            }
        case 'DELETE_TRANSACTION' :
            return {
                ...state,
                transactions:state.transactions.filter(transaction => transaction._id!= action.payload)
            }
        case 'ADD_TRANSACTION' :
            const existItem=state.transactions.find(x=> x._id === action.payload._id)
        if(existItem){
            return {
                ...state,
                transactions:[...state.transactions.map(x=>x._id==existItem._id ? action.payload :x)]
            }
        }
        else{
            return {...state, transactions:[...state.transactions, action.payload]}
        }
            
        case 'EDIT_TRANSACTION' :
            return {
                ...state,
                edit:action.payload
            }  
        case 'TRANSACTION_ERROR' :
            return {
                ...state,
                error:action.payload
            }
        
        default:
            return state
    }

}