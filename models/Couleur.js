module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "Couleur",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            couleur: {
                type: Sequelize.DataTypes.STRING(255)
            },
        },
        {
            timestamps: false,
            underscored: true
        }
    );
}

