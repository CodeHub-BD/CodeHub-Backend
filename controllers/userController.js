const User = require('./../models/userModel');

exports.CreateUser = async (req, res) => {
  try {
    const testUser = new User({
      name: 'ab1234',
      email: '1234@gmail.com',
      password: 'dddd20ss',
    });

    // const testUser = new User({
    //     name: req.body.name,
    //     email: req.body.email,
    //     password: req.body.password,
    //   });

    testUser
      .save()
      .then((doc) => {
        console.log(doc);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send('done');
  } catch (err) {
    console.log(err);
  }
};
