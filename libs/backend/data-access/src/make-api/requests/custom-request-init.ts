import { User } from "@prisma/client"
import { ParsedQs } from "qs"
import { AppConfiguration } from "../../context/app-configuration"
import { CustomContextType } from "../../context/custom-context-type"
import { CustomSessionType } from "../my-custom-request"
import { YourRequestObject } from "./custom-request-with-context"

export interface CustomRequestInit extends RequestInit {
    user: User | null
    url?: string
    query?: ParsedQs
    params?: { [key: string]: string }
    get?: (name: string) => string | null | undefined
    accepts: (types: string | string[] | undefined) => (string | false | null)[] | undefined;
    customCache?: RequestCache
    session?: CustomSessionType
    body?: BodyInit | undefined
    signedCookies?: { [key: string]: string }
    context?: CustomContextType
    config?: AppConfiguration; 
    request: YourRequestObject<CustomRequestInit>
  }
  
  export interface CustomRequestInitWithGet extends CustomRequestInit {
    get?: (name: string) => string | null | undefined
  }
  