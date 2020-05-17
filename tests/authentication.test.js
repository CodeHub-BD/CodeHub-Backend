const request = require('supertest');
const app = require('./../testserver');
const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

let token = "";
let resetToken = "";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

const testUser = {
    _id: new mongoose.Types.ObjectId(),
    name: 'testuser',
    email: 'testuser@gmail.com',
    password: 'testuser',
    role: 'admin',
};


const setUp = async () => {
    await User.deleteMany();
    const response = await new User(testUser).save();
    token = signToken(testUser._id);
};


test('Should SignUp an User and Response 201', async () => {
    const newUser = {
        name: 'test',
        email: 'test@gmail.com',
        password: 'test',
        role: 'admin',
    };

    const response = await request(app)
        .post('/v1/users/signup')
        .send(newUser)
        .expect(201);

});

test('Should LogIn an User and Response 200', async () => {
    await setUp();
    const response = await request(app)
        .post('/v1/users/login')
        .send({
            email: testUser.email,
            password: testUser.password,
        })
        .expect(200);

});

test('Update Password and return 200 ', async () => {
    await setUp();
    const response = await request(app)
        .patch('/v1/users/updatePassword')
        .set('Authorization', `Bearer ${token}`)
        .send({
            passwordCurrent: testUser.password,
            password: testUser.password,
        })
        .expect(200);

});


test('Return Password Reset Token ,return 200 ', async () => {
    await setUp();
    const response = await request(app)
        .post('/v1/users/forgotPassword')
        .send({
            email: testUser.email,
        })
        .expect(200);
    resetToken = response.body.resetToken;

});

test('Reset Password with Reset Token ,return 200 ', async () => {

    const response = await request(app)
        .patch(`/v1/users/resetPassword/${resetToken}`)
        .send({
            email: testUser.email,
            password: "ababa",
        })
        .expect(200);
});


test('LogIn Failed with old password because of password is reset', async () => {
    const response = await request(app)
        .post('/v1/users/login')
        .send({
            email: testUser.email,
            password: testUser.password,
        })
        .expect(401);
});

test('LogIn Successful with new password because of password is reset', async () => {
    const response = await request(app)
        .post('/v1/users/login')
        .send({
            email: testUser.email,
            password: "ababa",
        })
        .expect(200);
});
