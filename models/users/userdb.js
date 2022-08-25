const {DataTypes} = require('sequelize')
const crypto = require('crypto');
const connection = require('../../config/dbconfig')

const algorithm = 'aes-256-cbc';
const secret_key = crypto.randomBytes(32);
const initial_vector = crypto.randomBytes(16);

const Users = connection.define("Users",{
    pk: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey : true
    },
    name: {
        type: DataTypes.STRING,
        field: 'Name'
    },
    username: {
        type: DataTypes.STRING,
        field: 'Username',
        unique: true,
        validate: {
            len:[6,12]
        }
    },
    email: {
        type: DataTypes.STRING,
        filed: 'Email',
        unique: true,
        validate:{
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        filed: 'password',
        //Minimum eight characters, at least one letter, one number and one special character
        validate: {
             // matches this RegExp
            //is: "\"^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$\""
        },
        set(value){
            let cipher = crypto.createCipheriv(algorithm,Buffer.from(secret_key),initial_vector)
            let encrypted = cipher.update(value)
            encrypted = Buffer.concat([encrypted,cipher.final()])
            this.setDataValue('password',encrypted.toString('hex'))
        },
        get(){
            let value = this.getDataValue('password');
            let encrypted_text = Buffer.from(value,'hex');
            let decipher = crypto.createDecipheriv(algorithm,Buffer.from(secret_key),initial_vector)
            let decrypted = decipher.update(encrypted_text)
            decrypted = Buffer.concat([decrypted,decipher.final()])
            return decrypted.toString();
        }
    }
})

module.exports = Users