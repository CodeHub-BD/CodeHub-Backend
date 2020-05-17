const catchAsync = require('./../utils/catchAsync');
const Problem = require('./../models/problemModel');

exports.add = catchAsync(async (req, res, next) => {
    const newProblem = await Problem.create({
        ...req.body
    });
    res.send(newProblem);
});

exports.update = catchAsync(async (req, res, next) => {

    res.send("updated " + req.params.id);
});

exports.delete = catchAsync(async (req, res, next) => {
    res.send("deleted " + req.params.id);
});

exports.get = catchAsync(async (req, res, next) => {
    res.send("problem " + req.params.id);
});

exports.getAll = catchAsync(async (req, res, next) => {
    res.send("allProblems");
});