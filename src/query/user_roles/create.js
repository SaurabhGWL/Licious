import db from '../../db';


const createRole = async function (roles,role_uuid) {
    const { name, additional_info={}, created_by,active } = roles;
    try {  
  console.log("Check 3");
    let details = JSON.stringify(additional_info);
    let created_time = new Date().getTime();
    
    let dbquery = `insert into user_roles values('${role_uuid}','${name}','${details}','${created_by}',null,'${created_time}',null,'${active}')`
    let dbquery1= `Select * from user_roles where roles_uuid='${role_uuid}'`
    //console.log("db query", dbquery);
    let queryRes
  
        await db.query(dbquery);
        console.log("dbquery", dbquery);
        queryRes= await db.query(dbquery1);
      
        return (queryRes.rows)
    } catch (err) {
        console.log("query/user_roles/create error", err);
        return await err.message
    }

}
module.exports = createRole