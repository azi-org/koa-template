/**
 * 用户模型
 */

import { DataTypes, Model, Optional } from 'sequelize'
import { dateFormat } from '../utils/common'
import { cryptoUtil } from '../utils/crypto'
import { sequelize } from '../utils/db'

export interface UserAttributes {
  id: number
  uuid: string
  username: string
  password: string
  nickname?: string
  email?: string
  gender?: number
  birthday?: Date
  company?: string
  brief?: string
  address?: string
  avatar?: string
  status: number
  is_admin?: number
  role: string
  created_at: Date
  updated_at: Date
}

export interface UserInput extends Optional<UserAttributes, 'id'> {}
export interface UserOutput extends Partial<UserAttributes> {}

export class User
  extends Model<UserAttributes, UserInput>
  implements UserAttributes
{
  public id!: number
  public uuid!: string

  public username!: string
  public password!: string
  public email?: string

  public nickname?: string
  public gender?: number
  public birthday?: Date
  public brief?: string
  public address?: string
  public avatar?: string
  public company?: string

  public status!: number
  public is_admin?: number
  public role!: string

  public created_at!: Date
  public updated_at!: Date
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      comment: '主键'
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      comment: '唯一键'
    },
    username: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: 'username',
      comment: '账号 6-10'
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(this, value: string) {
        this.setDataValue('password', cryptoUtil.encode(value))
      },
      comment: '密码'
    },
    email: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '邮箱'
    },
    nickname: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '昵称'
    },
    gender: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '性别 0 神秘 1 男 2 女'
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '生日',
      get() {
        return dateFormat(this.getDataValue('birthday'))
      }
    },
    brief: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '简介'
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '地址'
    },
    avatar: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: '头像'
    },
    company: {
      type: DataTypes.STRING(30),
      allowNull: true,
      comment: '公司'
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    is_admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'OrdinaryUser'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dateFormat(this.getDataValue('created_at'))
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        return dateFormat(this.getDataValue('updated_at'))
      }
    }
  },
  {
    sequelize: sequelize
  }
)
