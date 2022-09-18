/**
 * 项目配置
 */
const default_cofig = {
  development: {
    port: 4000,
    jwt_config: {
      secret: 'thisisadevelopmenttokensecret',
      expire: 60 * 60 * 24 * 3
    },
    db_config: {
      host: 'localhost',
      database: 'blog',
      username: 'blog',
      password: '123456',
      port: 3306
    },
    crypt_config: {
      key: 'thisisadevelopmentkey'
    }
  },
  production: {
    port: 4001,
    jwt_config: {
      secret: 'asdasuioqweruynmzjxkhbasjkdauiqweqiopamsldjalkwqw',
      expire: 60 * 60 * 2
    },
    db_config: {
      host: 'xxx.xx.xx.xx',
      database: 'xxxxx',
      username: 'xxxxx',
      password: 'xxxxx',
      port: 'xxxx'
    },
    crypt_config: {
      key: 'oeaopnmkleinmjcxzyhuiwenhjkdfa'
    }
  }
}

export const config = default_cofig[process.env.NODE_ENV as string]
