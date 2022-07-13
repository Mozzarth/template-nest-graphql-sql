import { UserModule } from './app/user/shared/infrastructure/user.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { appConfigSchema } from './config/app.schema';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import ormconfig from './ormconfig';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
      validationSchema: appConfigSchema,
    }),

    TypeOrmModule.forRoot(ormconfig),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
