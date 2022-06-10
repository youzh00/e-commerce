const bcryptjs = require("bcryptjs");

const users = [
  {
    name: "admin inpt ",
    email: "admin.inpt@gmail.com",
    password: bcryptjs.hashSync("admininpt", 8),
    isAdmin: true,
  },
  {
    name: "youssef zahi",
    email: "youssef.zahi@gmail.com",
    password: bcryptjs.hashSync("youssefzahi", 8),
  },
  {
    name: "Hassan Almeftah",
    email: "hassan.almeftah@gmail.com",
    password: bcryptjs.hashSync("hassanalmeftah", 8),
  },
];
module.exports = users;
