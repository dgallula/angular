const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'israelshop'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

///////// handle external api call

const loginUser = (username, password) => {
  let response = {};
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], function(err, res, fields) {
    if(err) {
      reject(err);
    } else {
      if (res.length > 0) {
        console.log('res.length > 0:', res.length);
        response = {"success": true, "data": res[0], error: ''};
			} else {
        response = {"success": false, "data": {}, error: 'Incorrect Username and/or Password.'};
			}
      resolve(response);
    }
  });
});
};

const createUser = (user) => {
  let response = {};
  return new Promise((resolve, reject) => {
   connection.query('INSERT INTO users SET ?', user, (err, res) => {
    if(err) {
      reject(err);
    } else {
      if (res.affectedRows > 0) {
        console.log('res:', res);
        console.log('res.length > 0:', res.affectedRows);
        console.log('result.insertId: ', res.insertId);
        response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
      } else {
        response = {"success": false, "data": {}, error: 'Error when trying to create a new user.'};
      }
      resolve(response);
    }
  });
});
};

const updateProduct = (product) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = "UPDATE products SET name = ? , price = ? , img = ? , category_id = ?  WHERE id = ?";
    let data = [product.name, product.price, product.img, product.category_id, product.id];
    connection.query(sql, data, function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to update a product.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

const createProduct = (product) => {
  let response = {};
  return new Promise((resolve, reject) => {
  connection.query('INSERT INTO products SET ?', product, (err, res) => {
    if(err) {
      reject(err);
    } else {
      if (res.affectedRows > 0) {
        console.log('res:', res);
        console.log('res.length > 0:', res.affectedRows);
        console.log('result.insertId: ', res.insertId);
        response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
      } else {
        response = {"success": false, "data": {}, error: 'Error when trying to create a new product.'};
      }
      resolve(response);
    }
 });
});
};

const getProductByCategoryId = (categoryId) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM products WHERE category_id = ?';
    connection.query(sql, [categoryId], function (err, res) {
      if(err) {
        reject(err);
      } else {
        console.log('res 22:', res);
        console.log('res.length > 0:', res.length);
        if (res.length > 0) {
          console.log('res.length > 0 555:', res.length);
          response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'no product found.'};
        }
        resolve(response);
      }
   });
 });
};

const getAllProducts = () => {
  let response = {};
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM products", function (err, res, fields) {
      if(err) {
        reject(err);
      } else {
        console.log('res 22:', res);
        console.log('res.length > 0:', res.length);
        if (res.length > 0) {
          console.log('res.length > 0 555:', res.length);
          response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'no products found.'};
        }
        resolve(response);
      }
   });
 });
};

const generateOrder = (orderProductIds) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT totalPrice FROM products WHERE id = ?';
    connection.query(sql, [orderProductIds], function (err, res) {
      if(err) {
        reject(err);
      } else {
        console.log('res 22:', res);
        console.log('res.length > 0:', res.length);
        if (res.length > 0) {
          console.log('res.length > 0 555:', res.length);
          response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to create a new order.'};
        }
        resolve(response);
      }
 });
});
};


const createNewCart = (cart) => {
  let response = {};
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO carts SET ?', cart, (err, res) => {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to creat new cart.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

checkIfProductsInCart = (cartId) => {
  console.log('cartId 22:', cartId);
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM cartarticles WHERE cart_id  = ?';
    connection.query(sql, [cartId], function (err, res) {
      if(err) {
        reject(err);
      } else {
        console.log('res 22:', res);
        console.log('res.length > 0:', res.length);
        if (res.length > 0) {
          console.log('res.length > 0 555:', res.length);
          response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'no open cart exist.'};
        }
        resolve(response);
      }
   });
 });
};

checkIfProductInCart = (productId, cartId) => {
  console.log('productId 22:', productId);
  console.log('cartId 22:', cartId);
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM cartarticles WHERE product_id = ? AND cart_id = ?';
    connection.query(sql, [productId, cartId], function (err, res) {
      if(err) {
        console.log('err 22:', err);
        reject(err);
      } else {
        console.log('res 22:', res);
        console.log('res.length > 0:', res.length);
        if (res.length > 0) {
          console.log('res.length > 0 44444:', res.length);
          response = {"success": true, "data": res, error: ''};
        } else {
          console.log('res 23:', res);
          response = {"success": false, "data": {}, error: 'no product with this id in cart.'};
        }
        resolve(response);
      }
   });
 });
};

