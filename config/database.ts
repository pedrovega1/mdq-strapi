import path from 'path';

export default ({
  env,
}: {
  env: {
    (key: string, defaultValue?: string | number | boolean | undefined): string | number | boolean | undefined;
    int: (key: string, defaultValue?: number) => number;
    bool: (key: string, defaultValue?: boolean) => boolean;
  };
}) => {
  const client = env('DATABASE_CLIENT', 'sqlite') as 'mysql' | 'postgres' | 'sqlite';

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', 'localhost') as string,
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi') as string,
        user: env('DATABASE_USERNAME', 'strapi') as string,
        password: env('DATABASE_PASSWORD', 'strapi') as string,
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              key: env('DATABASE_SSL_KEY') as string | undefined,
              cert: env('DATABASE_SSL_CERT') as string | undefined,
              ca: env('DATABASE_SSL_CA') as string | undefined,
              capath: env('DATABASE_SSL_CAPATH') as string | undefined,
              cipher: env('DATABASE_SSL_CIPHER') as string | undefined,
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            }
          : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL') as string,
        host: env('DATABASE_HOST', 'localhost') as string,
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi') as string,
        user: env('DATABASE_USERNAME', 'strapi') as string,
        password: env('DATABASE_PASSWORD', 'strapi') as string,
        ssl: env.bool('DATABASE_SSL', false)
          ? {
              key: env('DATABASE_SSL_KEY') as string | undefined,
              cert: env('DATABASE_SSL_CERT') as string | undefined,
              ca: env('DATABASE_SSL_CA') as string | undefined,
              capath: env('DATABASE_SSL_CAPATH') as string | undefined,
              cipher: env('DATABASE_SSL_CIPHER') as string | undefined,
              rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
            }
          : false,
        schema: env('DATABASE_SCHEMA', 'public') as string,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', '..', env('DATABASE_FILENAME', '.tmp/data.db') as string),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
