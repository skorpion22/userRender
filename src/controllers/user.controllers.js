const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    const users = await User.findAll()
    return res.json(users)
});

const create = catchError(async(req, res) => {
    const user = req.body

    const createUser = await User.create(user)
    return res.status(201).json(createUser)
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)
    return res.json(user)
});

const destroy = catchError(async(req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)
    await User.destroy({ where: { id }})
    return res.send('User Deleted').status(204)
});

const update = catchError(async(req, res) => {
    const { id } = req.params
    const { first_name, last_name, email, password, birthday } = req.body
    const newBody = { first_name, last_name, email, password, birthday }

    const user = await User.findByPk(id)
    if (!user) return res.sendStatus(404)

    const userUpdate = await User.update(
        newBody,
        { where: {id}, returning:true })

        return res.send(userUpdate )
});

module.exports = {
    getAll,
    create,
    getOne,
    destroy,
    update
}
