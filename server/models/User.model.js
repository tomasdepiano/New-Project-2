import { DataTypes, Model } from "sequelize";
import util from "util";
import { db } from "../config/db.js";

export default class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highScore: {
      type: DataTypes.INTEGER,
    },
  },
  {
    modelName: "user",
    sequelize: db,
  }
);
