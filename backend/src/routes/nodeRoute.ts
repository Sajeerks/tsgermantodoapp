import { logout } from './../controllers/userController';
import express from  'express'


import * as nodeControllers from "../controllers/nodeControllers"
// import { requireAuth } from '../middleware/auth';

const router = express.Router()

router.get("/:pageNumber" , nodeControllers.getNodes)
router.post("/" , nodeControllers.createNode)
router.get("/:id" , nodeControllers.getSingleNode)
router.patch("/:noteId" , nodeControllers.updateNode)
router.delete("/:noteId" , nodeControllers.deleteSingleNode)













export default router