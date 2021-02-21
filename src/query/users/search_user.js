import db from '../../db';


const searchUser = async function (dbquery) {
    
    try {
        let execute_query = await db.query(dbquery); 
        return execute_query.rows
    } catch (err) {
        console.log("query/users/search_all_users error", err);
        return await err.message
    }

}
module.exports = searchUser