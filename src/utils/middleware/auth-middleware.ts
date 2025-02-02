import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
interface JwtPayload {
  name: string;
  id: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware');

    // Extracción del token Bearer
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('No token provided');
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).send('Invalid token format');
    }

    const token: string = tokenParts[1];
    try {
      // Verificar token
      const decoded = this.jwtService.verify<JwtPayload>(token);
      req['data'] = decoded; // Puedes agregar el usuario decodificado al objeto de solicitud
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).send('Invalid token');
    }
  }
}
