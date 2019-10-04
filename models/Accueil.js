module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "accueil",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            phrase: {
                type: Sequelize.DataTypes.STRING(255)
            },
            image: {
                type: Sequelize.DataTypes.STRING(255)
            },

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

