const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/:userId', invoiceController.createInvoice);
router.get('/:userId', invoiceController.getInvoicesByUser);
router.get('/', invoiceController.getAllInvoices);

module.exports = router;