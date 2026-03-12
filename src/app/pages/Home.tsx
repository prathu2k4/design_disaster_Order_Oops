import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { categories } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ShoppingCart, Search, Menu, Star } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function Home() {
  const navigate = useNavigate();
  const [shuffledCategories, setShuffledCategories] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);

  // Jumbled emoji mapping (wrong emojis for each category)
  const jumbledEmojis: Record<string, string> = {
    'Pizza': '🥤',      // Drink emoji for pizza
    'Burger': '🍰',     // Dessert emoji for burger
    'Desserts': '🍔',   // Burger emoji for desserts
    'Drinks': '🍕',     // Pizza emoji for drinks
  };

  // Shuffle categories randomly
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  // Shuffle on mount and scroll
  useEffect(() => {
    setShuffledCategories(shuffleArray(categories));
    playSpecificSound('whoosh');
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Shuffle menu on scroll (randomly)
      if (Math.random() > 0.95) {
        setShuffledCategories(shuffleArray(categories));
        playRandomSound();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fake countdown timer that resets
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          playSpecificSound('alarm');
          return 10; // Reset to 10 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (category: string) => {
    playRandomSound();
    navigate(`/category/${category.toLowerCase()}`);
  };

  const handleNavClick = (path: string) => {
    playRandomSound();
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#001a0d]">
      {/* Header */}
      <header className="bg-[#003d1f] border-b-4 border-[#00ff66] sticky top-0 z-10 shadow-lg shadow-[#00ff66]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Menu className="w-6 h-6 text-[#39ff14] animate-pulse" />
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">OrderOops</h1>
            </div>
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-[#00ff66] cursor-pointer hover:text-[#39ff14] transition-colors" onClick={() => playRandomSound()} />
              <div className="relative cursor-pointer" onClick={() => handleNavClick('/cart')}>
                <ShoppingCart className="w-5 h-5 text-[#00ff66] hover:text-[#39ff14] transition-colors" />
                <Badge className="absolute -top-2 -right-2 bg-[#39ff14] text-[#001a0d] text-xs px-1.5 font-bold border-2 border-[#00ff66]">
                  0
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Fake Discount Banner */}
        <div className="mb-6 bg-gradient-to-r from-[#39ff14] to-[#00ff66] text-[#001a0d] p-4 rounded-lg shadow-lg border-4 border-[#00ff66] animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <div>
                <h3 className="font-bold text-lg" style={{ fontFamily: "'Press Start 2P', cursive" }}>FLASH SALE - 50% OFF!</h3>
                <p className="text-sm font-bold">Use code: SAVE50</p>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold drop-shadow-lg">{timeLeft}s</div>
              <div className="text-xs font-bold">left!</div>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#00ff66] mb-2 drop-shadow-[0_0_15px_#00ff66]">What would you like to order?</h2>
          <p className="text-[#7fff99]" style={{ fontFamily: "'Courier Prime', monospace" }}>Fast delivery • Fresh food  Best prices</p>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#39ff14]">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {shuffledCategories.map((category, index) => (
              <Card
                key={`${category}-${index}`}
                className="cursor-pointer hover:shadow-[0_0_30px_#39ff14] transition-all border-4 border-[#00ff66] bg-[#003d1f] hover:bg-[#004d26] hover:scale-105 transform duration-200"
                onClick={() => handleCategoryClick(category)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2 drop-shadow-[0_0_10px_#00ff66]">
                    {jumbledEmojis[category] || '🍽️'}
                  </div>
                  <h4 className="font-semibold text-lg text-[#00ff66]">{category}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Special Deals */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#39ff14]">Special Deals</h3>
          <Card className="border-4 border-[#39ff14] bg-[#003d1f] cursor-pointer hover:shadow-[0_0_30px_#39ff14] transition-all hover:scale-[1.02] transform"
                onClick={() => handleNavClick('/nested-menu')}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg mb-1 text-[#00ff66]">Exclusive Menu</h4>
                  <p className="text-sm text-[#7fff99]">Discover our premium selection</p>
                </div>
                <Star className="w-6 h-6 text-[#39ff14] animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Items */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-[#39ff14]">Popular This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-4 border-[#00ff66] bg-[#003d1f] hover:shadow-[0_0_30px_#00ff66] transition-all">
              <CardHeader>
                <CardTitle className="text-[#00ff66]">Margherita Pizza</CardTitle>
                <CardDescription className="text-[#7fff99]">Classic Italian style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">₹899</span>
                  <Button 
                    className="bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_20px_#39ff14] transition-all"
                    onClick={() => handleNavClick('/category/pizza')}
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="border-4 border-[#00ff66] bg-[#003d1f] hover:shadow-[0_0_30px_#00ff66] transition-all">
              <CardHeader>
                <CardTitle className="text-[#00ff66]">Classic Burger</CardTitle>
                <CardDescription className="text-[#7fff99]">Juicy beef patty</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">₹699</span>
                  <Button 
                    className="bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_20px_#39ff14] transition-all"
                    onClick={() => handleNavClick('/category/burger')}
                  >
                    Order Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}