const updateProductToCurrentCart = (newQuantity, newPrice, productId) => {
  console.log('newQuantity:', newQuantity);
  console.log('newPrice:', newPrice);
  console.log('productId:', productId);
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = "UPDATE cartarticles SET quantity = ? , totalPrice = ? WHERE id = ?";
    let data = [newQuantity, newPrice, productId];
    connection.query(sql, data, function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to update product to current cart.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

const addProductToCurrentCart = (object) => {
  let response = {};
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO cartarticles SET ?', object, (err, res) => {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0 11111:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to add product to current cart.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

const checkIfOpenCartExist = (userId) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM carts WHERE userId = ? AND isClose = ? ORDER BY creationdate DESC LIMIT 1';
    connection.query(sql, [userId, false], function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.length > 0) {
          console.log('res.length > 0:', res.length);
          response = {"success": true, "data": res[0], error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'no open cart exist.'};
        }
        resolve(response);
      }
   });
 });
};

const getOpenCartProducts = (cartId) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT * FROM cartarticles INNER JOIN products ON cartarticles.product_id=products.id WHERE cart_id = ?';
    connection.query(sql, [cartId], function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.length > 0) {
              console.log('res.length > 0:', res);
              response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'No products found in open cart.'};
        }
        resolve(response);
      }
   });
 });
};

const getNumberOfOrders = () => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT COUNT(*) AS total FROM orders';
    connection.query(sql, function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.length > 0) {
              console.log('res.length > 0:', res);
              response = {"success": true, "data": res[0].total, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'No orders found.'};
        }
        resolve(response);
      }
   });
 });
};


const getNumberProductsInStore = () => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = 'SELECT COUNT(*) AS total FROM products';
    connection.query(sql, function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.length > 0) {
              console.log('res.length > 0:', res);
              response = {"success": true, "data": res[0].total, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'No products found.'};
        }
        resolve(response);
      }
   });
 });
};

const createOrder = (order) => {
  let response = {};
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO orders SET ?', order, (err, res) => {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to create new order.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

const closeCurrentCard = (cartId) => {
  console.log('cartId:', cartId);
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = "UPDATE carts SET isClose = ? WHERE id = ?";
    let data = [true, cartId];
    connection.query(sql, data, function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"updatedId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to update the current cart status.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};

const searchProductByName = (productName) => {
  console.log('productName :', productName);
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = "SELECT * FROM products WHERE name LIKE ?";
    connection.query(sql, ['%' + productName + '%'], function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.length > 0) {
              console.log('res.length > 0:', res);
              response = {"success": true, "data": res, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'No products found with this name.'};
        }
        resolve(response);
      }
   });
 });
}

const removeProductFromCart = (cartId, productId) => {
  let response = {};
  return new Promise((resolve, reject) => {
    var sql = "DELETE FROM cartarticles WHERE cart_id = ? AND product_id  = ?";
    connection.query(sql, [cartId, productId], function (err, res) {
      if(err) {
        reject(err);
      } else {
        if (res.affectedRows > 0) {
          console.log('res:', res);
          console.log('res.length > 0:', res.affectedRows);
          console.log('result.insertId: ', res.insertId);
          response = {"success": true, "data": {"createdId": res.insertId}, error: ''};
        } else {
          response = {"success": false, "data": {}, error: 'Error when trying to create new order.'};
        }
        resolve(response);
      }
   console.log('result:', res);
 });
});
};



//////// api endpoint

app.post('/api/createproduct', async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    category_id: req.body.category_id
  };
  console.log(product);
  const response = await createProduct(product);
  res.status(201).json(response);
});

app.post('/api/updateproduct', async (req, res, next) => {
  const product = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    img: req.body.img,
    category_id: req.body.category_id
  };
  console.log(product);
  const response = await updateProduct(product);
  res.status(201).json(response);
});



app.post('/api/createuser', async (req, res, next) => {
  const user = {
    id: req.body.id,
    email: req.body.email,
    password: req.body.password,
    city: req.body.city,
    street: req.body.street,
    name: req.body.name,
    lastname: req.body.lastname,
    role: 0
  };
  console.log(user);
  const response = await createUser(user);
  res.status(201).json(response);
});

app.post('/api/auth', async function(req, res) {
	const username = req.body.id;
  const password = req.body.password;
  console.log(username);
  console.log(password);
	if (username && password) {
    const result = await loginUser(username, password)
    console.log("result: ", result);
    res.status(200).json(result);
	} else {
    const response = {"success": false, "data": {}, "error": "Please enter a Username and a Password."};
    res.status(200).json(response);
	}
});

app.get('/api/getproductsbycategoryid', async (req, res, next) => {
  const response = await getProductByCategoryId(req.query.id);
  console.log('response: ', response);
  res.status(200).json(response);
});

app.get('/api/getallproducts', async (req, res, next) => {
  const response = await getAllProducts();
  console.log('response: ', response);
  res.status(200).json(response);
});


