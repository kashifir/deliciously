module.exports = (sequelize, Sequelize) => {
    return sequelize.define(
        "userhastype",
        {
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

