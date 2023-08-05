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
  cart: Item[]

  constructor(name: string, age: number) {
    this.id = uuidv4();
    this.name = name;
    this.age = age;
    this.cart = []
  }

  addToCart(item: Item, quantity: number): void {
    const existingItem = this.cart.find((cartItem) => cartItem.id === item.id)
    if (existingItem) {
        existingItem.quantity += quantity
    } else this.cart.push({...item, quantity})
  };

  removeFromCart(item: Item): void {
    this.cart = this.cart.filter((cartItem) => cartItem.id !== item.id)
  }

  removeSomeFromCart(item: Item, quantity: number): void {
    let count = quantity
    this.cart = this.cart.filter((cartItem) => {
        if (cartItem.id === item.id){
            if (count > 0){
                count -= quantity
                return false
            }
        }
        return true
    })
  }

  cartTotal():string{
    const totalPrice = this.cart.reduce((total, item)=>total+item.price*item.quantity, 0)
    return `${user.name}'s total price: $${totalPrice}`
    // return totalPrice
  }

  printCart(): void {
    console.log(`${this.name}'s Shopping Cart: `)
    this.cart.forEach((item)=>{
        console.log(`${item.name} (Quantity: ${item.quantity}, Price: $${item.price*item.quantity})\n`)
        
    })
  }

}

const shop = new Shop();

const itemA = new Item("Hylian Shield", 50, 'a sturdy shield to keep you alive a little longer out there', 1);
const itemB = new Item("Arrows", 15, 'a bundle of x5 arrows, good for keeping pesky Chuchus at a safe distance', 1);
const itemC = new Item("Apple", 5, 'good for eating, better for cooking, even works as a projectile if needed', 1);
const itemD = new Item("Majora's Mask", 100000, 'a strange mask that exudes a palpable aura of mystery and ...power, almost as if it is calling out to you', 1);

shop.stockInventory(itemA);
shop.stockInventory(itemB);
shop.stockInventory(itemC);
shop.stockInventory(itemD)
console.log(shop.inventory)


const user = new User("Link", 20);

user.addToCart(itemA, 2);
user.addToCart(itemB, 5);
user.addToCart(itemC, 3);
user.addToCart(itemD,1);

console.log(user.printCart());
console.log(user.cartTotal());


console.log('')
console.log('/////////////////////////////////////////////////////////')
console.log('///////////////////// AFTER REMOVING ////////////////////')
console.log('/////////////////////////////////////////////////////////')
console.log('')



user.removeFromCart(itemA);
console.log(user.printCart());
console.log(user.cartTotal());

console.log('')
console.log('/////////////////////////////////////////////////////////')
console.log('///////////////////// AFTER REMOVING ////////////////////')
console.log('/////////////////////////////////////////////////////////')
console.log('')

user.removeFromCart(itemD);
console.log(user.printCart());
console.log(user.cartTotal());

