const express = require('express');
const { getItems, getItemById, getUserInfo } = require('../../controllers/itemController/itemController');

const router = express.Router();

router.get('/', getItems);
router.get('/:id', getItemById);
router.get('/user/:id', getUserInfo);

module.exports = router;
