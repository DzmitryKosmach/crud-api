/* import {Request, Response, Router}  from 'express';

import asyncHandler from 'express-async-handler';
import User from './user.model';
import * as usersService from './user.service';

const router = Router();

router.route('/').get(
  asyncHandler(async (_req: Request, res: Response) => {
    const users = await usersService.getAll();
    // map user fields to exclude secret fields like "password"
    res.json(users.map(User.toResponse));
  })
);

export default router; */
