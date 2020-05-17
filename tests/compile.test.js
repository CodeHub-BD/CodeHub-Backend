const request = require('supertest');
const app = require('./../testserver');
const User = require('./../models/userModel');
const Submission = require('./../models/submissionModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

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

let token = "";
beforeEach(async () => {
  await User.deleteMany();
  await Submission.deleteMany();
  const response = await new User(testUser).save();
  token = signToken(testUser._id);
  // console.log(token);

})



test('Should response back 200 code', async () => {
  const code = {
    sourceCode:
      '#include<bits/stdc++.h> \n using namespace std; int main() {return 0;}',
    language: 'cpp',
  };
  const response = await request(app)
    .post('/v1/submission')
    .set('Authorization', `Bearer ${token}`)
    .send(code)
    .expect(200);
});

test('Should response back 200 code and hello\n', async () => {
  const code = {
    sourceCode:
      '#include<bits/stdc++.h> \n using namespace std; int main() {cout<<"hello"<<endl; \nreturn 0;}',
    language: 'cpp',
  };
  const response = await request(app)
    .post('/v1/submission')
    .set('Authorization', `Bearer ${token}`)
    .send(code)
    .expect(200);
  expect(response.body.output).toBe('hello\n');
});

test('Should response back 500 and TLE', async () => {
  const code = {
    sourceCode:
      '#include<bits/stdc++.h> \n using namespace std; int main() {while(1){} \nreturn 0;}',
    language: 'cpp',
  };
  const response = await request(app)
    .post('/v1/submission')
    .set('Authorization', `Bearer ${token}`)
    .send(code)
    .expect(500);
  expect(response.body.message).toBe('Time Limit Exceeded');
});

test('Should response back 500 with Compilation Error', async () => {
  const code = {
    sourceCode:
      '#include<bits/stdc++.h> \n using namespace std; int main() {b=0; \nreturn 0}',
    language: 'cpp',
  };
  const response = await request(app)
    .post('/v1/submission')
    .set('Authorization', `Bearer ${token}`)
    .send(code)
    .expect(500);
  const val = response.body.message.includes('Compilation Error');
  expect(val).toBe(true);
});

test('Should response back 500 with Output Length Exceeded', async () => {
  const code = {
    sourceCode:
      '#include<bits/stdc++.h> \n using namespace std; int main() {while(1){cout<<"Hello"<<endl;} \nreturn 0;}',
    language: 'cpp',
  };
  const response = await request(app)
    .post('/v1/submission')
    .set('Authorization', `Bearer ${token}`)
    .send(code)
    .expect(500);
  expect(response.body.message).toBe('Output Length Exceeded');
});
