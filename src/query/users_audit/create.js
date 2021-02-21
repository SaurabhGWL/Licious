import db from '../../db';


export default async function (users,users_uuid, flow) {//flow= update or create
    const { email, password, phone, first_name, last_name, gender, dob, photo, invitation_type, is_phone_verified,
        is_email_verified, registration_date, additional_info, active } = users;
        try {
  console.log("users Audit",users);
    const uuid = require("uuid/v1");
    let users_audit_uuid = uuid();
    //console.log("addi",additional_info);
    let details = JSON.stringify(additional_info);
    let created_date = new Date().getTime();
    let updated_date = new Date().getTime();
    let created_by="Admin"
    let updated_by=created_by;
   
    let dbquery = `insert into users_audit values('${users_audit_uuid}','${users_uuid}','${email}','${password}','${phone}',
    '${first_name}','${last_name}','${gender}','${dob}','${photo}','${invitation_type}','${is_phone_verified}',
    '${is_email_verified}','${registration_date}','${details}','${created_by}','${created_date}',null,null,'${active}')`

    let dbquery1 = `insert into users_audit values('${users_audit_uuid}','${users_uuid}','${email}','${password}','${phone}',
    '${first_name}','${last_name}','${gender}','${dob}','${photo}','${invitation_type}','${is_phone_verified}',
    '${is_email_verified}','${registration_date}','${details}',null,null,'${updated_by}','${updated_date}','${active}')`



   if(flow==='create'){
       console.log("createeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
     await db.query(dbquery);
    console.log("dbquery", dbquery);
    return ("Users data inserted")
   }
   if(flow==='update'){
       console.log("updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
       console.log("dbquery", dbquery1);
     await db.query(dbquery1);
    console.log("user updated");
    return ("Users data inserted")
   }

        
    } catch (err) {
        console.log("query/users_audit/create error", err);
        return await err.message
    }

}
