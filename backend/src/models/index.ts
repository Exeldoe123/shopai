import User from './User';
import Product from './Product';
import Category from './Category';
import Tag from './Tag';
import ProductTag from './ProductTag';
import Cart from './Cart';
import CartItem from './CartItem';
import Order from './Order';
import OrderItem from './OrderItem';
import Address from './Address';
import Payment from './Payment';
import Review from './Review';
import ActivityLog from './ActivityLog';

// User Associations
User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Address, { foreignKey: 'userId' });
Address.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Review, { foreignKey: 'userId', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ActivityLog, { foreignKey: 'userId' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

// Product Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });

Product.belongsToMany(Tag, { through: ProductTag, foreignKey: 'productId' });
Tag.belongsToMany(Product, { through: ProductTag, foreignKey: 'tagId' });

Product.hasMany(Review, { foreignKey: 'productId', onDelete: 'CASCADE' });
Review.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(CartItem, { foreignKey: 'productId' });
CartItem.belongsTo(Product, { foreignKey: 'productId' });

Product.hasMany(OrderItem, { foreignKey: 'productId' });
OrderItem.belongsTo(Product, { foreignKey: 'productId' });

// Cart Associations
Cart.hasMany(CartItem, { foreignKey: 'cartId' });
CartItem.belongsTo(Cart, { foreignKey: 'cartId' });

// Order Associations
Order.hasMany(OrderItem, { foreignKey: 'orderId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });

Order.hasOne(Payment, { foreignKey: 'orderId', onDelete: 'CASCADE' });
Payment.belongsTo(Order, { foreignKey: 'orderId' });

Order.belongsTo(Address, { foreignKey: 'addressId' });

export {
  User, Product, Category, Tag, ProductTag,
  Cart, CartItem, Order, OrderItem,
  Address, Payment, Review, ActivityLog
};
