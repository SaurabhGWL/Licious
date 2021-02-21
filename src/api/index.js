import { Router } from "express";
import createUser from "./users/create";
import updateUser from "./users/update";
import roleCreate from './roles/create'
import searchUser from "./users/search";

export default ({ config }) => {
  let api = Router();
  api.use("/v1", searchUser({config}));
  api.use("/roles", roleCreate({config}));
  api.use("/v1", createUser({ config }));
  api.use("/v1", updateUser({ config }));
 
  
  return api;
};