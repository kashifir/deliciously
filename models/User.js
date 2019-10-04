module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "user",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.DataTypes.STRING(60)
            },
            nom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            prenom: {
                type: Sequelize.DataTypes.STRING(60),
                allowNull: false
            },
            image:{
                type: Sequelize.DataTypes.TEXT
            },
            USex:{
               type: Sequelize.DataTypes.STRING(60)
            },
            Status:{
                type: Sequelize.DataTypes.INTEGER(11)
            },
            Nationalite:{
                type: Sequelize.DataTypes.STRING(100)
            },
            date_de_naissance:{
                type: Sequelize.DataTypes.DATE
            },
            email:{
                type: Sequelize.DataTypes.TEXT,
                allowNull: false
            },
            password: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

