import { Router } from "express";
import  queryfn from '../../utils/users/usersSearch';
import isEmpty from 'lodash/isEmpty';

export default ({ config }) => {
    console.log("check 0");
    let api = Router();
    const asyncHandler = require('express-async-handler');
  

    api.post('/_search', asyncHandler(async (req, res, next)=>{
    try{
        let queryRes= await queryfn(req.body);
        let status = isEmpty(queryRes.MDMSData)? 400: 200;
        res.status(status).send(queryRes);
    }catch(e){
        res.send(e)
    }
    }))
    return api
}