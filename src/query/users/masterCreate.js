import db from '../../db';
import isEmpty from 'lodash/isEmpty';

export default async function (value) {
    //update MDMS_Masters
    console.log('master enter');
    let dbquery = `insert into public."MDMS_Masters" values `;
    let dbquery1 = `Select * from public."MDMS_Masters" where `;
    try {
        value.forEach(item => {
            const {uuid, module_uuid, master_name, filter, enable, created_by, created_at, active, additional_info } = item;
            let details = isEmpty(additional_info)?null:JSON.stringify(additional_info);
            dbquery = `${dbquery} ('${uuid}','${module_uuid}','${master_name}','${filter}',${enable},${details},'${created_by}',null,
            '${created_at}',null,${active}),`;
            dbquery1 = `${dbquery1} uuid='${uuid}' OR`;
        })
        dbquery1 = dbquery1.slice(0, dbquery1.length-2);
        dbquery = dbquery.slice(0, dbquery.length-1);
        await db.query(dbquery);
        let queryRes = await db.query(dbquery1);
        console.log('master updated');
        return queryRes.rows;
        } catch (err) {
            console.log("query/users/master error", err);
            return await err.message
        }

}

