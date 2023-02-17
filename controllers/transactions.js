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
        const transaction = await Transaction.create(req.body)
        
        return res.status(200).json({success:true, data:transaction})
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

// @desc Add transactions
// @route POST /api/v1/transactions
// @access Public
exports.updateTransactions= async (req,res, next)=>{
    const {text, amount} = req.body
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id)
        if(!transaction){
            return res.status(404).json({success:false, error:'Not Found'})
        }
        else{
            transaction.text=text || transaction.text
            transaction.amount=amount || transaction.amount
            const updatedTransaction = await transaction.save()
            return res.status(200).json({success:true, data:updatedTransaction})

        }
        
    } catch (err) {
        return res.status(500).json({success: false, error:'Server Error'})
    }
}

// @desc Delete transactions
// @route DELETE /api/v1/transactions
// @access Public
exports.deleteTransactions= async (req,res, next)=>{
    try {
        const transaction = await Transaction.findById(req.params.id)
        if(!transaction){
            return res.status(404).json({success:false, error:'Not Found'})
        }

        await transaction.remove()
        return res.status(200).json({success:true, data:{}})

    } catch (err) {
        return res.status(500).json({success: false, error:'Server Error'})
    }
}