import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { foodItems } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, ShoppingCart, Filter } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function CategoryPage() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupStep, setPopupStep] = useState(0);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredItems = foodItems.filter(
    (item) => item.category === category.charAt(0).toUpperCase() + category.slice(1)
  );

  // Generate random fake discounts (looks like 30-70% but only reduces by ₹2-3)
  const generateFakeDiscount = () => {
    const fakePercentages = [30, 40, 50, 60, 70];
    return fakePercentages[Math.floor(Math.random() * fakePercentages.length)];
  };

  const actualDiscount = Math.random() > 0.5 ? 2 : 3; // Only ₹2 or ₹3 off

  const handleAddToCart = (item: any) => {
    playRandomSound();
    setSelectedItem(item);
    setShowPopup(true);
    setPopupStep(0);
  };

  const handlePopupConfirm = () => {
    playRandomSound();
    if (popupStep < 4) {
      setPopupStep(popupStep + 1);
    } else {
      // Add random items to cart
      playSpecificSound('doorbell');
      navigate('/cart', { state: { item: selectedItem, addedRandom: true } });
      setShowPopup(false);
    }
  };

  const popupMessages = [
    "Are you sure you want to add this to cart?",
    "Are you REALLY sure?",
    "Confirm again?",
    "Final confirmation?",
    "Absolutely final confirmation?"
  ];

  return (
    <div className="min-h-screen bg-[#001a0d]">
      {/* Header */}
      <header className="bg-[#003d1f] border-b-4 border-[#00ff66] sticky top-0 z-10 shadow-lg shadow-[#00ff66]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ArrowLeft 
                className="w-6 h-6 text-[#00ff66] cursor-pointer hover:text-[#39ff14] transition-colors animate-pulse" 
                onClick={() => navigate('/')}
              />
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
            </div>
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-[#00ff66] cursor-pointer hover:text-[#39ff14] transition-colors" onClick={() => navigate('/filter')} />
              <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
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
        <div className="mb-6">
          <p className="text-[#7fff99]" style={{ fontFamily: "'Courier Prime', monospace" }}>{filteredItems.length} items available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => {
            const fakeDiscountPercent = generateFakeDiscount();
            const originalPrice = item.price * 70;
            const discountedPrice = originalPrice - actualDiscount; // Only ₹2-3 off!
            
            return (
              <Card key={item.id} className="border-4 border-[#00ff66] bg-[#003d1f] hover:shadow-[0_0_30px_#00ff66] transition-all hover:scale-105 transform overflow-hidden">
                {/* Product Image */}
                {item.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Fake Discount Badge */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-[#ff1744] text-white font-bold text-lg px-3 py-1 border-2 border-white animate-pulse">
                        {fakeDiscountPercent}% OFF
                      </Badge>
                    </div>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-[#00ff66]">{item.name}</CardTitle>
                  <CardDescription className="text-[#7fff99]">{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-[#7fff99] line-through">₹{originalPrice.toFixed(0)}</span>
                      <span className="text-3xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">₹{discountedPrice.toFixed(0)}</span>
                    </div>
                    <p className="text-xs text-[#ff1744] font-bold mt-1">You save ₹{actualDiscount}!</p>
                  </div>
                  <Button 
                    className="w-full bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_20px_#39ff14] transition-all"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Multiple Confirmation Popups */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#003d1f] p-8 rounded-lg shadow-[0_0_50px_#00ff66] max-w-md w-full mx-4 border-4 border-[#00ff66]">
            <h3 className="text-xl font-bold mb-4 text-[#00ff66]">{popupMessages[popupStep]}</h3>
            <p className="text-[#7fff99] mb-6" style={{ fontFamily: "'Courier Prime', monospace" }}>Item: {selectedItem?.name}</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-2 border-[#00ff66] text-[#00ff66] hover:bg-[#004d26] hover:text-[#39ff14]"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg"
                onClick={handlePopupConfirm}
              >
                {popupStep < 4 ? 'Yes, Continue' : 'Add to Cart'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}