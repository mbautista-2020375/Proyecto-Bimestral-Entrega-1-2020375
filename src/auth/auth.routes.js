'use strict';

import { Router } from 'express';
import { registerClient, registerAdmin, login } from './auth.controller.js'; // Ajusta la ruta si es necesario
import { loginValidator, registerValidator } from '../../validators/user.validators.js';
import { validateJwt } from '../../middlewares/validate.jwt.js';
import { isAdmin } from '../../middlewares/is.admin.js';

const api = Router();

api.post('/register/', registerValidator, registerClient);
api.post('/register/admin/', [validateJwt, isAdmin ,registerValidator], registerAdmin);
api.post('/login/', loginValidator ,login);

export default api;
