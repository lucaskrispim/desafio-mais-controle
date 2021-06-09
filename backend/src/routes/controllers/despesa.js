const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator');
const DespesaService = require('../../services/despesa');
const DespesaCreate = require('../schemas/despesa');

router.get('/',async (req, res) => {
  let response = null;
  try {
    response = await DespesaService.getAll()
  }catch (err){
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.get('/:id',async (req, res) => {
  let response = null;
  try {
    response = await DespesaService.getById(req.params.id);
  }catch (err){
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.post('/create', checkSchema(DespesaCreate),async (req,res)=>{
  let response = null;
  try {
    validationResult(req).throw();
    response = await DespesaService.create(req.body);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.put('/modify/:id', checkSchema(DespesaCreate),async (req,res)=>{
  let response = null;
  try {
    validationResult(req).throw();
    response = await DespesaService.modify(req);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});

router.delete('/delete/:id',async (req,res)=>{
  let response = null;
  try {
    response = await DespesaService.delete(req.params.id);
  } catch (err) {
    return res.status(400).json(err);
  }
  return res.status(200).json(response);
});


module.exports = router;