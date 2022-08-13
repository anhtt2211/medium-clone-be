import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config: ConnectionOptions = {
  type: 'postgres',
  name: 'default',
  host: process.env.PG_HOST,
  port: Number(process.env.PG_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: false,
  logging: true,
  entities: ['dist/orm/entities/**/*.js'],
  // entities: ['src/orm/entities/**/*.ts', './dist/orm/entities/**/*.js'],
  migrations: ['src/orm/migrations/**/*.ts'],
  subscribers: ['src/orm/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/orm/entities',
    migrationsDir: 'src/orm/migrations',
    subscribersDir: 'src/orm/subscriber',
  },
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  url: process.env.PG_URL,
  namingStrategy: new SnakeNamingStrategy(),
};

export = config;
