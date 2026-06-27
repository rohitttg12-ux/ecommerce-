import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Order from "@/lib/db/models/Order";
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const total = await Order.countDocuments();
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price")
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
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
