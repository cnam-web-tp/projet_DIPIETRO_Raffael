import { sequelize } from '#database/sequelize'
import { DataTypes, Model } from 'sequelize'

export class Products extends Model {
  declare productId: number
  declare name: string
  declare description: string
  declare price: number
  declare imageName: string
}

Products.init(
  {
    productId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Products',
    sequelize,
  }
)
