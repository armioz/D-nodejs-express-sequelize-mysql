const db = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const roles = await db.role.findAll();
      return res.json(roles);
    } catch (e) {
      return res
        .status(500)
        .json({ message: "Cannot get data from database." });
    }
  },
  store: async (req, res) => {
    const data = req.body;
    if (data) {
      try {
        const role = await db.sequelize.transaction((t) => {
          return db.role.create(data, { transaction: t });
        });
        return res.status(201).json(role);
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
        return db.role.update(data, { where: { id } }, { transaction: t });
      });
      return res.json(data);
    }
    return res.status(400).json({ message: "Bad request." });
  },
  destroy: async (req, res) => {
    const id = req.params.id;
    if (id) {
      try {
        await db.role.destroy({ where: { id } });
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
