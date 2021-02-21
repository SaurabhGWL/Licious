
import { Router } from "express";
import { addUUID, bulkCreateMDMS } from '../../utils/users/usersCreate'
import { validateUserModel } from '../../utils/validation'
import { requestInfoToResponseInfo } from '../../utils/index'
import isEmpty from 'lodash/isEmpty';


export default ({ config }) => {
  let api = Router();
  const asyncHandler = require('express-async-handler');

  // write api here
  api.post('/_create', asyncHandler(async (req, res, next) => {
    let data = req.body;
    try {
      let apiResponse = await apiResponseFlow(data);
      let status = !isEmpty(apiResponse.Errors) ? 400 : 200;
      res.status(status).send(apiResponse);
    } catch (err) {
      res.send({
        ResponseInfo: data.ResponseInfo,
        code: " ",
        message: " ",
        description: err,
        params: [

        ]
      })
    }
  }))






  const apiResponseFlow = async function (data) {
    try {
      let errors = await validateUserModel(data.MDMSData,'create');
      if (errors.length > 0) {
        return {
          ResponseInfo: await requestInfoToResponseInfo(data.RequestInfo, false),
          code: 400,
          errorType: "custom",
          Errors: errors

        }

      }

      let mdms_config_body = await addUUID(data.MDMSData);
      let response_body = {
        RequestInfo: data.RequestInfo,
        MDMSData: await bulkCreateMDMS(mdms_config_body)
      };
     return response_body;
    } catch (e) { return e }

  }

  return api;
};
