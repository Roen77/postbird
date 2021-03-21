module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        content:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
    }, {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', // 한글 저장돼요
    });
  
    User.associate = (db) => {

    };
  
    return User;
  };
  