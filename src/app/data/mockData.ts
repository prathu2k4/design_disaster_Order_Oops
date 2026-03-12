// Mock food data for OrderOops

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  spicyLevel?: string;
  imageUrl?: string;
}

export const categories = [
  'Pizza',
  'Burger',
  'Desserts',
  'Drinks',
];

export const foodItems: FoodItem[] = [
  // Pizza
  { 
    id: '1', 
    name: 'Margherita Pizza', 
    description: 'Classic cheese pizza', 
    price: 12.99, 
    category: 'Pizza', 
    spicyLevel: 'Not Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1573821663912-6df460f9c684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJnaGVyaXRhJTIwcGl6emElMjBjaGVlc2V8ZW58MXx8fHwxNzczMzM0MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '2', 
    name: 'Pepperoni Pizza', 
    description: 'Loaded with pepperoni', 
    price: 14.99, 
    category: 'Pizza', 
    spicyLevel: 'Not Spicy But Looks Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1771764737330-fcec33cd67fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMHNsaWNlc3xlbnwxfHx8fDE3NzMyNTk1MDR8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '3', 
    name: 'Spicy Paneer Pizza', 
    description: 'Indian style paneer pizza', 
    price: 15.99, 
    category: 'Pizza', 
    spicyLevel: 'Very Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1665033628673-7de125eb6b12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMHBhbmVlciUyMHBpenphJTIwaW5kaWFufGVufDF8fHx8MTc3MzMzNDEyNnww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  // Burgers
  { 
    id: '4', 
    name: 'Classic Burger', 
    description: 'Beef patty with lettuce', 
    price: 9.99, 
    category: 'Burger', 
    spicyLevel: 'Not Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1678110707493-8d05425137ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGFzc2ljJTIwYmVlZiUyMGJ1cmdlcnxlbnwxfHx8fDE3NzMzMzQxMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '5', 
    name: 'Spicy Chicken Burger', 
    description: 'Hot and crispy chicken', 
    price: 10.99, 
    category: 'Burger', 
    spicyLevel: 'Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1648580852350-3098af89f110?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoaWNrZW4lMjBidXJnZXIlMjBjcmlzcHl8ZW58MXx8fHwxNzczMzM0MTI3fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '6', 
    name: 'Veggie Burger', 
    description: 'Healthy vegetable patty', 
    price: 8.99, 
    category: 'Burger', 
    spicyLevel: 'Not Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1546441471-c81f0586d0a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWdnaWUlMjBidXJnZXIlMjB2ZWdldGFyaWFufGVufDF8fHx8MTc3MzI1MzYzMXww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  // Desserts
  { 
    id: '7', 
    name: 'Chocolate Cake', 
    description: 'Rich chocolate flavor', 
    price: 6.99, 
    category: 'Desserts', 
    spicyLevel: 'Emotionally Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1772196229845-9addc8cccdee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwcmljaHxlbnwxfHx8fDE3NzMzMzQxMjh8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '8', 
    name: 'Ice Cream', 
    description: 'Vanilla ice cream', 
    price: 4.99, 
    category: 'Desserts', 
    spicyLevel: 'Not Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1707553851664-5985b32734c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwaWNlJTIwY3JlYW0lMjBzY29vcHxlbnwxfHx8fDE3NzMyOTQ1MjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '9', 
    name: 'Cheesecake', 
    description: 'Creamy cheesecake', 
    price: 7.99, 
    category: 'Desserts', 
    spicyLevel: 'Emotionally Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1759303380841-55c09244fd2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhbXklMjBjaGVlc2VjYWtlJTIwc2xpY2V8ZW58MXx8fHwxNzczMzM0MTI4fDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  
  // Drinks
  { 
    id: '10', 
    name: 'Lemon Juice', 
    description: 'Fresh lemon juice', 
    price: 3.99, 
    category: 'Drinks', 
    spicyLevel: 'Not Spicy But Looks Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGxlbW9uJTIwanVpY2UlMjBnbGFzc3xlbnwxfHx8fDE3NzMzMzQxMjl8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '11', 
    name: 'Cola', 
    description: 'Cold cola', 
    price: 2.99, 
    category: 'Drinks', 
    spicyLevel: 'Not Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1641311304269-1000f9dcbdb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwY29sYSUyMGRyaW5rJTIwZ2xhc3N8ZW58MXx8fHwxNzczMzM0MTMwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  { 
    id: '12', 
    name: 'Spicy Chai', 
    description: 'Hot spiced tea', 
    price: 3.49, 
    category: 'Drinks', 
    spicyLevel: 'Spicy',
    imageUrl: 'https://images.unsplash.com/photo-1740107238450-d31453eec31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGljeSUyMGNoYWklMjB0ZWElMjBob3R8ZW58MXx8fHwxNzczMzM0MTMwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
];

export const spicyFilters = [
  'Spicy',
  'Very Spicy',
  'Not Spicy But Looks Spicy',
  'Emotionally Spicy',
];

// For nested menu hell
export const nestedMenuStructure = {
  'Food': {
    'Meals': {
      'Special Meals': {
        'Popular Items': {
          'Veg': {
            'Paneer': {
              'Paneer Pizza': {
                id: '3',
                name: 'Spicy Paneer Pizza',
                description: 'Congratulations! You found it after 7 levels of navigation!',
                price: 15.99,
              }
            }
          },
          'Non-Veg': {
            'Chicken': {
              'Spicy Chicken': {
                'Spicy Chicken Burger': {
                  id: '5',
                  name: 'Spicy Chicken Burger',
                  description: 'You navigated 8 levels for this!',
                  price: 10.99,
                }
              }
            }
          }
        }
      }
    }
  }
};