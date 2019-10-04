module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "liste",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,   
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(255)
            },
        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

