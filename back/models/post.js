
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", { //MySQL에는 Posts로 저장됨
        // id는 기본적으로 들어가서 올라감
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: "utf8mb4", //utfmb4넣어주면 이모티콘도 가능
        collate: "utf8mb4_general_ci", //한글저장에 필요한 두가지
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User) //db.User 한개에 속해있다 //belongsTo는 ---- 만들어줌
        db.Post.hasMany(db.Comment)
        db.Post.hasMany(db.Image)
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }) //다대다 
        // 1:1 관계 hasone 사용자와 사용자의 정보는 1:1로 엮여있음. 그럴 땐 
        // 유저 : 해즈원(유저인포). 유저인포 : 빌롱스투(유저) 

        db.Post.belongsToMany(db.User, {through: 'Like', as: 'Likers'});

        //리트윗
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); //as로 별칭을 바꿔주면 위에 컬럼이 생길때 PostId가 아니라 RetweetId로 바뀜
    };
    return Post;
}