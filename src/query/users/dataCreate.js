import db from '../../db';

export default async function (value) {
   
    //MDMS_Master_Data
    console.log('data enter');
    let dbquery = `insert into public."MDMS_Master_Data" values`;
    let dbquery1 = `Select * from public."MDMS_Master_Data" where `;
    try {
        value.forEach(item =>{
            const {uuid, master_uuid, filter, enable, created_by, created_at, active, additional_info, data } = item;
            let details = JSON.stringify(additional_info);
            let info = JSON.stringify(data);
            dbquery = `${dbquery} ('${uuid}','${master_uuid}','${filter}','${info}','${enable}','${details}','${created_by}',null,
            '${created_at}',null,'${active}'),`
            dbquery1 = `${dbquery1} uuid='${uuid}' OR`
        })
        dbquery1 = dbquery1.slice(0, dbquery1.length-2);
        dbquery = dbquery.slice(0, dbquery.length-1);
        await db.query(dbquery);
        let queryRes = await db.query(dbquery1);
        console.log('data updated');
        return queryRes.rows;
        } catch (err) {
            console.log("query/users/data error", err);
            return await err.message
        }

}

