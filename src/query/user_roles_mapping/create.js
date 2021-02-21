import db from '../../db';


export default async function (role) {
  // console.log("role enter", role);
    const {uuid,user_uuid,role_id, additional_info={}, created_by,created_at,active } = role;
   
    let details = JSON.stringify(additional_info);
   
    let dbquery = `insert into user_roles_mapping values('${uuid}','${user_uuid}','${role_id}','${details}',
    '${created_by}',null,'${created_at}',null,'${active}')`
    let dbquery1= `Select * from user_roles_mapping where uuid='${uuid}'`
    //console.log("db query", dbquery);
    let queryRes
    try {
        await db.query(dbquery);
        console.log("role_mapping entered", );
        queryRes= await db.query(dbquery1);
      
        return (queryRes.rows[0])
    } catch (err) {
        console.log("query/user_roles_mapping/create error", err);
        return await err.message
    }

}
