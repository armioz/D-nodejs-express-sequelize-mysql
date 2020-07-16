const db = require("../models");
const valid = require("../valid/validData");
const util = require("../encryp/utils");
const checkRole = async (data) => {
  const role = await db.role.findAll({ where: { id: data.roleId } });
  return role[0];
};
module.exports = {
  get: async (req, res) => {
    try {
      if (req.params.id) {
        const user = await db.user.findAll({
          where: { id: req.params.id },
          attributes: ["id", "email", "createdAt", "updatedAt"],
          include: [
            {
              model: db.role,
            },
          ],
        });
        res.json({ user });
      } else {
        const users = await db.user.findAll({
          attributes: ["id", "email", "createdAt", "updatedAt"],
          include: [
            {
              model: db.role,
            },
          ],
        });
        res.json({ users });
      }
    } catch (e) {
      console.log(e);
      //   badReq(res, "can not get data from database.");
    }
  },
  getInfo: async (req, res) => {
    const id = util.userIdFromToken(req);
    try {
      const user = await db.user.findAll({
        where: { id },
        attributes: ["id", "email", "createdAt", "updatedAt"],
        include: [
          {
            model: db.role,
          },
        ],
      });
      res.json({ user });
    } catch (e) {
      console.log(e);
      valid.badReq(res, "can not get data from database.");
    }
  },
  index: async (req, res) => {
    try {
      const users = await db.user.findAll();
      return res.json(users);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Cannot get data from database." });
    }
  },
  store: async (req, res) => {
    const data = req.body;
    const { error } = valid.createUser(data);
    if (error) {
      console.log("error valid user");

      return valid.badReq(res, error.details[0].message);
    }
    const role = await checkRole(data);
    if (!role) {
      console.log("error role not exits");

      return valid.badReq(res);
    }
    const hashedPass = await util.genHashPassword(req.body.password);
    data.password = hashedPass;
    if (data) {
      try {
        const user = await db.sequelize.transaction((t) => {
          return db.user.create(data, { transaction: t });
        });
        return res.status(201).json(user);
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Cannot store data to database." });
      }
    }
    return res.status(400).json({ message: "Bad request." });
  },
  update: async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if (id && data) {
      await db.sequelize.transaction((t) => {
        return db.user.update(data, { where: { id } }, { transaction: t });
      });
      return res.json(data);
    }
    return res.status(400).json({ message: "Bad request." });
  },
  destroy: async (req, res) => {
    const id = req.params.id;
    if (id) {
      try {
        await db.user.destroy({ where: { id } });
        return res.status(204).send();
      } catch (e) {
        return res
          .status(500)
          .json({ message: "Cannot remove data from database." });
      }
    } else {
      return res.status(400).json({ message: "Bad request." });
    }
  },
};
