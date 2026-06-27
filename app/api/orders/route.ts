import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth/token";
import { z } from "zod";

const createOrderSchema = z.object({
  products: z.array(
    z.object({
      product: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(0),
    })
  ),
  shippingAddress: z.object({
    name: z.string(),
    phone: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    pincode: z.string(),
    country: z.string(),
  }),
  orderNotes: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const token = extractTokenFromHeader(
      request.headers.get("Authorization")
    );
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createOrderSchema.parse(body);

    const totalAmount = validatedData.products.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      user: decoded.userId,
      products: validatedData.products,
      totalAmount,
      shippingAddress: validatedData.shippingAddress,
      orderStatus: "pending",
      paymentMethod: "COD",
      orderNotes: validatedData.orderNotes || "",
    });

    await order.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        data: order,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const token = extractTokenFromHeader(
      request.headers.get("Authorization")
    );
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Invalid token" },
        { status: 401 }
      );
    }

    const orders = await Order.find({ user: decoded.userId })
      .populate("products.product")
      .sort("-createdAt");

    return NextResponse.json(
      {
        success: true,
        data: orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
