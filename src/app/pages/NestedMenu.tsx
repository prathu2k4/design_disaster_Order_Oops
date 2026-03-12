import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Home, ShoppingCart } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function NestedMenu() {
  const navigate = useNavigate();
  const [path, setPath] = useState<string[]>([]);

  // Deep nested structure
  const menuStructure: any = {
    'Food': {
      'Meals': {
        'Special Meals': {
          'Popular Items': {
            'Veg': {
              'Paneer': {
                'Paneer Pizza': {
                  _isItem: true,
                  name: 'Spicy Paneer Pizza',
                  description: 'Delicious paneer pizza with Indian spices',
                  price: 15.99,
                }
              }
            },
            'Non-Veg': {
              'Chicken': {
                'Spicy Chicken': {
                  'Spicy Chicken Burger': {
                    _isItem: true,
                    name: 'Spicy Chicken Burger',
                    description: 'Hot and crispy chicken burger',
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

  const getCurrentLevel = () => {
    let current = menuStructure;
    for (const key of path) {
      current = current[key];
    }
    return current;
  };

  const currentLevel = getCurrentLevel();
  const isItem = currentLevel?._isItem;

  const handleBack = () => {
    playRandomSound();
    // Bad UX: Back button goes to homepage instead of previous level!
    navigate('/');
  };

  const handleSelect = (key: string) => {
    playRandomSound();
    setPath([...path, key]);
  };

  return (
    <div className="min-h-screen bg-[#001a0d]">
      {/* Header */}
      <header className="bg-[#003d1f] border-b-4 border-[#00ff66] sticky top-0 z-10 shadow-lg shadow-[#00ff66]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ArrowLeft 
                className="w-6 h-6 text-[#00ff66] cursor-pointer hover:text-[#39ff14] transition-colors animate-pulse" 
                onClick={handleBack}
              />
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">Premium Menu</h1>
            </div>
            <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
              <ShoppingCart className="w-5 h-5 text-[#00ff66] hover:text-[#39ff14] transition-colors" />
              <Badge className="absolute -top-2 -right-2 bg-[#39ff14] text-[#001a0d] text-xs px-1.5 font-bold border-2 border-[#00ff66]">
                0
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 p-4 bg-[#003d1f] rounded-lg border-4 border-[#00ff66] shadow-lg shadow-[#00ff66]/20">
          <div className="flex items-center gap-2 flex-wrap text-sm text-[#7fff99]" style={{ fontFamily: "'Courier Prime', monospace" }}>
            <span>Menu</span>
            {path.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-[#39ff14]">›</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#39ff14] mt-3 font-bold">
            Depth Level: {path.length}
          </p>
        </div>

        {/* Main Content */}
        <Card className="border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#00ff66]">
            <CardTitle className="text-2xl text-[#00ff66]">
              {path.length === 0 ? 'Start Your Journey' : path[path.length - 1]}
            </CardTitle>
            <CardDescription className="text-[#7fff99]">
              {isItem ? '🎉 You found an item!' : 'Select a category to continue'}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {isItem ? (
              // Final item view
              <div className="py-4">
                <h2 className="text-3xl font-bold mb-4 text-[#00ff66]">{currentLevel.name}</h2>
                <p className="text-lg text-[#7fff99] mb-6" style={{ fontFamily: "'Courier Prime', monospace" }}>{currentLevel.description}</p>
                <p className="text-4xl font-bold text-[#39ff14] mb-6 drop-shadow-[0_0_15px_#39ff14]">₹{(currentLevel.price * 70).toFixed(0)}</p>
                <Button 
                  className="w-full h-14 text-lg bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_25px_#39ff14] transition-all"
                  onClick={() => {
                    playSpecificSound('doorbell');
                    navigate('/cart');
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            ) : (
              // Menu options
              <div className="space-y-3">
                {Object.keys(currentLevel).map((key) => (
                  <Button
                    key={key}
                    onClick={() => handleSelect(key)}
                    className="w-full h-14 text-lg bg-[#003d1f] hover:bg-[#004d26] text-[#00ff66] hover:text-[#39ff14] border-4 border-[#00ff66] hover:shadow-[0_0_20px_#00ff66] transition-all font-bold"
                    variant="outline"
                  >
                    {key} →
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-6 flex gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="flex-1 h-14 border-4 border-[#ff1744] text-[#ff1744] hover:bg-[#ff1744] hover:text-[#001a0d] font-bold"
          >
            ← Back
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="outline"
            className="h-14 border-4 border-[#00ff66] text-[#00ff66] hover:bg-[#00ff66] hover:text-[#001a0d] font-bold"
          >
            <Home className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}