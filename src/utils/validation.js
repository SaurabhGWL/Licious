import mdmsSchema from '../model/mdms';
import updateSchema from '../model/update';

export const validateUserModel=async function(mdms,type){
  const getAjvInstance = () => {
    const Ajv = require("ajv");
    const ajv = new Ajv({ allErrors: true });
    return ajv;
  };

  const ajv = getAjvInstance();
  let schema = type==='create' ? mdmsSchema: updateSchema;
  let validate = ajv.compile(schema);
    var valid = validate(mdms);
    let errors = [];
    if (!valid) {
      errors = validate.errors;
    }
    return errors;
  
}


