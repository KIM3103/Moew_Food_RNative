import { atom } from "jotai";

// Khai báo kiểu dữ liệu
export type Dish = {
    _id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    favorite: boolean;
};

export type Restaurant = {
    _id: string;
    name: string;
    image: string;
    description: string;
    lng: number;
    lat: number;
    address: string;
    stars: number;
    reviews: string;
    categories: string[]; // Cập nhật từ category thành categories
    dishes: Dish[];
};

export type Product = {
    _id: string;
    title: string;
    description: string;
    restaurants: Restaurant[];
};

export type Category = {
    _id: string;
    name: string;
    image: string;
};

export type CartItem = {
    dish: Dish;
    quantity: number;
};

export type User = {
    _id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    location: string;
    bio: string;
    favoriteDishes: Dish[];
};

export type Invoice = {
    _id: string;
    user: string;
    items: {
        dish: Dish;
        quantity: number;
        price: number;
    }[];
    totalPrice: number;
    deliveryFee: number;
    totalALL: number;
    createdAt: string;
};

// Kiểu dữ liệu cho khoảng cách và thời gian di chuyển
// 2 min/km
export type TravelDistance = {
    distance: number;
    duration: number;
};

// Atom lưu danh sách danh mục
export const categoriesAtom = atom<Category[]>([])

// Atom lưu danh sách sản phẩm
export const productsAtom = atom<Product[]>([]);

// Atom lưu giỏ hàng
export const cartAtom = atom<CartItem[]>([]);

// Atom lưu danh sách yêu thích
export const favoriteAtom = atom<Dish[]>([]);

// Atom lưu thông tin người dùng
export const userAtom = atom<User | null>(null);

// Atom lưu danh sách hóa đơn
export const invoicesAtom = atom<Invoice[]>([]);

// Atom lưu khoảng cách và thời gian di chuyển
export const travelDistanceAtom = atom<TravelDistance | null>(null);

