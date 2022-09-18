import { DataTypes, Model, Optional } from 'sequelize'
import { dateFormat } from '../utils/common'
import { sequelize } from '../utils/db'

export interface TagAttributes {
  id: number
  name: string
  desc: string
  status: number
  created_at: Date
  updated_at: Date
}

export interface TagInput extends Optional<TagAttributes, 'id'> {}
export interface TagOut extends Required<TagAttributes> {}

export class Tag
  extends Model<TagAttributes, TagInput>
  implements TagAttributes
{
  public id!: number
  public name!: string
  public desc!: string
  public status!: number

  public created_at!: Date
  public updated_at!: Date
}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '主键'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '标签名'
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: '标签描述'
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      comment: '状态 0 禁用 1 启用'
    },
    created_at: {
      type: DataTypes.DATE,
      get() {
        return dateFormat(this.getDataValue('created_at'))
      }
    },
    updated_at: {
      type: DataTypes.DATE,
      get() {
        return dateFormat(this.getDataValue('updated_at'))
      }
    }
  },
  {
    sequelize: sequelize
  }
)
