const { DataTypes } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", { //MySQL에는 users로 저장됨
        // id는 기본적으로 들어가서 올라감. 아래는 필수
        email: {
            type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
            allowNull: false, // false 가 필수
            unique: true, // 고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, // false 가 필수
        },
        password: {
            type: DataTypes.STRING(100), // 비밀번호는 암호화를 하기 때문에 길이를 길게
            allowNull: false, // false 가 필수
        },
    }, {
        charset: "utf8",
        collate: "utf8_general_ci", //한글저장에 필요한 두가지
    });

    // 관계
    User.associate = (db) => {
        db.User.hasMany(db.Post); //하나의 User에 여러 Post가 연결되어있다 
        db.User.hasMany(db.Comment)

    };
    return User;
}