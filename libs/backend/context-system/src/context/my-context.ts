
// import { UserService, UserWithoutSensitiveData } from '@appository/backend/users';
// import { CustomRequestInit, CustomSessionType } from '@appository/backend/request-options';
import { PrismaClient } from '@prisma/client';
import { IncomingMessage } from 'http';
// import { BodyContent } from '@appository/backend/request-options';
import { URLSearchParams } from 'url';
import { AppConfiguration } from '../../../../app-configuration-system/src/app-configuration.service';
import { CustomContextType } from './custom-context-type';
 
// import { UserWithAccessToken } from '@appository/backend/users';


export interface CustomURLSearchParams extends URLSearchParams {
  append: (key: string, value: string) => void;
  delete: (name: string) => void;
  get:(name: string) => string | null
  getAll: (name: string) => string[];
  has: (name: string) => boolean;
  set: (name: string, value: string) => void;
  sort: () => void;
  forEach(callback: (value: string, name: string, searchParams: CustomURLSearchParams) => void): void;
  entries(): IterableIterator<[string, string]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string>;
  getSetCookie(): string[];
  [Symbol.iterator](): IterableIterator<[string, string]>;
  }



export interface MyContext<T = {}> extends Record<string, unknown> {
  config?: AppConfiguration
  user: UserWithoutSensitiveData
  currentUser?: UserWithAccessToken | UserWithoutSensitiveData | null | undefined;
  ctx: CustomContextType;
  customProp?: string | undefined
  req?: IncomingMessage
  request: YourRequestObject<CustomRequestInit>
  body: BodyInit | null | undefined;
  requestBody: BodyContent | null | undefined 
  id?: string
  url: string
  size: number
  prisma?: PrismaClient
  userId?: string | undefined | null
  userService: UserService
  accessToken: string | null
  session: CustomSessionType
  cache?: RequestCache
  cookie?: string
  token?: string
  cookies?: Record<string, string>
  signedCookies: Record<string, string>,
  URLSearchParams: CustomURLSearchParams
  entries: () => IterableIterator<[string, string]>
  keys: () => IterableIterator<string>;
  values: () => IterableIterator<string>;
  append: (key: string, value: string) => void
  has:  (key: string) => boolean
  set: (key: string, value: string) => void
  sort: (key: string, value: string) => void
  forEach: (callback: (value: string, name: string, parent?: Headers | CustomURLSearchParams | undefined) => void) => void
  delete: (name: string) => void
  getAll: (name: string[]) => string[]
  get?: (name: string) => string | null | undefined
  accepts: (types: string | string[] | undefined) => (string | false | null)[] | undefined
  [Symbol.iterator](): IterableIterator<[string, string]>;
}  

const myContext = {} as MyContext
const myContextInstance = myContext
myContextInstance[Symbol.iterator] = function* () {
  for (const [key, value] of Object.entries(this)) {
    if (typeof value === 'string') {
      yield [key, value]
    }
  }
}
