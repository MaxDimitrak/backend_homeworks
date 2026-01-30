import {Router} from "express";
import {deleteAllDataHandler} from "./handlers/delete_all_data.handler";


export const testingRouter = Router({})

testingRouter.delete('/all-data', deleteAllDataHandler);