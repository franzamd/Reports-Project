var ShopSchema = new mongoose.Schema({
  shopName: { type: String, unique: true },
  address: { type: String },
  location: { type: [Number], index: "2d" },
  shopPicUrl: { type: String },
  shopPicTrueUrl: { type: String },
  mark: { type: String },
  open: { type: Boolean },
  shopType: { type: String },
  dish: { type: [DishSchema] },
  order: {
    type: [
      {
        orderId: { type: String },
        date: { type: Date, default: Date.now },
        dish: { type: [DishSchema] },
        userId: { type: String }
      }
    ]
  }
});
