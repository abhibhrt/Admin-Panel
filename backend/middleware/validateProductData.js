// middleware/validateProductData.js
export const validateProductData = (req, res, next) => {
  try {
    let { price, discount, stock, images } = req.body;

    // Convert price, discount, stock to numbers if they exist
    if (price !== undefined) req.body.price = parseFloat(price);
    if (discount !== undefined) req.body.discount = parseFloat(discount);
    if (stock !== undefined) req.body.stock = parseInt(stock);

    // Validate images array
    if (images && !Array.isArray(images)) {
      return res.status(400).json({ error: "Images must be an array" });
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid product data" });
  }
};