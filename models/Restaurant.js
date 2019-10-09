// exporte table with all field
module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        // name of table
        "Restaurant",
        {
            // field name
            id: {
                //set data type with out max length
                type: Sequelize.DataTypes.INTEGER,
                // set primaryKey = true
                primaryKey: true,
                // set autoOncrement = true
                autoIncrement: true
            },
            RName: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
            RStreetNum: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(10),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },RStreet: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
            RCity: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
            RPostalCode: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(10),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
            Status: {
                //set data type with max length
                type: Sequelize.DataTypes.BOOLEAN,
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },

            RDescription: {
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: false
            },
            RLongitude: {
                //set data type with out  max length
                type: Sequelize.DataTypes.TEXT,
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: false,
            },
            RLatitude:{
                //set data type with out  max length
                type: Sequelize.DataTypes.TEXT,
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
            RContact:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(100),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },MapIcon:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(100),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },RPriceDes:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },RAddress:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(100),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },RMetro:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(100),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },RRecommendation:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(255),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },PlaceId:{
                //set data type with max length
                type: Sequelize.DataTypes.STRING(100),
                // setting allowNull to false will add NOT NULL to the column, which means an error will be if you add info in this column
                allowNull: true
            },
        },
        {
            /**
             * By default, Sequelize will add the attributes createdAt and updatedAt to your model so you will be able to know when the database entry went into the db and when it was updated last.
             */
            timestamps: true,
            /**
             * Sequelize allow setting underscored option for Model. When true this option will set the field option on all attributes to the underscored version of its name.
             * This also applies to foreign keys generated by associations.
             * */

            underscored: true
        }
    );
};

