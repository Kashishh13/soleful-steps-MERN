
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

const placeOrder = async (req, res) => {
  const frontEnd_url = "http://localhost:5173";
  try {
    console.log("Place Order Request:", req.body);

    const newOrder = new orderModel({
      userId: req.userID, // Ensure userID is correctly assigned
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await userModel.findByIdAndUpdate(req.userID, { CartData: {} });

    const lineItem = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe expects amounts in cents
      },
      quantity: item.quantity,
    }));

    lineItem.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 50 * 100, // Stripe expects amounts in cents
      },
      quantity: 1,
    });

    console.log("Line Items:", lineItem);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItem,
      mode: "payment",
      success_url: `${frontEnd_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontEnd_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("Stripe Session URL:", session.url);

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log("Stripe Checkout Session Error:", error);
    res.status(500).json({ success: false, message: "Failed to create Stripe session", error });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success =="true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Not Paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};



  const userOrders = async (req, res) => {
    try {
      const { userID } = req.body;
      if (!userID) {
        return res.status(400).json({ success: false, message: "User ID is required" });
      }
      const orders = await orderModel.find({ userId: userID });
      res.json({ success: true, data: orders });
    } catch (error) {
      console.error("Error fetching user orders:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  
  const adminOrders=async(req,res)=>{
try{
const orders=await orderModel.find({})
res.json({success:true,data:orders})
}catch(error){
console.log(error)
res.json({success:false,message:"Error"})
}
  }

  //update order status
  const updateStatus=async(req,res)=>{
    try{
await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
res.json({success:true,message:"Status Updated"})
    }catch(error){
      console.log(error);
      res.json({success:false,message:"Error"})

    }

  }
export { placeOrder, verifyOrder,userOrders ,adminOrders,updateStatus};
