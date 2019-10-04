module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "favoris",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            Status: {
                type: Sequelize.DataTypes.INTEGER(11)
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

