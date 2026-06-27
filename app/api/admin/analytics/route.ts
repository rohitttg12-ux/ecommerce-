import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Order from "@/lib/db/models/Order";
import Product from "@/lib/db/models/Product";
import User from "@/lib/db/models/User";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth/token";

function isAdmin(role: string): boolean {
  return role === "admin";
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
    if (!decoded || !isAdmin(decoded.role)) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments({ role: "user" });
    const totalRevenue = await Order.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" },
        },
      },
    ]);

    const revenueData = totalRevenue[0]?.total || 0;

    const recentOrders = await Order.find()
      .sort("-createdAt")
      .limit(5)
      .populate("user", "name email")
      .populate("products.product", "name price");

    return NextResponse.json(
      {
        success: true,
        data: {
          totalProducts,
          totalOrders,
          totalCustomers,
          totalRevenue: revenueData,
          recentOrders,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
