const fs = require("fs");

exports.getAllProducts = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
};

exports.addProduct = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
  products.push(req.body);
  fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

  res.status(200).json({
    status: "success",
    data: {
      products,
    },
  });
};

exports.getProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );

  const foundProduct = products.find((p) => p.id == req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.deleteProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
var auxProducts = [];
  products.forEach(product => {
    if (product.id != req.params.id) {
      auxProducts.push(product);
    }
});
fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(auxProducts));

  if (products) {
    res.status(200).json({
      status: "success",
      data: {
        auxProducts,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};

exports.putProductById = (req, res) => {
  const products = JSON.parse(
    fs.readFileSync(`${__dirname}/../data/products.json`)
  );
var auxProducts = [];
  products.forEach(product => {
    if (product.id != req.params.id) {
      auxProducts.push(product);      
    }
});
auxProducts.push(req.body);

fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(auxProducts));

  if (products) {
    res.status(200).json({
      status: "success",
      data: {
        auxProducts,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
};
