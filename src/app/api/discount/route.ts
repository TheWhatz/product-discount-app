import { CartItem, DiscountCampaign } from "@/type";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cart, discountCampaigns } = await request.json();

    const finalPrice = calculateFinalPrice(cart, discountCampaigns);
    return NextResponse.json({ finalPrice });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
    return NextResponse.json({ error: "An unknown error occurred" });
  }
}

function calculateFinalPrice(
  cartItems: CartItem[],
  discountCampaigns: DiscountCampaign[]
): number {
  let totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  discountCampaigns.sort((a, b) => {
    const order: Record<string, number> = {
      Coupon: 1,
      "On Top": 2,
      Seasonal: 3,
    };
    return order[a.type] - order[b.type];
  });

  let discountApplied = false;

  discountCampaigns.forEach((campaign) => {
    if (discountApplied) return;

    if (campaign.type === "Coupon") {
      totalPrice = applyCouponDiscount(totalPrice, campaign);
      discountApplied = true;
    } else if (campaign.type === "On Top") {
      totalPrice = applyOnTopDiscount(cartItems, totalPrice, campaign);
      discountApplied = true;
    } else if (campaign.type === "Seasonal") {
      totalPrice = applySeasonalDiscount(totalPrice, campaign);
    }
  });

  return totalPrice;
}

function applyCouponDiscount(
  totalPrice: number,
  campaign: DiscountCampaign
): number {
  if (campaign.discountType === "Fixed" && campaign.amount) {
    return totalPrice - campaign.amount;
  } else if (campaign.discountType === "Percentage" && campaign.percentage) {
    return totalPrice * (1 - campaign.percentage / 100);
  }
  return totalPrice;
}

function applyOnTopDiscount(
  cartItems: CartItem[],
  totalPrice: number,
  campaign: DiscountCampaign
): number {
  console.log(totalPrice);

  if (campaign.discountType === "Point" && campaign.points) {
    const maxDiscountPrice = (totalPrice * 80) / 100;
    console.log(maxDiscountPrice);

    if (totalPrice - campaign.points > maxDiscountPrice) {
      return totalPrice - campaign.points;
    }
    return maxDiscountPrice;
  }

  if (!campaign.category || campaign.amount === undefined) return totalPrice;

  const categoryDiscount = cartItems.filter(
    (item) => item.category === campaign.category
  );
  const discountAmount =
    categoryDiscount.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    ) *
    (campaign.amount / 100);
  return totalPrice - discountAmount;
}

function applySeasonalDiscount(
  totalPrice: number,
  campaign: DiscountCampaign
): number {
  if (!campaign.everyX || campaign.discountY === undefined) return totalPrice;

  const discountPerX =
    Math.floor(totalPrice / campaign.everyX) * campaign.discountY;
  return totalPrice - discountPerX;
}
