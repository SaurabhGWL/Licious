import db from '../../db';

export const moduleUpdate = async(value) => {
    //update MDMS_Modules 
   
     console.log('module enter');
     try{
        for(let i =0; i<value.length;i++){
            const dKeys = Object.keys(value[i]);
            const dataTuples =  dKeys.map((k, index) => {
                let temp = '';
                if(value[i][k] || typeof value[i][k] === 'boolean'){
                    temp = `${k} = '${value[i][k]}'`;
                }
                return temp;
            }).filter(item => item);
            const updates = dataTuples.join(", ");

            let dbquery = `UPDATE  public."MDMS_Modules" SET ${updates} WHERE uuid='${value[i].uuid}'`;
            console.log('dbquery module', dbquery);
            await db.query(dbquery);
            let dbquery1= `Select * from public."MDMS_Modules" where uuid='${value[i].uuid}'`;
            let queryRes ;
            queryRes = await db.query(dbquery1);
            console.log('module updated');
            return queryRes.rows
        } 
       
     }catch(err){
        console.log("query/users/module error", err);
        return await err.message
     }
 
}

 export const masterUpdate =  async(value) => {
    //update MDMS_Masters
    console.log('master enter');
    try{
        for(let i =0; i<value.length;i++){
            const dKeys = Object.keys(value[i]);
            const dataTuples = dKeys.map((k, index) => {
                let temp = '';
                if(value[i][k] || typeof value[i][k] === 'boolean'){
                    temp = `${k} = '${value[i][k]}'`;
                }
                return temp;
            }).filter(item => item);
            const updates = dataTuples.join(", ");

            let dbquery = `UPDATE  public."MDMS_Masters" SET ${updates} WHERE uuid='${value[i].uuid}'`;
            console.log('dbquery master', dbquery);
            await db.query(dbquery);
            let dbquery1= `Select * from public."MDMS_Masters" where uuid='${value[i].uuid}'`;
            let queryRes = await db.query(dbquery1);
            return (queryRes.rows)
        }
       
     }catch(err){
        console.log("query/users/module error", err);
        return await err.message
     }

}

export const dataUpdate = async(value) => {
   
    //MDMS_Master_Data
    console.log('data enter');
    try{
        for(let i =0; i<value.length;i++){
            const dKeys = Object.keys(value[i]);
            const dataTuples = dKeys.map((k, index) => {
                let temp = '';
                if(value[i][k] || typeof value[i][k] === 'boolean'){
                    if(typeof value[i][k] === 'object'){
                        let stringVal = JSON.stringify(value[i][k]);
                        temp = `${k} = '${stringVal}'`;
                    }else{
                        temp = `${k} = '${value[i][k]}'`
                    }
                }
                return temp;
            }).filter(item => item);
            const updates = dataTuples.join(", ");

            let dbquery = `UPDATE  public."MDMS_Master_Data" SET ${updates} WHERE master_uuid='${value[i].master_uuid}'`;
            console.log('dbquery master', dbquery);
            await db.query(dbquery);
            let dbquery1= `Select * from public."MDMS_Master_Data" where master_uuid='${value[i].master_uuid}'`;
            let queryRes ;
            queryRes = await db.query(dbquery1);
            return (queryRes.rows)
        }
       
     }catch(err){
        console.log("query/users/module error", err);
        return await err.message
     }

}





