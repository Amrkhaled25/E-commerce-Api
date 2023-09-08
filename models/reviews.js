const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, `please enter rating's number`],
      max: 5,
      min: 1,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      maxlength: 1000,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      required: [true, "please add user id "],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "products",
      required: [true, "please add product id "],
    },
  },
  {
    timestamps: true,
  },
  {
    collection: "reviews",
  }
);

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);

  try {
    await this.model("products").findOneAndUpdate(
      {
        _id: productId,
      },
      {
        ratings: Math.ceil(result[0]?.averageRating || 0),
        reviewsNumber: result[0]?.numOfReviews || 0,
      }
    );
  } catch (err) {
    console.log(err);
  }
};

// document middleware
reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
// Query middleware
reviewSchema.post("/^delete/", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
module.exports = mongoose.model("reviews", reviewSchema);
