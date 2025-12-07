import { CateringMenu } from './types';

// Using consistent images for categories to ensure high quality visuals
const IMAGES = {
  pizza: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
  pizzaGourmet: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=800&q=80',
  pasta: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
  salad: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=800&q=80',
  sandwich: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80',
  dessert: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=800&q=80',
  calzone: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&w=800&q=80',
  kids: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  // Specific Appetizer Images
  mozzSticks: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  dolmas: 'https://images.unsplash.com/photo-1606923829579-0cb9d4af204d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  jalapenos: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  garlicBread: 'https://images.unsplash.com/photo-1573140247632-f84660f67627?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  gyro: 'https://images.unsplash.com/photo-1529006557810-274b9b2eb785?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
};

export const CATERING_MENU: CateringMenu = {
  appetizers: [
    { id: 'mozz-sticks', name: 'Mozzarella Sticks', price: 5.99, serves: '1', description: 'Crispy, golden, perfectly cheesy.', category: 'Appetizers', image: IMAGES.mozzSticks },
    { id: 'dolmas', name: 'Dolmas (Stuffed Grape Leaves)', price: 5.99, serves: '1', description: 'Greek-style, tender, flavorful rice-stuffed leaves served with tzatziki.', category: 'Appetizers', image: IMAGES.dolmas },
    { id: 'jalapenos', name: 'Stuffed Jalapeños', price: 5.99, serves: '1', description: 'Cheese-filled and baked to perfection.', category: 'Appetizers', image: IMAGES.jalapenos },
    { id: 'garlic-bread', name: 'Garlic Cheese Bread', price: 6.99, serves: '1-2', description: 'Cheesy, garlicky bliss.', category: 'Appetizers', image: IMAGES.garlicBread },
    { id: 'gyro-sampler', name: 'Gyros Sampler', price: 10.99, serves: '1-2', description: 'Beef, chicken, pita, and tzatziki.', category: 'Appetizers', image: IMAGES.gyro }
  ],
  'greek favorites': [
    { id: 'chicken-souvlaki', name: 'Chicken Souvlaki', price: 10.99, serves: '1', description: 'Skewers, rice, pita, fresh Greek flavors.', category: 'Greek Favorites', image: IMAGES.sandwich },
    { id: 'gyros-plate', name: 'Gyros Plate', price: 10.99, serves: '1', description: 'Beef or chicken with tomatoes, onions, tzatziki, rice.', category: 'Greek Favorites', image: IMAGES.gyro }
  ],
  salads: [
    { id: 'house-salad', name: 'House Salad', price: 6.99, serves: '1', description: 'Fresh greens and garden veggies.', category: 'Salads', image: IMAGES.salad },
    { id: 'greek-salad', name: 'Greek Salad', price: 8.99, serves: '1', description: 'Feta cheese, lettuce, tomatoes, cucumber and black olives served with our homemade dressing.', category: 'Salads', image: IMAGES.salad },
    { id: 'caesar-salad', name: 'Caesar Salad', price: 6.99, serves: '1', description: 'Classic romaine with parmesan and croutons.', category: 'Salads', image: IMAGES.salad }
  ],
  'paninis & sandwiches': [
    { id: 'turkey-pesto-panini', name: 'Turkey Pesto Panini', price: 7.99, serves: '1', description: 'Served with chips.', category: 'Paninis', image: IMAGES.sandwich },
    { id: 'gyro-panini', name: 'Gyro Panini', price: 7.99, serves: '1', description: 'Served with chips.', category: 'Paninis', image: IMAGES.gyro },
    { id: 'meatball-sub', name: 'Meatball Sub', price: 8.99, serves: '1', description: 'Topped with marinara and melted cheese. Served with chips.', category: 'Sandwiches', image: IMAGES.sandwich },
    { id: 'italian-sub', name: 'Italian Sub', price: 8.50, serves: '1', description: 'Salami, pepperoni, ham, provolone. Served with chips.', category: 'Sandwiches', image: IMAGES.sandwich },
    { id: 'gyro-wrap', name: 'Gyro Wrap', price: 6.99, serves: '1', description: 'Beef or Chicken wrapped in pita.', category: 'Wraps', image: IMAGES.gyro }
  ],
  pasta: [
    { id: 'spaghetti-meatballs', name: 'Spaghetti & Meatballs', price: 9.99, serves: '1', description: 'Served with garlic bread.', category: 'Pasta', image: IMAGES.pasta },
    { id: 'chicken-alfredo', name: 'Chicken Alfredo', price: 10.99, serves: '1', description: 'Served with garlic bread.', category: 'Pasta', image: IMAGES.pasta },
    { id: 'fettuccine-alfredo', name: 'Fettuccine Alfredo', price: 9.99, serves: '1', description: 'Served with garlic bread.', category: 'Pasta', image: IMAGES.pasta }
  ],
  calzones: [
    { id: 'calzone-cheese', name: 'Cheese Calzone', price: 8.99, serves: '1', description: 'Served with marinara.', category: 'Calzones', image: IMAGES.calzone },
    { id: 'calzone-supreme', name: 'Supreme Calzone', price: 11.99, serves: '1', description: 'Served with marinara.', category: 'Calzones', image: IMAGES.calzone }
  ],
  pizzas: [
    { id: 'pizza-cheese-lg', name: 'Large Cheese Pizza', price: 11.99, serves: '3-4', description: 'Traditional cheese pizza.', category: 'Pizzas', image: IMAGES.pizza },
    { id: 'pizza-pepperoni-lg', name: 'Large Pepperoni Pizza', price: 12.99, serves: '3-4', description: 'Classic pepperoni.', category: 'Pizzas', image: IMAGES.pizza },
    { id: 'pizza-supreme-lg', name: 'Large Supreme Pizza', price: 16.99, serves: '3-4', description: 'Pepperoni, beef, mushrooms, olives, peppers.', category: 'Pizzas', image: IMAGES.pizzaGourmet },
    { id: 'pizza-gyro-lg', name: 'Large Gyro Pizza', price: 17.99, serves: '3-4', description: 'Olive oil base, feta, gyro meat, olives, tomatoes.', category: 'Pizzas', image: IMAGES.pizzaGourmet },
    { id: 'pizza-meat-lovers-lg', name: 'Large Meat Lover\'s Pizza', price: 16.99, serves: '3-4', description: 'Pepperoni, sausage, beef, ham, bacon.', category: 'Pizzas', image: IMAGES.pizzaGourmet }
  ],
  kids: [
    { id: 'kids-slice', name: 'Slice of Pizza + Drink', price: 5.99, serves: '1', description: 'Perfect for the little ones.', category: 'Kids', image: IMAGES.kids },
    { id: 'kids-spaghetti', name: 'Spaghetti + Drink', price: 5.99, serves: '1', description: 'Kid-sized pasta portion.', category: 'Kids', image: IMAGES.pasta }
  ],
  desserts: [
    { id: 'baklava', name: 'Baklava', price: 2.50, serves: '1', description: 'Famous Greek pastry stuffed with walnuts and honey.', category: 'Desserts', image: IMAGES.dessert },
    { id: 'cheesecake', name: 'Cheesecake', price: 3.99, serves: '1', description: 'Classic creamy cheesecake.', category: 'Desserts', image: IMAGES.dessert }
  ],
  catering: [
    { id: 'cat-greek-salad', name: 'Greek Salad Tray', price: 29.99, serves: '10-12', description: 'Large tray of our famous Greek salad.', category: 'Catering', image: IMAGES.salad },
    { id: 'cat-pasta-meat', name: 'Pasta Tray (Meat Sauce)', price: 39.99, serves: '10', description: 'Spaghetti with meat sauce tray.', category: 'Catering', image: IMAGES.pasta },
    { id: 'cat-alfredo', name: 'Chicken Alfredo Tray', price: 49.99, serves: '10', description: 'Creamy chicken alfredo tray.', category: 'Catering', image: IMAGES.pasta },
    { id: 'cat-wraps', name: 'Pita Wrap Platter', price: 69.99, serves: '10', description: '10 Pita wraps platter.', category: 'Catering', image: IMAGES.gyro },
    { id: 'cat-pizza-bundle', name: 'Large Pizza Bundle', price: 59.99, serves: '15-20', description: '5 Large Pizzas.', category: 'Catering', image: IMAGES.pizza }
  ]
};

export const ALL_ITEMS = Object.values(CATERING_MENU).flat();