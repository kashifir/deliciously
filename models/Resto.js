module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "resto",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom_resto: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            sous_titre: {
                type: Sequelize.DataTypes.STRING(255)
            },
            description:{
                type: Sequelize.DataTypes.TEXT
            },
            num_rue: {
                type: Sequelize.DataTypes.STRING(10),
                allowNull: false
            },
            nom_rue: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            cp: {
                type: Sequelize.DataTypes.INTEGER(5),
                allowNull: false
            },
            ville: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            contact:{
                type: Sequelize.DataTypes.TEXT
            },
            mapicon:{
                type: Sequelize.DataTypes.TEXT
            },
            phrase_prix: {
                    type: Sequelize.DataTypes.STRING(255)
            },
            recommandation:{
                type: Sequelize.DataTypes.STRING(255)
            },
            horaires:{
                type: Sequelize.DataTypes.JSON
            },
            longitude:{
                type: Sequelize.DataTypes.TEXT
            },
            latitude:{
                type: Sequelize.DataTypes.TEXT
            },
            placeId:{
                type: Sequelize.DataTypes.TEXT
            },
            metro:{
                type: Sequelize.DataTypes.TEXT
            },
            Status:{
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false
            },
            isActive: {
                type: Sequelize.DataTypes.BOOLEAN
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

