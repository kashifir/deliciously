module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "Avis",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            type: {
                type: Sequelize.DataTypes.STRING(255)
            },
            type_probleme: {
                type: Sequelize.DataTypes.STRING(255)
            },
            commentaire: {
                type: Sequelize.DataTypes.STRING(255)
            },

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

