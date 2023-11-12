import { PrismaClient } from '@prisma/client'
import { NextFunction, Response } from 'express'
import { IncomingHttpHeaders } from 'http'
import { AppConfiguration } from '../../context/app-configuration'
import { createContext } from '../../context/create-context'
import { CustomURLSearchParams, MyContext } from '../../context/my-context'
import { CustomRequest } from '../../interfaces/user/custom-request'
import { PrismaService } from '../../lib/prisma/prisma.service'
import { UserWithAccessToken, UserWithoutSensitiveData } from '../../modules/user/user'
import { AccessTier } from '../api-config/access-tier'
import { CustomSessionType } from '../my-custom-request'
import { BodyContent, CustomRequestInit } from './custom-request-init'

export class YourRequestObject<T> {
  private readonly prismaService: PrismaService
  private readonly request: BodyInit | null | undefined
  readonly requestBody: BodyContent | null | undefined
  private readonly req: CustomRequest
  private readonly accessTier: AccessTier
  // private readonly session: CustomSessionType

  // accessTier?: AccessTier
  customProp: string
  headers: CustomContextHeaders
  query: Record<string, string>
  user: UserWithoutSensitiveData | null
  params: { [key: string]: string }
  customCache: CustomSessionType
  session: CustomSessionType
  accepts: CustomSessionType
  body: BodyInit | null | undefined
  URLSearchParams: CustomURLSearchParams

  constructor() {
    this.customProp = ''
    this.prismaService = prismaService
    this.req = {} as CustomRequest
    this.request = {} as URLSearchParams
    this.body = {} as BodyInit
    this.requestBody = {} as BodyContent
    this.headers = {}  as CustomContextHeaders// Initialize headers if necessary
    this.accessTier = {} as AccessTier
    this.params = {} as CustomSessionType
    this.query = {} as CustomSessionType
    this.user = {} as UserWithoutSensitiveData
    this.accepts = {} as CustomSessionType
    this.session = {} as CustomSessionType
    this.URLSearchParams = {} as CustomURLSearchParams
    this.customCache = {} as CustomSessionType
  }
}

const prismaService = new PrismaService()
const yourRequestObject = new YourRequestObject<CustomRequestInit>()

export interface CustomContextHeaders extends IncomingHttpHeaders {
  [key: string]: string | string[] | undefined
}

export interface CustomRequestWithContext<T> extends Omit<CustomSessionType, 'context'> {
  [key: string]: any // allow any additional properties
  id: string
  config: AppConfiguration
  user: UserWithAccessToken
  userId: CustomSessionType['userId']
  currentUser: UserWithAccessToken
  accessToken: string
  prisma: PrismaClient
  prismaService?: PrismaService
  destination: RequestDestination
  passwordHash?: string
  customProp?: string
  req: CustomRequest
  request: CustomRequest
  context: MyContext<UserWithoutSensitiveData>
  body: any
  token: string
  rawHeaders: string[]
  session: CustomSessionType
  cookies: { [key: string]: string }
  signedCookies: Record<string, string>
  cache: RequestCache
  headers: CustomContextHeaders
}

// Middleware function to attach our custom context to the request object
export const attachCustomContext = (): ((
  req: YourRequestObject<MyContext<{}>>,
  res: Response,
  next: NextFunction,
) => void) => {
  const customProp = 'example custom property'
  return (req: YourRequestObject<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.customProp = customProp
    next()
  }
}

export function createCustomContextWithRequest(prisma: PrismaClient, contextType: MyContext<{}>) {
  return async (req: CustomRequest<MyContext<{}>>, res: Response, next: NextFunction) => {
    req.prisma = prisma
    req.userId = req.currentUser?.id ?? undefined

    // Add null check
    const context = await createContext(prisma, req)
    if (context) {
      req.context = context.context as MyContext<{}>
    } else {
      req.context = {} as MyContext<{}>
    }

    req.context.accessToken = req.context?.accessToken ?? ''
    next()
  }
}
