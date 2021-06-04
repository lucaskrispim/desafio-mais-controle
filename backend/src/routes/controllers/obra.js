const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const ObraService = require('../../services/obra');
const ObraCreate = require('../schemas/obra');


router.get('/',async (req, res) => {
  let response = null;
  try {
    response = await ObraService.getAll()
  }catch (err){
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
})

router.post('/create', checkSchema(ObraCreate),async (req,res)=>{
  let response = null;
  try {
    validationResult(req).throw();
    response = await ObraService.create(req.body);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.put('/modify/:id', checkSchema(ObraCreate),async (req,res)=>{
  let response = null;
  try {
    validationResult(req).throw();
    response = await ObraService.modify(req);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.delete('/delete/:id',async (req,res)=>{
  let response = null;
  try {
    response = await ObraService.delete(req.params.id);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

module.exports = router;