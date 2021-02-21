let create = async function(role){
try{
    console.log("Check 2");
    const uuid = require("uuid/v1");
    let role_uuid = uuid();
    let roleQuery= require('../../query/user_roles/create')
    let roleQueryResponse= await roleQuery(role,role_uuid);
    return roleQueryResponse;
}catch(err){
    return err
}
}
module.exports = create;