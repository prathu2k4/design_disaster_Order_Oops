import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Trash2, Star } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { foodItems } from '../data/mockData';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [rating, setRating] = useState(0);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [checkoutButtonPosition, setCheckoutButtonPosition] = useState({ x: 0, y: 0 });
  const [checkoutAttempts, setCheckoutAttempts] = useState(0);

  // Add item from navigation state
  useEffect(() => {
    if (location.state?.item) {
      const mainItem = location.state.item;
      const newItems = [mainItem];

      // Auto-add random items
      if (location.state?.addedRandom) {
        const randomExtras = foodItems
          .filter(item => item.category === 'Drinks' || item.category === 'Desserts')
          .sort(() => Math.random() - 0.5)
          .slice(0, Math.floor(Math.random() * 2) + 2);
        
        newItems.push(...randomExtras);
      }

      setCartItems(newItems);
    }
  }, [location.state]);

  const handleDelete = (item: any) => {
    playSpecificSound('explosion');
    setItemToDelete(item);
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    playRandomSound();
    setCartItems(cartItems.filter(i => i.id !== itemToDelete.id));
    setShowDeleteWarning(false);
    setItemToDelete(null);
  };

  const handleCheckoutClick = () => {
    playRandomSound();
    // Moving checkout button - bad UX! Changed to 5 attempts
    if (checkoutAttempts < 4) {
      // Moves for attempts 0-3 (first 4 clicks)
      const randomX = Math.random() * (window.innerWidth - 200);
      const randomY = Math.random() * (window.innerHeight - 100);
      setCheckoutButtonPosition({ x: randomX, y: randomY });
      setCheckoutAttempts(prev => prev + 1);
      playSpecificSound('laugh');
    } else if (checkoutAttempts === 4) {
      // 5th click - reset to original position and enable checkout
      setCheckoutAttempts(5);
      playSpecificSound('doorbell');
    } else {
      // After 5th click, show forced rating
      setShowRatingPopup(true);
      playSpecificSound('doorbell');
    }
  };

  const handleRatingSubmit = () => {
    playRandomSound();
    if (rating === 5) {
      navigate('/checkout');
    } else {
      alert('Please select 5 stars to continue');
      playSpecificSound('alarm');
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

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
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">My Cart</h1>
            </div>
            <Badge className="bg-[#39ff14] text-[#001a0d] px-4 py-2 font-bold border-2 border-[#00ff66]">
              {cartItems.length} items
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Items */}
            <div className="space-y-4 mb-8">
              {cartItems.map((item, index) => (
                <Card key={`${item.id}-${index}`} className="border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1 text-[#00ff66]">{item.name}</h3>
                        <p className="text-sm text-[#7fff99] mb-2" style={{ fontFamily: "'Courier Prime', monospace" }}>{item.description}</p>
                        <p className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">₹{(item.price * 70).toFixed(0)}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(item)}
                        className="text-[#ff1744] hover:text-[#ff1744] hover:bg-[#004d26] font-bold"
                      >
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Total */}
            <Card className="mb-6 border-4 border-[#39ff14] bg-[#003d1f] shadow-lg shadow-[#39ff14]/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between text-2xl font-bold">
                  <span className="text-[#00ff66]">Total:</span>
                  <span className="text-[#39ff14] drop-shadow-[0_0_15px_#39ff14]">₹{(total * 70).toFixed(0)}</span>
                </div>
              </CardContent>
            </Card>

            {/* Checkout Button - Normal position initially */}
            {checkoutAttempts === 0 || checkoutAttempts === 5 ? (
              <Button
                className="w-full h-16 text-xl bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_25px_#39ff14] transition-all"
                onClick={handleCheckoutClick}
              >
                Proceed to Checkout
              </Button>
            ) : (
              <div className="text-center text-[#7fff99] text-sm" style={{ fontFamily: "'Courier Prime', monospace" }}>
                <p>Click the checkout button to continue...</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Card className="border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
              <CardContent className="p-12">
                <h2 className="text-2xl font-semibold text-[#00ff66] mb-4">Your cart is empty</h2>
                <p className="text-[#7fff99] mb-6">Add some delicious items to get started!</p>
                <Button
                  className="bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg"
                  onClick={() => navigate('/')}
                >
                  Browse Menu
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Moving Checkout Button */}
      {checkoutAttempts > 0 && checkoutAttempts < 5 && (
        <Button
          className="fixed h-16 px-8 text-xl bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-4 border-[#00ff66] shadow-[0_0_30px_#39ff14] z-50 transition-all duration-300"
          style={{
            left: `${checkoutButtonPosition.x}px`,
            top: `${checkoutButtonPosition.y}px`,
          }}
          onClick={handleCheckoutClick}
        >
          Checkout
        </Button>
      )}

      {/* Delete Warning Popup */}
      {showDeleteWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#003d1f] p-8 rounded-lg shadow-[0_0_50px_#00ff66] max-w-md w-full mx-4 border-4 border-[#00ff66]">
            <h3 className="text-xl font-bold mb-4 text-[#00ff66]">Are you sure you hate this item?</h3>
            <p className="text-[#7fff99] mb-2" style={{ fontFamily: "'Courier Prime', monospace" }}>Removing: {itemToDelete?.name}</p>
            <p className="text-sm text-[#7fff99] mb-6">This item was carefully selected for you...</p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-2 border-[#00ff66] text-[#00ff66] hover:bg-[#004d26] hover:text-[#39ff14] font-bold"
                onClick={() => setShowDeleteWarning(false)}
              >
                Keep It
              </Button>
              <Button
                className="flex-1 bg-[#ff1744] hover:bg-[#ff5252] text-white font-bold border-2 border-[#ff1744] shadow-lg"
                onClick={confirmDelete}
              >
                Yes, Remove
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Forced Rating Popup */}
      {showRatingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#003d1f] p-8 rounded-lg shadow-[0_0_50px_#00ff66] max-w-md w-full mx-4 border-4 border-[#00ff66]">
            <h3 className="text-xl font-bold mb-4 text-[#00ff66]">Please Rate Our App</h3>
            <p className="text-[#7fff99] mb-6" style={{ fontFamily: "'Courier Prime', monospace" }}>You must rate us to continue to checkout</p>
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-12 cursor-pointer transition-all ${
                    star <= rating ? 'fill-[#39ff14] text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]' : 'text-[#004d26]'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            {rating > 0 && rating < 5 && (
              <p className="text-sm text-[#ff1744] text-center mb-4 font-bold">
                Please select 5 stars to proceed
              </p>
            )}
            <Button
              className="w-full bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg"
              onClick={handleRatingSubmit}
              disabled={rating !== 5}
            >
              Submit & Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}