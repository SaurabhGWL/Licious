import searchUser from '../../query/users/search_user';
import isEmpty from 'lodash/isEmpty';

export default async function (searchFilter) {
    
    const { RequestInfo, MDMSSearchFilters } = searchFilter;
    const { modulesDetails = [] } = MDMSSearchFilters;
    let response = {};
    let MDMSData = [];
    let searchReq = modulesDetails.map(item => {
        return {moduleName: item.moduleName, filter:item.filter, masterName: item.mastersDetails}
    })
   try{
    let dbQuery = `SELECT
  
    ms.uuid master_id,
    ms.master_name,
    ms.filter master_filter,
    mmd.data,
    mmd.additional_info,
    mm.uuid module_uuid,
    mm.module_name,
    mm.filter module_filter,
    mm.additional_info module_info
   
    FROM public."MDMS_Masters" ms
 
    INNER JOIN public."MDMS_Master_Data" mmd
 
    ON ms.uuid = mmd.master_uuid
  
    INNER JOIN public."MDMS_Modules" mm
 
    ON mm.uuid = ms.module_uuid
  
    where (`;
   
    searchReq.forEach(item => {
        
        if(item.moduleName){
            dbQuery = `${dbQuery} mm.module_name='${item.moduleName}' AND`
        }
        if(item.filter){
            dbQuery = `${dbQuery} mm.filter='${item.filter}' AND`
        }
        if(!item.filter && !item.moduleName){
          dbQuery = `${dbQuery} mm.filter='noResponse' AND`
        }
        if(!isEmpty(item.masterName) ){
          dbQuery = `${dbQuery} (`;
            item.masterName.forEach(key =>{
              dbQuery = `${dbQuery} ms.master_name='${key.masterName}' OR`
            })
            dbQuery = dbQuery.slice(0, dbQuery.length - 2);
            dbQuery = `${dbQuery})`
        }
        if(dbQuery.endsWith("AND")){
          dbQuery = dbQuery.slice(0, dbQuery.length - 3);
        }
        dbQuery = `${dbQuery}) OR (`
    })
    dbQuery = dbQuery.slice(0, dbQuery.length - 4);
    console.log('this is final query', dbQuery);
    let searchResult = await searchUser(dbQuery);
   // console.log('this is search result ', searchResult);

    searchResult.forEach(item => {
      let mdms =  {
        "uuid": item.module_uuid,
        "moduleName": item.module_name,
        "filter": item.module_filter,
        "masters": [
          {
            "uuid": item.master_id,
            "masterName": item.master_name,
            "filter": item.master_filter,
            "data": item.data,
            "additionalInfo": item.additional_info,
          }
        ],
        "additionalInfo": item.module_info
       
      }
      MDMSData.push(mdms);
    });

    return isEmpty(searchResult)?
    response = {
        "RequestInfo":RequestInfo,
        "Errors":
        [
          {
            "code": 400,
            "message": "No Search result found",
            "description": "Invalid input",
             "params": ["Invalid input or no match found"]
          }
        ]
       
    }
    :
    response ={
      "RequestInfo":RequestInfo,
      "MDMSData": MDMSData
    }

   }catch(err){
    console.log("search err", e);
    return   response = {
      "RequestInfo":RequestInfo,
      "Errors":
      [
        {
          "code": 400,
          "message": "No Search result found",
          "description": e,
           "params": ["Invalid input or no match found"]
        }
      ]
     
  }
   }   
   

}