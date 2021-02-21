import { Router } from "express";

export default ({ config }) => {
    let api = Router();
    const asyncHandler = require('express-async-handler');
  
api.post('/_create', asyncHandler(async (req, res, next) => {
    let data = req.body
    console.log("Check1" );
    try {

    let apiResponse= await apiResponseFlow(data)
    res.send(apiResponse)
      
    } catch (err) {
      res.send(err)
    }
  }))



  const apiResponseFlow= async function(data){
      try{
let roleflow= require('../../utils/roles/create')
return await roleflow(data)}catch(e){return e}
  }
  return api
}