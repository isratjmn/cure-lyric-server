import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserM } from '../app/modules/User/user.model';



export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    await UserM.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Not authorized' });
  }
};
