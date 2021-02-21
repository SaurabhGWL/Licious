import db from '../../db';


export default async function (roles) {
    try {
    const {uuid,users_uuid,role_uuid, additional_info={},createdBy=null,updated_by=null,active } = roles;
    console.log("roles", roles);
   // console.log("active", roles.active);
  
    let details = JSON.stringify(additional_info);
    let updated_time = new Date().getTime();
   
    let dbquery = `update user_roles_mapping set user_uuid='${users_uuid}',role_uuid='${role_uuid}',additional_info='${details}',created_by='${createdBy}',updated_by='${updated_by}',updated_time='${updated_time}',active='${active}' where u_r_m_uuid='${uuid}'`
    let dbquery1= `Select * from user_roles_mapping where u_r_m_uuid='${uuid}'`
    console.log("db query", dbquery);
    let queryRes
   
        await db.query(dbquery);
       console.log("role_map updatedddddddddd");
        queryRes= await db.query(dbquery1);
      
        return (queryRes.rows[0])
    } catch (err) {
        console.log("query/user_roles_mapping/update error", err);
        return await err.message
    }

}
