
import moduleCreate from '../../query/users/moduleCreate';
import masterCreate from '../../query/users/masterCreate';
import dataCreate from '../../query/users/dataCreate';

export const bulkCreateMDMS = async function (mdms) {
    const { module=[], master=[], data =[]} = mdms;
    let response = [];
    let masteresp = [];
   let mm = await moduleCreate(module);
   let ms = await masterCreate(master);
   let md = await dataCreate(data);
   
    mm.forEach(item => {
        ms.forEach((key,index) => {
           
            let individualMaster = {
                uuid: key.uuid,
                masterName:  key.master_name,
                filter: key.filter,
                data: md[index].data,
                additionalInfo: md[index].additional_info,
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

    const create_uuid = require("uuid/v1");
    let created_at = new Date().getTime();
    
    let MDMS_details = {};
    let module_details = [];
    let master_details = [];
    let data_details = [];

   

    for (let x = 0; x < MDMS.length; x++) {
        let modules_uuid = create_uuid();
       
        let MDMS_modules = {};
        

        //MDMS_modules 
        MDMS_modules.uuid = modules_uuid;
        MDMS_modules.module_name = MDMS[x].moduleName;
        MDMS_modules.filter = MDMS[x].filter;
        MDMS_modules.enable = true;
        MDMS_modules.additional_info = {};
        MDMS_modules.created_by = 'Admin';
        MDMS_modules.created_at = created_at;
        MDMS_modules.active =  true;
        MDMS_modules.auditDetails = MDMS[x].auditDetails;
        MDMS_modules.additionalInfo = MDMS[x].additionalInfo;
        //multiple masters
        MDMS[x].masters.forEach(item =>{
            let MDMS_masters = {};
            let MDMS_data = {};
            let master_uuid = create_uuid();
            //MDMS masters
            MDMS_masters.uuid = master_uuid;
            MDMS_masters.module_uuid = modules_uuid;
            MDMS_masters.master_name = item.masterName;
            MDMS_masters.filter = item.filter;
            MDMS_masters.enable = true;
            MDMS_masters.additional_info = item.additionalInfo;
            MDMS_masters.created_by = item.auditDetails.createdBy;
            MDMS_masters.created_at = created_at;
            MDMS_masters.active =  true;
            
            //MDMS data
            MDMS_data.uuid = create_uuid();
            MDMS_data.master_uuid = master_uuid;
            MDMS_data.filter = item.filter;
            MDMS_data.data = item.data;
            MDMS_data.enable = true;
            MDMS_data.additional_info = item.additionalInfo;
            MDMS_data.created_by = item.auditDetails.createdBy,
            MDMS_data.created_at = created_at;
            MDMS_data.active = true;
            MDMS_data.auditDetails = item.auditDetails;
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


export const configUser = async function (Users) {


    let user_details = [];
    for (let x = 0; x < Users.length; x++) {
        let role_config = [];
        let { roles } = Users[x];
       
        let user_body = {}
        user_body.uuid =Users[x].uuid ;
        user_body.id =Users[x].id ;
        user_body.password = Users[x].password
        user_body.phone = Users[x].phone
        user_body.email = Users[x].email
        user_body.firstname = Users[x].first_name
        user_body.lastname = Users[x].last_name
        user_body.gender = Users[x].gender
        user_body.dob = Users[x].dob
        user_body.photoURL = Users[x].photoURL
        user_body.invitationType = Users[x].invitation_type
        user_body.isPhoneVarified  = Users[x].is_phone_verified
        user_body.isEmailVarified = Users[x].is_email_verified
        user_body.registrationDate = Users[x].registration_date
        user_body.additionalInfo = Users[x].additional_info

       let auditDetails={};
       auditDetails.createdBy =Users[x].created_by
       auditDetails.createdTime =Users[x].created_at
       

       
        for (let y = 0; y < roles.length; y++) {

            let role_body = {};
            role_body.uuid =roles[y].uuid 
            role_body.user_uuid = roles[y].user_uuid
            role_body.role_id = roles[y].role_id
            role_body.name = roles[y].name;
            if (roles[y].additional_info) { role_body.additionalInfo = roles[y].additional_info } else { role_body.additionalInfo = {} }


            let role_auditDetails={};
            role_auditDetails.createdBy =roles[y].created_by
            role_auditDetails.createdTime =roles[y].created_at
            

            role_body.auditDetails=role_auditDetails
            role_body.active = roles[y].active

        }

        user_body.auditDetails=auditDetails
        user_body.active = Users[x].active
        user_details.push(user_body);

    }

    return user_details

}



