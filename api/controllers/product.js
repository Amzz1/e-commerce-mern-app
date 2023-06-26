import Product  from "../models/Product.js"
export const createProduct = async (req, res) => {
  console.log(req.body);
    const { title,brand, price, description,whatIsIt,highlightedIngredients,whatElseYouNeedToKnow, variants,size,color,tags, rating, imageUrl } = req.body;
  
    try {
      const newProduct = new Product({
        title,
        brand,
        price,
        description,
        whatIsIt,
        highlightedIngredients,
        whatElseYouNeedToKnow,
        variants,
        size,
        color,
        tags,
        rating,
        imageUrl,
      });
  
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }

  
  export const updateProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
  
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndDelete(id);  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
  
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
   
  export const getAllProduct = async (req, res) => {
    
    try{
      const products = await Product.find()
      res.status(200).json(products)
  }catch(err){
      next(err)
  }
  };
  
  
  export const getProduct = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  };
 
// get category, sort, filter logic 
export const getCategory = async (req, res) => {
  const { name } = req.params;
  const { color, size, price, brand } = req.query;

  try {
    let matchQuery = { tags: name };

    if (color) {
      matchQuery.color = { $in: color.split(",") };
    }

    if (size) {
      matchQuery.size = { $in: size.split(",") };
    }

    if (price) {
      matchQuery.price = { $in: price.split(",") };
    }

    if (brand) {
      matchQuery.brand = { $in: brand.split(",") };
    }

    const products = await Product.find(matchQuery);

    const colorPipeline = [
      { $match: { tags: name } },
      { $unwind: "$color" },
      { $group: { _id: null, colors: { $addToSet: "$color" } } },
      { $project: { _id: 0, colors: 1 } },
      { $sort: { colors: 1 } },
    ];

    const sizePipeline = [
      { $match: { tags: name } },
      { $unwind: "$size" },
      { $group: { _id: null, sizes: { $addToSet: "$size" } } },
      { $project: { _id: 0, sizes: 1 } },
      { $sort: { sizes: 1 } },
    ];

    const pricePipeline = [
      { $match: { tags: name } },
      { $unwind: "$price" },
      { $group: { _id: null, prices: { $addToSet: "$price" } } },
      { $project: { _id: 0, prices: 1 } },
      { $sort: { prices: 1 } },
    ];
    const brandPipeline = [
      { $match: { tags: name } },
      { $group: { _id: null, brands: { $addToSet: "$brand" } } },
      { $project: { _id: 0, brands: 1 } },
      { $sort: { brands: 1 } },
    ];

    const [colors, sizes, prices, brands] = await Promise.all([
      Product.aggregate(colorPipeline).exec(),
      Product.aggregate(sizePipeline).exec(),
      Product.aggregate(pricePipeline).exec(),
      Product.aggregate(brandPipeline).exec(),
    ]);

    const colorValues = colors.length > 0 ? colors[0].colors : [];
    const sizeValues = sizes.length > 0 ? sizes[0].sizes : [];
    const priceValues = prices.length > 0 ? prices[0].prices : [];
    const brandValues = brands.length > 0 ? brands[0].brands : [];

    res
      .status(200)
      .json({
        products,
        colors: colorValues,
        sizes: sizeValues,
        prices: priceValues,
        brands: brandValues,
      });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};


