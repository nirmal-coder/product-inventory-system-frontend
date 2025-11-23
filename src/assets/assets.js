import logo from "./image-removebg-preview (4).png";
import add_icon from "./add_icon.png";
import order_icon from "./order_icon.png";
import upload_area from "./upload_area.png";
import parcel_icon from "./parcel_icon.svg";

export const assets = {
  logo,
  add_icon,
  order_icon,
  upload_area,
  parcel_icon,
};

export const subCategories = {
  "fashion-apparel": [
    { name: "Men's Clothing", value: "mens-clothing" },
    { name: "Women's Clothing", value: "womens-clothing" },
    { name: "Footwear", value: "footwear" },

    { name: "Watches", value: "watches" },
  ],
  electronics: [
    { name: "Mobiles & Tablets", value: "mobiles-tablets" },
    { name: "Laptops & Computers", value: "laptops-computers" },
    { name: "Audio Devices", value: "audio-devices" },
    { name: "Cameras & Accessories", value: "cameras-accessories" },
    { name: "Gaming", value: "gaming" },
  ],
  "home-kitchen": [
    { name: "Kitchen Appliances", value: "kitchen-appliances" },
    { name: "Home Decor", value: "home-decor" },
    { name: "Furniture", value: "furniture" },
    { name: "Lighting", value: "lighting" },
    { name: "Cleaning Essentials", value: "cleaning-essentials" },
  ],
  "beauty-personal-care": [
    { name: "Skincare", value: "skincare" },
    { name: "Haircare", value: "haircare" },
    { name: "Makeup", value: "makeup" },
    { name: "Fragrance", value: "fragrance" },
    { name: "Grooming Tools", value: "grooming-tools" },
  ],
  "sports-fitness": [
    { name: "Fitness Equipment", value: "fitness-equipment" },
    { name: "Sportswear", value: "sportswear" },
    { name: "Outdoor Gear", value: "outdoor-gear" },
    { name: "Nutrition Supplements", value: "nutrition-supplements" },
    { name: "Yoga & Meditation", value: "yoga-meditation" },
  ],
  "kids-toys": [
    { name: "Educational Toys", value: "educational-toys" },
    { name: "Action Figures", value: "action-figures" },
    { name: "Board Games", value: "board-games" },
    { name: "School Supplies", value: "school-supplies" },
    { name: "Outdoor Toys", value: "outdoor-toys" },
  ],
};

export const categories = [
  { name: "All Categories", value: "" },
  { name: "Fashion & Apparel", value: "fashion-apparel" },
  { name: "Electronics", value: "electronics" },
  { name: "Home & Kitchen", value: "home-kitchen" },
  { name: "Beauty & Personal Care", value: "beauty-personal-care" },
  { name: "Sports & Fitness", value: "sports-fitness" },
  { name: "Kids & Toys", value: "kids-toys" },
];

export const categoryUnits = {
  "fashion-apparel": ["pcs", "pair", "set"],
  electronics: ["pcs", "unit", "box"],
  "home-kitchen": ["pcs", "set", "L", "ml", "kg", "g"],
  "beauty-personal-care": ["bottle", "tube", "ml", "pcs"],
  "sports-fitness": ["pcs", "set", "pair"],
  "kids-toys": ["pcs", "set", "pack"],
};
