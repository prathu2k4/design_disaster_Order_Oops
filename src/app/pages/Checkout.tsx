import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function Checkout() {
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderStatus, setOrderStatus] = useState('');
  const [statusIndex, setStatusIndex] = useState(0);

  const fakeStatuses = [
    'Thinking about cooking...',
    'Chef is stretching...',
    'Looking for ingredients...',
    'Delivery guy contemplating life...',
    'Finding your address on a map...',
    'Packing your order... maybe...',
    'On the way... or not...',
    'Arrived! (Just kidding)',
  ];

  const fakeCoupons = ['SAVE50', 'SUPER50', 'FREEMEAL', 'DISCOUNT', 'WELCOME'];

  const handleApplyCoupon = () => {
    playRandomSound();
    setCouponError('');
    
    if (!couponCode) {
      setCouponError('Please enter a coupon code');
      return;
    }

    // All coupons are fake and invalid
    const errors = [
      'Coupon Invalid',
      'Coupon Expired',
      'Coupon Not Applicable',
      'This coupon is for other users only',
      'Minimum order value not met',
    ];
    
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setCouponError(randomError);
    playSpecificSound('alarm');
  };

  const handlePlaceOrder = () => {
    playSpecificSound('doorbell');
    setOrderPlaced(true);
    setStatusIndex(0);
  };

  // Cycle through useless statuses
  useEffect(() => {
    if (orderPlaced && statusIndex < fakeStatuses.length) {
      const timer = setTimeout(() => {
        setOrderStatus(fakeStatuses[statusIndex]);
        setStatusIndex(prev => prev + 1);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, statusIndex]);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#001a0d] flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full border-4 border-[#39ff14] bg-[#003d1f] shadow-[0_0_50px_#39ff14]">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#39ff14]">
            <div className="flex items-center justify-center gap-2 mb-4">
              <CheckCircle2 className="w-16 h-16 text-[#39ff14] animate-pulse" />
            </div>
            <CardTitle className="text-center text-3xl text-[#00ff66]">
              Order Placed Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <p className="text-[#7fff99] mb-2" style={{ fontFamily: "'Courier Prime', monospace" }}>Order #ORD{Math.floor(Math.random() * 10000)}</p>
              <p className="text-sm text-[#7fff99]">Estimated delivery: 30-45 minutes</p>
            </div>

            {/* Useless Order Tracking */}
            <div className="bg-[#001a0d] p-6 rounded-lg mb-6 border-4 border-[#00ff66]">
              <h3 className="font-semibold text-lg mb-4 text-[#00ff66]">Order Status</h3>
              <div className="space-y-3">
                {fakeStatuses.slice(0, statusIndex + 1).map((status, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-2 ${
                      index === statusIndex ? 'text-[#39ff14] font-semibold' : 'text-[#7fff99]'
                    }`}
                    style={{ fontFamily: "'Courier Prime', monospace" }}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      index === statusIndex ? 'bg-[#39ff14] animate-pulse shadow-[0_0_10px_#39ff14]' : 'bg-[#004d26]'
                    }`} />
                    <span>{status}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_25px_#39ff14] transition-all"
              onClick={() => navigate('/')}
            >
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#001a0d]">
      {/* Header */}
      <header className="bg-[#003d1f] border-b-4 border-[#00ff66] sticky top-0 z-10 shadow-lg shadow-[#00ff66]/20">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ArrowLeft 
                className="w-6 h-6 text-[#00ff66] cursor-pointer hover:text-[#39ff14] transition-colors animate-pulse" 
                onClick={() => navigate('/cart')}
              />
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">Checkout</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Delivery Address */}
        <Card className="mb-6 border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#00ff66]">
            <CardTitle className="text-[#00ff66]">Delivery Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Input placeholder="Full Name" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            <Input placeholder="Phone Number" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            <Input placeholder="Street Address" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="City" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
              <Input placeholder="ZIP Code" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            </div>
          </CardContent>
        </Card>

        {/* Fake Coupon Section */}
        <Card className="mb-6 border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#00ff66]">
            <CardTitle className="text-[#00ff66]">Apply Coupon</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]"
              />
              <Button
                onClick={handleApplyCoupon}
                className="bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg whitespace-nowrap"
              >
                Apply
              </Button>
            </div>
            {couponError && (
              <p className="text-sm text-[#ff1744] mb-3 font-bold">{couponError}</p>
            )}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm text-[#7fff99]" style={{ fontFamily: "'Courier Prime', monospace" }}>Try:</span>
              {fakeCoupons.map((code) => (
                <Badge
                  key={code}
                  variant="outline"
                  className="cursor-pointer border-2 border-[#39ff14] text-[#39ff14] hover:bg-[#004d26] font-bold"
                  onClick={() => setCouponCode(code)}
                >
                  {code}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card className="mb-6 border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#00ff66]">
            <CardTitle className="text-[#00ff66]">Payment Method</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <Input placeholder="Card Number" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="MM/YY" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
              <Input placeholder="CVV" className="bg-[#001a0d] border-2 border-[#00ff66] text-[#00ff66] placeholder:text-[#004d26]" />
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="mb-6 border-4 border-[#39ff14] bg-[#003d1f] shadow-lg shadow-[#39ff14]/30">
          <CardContent className="p-6">
            <div className="space-y-2 mb-4" style={{ fontFamily: "'Courier Prime', monospace" }}>
              <div className="flex justify-between text-[#7fff99]">
                <span>Subtotal:</span>
                <span>₹2,308</span>
              </div>
              <div className="flex justify-between text-[#7fff99]">
                <span>Delivery Fee:</span>
                <span>₹349</span>
              </div>
              <div className="flex justify-between text-[#7fff99]">
                <span>Service Charge:</span>
                <span>₹175</span>
              </div>
              <div className="flex justify-between text-[#ff1744] font-bold">
                <span>Processing Fee:</span>
                <span>₹228</span>
              </div>
            </div>
            <div className="border-t-4 border-[#00ff66] pt-4">
              <div className="flex justify-between text-2xl font-bold">
                <span className="text-[#00ff66]">Total:</span>
                <span className="text-[#39ff14] drop-shadow-[0_0_15px_#39ff14]">₹3,060</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-16 text-xl bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_25px_#39ff14] transition-all"
          onClick={handlePlaceOrder}
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}