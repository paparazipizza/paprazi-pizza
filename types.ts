export interface MenuItem {
  id: string;
  name: string;
  price: number;
  serves: string;
  description: string;
  category: string;
  image: string;
}

export interface CateringMenu {
  [key: string]: MenuItem[];
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}