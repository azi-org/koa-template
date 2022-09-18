/**
 * 数据库连接
 */
import * as Sequelize from 'sequelize'
import { config } from '../config'
import { logger } from '../middleware/logger'

logger.info('init sequelize...')
console.log(config)
const { db_config } = config
export const sequelize = new Sequelize.Sequelize(
  db_config.database,
  db_config.username,
  db_config.password,
  {
    host: db_config.host,
    dialect: 'mysql',
    port: db_config.port,
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
    logging: false,
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
)

sequelize.sync({
  alter: process.env.NODE_ENV === 'development'
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('************Connection has been established**************')
//     console.log('*******************即将退出**************')
//     process.exit()
//   })
//   .catch((err: any) => {
//     console.log('连接失败:', err.message)
//   })
