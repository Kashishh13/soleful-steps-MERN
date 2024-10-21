import userModel from "../models/userModel.js";
const addToCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userID = req.userID;

    if (!userID || !itemId) {
      console.log("Invalid input: ", req.body);
      return res.json({ success: false, message: "Invalid input" });
    }

    let userData = await userModel.findById(userID);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!userData.CartData) {
      userData.CartData = {};
    }

    let CartData = userData.CartData;
    CartData[itemId] = (CartData[itemId] || 0) + 1;

    console.log("Updated CartData: ", CartData);
    await userModel.findByIdAndUpdate(userID, { CartData });

    res.json({ success: true, message: "Added To Cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { itemId } = req.body;
    const userID = req.userID;

    if (!userID || !itemId) {
      console.log("Invalid input: ", req.body);
      return res.json({ success: false, message: "Invalid input" });
    }

    let userData = await userModel.findById(userID);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (!userData.CartData) {
      userData.CartData = {};
    }

    let CartData = userData.CartData;
    if (CartData[itemId] && CartData[itemId] > 0) {
      CartData[itemId] -= 1;
      if (CartData[itemId] === 0) {
        delete CartData[itemId];
      }
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }

    await userModel.findByIdAndUpdate(userID, { CartData });

    res.json({ success: true, message: "Removed From cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error Occurred" });
  }
};

const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.userID);
    let CartData = userData.CartData;
    res.json({ success: true, CartData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
