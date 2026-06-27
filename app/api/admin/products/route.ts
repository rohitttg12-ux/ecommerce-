import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db/connection";
import Product from "@/lib/db/models/Product";
import { verifyToken, extractTokenFromHeader } from "@/lib/auth/token";
import { generateSlug } from "@/lib/utils/validators";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.number().min(0),
  discountPrice: z.number().optional(),
  images: z.array(z.string()).min(1),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  stock: z.number().min(0),
  featured: z.boolean().optional(),
  bestSeller: z.boolean().optional(),
  category: z.string(),
});

function isAdmin(role: string): boolean {
  return role === "admin";
}

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
    if (!decoded || !isAdmin(decoded.role)) {
      return NextResponse.json(
        { success: false, message: "Admin access required" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createProductSchema.parse(body);

    const slug = generateSlug(validatedData.name);
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { success: false, message: "Product with this name already exists" },
        { status: 400 }
      );
    }

    const product = new Product({
      ...validatedData,
      slug,
    });

    await product.save();

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Product creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Validation error" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: "Failed to create product" },
      { status: 500 }
    );
  }
}
