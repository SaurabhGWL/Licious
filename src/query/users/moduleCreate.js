
import db from '../../db';

export default async function (value) {
   //update MDMS_Modules 
    console.log('module enter');
    let dbquery = `insert into public."MDMS_Modules" values `
    let dbquery1 = `Select * from public."MDMS_Modules" where `;
    try {
        value.forEach(item => {
            const {uuid, module_name, filter, enable, created_by, created_at, active, additional_info } = item;
            let details = JSON.stringify(additional_info);
            dbquery = `${dbquery} ('${uuid}','${module_name}','${filter}','${enable}','${details}','${created_by}',null,
            '${created_at}',null,'${active}'),`;
            dbquery1 = `${dbquery1} uuid='${uuid}' OR`;
        });

       
        dbquery1 = dbquery1.slice(0, dbquery1.length-2);
        dbquery = dbquery.slice(0, dbquery.length-1);
        await db.query(dbquery);
        let queryRes = await db.query(dbquery1);
        console.log('module updated');
        return queryRes.rows;
        } catch (err) {
            console.log("query/users/module error", err);
            return await err.message
        }

}

