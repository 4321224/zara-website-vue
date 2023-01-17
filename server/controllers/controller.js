const { User, Category, Product, History } = require("../models");

class Controller {
  static async home(req, res, next) {
    try {
      res.status(401).json({ message: "Unauthorization" });
    } catch (error) {
      next(error);
    }
  }

  static async readAll(req, res, next) {
    try {
      // console.log(req.user, "<<< req user dari authen")
      let product = await Product.findAll({
        include: [User, Category],
        order: [["createdAt", "DESC"]],
      });
      if (!product) throw { name: "Product Not Found" };
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategory(req, res, next) {
    try {
      let category = await Category.findAll();
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryById(req, res, next) {
    try {
      let category = await Category.findByPk(req.params.id);
      if (!category) throw { name: "Not Found" };
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const { name } = req.body;
      await Category.create({ name });

      res.status(201).json({ message: " category created successfully" });
    } catch (error) {
      next(error);
    }
  }

  static async getProductById(req, res, next) {
    try {
      let product = await Product.findByPk(req.params.id, {
        include: [User, Category],
      });

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      // console.log(req.user, "ini req user");
      let { id } = req.user;
      let { name, description, price, stock, imgUrl, categoryId } = req.body;
      // console.log(req.body, " <<<");
      // console.log(req.body.categoryId, ">>>>");
      // const {id} = req.user
      let data = await Product.create({
        name: name,
        description: description,
        price: price,
        stock: stock,
        imgUrl: imgUrl,
        status: "active",
        authorId: +id,
        categoryId: +categoryId,
      });
      await History.create({
        name: req.body.name,
        description: `product with id ${data.id} name ${data.name} created`,
        updateBy: req.user.name,
      });
      // console.log(data, "ini data add");
      res.status(201).json({
        code: 201,
        message: `${data.name} successfull added`,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteData(req, res, next) {
    try {
      let data = await Product.findByPk(req.params.id);
      if (!data) throw { name: "Not Found" };
      await Product.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: ` ${data.name} successfull to delete` });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      // console.log(req.params, "<<-- ini req dari params");
      // console.log(req.body, "<<< req.body");
      let { name, description, price, stock, imgUrl, categoryId, status } =
        req.body.data;
      let id = req.params.id;
      let data = await Product.update(
        {
          name,
          description,
          price,
          stock,
          imgUrl,
          categoryId,
          status,
        },
        {
          where: {
            id: +req.params.id,
          },
        }
      );
      // console.log(req.body.data, " <<<ini data server");
      if (!data) {
        throw "product not found";
      }

      // console.log(req.body, "ini req body <<<<", req.params, "<== ini");
      await History.create({
        name: req.body.data.name,
        description: `product with id ${req.params.id} name ${req.body.data.name} edited`,
        updateBy: req.user.name,
      });
      // console.log(req.body, req.user, "ini req update");
      res
        .status(200)
        .json({ message: `product with id ${req.params.id} can edited` });
    } catch (error) {
      console.log(error, "error dari edit nih");
      next(error);
    }
  }

  static async statusProduct(req, res, next) {
    try {
      // console.log(req.body, "<<<<< ini harusnya status");
      let { status } = req.body;
      let { id } = req.params;
      // console.log(status, id, "ini status");
      let data = await Product.update(
        {
          status,
        },
        {
          where: {
            id: +id,
          },
          returning: true,
        }
      );
      // console.log(data[1][0], "ini data");
      if (!data) {
        throw "data not found";
      }
      if (!id) {
        throw "id not found";
      }
      // console.log(req.user, "<<<<", ">>>", req.body, "ini dari update status");
      await History.create({
        name: data[1][0].name,
        description: `product with id ${req.params.id} ${data[1][0].status}`,
        createdBy: data[1][0].createdAt,
        updateBy: req.user.name,
      });
      res.status(200).json({ message: `product ${req.body.status}` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async readHistory(req, res, next) {
    try {
      let data = await History.findAll({
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (err) {
      // console.log(err, "ini error history");
      next(err);
    }
  }

  static async deleteTabel(req, res, next) {
    try {
      let data = await Category.findByPk(req.params.id);
      if (!data) throw { name: "Not Found" };
      await Category.destroy({
        where: { id: req.params.id },
      });
      res.status(200).json({ message: `${data.name} successfull to delete` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
