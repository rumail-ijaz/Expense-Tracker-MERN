const Transaction = require('../models/Transaction')

// @desc Get all transactions
// @route Get /api/v1/transactions
// @access Public
exports.getTransactions= async (req,res, next)=>{
    try {
        const transactions = await Transaction.find()

        return res.status(200).json({success:true, count: transactions.length, data:transactions})
    } catch (err) {
        return res.status(500).json({success: false, error:'Server Error'})
    }
}

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.addTransactions= async (req,res, next)=>{
    const {text, amount} = req.body
    try {
        const transactions = await Transaction.create(req.body)
        
        return res.status(200).json({success:true, count: transactions.length, data:transactions})
    } catch (err) {
        if(err.name == 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.message)
            return res.status(400).json({success: false, error:messages})
        }
        else{
            return res.status(500).json({success: false, error:'Server Error'})
        }
    }
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransactions= async (req,res, next)=>{
    try {
        const transacton = await Transaction.findById(req.params.id)
        if(!transacton){
            return res.status(404).json({success:false, error:'Not Found'})
        }

        await transacton.remove()
        return res.status(200).json({success:true, data:{}})

    } catch (err) {
        return res.status(500).json({success: false, error:'Server Error'})
    }
}