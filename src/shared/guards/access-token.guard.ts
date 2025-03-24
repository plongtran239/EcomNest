import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { REQUEST_USER_KEY } from 'src/shared/constants/auth.constant';
import { HTTPMethod } from 'src/shared/constants/role.constant';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';
import { AccessTokenPayload } from 'src/shared/types/jwt.type';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly tokenService: TokenService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const decodedAccessToken = await this.extractAndValidateAccessToken(request);

    await this.validateUserPermission(decodedAccessToken, request);

    return true;
  }

  private async extractAndValidateAccessToken(request: Request): Promise<AccessTokenPayload> {
    const accessToken = this.extractAccessTokenFromHeader(request);

    try {
      const decodedAccessToken = await this.tokenService.verifyAccessToken(accessToken);

      request[REQUEST_USER_KEY] = decodedAccessToken;

      return decodedAccessToken;
    } catch {
      throw new UnauthorizedException('Error.InvalidAccessToken');
    }
  }

  private extractAccessTokenFromHeader(request: Request) {
    const accessToken = request.headers.authorization?.split(' ')[1];

    if (!accessToken) {
      throw new UnauthorizedException('Error.RequiredAccessToken');
    }

    return accessToken;
  }

  private async validateUserPermission(decodedAccessToken: AccessTokenPayload, request: Request) {
    const roleId = decodedAccessToken.roleId;
    const path = request.route.path;
    const method = request.method as keyof typeof HTTPMethod;

    const role = await this.prismaService.role
      .findUniqueOrThrow({
        where: { id: roleId, deletedAt: null },
        include: {
          permissions: {
            where: {
              deletedAt: null,
              path,
              method,
            },
          },
        },
      })
      .catch(() => {
        throw new ForbiddenException('Error.InvalidRole');
      });

    const canAccess = role.permissions.length > 0;

    if (!canAccess) {
      throw new ForbiddenException('Error.AccessDenied');
    }
  }
}
