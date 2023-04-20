import { CommunicationModule } from '@appository/backend/communication'
import {
  LoggingModule,
  PermissionsModule,
  PrismaModule,
  // PrismaService,
  UserModule
} from '@appository/backend/data-access'
// import { CoreModule } from '@appository/core'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const permissionsEnabled= true

@Module({
  imports: [
    UserModule,
    CommunicationModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: (): GqlModuleOptions => ({
        autoSchemaFile: join(process.cwd(), 'libs/backend/data-access/src/graphql/schema.graphql'),
      }),
    }),
    PrismaModule,

    LoggingModule,//todo set up to be used
    PermissionsModule.forRoot(permissionsEnabled),
  ],
  controllers: [AppController],
  providers: [AppService,
    // PrismaService, removing
    // ContextService removing
  ],
})
export class AppModule {}
