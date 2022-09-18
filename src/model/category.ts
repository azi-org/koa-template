/**
 * 分类模型
 */

import { DataTypes, Model, Optional } from 'sequelize'
import { dateFormat } from '../utils/common'
import { sequelize } from '../utils/db'

export interface CategoryAttributes {
  id: number
  name: string
  desc: string
  status: number
  type: string
  created_at: Date
  updated_at: Date
}

export interface CategoryInput extends Optional<CategoryAttributes, 'id'> {}
export interface CategoryOutput extends Required<CategoryAttributes> {}

export class Category
  extends Model<CategoryAttributes, CategoryInput>
  implements CategoryAttributes
{
  public id!: number
  public name!: string
  public desc!: string
  public status!: number
  public type!: string
  public created_at!: Date
  public updated_at!: Date
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'catename'
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      comment: '状态 0 禁用 1 正常'
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
