module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "user",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING
            },
            prenom: {
                type: Sequelize.DataTypes.STRING
            },
            email: {
                type: Sequelize.DataTypes.STRING
            },
            password: {
                type: Sequelize.DataTypes.STRING,
                SELECT: false
            },
        },
        {
            timestamps: false,
            underscored: true
        }
    );
}

