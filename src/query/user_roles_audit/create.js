import db from '../../db';


const createRoleAudit = async function (roles,users_uuid) {
    const { roles_uuid,name, additional_info={}, created_by,active } = roles;
    const uuid = require("uuid/v1");
    let roles_uuid_audit_uuid = uuid();
   // console.log("addi",additional_info);
    let details = JSON.stringify(additional_info);
    let created_time = new Date().getTime();
    console.log("original",users_uuid );
    let dbquery = `insert into user_roles_audit values('${roles_uuid_audit_uuid}','${roles_uuid}','${name}','${details}','${created_by}',null,'${created_time}',null,'${active}')`
    //console.log("db query", dbquery);
  
    try {
        await db.query(dbquery);
        console.log("dbquery", dbquery);
       
        return ("Role inserted")
    } catch (err) {
        console.log("query/user_roles_audit/create error", err);
        return await err.message
    }

}
module.exports = createRoleAudit