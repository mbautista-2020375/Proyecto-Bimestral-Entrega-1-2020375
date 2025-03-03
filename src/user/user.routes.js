'use strict';

import { Router } from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, updateRole } from './user.controller.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { editProfileValidator} from '../../validators/user.validators.js';
import { isAdmin } from '../../middlewares/is.admin.js';
import { defaultAdminPermission, denyIfDefaultId, denyIfDefaultToken } from '../../middlewares/is.default.admin.js';

const api = Router();

api.get('/users',[validateJwt, isAdmin], getAllUsers);
api.get('/user/:id',[validateJwt, isAdmin], getUserById);
api.put('/editprofile/',[validateJwt, denyIfDefaultToken ,editProfileValidator], updateUser);
api.put('/deactivateaccount/', [validateJwt, denyIfDefaultToken], deleteUser);
api.put('/changerole/:id', [validateJwt, defaultAdminPermission, denyIfDefaultId], updateRole)

export default api;