app.post('/api/generateorder', async (req, res, next) => {
  const orderProductIds = req.body.ids
  console.log(orderProductIds);
  const response = await generateOrder(orderProductIds);
  res.status(201).json(response);
});


app.post('/api/createnewcart', async (req, res, next) => {
  const newCart = {creationdate: new Date(), userId: req.body.id, isClose: false};
  console.log(newCart);
  const result = await createNewCart(newCart);
  console.log("result: ", result);
  res.status(201).json(result);
});

app.post('/api/addproducttoCurrentcart', async (req, res, next) => {
  console.log("req.body: ", req.body);
  let result;
  const response = await checkIfProductsInCart(req.body.cart_id);
  console.log("response success: ", response);
  if (response.success == true){
    const response1 = await checkIfProductInCart(req.body.product.id, req.body.cart_id);
    if (response1.success == true){
      console.log("in checkIfProductInCart == true");
      console.log("response1.data[0]: ", response1.data[0]);
      console.log("response1.data[0].quantity: ", response1.data[0].quantity);
      console.log("req.body.quantity: ", req.body.quantity);
      const newQuantity = response1.data[0].quantity + req.body.quantity;
      const newPrice = req.body.product.price * newQuantity;
      result = await updateProductToCurrentCart(newQuantity, newPrice, response1.data[0].id);
    }
    else{
      console.log("in checkIfProductInCart == false");
      const totalPrice = req.body.product.price * req.body.quantity;
      const object = {creationdate: new Date(), quantity: req.body.quantity, totalPrice: totalPrice, product_id: req.body.product.id, cart_id: req.body.cart_id};
      console.log("object: ", object);
      result = await addProductToCurrentCart(object);
    }
  }
  else{
    console.log("in checkIfProductInCart == false");
    const totalPrice = req.body.product.price * req.body.quantity;
    const object = {creationdate: new Date(), quantity: req.body.quantity, totalPrice: totalPrice, product_id: req.body.product.id, cart_id: req.body.cart_id};
    console.log("object: ", object);
    result = await addProductToCurrentCart(object);
  }
  console.log("result: ", result);
  res.status(201).json(result);
});

app.get('/api/checkifopencartexist', async (req, res, next) => {
  console.log("req.query.userId: ", req.query.userId);
  const result = await checkIfOpenCartExist(req.query.userId);
  console.log('result: ', result);
  res.status(200).json(result);
});

app.get('/api/getopencartproducts', async (req, res, next) => {
  console.log("req.query.cartId: ", req.query.cartId);
  const result = await getOpenCartProducts(req.query.cartId);
  console.log('result: ', result);
  res.status(200).json(result);
});

app.get('/api/getnumberoforders', async (req, res, next) => {
  const result = await getNumberOfOrders();
  console.log('result: ', result);
  res.status(200).json(result);
});

app.get('/api/getnumberproductsinstore', async (req, res, next) => {
  const result = await getNumberProductsInStore();
  console.log('result: ', result);
  res.status(200).json(result);
});

app.post('/api/createorder', async (req, res, next) => {
  const dateFormat = convertDigitIn(req.body.selectedDate);
  const newOrder = {
    creationDate: new Date(),
    clienId: req.body.userId,
    cartId: req.body.cart_id,
    totalPrice: req.body.totalPrice,
    deliveryCity: req.body.city,
    street: req.body.street,
    deliveryDate: new Date(dateFormat),
    creditCard: req.body.creditCard
  };
  console.log(newOrder);
  let response = await createOrder(newOrder);
  if (response.success == true){
    result = await closeCurrentCard(req.body.cart_id);
  }
  console.log("result: ", result);
  res.status(201).json(result);
});

app.get('/api/searchproductbyName', async (req, res, next) => {
  console.log("req.query.productName: ", req.query.productName);
  const result = await searchProductByName(req.query.productName);
  console.log('result: ', result);
  res.status(200).json(result);
});


app.post('/api/removeproductfromcart', async (req, res, next) => {
  console.log("req.body: ", req.body);
  let result;
  const response = await checkIfProductsInCart(req.body.cart_id);
  console.log("response success: ", response);
  if (response.success == true){
    const response1 = await checkIfProductInCart(req.body.productId, req.body.cart_id);
    if (response1.success == true){
      console.log("in delete");
      result = await removeProductFromCart(req.body.cart_id, req.body.productId);
    }
    else{
      result = {"success": false, "data": {}, error: 'This product is not in the cart.'};
    }
  }
  else{
    result = {"success": false, "data": {}, error: 'Your cart is empty.'};
  }
  console.log("result: ", result);
  res.status(201).json(result);
});

const convertDigitIn = (str) => {
  return str.split('-').reverse().join('-');
}


module.exports = app;
