const express = require('express')
const router = express.Router()
const {getTransactions, addTransactions, deleteTransactions, updateTransactions} = require('../controllers/transactions')

router
    .route('/')
    .get(getTransactions)
    .post(addTransactions)

router
    .route('/:id')
    .delete(deleteTransactions)
    .put(updateTransactions)  

module.exports = router