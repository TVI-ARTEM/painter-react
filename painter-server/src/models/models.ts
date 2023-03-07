import {STRING} from "sequelize";

const sequelize = require('../db')
const {DataTypes} = require('sequelize')

export const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nickname: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

export const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    width: {type: DataTypes.INTEGER},
    frameJson: {type: DataTypes.TEXT},
    description: {type: DataTypes.TEXT},
    published: {type: DataTypes.BOOLEAN}
})

export const Preview = sequelize.define('preview', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    preview: {type: DataTypes.TEXT},
    gif: {type: DataTypes.TEXT},
})

export const Tag = sequelize.define('tag', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
})

export const Like = sequelize.define('like', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
})


User.hasMany(Project)
Project.belongsTo(User)

Project.hasMany(Tag)
Tag.belongsTo(Project)

Project.hasMany(Preview)
Preview.belongsTo(Project)


Project.hasMany(Like)
Like.belongsTo(Project)

User.hasMany(Like)
Like.belongsTo(User)

module.exports = {
    User,
    Project,
    Preview,
    Tag,
    Like
}