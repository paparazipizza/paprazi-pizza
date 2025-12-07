import React, { useState, useRef, useEffect } from 'react';
import { ShoppingCart, Sparkles, ChefHat, Clock, Send, X, Plus, Minus, Phone, MapPin, ChevronRight, Star, Heart, MessageCircle, HelpCircle, Shield, ChevronDown, ChevronUp } from 'lucide-react';
import { CATERING_MENU, ALL_ITEMS } from './constants';
import { CartItem, ChatMessage, MenuItem } from './types';
import { generateCateringAdvice } from './services/aiService';

const PaparazziCateringApp = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [aiChat, setAiChat] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'Welcome to Paparazzi Pizza! 🍕 I can help you find the perfect meal, whether it\'s a quick lunch or catering for 50. What are you in the mood for?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('pizzas');
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Privacy Policy Modal State
  const [showPrivacy, setShowPrivacy] = useState(false);
  // Chat state
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isChatOpen]);

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return newQty === 0 ? null : { ...item, quantity: newQty };
      }
      return item;
    }).filter((item): item is CartItem => item !== null));
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleAIChat = async () => {
    if (!aiChat.trim()) return;

    const userMessage = aiChat;
    setAiChat('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const aiResponse = await generateCateringAdvice(userMessage, ALL_ITEMS);
      setChatHistory(prev => [...prev, { role: 'assistant', content: aiResponse }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I had trouble processing that. Please call us at 972-820-8686 for immediate assistance!' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-red-700 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm">
                <ChefHat className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-extrabold tracking-tight leading-none">PAPARAZZI PIZZA</h1>
                <p className="text-[10px] md:text-xs text-red-100 font-medium tracking-widest uppercase opacity-90">Nobody makes a pie like we do</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex gap-6 text-sm font-semibold text-red-100">
                <button onClick={() => scrollToSection('menu')} className="hover:text-white transition">Menu</button>
                <button onClick={() => scrollToSection('why-us')} className="hover:text-white transition">Why Us</button>
                <button onClick={() => scrollToSection('reviews')} className="hover:text-white transition">Reviews</button>
              </nav>

              <button
                onClick={() => setShowCart(!showCart)}
                className="relative bg-white text-red-700 px-4 py-2 rounded-full font-bold hover:bg-gray-100 transition flex items-center gap-2 shadow-sm"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Order</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-red-900 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SECTION 1 - HERO */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=2000&q=80" 
            alt="Pizza Party" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full text-sm font-bold mb-8 shadow-lg transform -rotate-1">
              <Star className="w-4 h-4 fill-current" />
              Voted Best Catering in Carrollton
            </div>
            <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              NOBODY MAKES A PIE<br/>
              <span className="text-red-500">LIKE WE DO.</span>
            </h2>
            <p className="text-lg sm:text-2xl text-gray-200 mb-10 max-w-3xl leading-relaxed font-light">
              Fresh dough. Loud flavor. Big personality.<br className="hidden sm:block"/>
              We’re the hometown pizza joint that puts flavor in the spotlight.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a href="tel:9728208686" className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition shadow-lg flex items-center justify-center gap-2 text-lg">
                <Phone className="w-6 h-6" />
                Call 972-820-8686
              </a>
              <button onClick={() => scrollToSection('menu')} className="bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition flex items-center justify-center gap-2 text-lg">
                View Menu
              </button>
            </div>
            <p className="mt-8 text-gray-400 text-sm font-medium">Walk in hungry. Walk out happy.</p>
        </div>
      </div>

      {/* SECTION 2 - MENU */}
      <div id="menu" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-red-600 font-bold tracking-widest uppercase mb-2">Handmade Dough Daily</h3>
            <h2 className="text-4xl font-extrabold text-gray-900">The Menu Carrollton Can't Stop Talking About</h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">Crisp crust. Fresh ingredients. No soggy slices — ever.</p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 sticky top-20 bg-white/95 backdrop-blur z-30 py-4 border-b border-gray-100">
            {Object.keys(CATERING_MENU).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-all ${
                  activeCategory === cat 
                    ? 'bg-gray-900 text-white shadow-md transform scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATERING_MENU[activeCategory].map((item) => (
              <div key={item.id} className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold text-gray-900">{item.name}</h4>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-gray-500 bg-gray-200 px-2 py-1 rounded">
                      Serves {item.serves}
                    </span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="text-red-600 font-bold text-sm hover:text-red-800 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3 - WHY PEOPLE LOVE US */}
      <div id="why-us" className="bg-red-50 py-20 border-t border-red-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-red-600 font-extrabold mb-4 bg-white px-4 py-1 rounded-full shadow-sm">
              <MessageCircle className="w-5 h-5" />
              <span>REAL TALK</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">Why People Love Us</h2>
            <p className="text-xl text-gray-700 leading-relaxed font-medium">
              Real talk: People are tired of soggy crusts, greasy slices, cheap cheese, and chain-store sameness. So we do the opposite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-red-50">
               <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Carrollton keeps choosing us:</h3>
               <ul className="space-y-4">
                {[
                  "Crisp, never-soggy crust",
                  "Fresh dough daily — no frozen shortcuts",
                  "Greek-inspired flavor that hits different",
                  "Real ingredients, not bargain-bin cheese",
                  "Balanced pies — not oily, not overloaded",
                  "Family-owned, not corporate"
                ].map((point, idx) => (
                  <li key={idx} className="flex items-center gap-4 text-gray-800 font-medium text-lg">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 font-bold">✓</div>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center md:text-left">
              <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <Star className="w-12 h-12 text-yellow-400 mb-6 mx-auto md:mx-0" />
                <p className="text-2xl md:text-3xl font-bold leading-tight mb-4">
                  "The flavor is bold. The slices are clean. The ingredients are real. Zero grease puddles. Zero regrets."
                </p>
                <p className="text-gray-400 font-medium">— Our Promise</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 - REVIEWS */}
      <div id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="flex text-yellow-400 mb-4"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/></div>
               <h4 className="font-bold text-xl mb-3 text-gray-900">"A Delectable Gem"</h4>
               <p className="text-gray-600 leading-relaxed">"Fresh pizza, fresh dolmas, fast service… way better than any pizza chain."</p>
             </div>
             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="flex text-yellow-400 mb-4"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/></div>
               <h4 className="font-bold text-xl mb-3 text-gray-900">"Best Pizza I’ve Ever Had"</h4>
               <p className="text-gray-600 leading-relaxed">"Cute decor, great music, fresh ingredients — even the dolmas!"</p>
             </div>
             <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
               <div className="flex text-yellow-400 mb-4"><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/><Star className="fill-current w-5 h-5"/></div>
               <h4 className="font-bold text-xl mb-3 text-gray-900">"20 Years of Doing It Right"</h4>
               <p className="text-gray-600 leading-relaxed">"Scrumdillyumptious!!! Now I know why they’ve been killing it for 20 years."</p>
             </div>
          </div>
        </div>
      </div>

      {/* SECTION 7 - OUR STORY */}
      <div id="story" className="bg-gray-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542834369-a1085fdaf4b7?auto=format&fit=crop&w=2000&q=80')] bg-cover opacity-10"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <Heart className="w-16 h-16 text-red-500 mx-auto mb-8 animate-pulse-slow" />
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Where Flavor Gets Famous</h2>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-12 font-light">
            Since 2005, we’ve been serving Carrollton the kind of pizza you tell your friends about. Not fancy. Not fussy. Just fresh ingredients, Greek-inspired classics, and real hospitality.
          </p>
          <div className="bg-white/5 p-10 rounded-3xl backdrop-blur-md border border-white/10 max-w-2xl mx-auto">
             <p className="text-2xl italic font-medium font-serif">"Make it fresh. Make it delicious. Make it with heart."</p>
             <p className="text-sm text-gray-400 mt-6 tracking-widest uppercase font-bold">— The Paparazzi Pizza Family</p>
          </div>
        </div>
      </div>

      {/* SECTION 8 - FAQ */}
      <div className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-red-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              { q: "What makes your pizza so good?", a: "Balanced heat, crisp crust, Greek-style flavor. No soggy slices." },
              { q: "Is your dough fresh?", a: "Every day. Never frozen." },
              { q: "Are you family-owned?", a: "Yes — since 2005." },
              { q: "Do you deliver?", a: "Call 972-820-8686 for availability." },
              { q: "Can you cater large orders?", a: "Absolutely. We specialize in feeding large groups." }
            ].map((faq, i) => (
              <details key={i} className="group bg-gray-50 rounded-xl border border-gray-200 open:bg-white open:shadow-md transition-all duration-200">
                <summary className="flex cursor-pointer items-center justify-between p-6 font-bold text-lg text-gray-900 marker:content-none hover:text-red-600 transition-colors">
                  {faq.q}
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER & LOCATIONS */}
      <footer className="bg-gray-100 border-t border-gray-200 pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div>
              <h4 className="font-bold text-xl mb-6 text-gray-900 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-red-600" /> Paparazzi Pizza
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                "Greek-inspired. Family-made. Always delicious." <br/>
                Serving Carrollton with pride since 2005.
              </p>
              <div className="flex items-center gap-2 text-red-600 font-bold text-lg">
                 <Phone className="w-5 h-5" /> <a href="tel:9728208686" className="hover:underline">972-820-8686</a>
              </div>
            </div>
            <div>
               <h4 className="font-bold text-xl mb-6 text-gray-900">Visit Us</h4>
               <div className="flex items-start gap-3 mb-4 text-gray-600">
                 <MapPin className="w-5 h-5 mt-1 text-red-600 flex-shrink-0" />
                 <p className="text-sm">2145 N Josey Ln #114<br/>Carrollton, TX 75006</p>
               </div>
               <div className="flex items-start gap-3 text-gray-600">
                 <Clock className="w-5 h-5 mt-1 text-red-600 flex-shrink-0" />
                 <p className="text-sm">
                   Sun - Thu: 11am - 9pm<br/>
                   Fri - Sat: 11am - 10pm
                 </p>
               </div>
            </div>
            <div>
              <h4 className="font-bold text-xl mb-6 text-gray-900">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-600">
                <li><button onClick={() => scrollToSection('menu')} className="hover:text-red-600 transition">Our Menu</button></li>
                <li><button onClick={() => scrollToSection('reviews')} className="hover:text-red-600 transition">Reviews</button></li>
                <li><button onClick={() => setShowPrivacy(true)} className="hover:text-red-600 transition flex items-center gap-1"><Shield className="w-4 h-4"/> Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} Paparazzi Pizza. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)}></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-red-700 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" /> Your Order
              </h2>
              <button onClick={() => setShowCart(false)} className="hover:bg-white/10 p-2 rounded-full transition">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingCart className="w-16 h-16 opacity-20" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <button onClick={() => setShowCart(false)} className="text-red-600 font-bold hover:underline">Browse Menu</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-gray-900 line-clamp-1">{item.name}</h4>
                          <span className="font-bold text-red-600">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 text-gray-600"><Minus className="w-4 h-4" /></button>
                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 text-gray-600"><Plus className="w-4 h-4" /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-xs text-gray-400 hover:text-red-500 underline ml-auto">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4 text-xl font-extrabold text-gray-900">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg flex items-center justify-center gap-2">
                  Checkout <ChevronRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">Taxes and delivery calculated at next step.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* AI Assistant Chat */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
        <div className={`pointer-events-auto bg-white rounded-2xl shadow-2xl w-full sm:w-96 mb-4 overflow-hidden transition-all duration-300 origin-bottom-right flex flex-col ${isChatOpen ? 'scale-100 opacity-100 max-h-[600px]' : 'scale-90 opacity-0 max-h-0'}`}>
          <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse"></div>
              <span className="font-bold">Paparazzi Assistant</span>
            </div>
            <button onClick={() => setIsChatOpen(false)}><X className="w-5 h-5 opacity-70 hover:opacity-100" /></button>
          </div>
          <div className="h-80 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
             {chatHistory.map((msg, idx) => (
               <div key={idx} className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-red-600 text-white self-end rounded-br-none' : 'bg-white border border-gray-200 text-gray-700 self-start rounded-bl-none shadow-sm'}`}>
                 {msg.content}
               </div>
             ))}
             {isLoading && (
               <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                 <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
               </div>
             )}
             <div ref={chatEndRef}></div>
          </div>
          <div className="p-3 bg-white border-t border-gray-100">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={aiChat}
                onChange={(e) => setAiChat(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAIChat()}
                placeholder="Ask about catering, menu..." 
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
              />
              <button 
                onClick={handleAIChat}
                disabled={!aiChat.trim() || isLoading}
                className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="pointer-events-auto bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center relative group"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
          {!isChatOpen && (
            <span className="absolute right-full mr-4 bg-gray-900 text-white text-xs px-3 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              Ask AI Assistant
            </span>
          )}
        </button>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowPrivacy(false)}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden relative z-10 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" /> Privacy Policy
              </h2>
              <button onClick={() => setShowPrivacy(false)} className="p-2 hover:bg-gray-100 rounded-full transition"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8 overflow-y-auto leading-relaxed text-gray-600">
               <p className="mb-4"><strong>Effective Date:</strong> January 1, 2024</p>
               <p className="mb-4">At Paparazzi Pizza, we respect your privacy. This policy explains how we handle your information.</p>
               
               <h3 className="text-lg font-bold text-gray-900 mb-2 mt-6">1. Information We Collect</h3>
               <p className="mb-4">We collect information you provide directly to us, such as when you place an order, sign up for our newsletter, or contact us. This may include your name, email address, phone number, and payment information.</p>
               
               <h3 className="text-lg font-bold text-gray-900 mb-2 mt-6">2. How We Use Your Information</h3>
               <p className="mb-4">We use your information to process your orders, communicate with you, and improve our services. We do not sell your personal data to third parties.</p>
               
               <h3 className="text-lg font-bold text-gray-900 mb-2 mt-6">3. AI Assistant</h3>
               <p className="mb-4">Our website uses an AI assistant to help with catering inquiries. Messages sent to the AI are processed to provide relevant responses but are not used for training public models without your consent.</p>
               
               <h3 className="text-lg font-bold text-gray-900 mb-2 mt-6">4. Contact Us</h3>
               <p className="mb-4">If you have any questions about this policy, please contact us at 972-820-8686.</p>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setShowPrivacy(false)} className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaparazziCateringApp;