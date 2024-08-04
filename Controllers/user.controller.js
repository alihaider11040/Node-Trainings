const User = require('../Models/userModel');


exports.CreateUser = async function (req,res) {

    const {username , email}= req.body;
    const user = new User({
        username,
        email
    })
}

exports.getUser = async function (req,res) {
    
} 

exports.getContact = async function (req,res) {

}

exports.getAbout = async function (req,res) {}

exports.getServices = async function (req,res) {}