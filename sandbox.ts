import { v4  as uuidv4 } from 'uuid'

/* 
Create a user class that can add items to cart
Create a shop class that will store items in inventory and to be collected by user
Create an itme class where items will be created and given properties such as name, price, description, etc.
*/

class Shop {
  inventory: Item[];

  constructor() {
    this.inventory = [];
  }

  stockInventory(item: Item): void {
    this.inventory.push(item);
  }
}

class Item {
  id: string;
  name: string;
  price: number;
  description: string;
  quantity: number;

  constructor(name: string, price: number, description: string, quantity: number) {
    this.id = uuidv4();
    this.name = name;
    this.price = price;
    this.description = description;
    this.quantity = quantity;
  }
}

class User {
  id: string;
  name: string;
  age: number;
  cart: Map<string, number>; // Use Map to store items and their quantities in the cart.

  constructor(name: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.cart = new Map();
  }

  addToCart(item: Item, quantity: number): void {
    if (this.cart.has(item.id)) {
      this.cart.set(item.id, this.cart.get(item.id)! + quantity);
    } else {
      this.cart.set(item.id, quantity);
    }
  }

  removeFromCart(item: Item): void {
    this.cart.delete(item.id);
  }
}

const shop = new Shop();

const itemA = new Item("Hylian Shield", 50, 'a sturdy shield to keep you alive a little longer out there', 1);
const itemB = new Item("Arrows", 15, 'a bundle of x5 arrows, good for keeping pesky Chuchus at a safe distance', 1);
const itemC = new Item("Apple", 5, 'good for eating, better for cooking, even works as a projectile if needed', 1);

shop.stockInventory(itemA);
shop.stockInventory(itemB);
shop.stockInventory(itemC);
console.log(shop.inventory)

const user = new User("Link", 20);

user.addToCart(itemA, 2);
user.addToCart(itemB, 5);
user.addToCart(itemC, 3);

console.log(user.cart);
// Output: Map { 'item-id-1' => 2, 'item-id-2' => 5, 'item-id-3' => 3 }

user.removeFromCart(itemA);
console.log(user.cart);
// Output: Map { 'item-id-2' => 5, 'item-id-3' => 3 }
