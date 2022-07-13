// import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const srcPath = __dirname;

dotenv.config();

const ormconfig: ConnectionOptions & { seeds: string[]; factories: string[] } =
  {
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
    entities: [srcPath + '/**/*.entity{.ts,.js}'],
    migrations: [srcPath + '/database/migrations/**/*{.ts,.js}'],
    seeds: [],
    factories: [],
    //   seeds: [__dirname + '/database/seeds/*{.ts,.js}'],
    //   factories: [__dirname + '/database/factories/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/database/migrations',
    },
  };

export default ormconfig;
