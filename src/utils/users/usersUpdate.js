
import {dataUpdate,masterUpdate,moduleUpdate} from '../../query/users/bulkUpdate';

export const bulkUpdateMDMS = async function (mdms) {
    const { module=[], master=[], data =[]} = mdms;
    let response = [];
    let masteresp = [];
   let mm = await moduleUpdate(module);
   let ms = await masterUpdate(master);
   let md  = await dataUpdate(data);
   console.log('thiss is mm,',mm);
   console.log('this is ms', ms);
   console.log('this is md', md);
    mm.forEach(item => {
        ms.forEach((key,index) => {
            let individualMaster = {
                uuid: key.uuid,
                masterName:  key.master_name,
                filter: key.filter,
                data: md[index].data,
                additionalInfo: md[index].additional_info,
                active:md[index].active,
                auditDetails:  {
                    createdBy: item.created_by,
                    lastModifiedBy: item.updated_by,
                    createdTime: item.created_at,
                    lastModifiedTime: item.updated_at
                }
            
            };
            masteresp.push(individualMaster);
        })
       
        let resp = {
            uuid: item.uuid,
            moduleName: item.module_name,
            filter: item.filter,
            active: item.active,
            masters: masteresp,
            additionalInfo: item.additional_info,
            auditDetails: {
             createdBy: item.created_by,
             lastModifiedBy: item.updated_by,
             createdTime: item.created_at,
             lastModifiedTime: item.updated_at
            }
        }
       response.push(resp);
    })
    return response;

}

export const addUUID = async function (MDMS) {
    
    let updated_at = new Date().getTime();

    let MDMS_details = {};
    let module_details = [];
    let master_details = [];
    let data_details = [];

   

    for (let x = 0; x < MDMS.length; x++) {

        let MDMS_modules = {};

        //MDMS_modules 
        MDMS_modules.uuid = MDMS[x].uuid;
        MDMS_modules.module_name = MDMS[x].moduleName;
        MDMS_modules.filter = MDMS[x].filter;
        MDMS_modules.updated_at = updated_at;
        MDMS_modules.active = MDMS[x].active;

        //multiple masters
        MDMS[x].masters.forEach(item =>{
            let MDMS_masters = {};
            let MDMS_data = {};
           
            //MDMS masters
            MDMS_masters.uuid = item.uuid;
            MDMS_masters.master_name = item.masterName;
            MDMS_masters.filter = item.filter;
            MDMS_masters.updated_by = 'Admin';
            MDMS_masters.filter = item.filter;
            MDMS_masters.updated_at = updated_at;
            MDMS_masters.active = item.active;

            //MDMS data
            MDMS_data.master_uuid = item.uuid;
            MDMS_data.filter = item.filter;
            MDMS_data.data = item.data;
            MDMS_data.additional_info = item.additionalInfo;
            MDMS_data.updated_at = updated_at;
            MDMS_data.active = item.active;
            master_details.push(MDMS_masters);
            data_details.push(MDMS_data);
        })
     

        module_details.push(MDMS_modules);
        

    }
    MDMS_details = {
        module:module_details,
        master: master_details,
        data: data_details
    }
    return MDMS_details

}