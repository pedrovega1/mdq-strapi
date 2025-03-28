export default ({
  env,
}: {
  env: {
    (key: string, defaultValue?: string | number | boolean): string | number | boolean;
    int: (key: string, defaultValue?: number) => number;
    array: (key: string, defaultValue?: string[]) => string[];
  };
}) => ({
  host: env('HOST', '0.0.0.0') as string,
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
