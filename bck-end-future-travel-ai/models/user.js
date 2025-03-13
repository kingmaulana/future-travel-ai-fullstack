import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // define association here
        }
    }
    
    User.init({
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    
    return User;
};
