import { useState } from 'react';
import { useNavigate } from 'react-router';
import { foodItems, spicyFilters, FoodItem } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, ShoppingCart, X, Filter } from 'lucide-react';
import { playRandomSound, playSpecificSound } from '../utils/sounds';

export function FilterPage() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [displayedItems, setDisplayedItems] = useState<FoodItem[]>([]);

  // Deliberately wrong filter logic!
  const applyFilter = (filter: string) => {
    playRandomSound();
    setSelectedFilter(filter);

    let results: FoodItem[] = [];

    // Completely wrong filter logic
    switch (filter) {
      case 'Spicy':
        results = foodItems.filter(item => 
          item.category === 'Desserts' || item.category === 'Drinks'
        );
        break;
      
      case 'Very Spicy':
        results = foodItems.filter(item => item.category === 'Burger');
        break;
      
      case 'Not Spicy But Looks Spicy':
        results = foodItems.filter(item => item.category === 'Pizza');
        break;
      
      case 'Emotionally Spicy':
        results = [...foodItems].sort(() => Math.random() - 0.5).slice(0, 4);
        break;
      
      default:
        results = [];
    }

    setDisplayedItems(results);
  };

  const clearFilter = () => {
    playRandomSound();
    setSelectedFilter(null);
    setDisplayedItems([]);
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
                onClick={() => navigate('/')}
              />
              <h1 className="text-2xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">Filter Menu</h1>
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Section */}
        <Card className="mb-8 border-4 border-[#00ff66] bg-[#003d1f] shadow-lg shadow-[#00ff66]/30">
          <CardHeader className="bg-[#004d26] border-b-4 border-[#00ff66]">
            <CardTitle className="flex items-center gap-2 text-[#00ff66]">
              <Filter className="w-6 h-6 text-[#39ff14] animate-pulse" />
              Filter by Spice Level
            </CardTitle>
            <CardDescription className="text-[#7fff99]">
              Select your preferred spice level
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {spicyFilters.map((filter) => (
                <Button
                  key={filter}
                  onClick={() => applyFilter(filter)}
                  variant={selectedFilter === filter ? "default" : "outline"}
                  className={`h-16 text-sm font-bold ${
                    selectedFilter === filter 
                      ? 'bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] border-2 border-[#00ff66] shadow-[0_0_20px_#39ff14]' 
                      : 'border-4 border-[#00ff66] text-[#00ff66] hover:bg-[#004d26] hover:text-[#39ff14]'
                  }`}
                >
                  {filter}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Filter Badge */}
        {selectedFilter && (
          <div className="mb-6 flex items-center justify-between bg-[#003d1f] p-4 rounded-lg border-4 border-[#39ff14] shadow-lg shadow-[#39ff14]/30">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#7fff99]" style={{ fontFamily: "'Courier Prime', monospace" }}>Active Filter:</span>
              <Badge className="bg-[#39ff14] text-[#001a0d] px-3 py-1 font-bold text-lg border-2 border-[#00ff66]">{selectedFilter}</Badge>
            </div>
            <Button
              onClick={clearFilter}
              variant="ghost"
              size="sm"
              className="text-[#ff1744] hover:text-[#ff1744] hover:bg-[#004d26] font-bold"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          </div>
        )}

        {/* Results */}
        {displayedItems.length > 0 ? (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-[#00ff66]">
                {displayedItems.length} items found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedItems.map((item) => (
                <Card key={item.id} className="border-4 border-[#00ff66] bg-[#003d1f] hover:shadow-[0_0_30px_#00ff66] transition-all hover:scale-105 transform overflow-hidden">
                  {/* Product Image */}
                  {item.imageUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-[#00ff66]">{item.name}</CardTitle>
                    <CardDescription className="text-[#7fff99]">{item.description}</CardDescription>
                    <Badge className="w-fit mt-2 bg-[#004d26] text-[#39ff14] border-2 border-[#00ff66]">{item.spicyLevel}</Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-[#39ff14] drop-shadow-[0_0_10px_#39ff14]">₹{(item.price * 70).toFixed(0)}</span>
                    </div>
                    <Button 
                      className="w-full bg-[#39ff14] hover:bg-[#00ff66] text-[#001a0d] font-bold border-2 border-[#00ff66] shadow-lg hover:shadow-[0_0_20px_#39ff14] transition-all"
                      onClick={() => playRandomSound()}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : selectedFilter ? (
          <div className="text-center py-16 bg-[#003d1f] rounded-lg border-4 border-[#00ff66] shadow-lg shadow-[#00ff66]/30">
            <p className="text-xl text-[#7fff99]">🤷 No items found</p>
          </div>
        ) : (
          <Card className="border-4 border-dashed border-[#00ff66] bg-[#003d1f]">
            <CardContent className="p-12 text-center">
              <Filter className="w-16 h-16 text-[#00ff66] mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-semibold text-[#00ff66] mb-2">No Filter Selected</h3>
              <p className="text-[#7fff99]">Select a spice level filter above</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}