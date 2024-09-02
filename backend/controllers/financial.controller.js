const Financial = require("../modles/financial.model");

//create a new financial record

exports.create = async (req, res) => {
    const { userID, date, description, amount, category, paymentMethod } = req.body;
    const newRecord = {
        userID,
        date,
        description,
        amount,
        category,
        paymentMethod
    };
    await Financial.create(newRecord).then((data) => {
        res.send(data);
    }).catch((error) => {
        res.status(500).send({
            message:
                error.message ||
                "Something error occurred while creating the Financial Record.",
        });
    });

}

//getAll
exports.getAll = async (req, res) => {
    await Financial.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((error) => {
            res.status(500).send({
                message:
                    error.message ||
                    "Something error occurred while creating the Financial.",
            });
        });
};

//getId
exports.getById = async (req, res) => {
    const id = req.params.id;
    await Financial.findByPk(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No found Financial with id " + id });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the Financial.",
        });
      });
  };

//Get byAllByUserId
exports.findAllByUserId = async (req, res) => {
    const userID = req.params.userID;
    await Financial.findAll({where:{userID:userID}})
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "No fond Finacial with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something error occured while creating the record.",
        });
      });
  };
  
  //Update
exports.update = async (req, res) => {
    const id = req.params.id;
    await Financial.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Financial was update successfully" });
        } else {
          res.send({
            message:
              "Cannot update Financial with id" +
              id +
              ". Maybe Financial was not found or res.body is empty!",
          });
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.massage ||
            "Somthing error occured while creating the Financial.",
        });
      });
  };
  
  // Delete
  exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
      const num = await Financial.destroy({
        where: { id: id },
      });
  
      if (num === 1) {
        res.send({ message: "RestaFinancialurant was deleted successfully" });
      } else {
        res.send({
          message: "Cannot delete Financial with id=" + id + ".",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Error deleting Financial with id=" + id,
        error: error.message,
      });
    }
  };