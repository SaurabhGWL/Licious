import db from '../../db';

const uuid_ = require("uuid/v1");
let u_r_m_audit_uuid = uuid_();
export default async function (roles, user_role_uuid, users_uuid, flow) {
    const { uuid, additional_info = {}, active } = roles;
    try {
        
        let details = JSON.stringify(additional_info);
        let created_time = new Date().getTime();
        let updated_by = "Admin"
        let created_by = updated_by
        let dbquery = `insert into user_roles_mapping_audit values('${u_r_m_audit_uuid}','${user_role_uuid}','${users_uuid}','${uuid}','${details}','${created_by}',null,'${created_time}',null,'${active}')`

        let dbquery1 = `insert into user_roles_mapping_audit values('${u_r_m_audit_uuid}','${user_role_uuid}','${users_uuid}','${uuid}','${details}',null,'${updated_by}',null,'${created_time}','${active}')`

      
        if (flow === "create") {
            console.log("dbquery", dbquery);
            await db.query(dbquery);
            console.log("role created");

            return ("Data Inserted")
        }
        if (flow === "update") {
            console.log("dbquery", dbquery1);
            await db.query(dbquery1);
            console.log("role updated");

            return ("Data Inserted")
        }


    } catch (err) {
        console.log("query/user_roles_mapping_audit/create error", err);
        return await err.message
    }

}
