import { PrismaClient, User } from '@prisma/client';
import { PrismaService } from '../../lib/prisma/prisma.service';

const prisma = new PrismaClient();
export interface UserWithoutSensitiveData extends Omit<User, 'passwordHash' | 'resetPasswordToken'> {
  password?: string
  passwordHash?: never
  resetPasswordToken?: null | string
  // accessTier: AccessTier
}


export type UserWithAccessToken = UserWithoutSensitiveData &  {
  accessToken: string 
  accessTier: string
  passwordHash: string | undefined;
  resetPasswordToken: string | undefined;
  userProfileId?: number
  userId?: string
  username: string | null
  customProp?: string
  prismaService?: PrismaService
  }


















