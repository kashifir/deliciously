module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "Icon",
        {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            icon: {
                type: Sequelize.DataTypes.STRING(255),
                allowNull: false
            },
            Status:{
                type: Sequelize.DataTypes.INTEGER(11),
                allowNull: false
            }

        },
        {
            timestamps: true,
            underscored: true
        }
    );
}

