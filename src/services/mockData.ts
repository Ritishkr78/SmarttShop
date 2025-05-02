import type { Product, RetailerOffer, PriceHistory, PricePrediction } from '../types';

// Mock Products
export const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro 256GB Graphite',
    brand: 'Apple',
    category: 'Smartphones',
    image: 'https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The iPhone 15 Pro features the A17 Pro chip, a titanium design, and a 48MP main camera system with 3x optical zoom.',
    specifications: {
      'Processor': 'A17 Pro',
      'RAM': '8GB',
      'Storage': '256GB',
      'Display': '6.1-inch Super Retina XDR',
      'Camera': '48MP + 12MP + 12MP',
      'Battery': '3200mAh',
      'OS': 'iOS 17'
    },
    averageRating: 4.8,
    reviewCount: 2786,
    lowestPrice: 99900,
    highestPrice: 109990
  },
  {
    id: 'p2',
    name: 'Samsung Galaxy S24 Ultra 512GB Black',
    brand: 'Samsung',
    category: 'Smartphones',
    image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The Galaxy S24 Ultra comes with a 200MP main camera, S Pen, Snapdragon 8 Gen 3 processor, and a stunning 6.8-inch display.',
    specifications: {
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Storage': '512GB',
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Camera': '200MP + 12MP + 10MP + 10MP',
      'Battery': '5000mAh',
      'OS': 'Android 14'
    },
    averageRating: 4.7,
    reviewCount: 1543,
    lowestPrice: 124990,
    highestPrice: 134990
  },
  {
    id: 'p3',
    name: 'MacBook Air M3 13.6-inch 8GB RAM 512GB SSD',
    brand: 'Apple',
    category: 'Laptops',
    image: 'https://images.pexels.com/photos/18069362/pexels-photo-18069362/free-photo-of-macbook-pro.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The MacBook Air with M3 chip delivers incredible performance and battery life in a slim, fanless design.',
    specifications: {
      'Processor': 'Apple M3',
      'RAM': '8GB',
      'Storage': '512GB SSD',
      'Display': '13.6-inch Liquid Retina',
      'Graphics': 'Integrated 10-core GPU',
      'Battery': 'Up to 18 hours',
      'OS': 'macOS Sonoma'
    },
    averageRating: 4.9,
    reviewCount: 982,
    lowestPrice: 114990,
    highestPrice: 129900
  },
  {
    id: 'p4',
    name: 'Dell XPS 15 9530 i7 32GB RAM 1TB SSD',
    brand: 'Dell',
    category: 'Laptops',
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The Dell XPS 15 features a stunning 3.5K OLED display, 13th-gen Intel Core i7, and NVIDIA RTX 4060 graphics.',
    specifications: {
      'Processor': 'Intel Core i7-13700H',
      'RAM': '32GB',
      'Storage': '1TB SSD',
      'Display': '15.6-inch 3.5K OLED',
      'Graphics': 'NVIDIA RTX 4060',
      'Battery': 'Up to 12 hours',
      'OS': 'Windows 11 Pro'
    },
    averageRating: 4.6,
    reviewCount: 643,
    lowestPrice: 169990,
    highestPrice: 179990
  },
  {
    id: 'p5',
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    brand: 'Sony',
    category: 'Audio',
    image: 'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Industry-leading noise cancellation and high-quality audio with up to 30 hours of battery life.',
    specifications: {
      'Driver': '30mm',
      'Battery Life': 'Up to 30 hours',
      'Noise Cancellation': 'Active',
      'Connectivity': 'Bluetooth 5.2',
      'Weight': '250g',
      'Charging': 'USB-C',
      'Features': 'Touch controls, Speak-to-chat'
    },
    averageRating: 4.8,
    reviewCount: 3249,
    lowestPrice: 27990,
    highestPrice: 34990
  },
  {
    id: 'p6',
    name: 'LG C2 65-inch OLED evo 4K Smart TV',
    brand: 'LG',
    category: 'TVs',
    image: 'https://images.pexels.com/photos/6186836/pexels-photo-6186836.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Experience perfect blacks and incredible contrast with the LG OLED evo display. Includes HDMI 2.1 for gaming and WebOS for streaming.',
    specifications: {
      'Display': '65-inch OLED evo',
      'Resolution': '4K (3840 x 2160)',
      'Refresh Rate': '120Hz',
      'HDR': 'Dolby Vision, HDR10, HLG',
      'Ports': '4x HDMI 2.1',
      'Audio': '2.2ch 40W with Dolby Atmos',
      'Smart Platform': 'webOS 22'
    },
    averageRating: 4.7,
    reviewCount: 1876,
    lowestPrice: 169900,
    highestPrice: 189990
  },
  {
    id: 'p7',
    name: 'iPad Air 5th Generation 256GB WiFi',
    brand: 'Apple',
    category: 'Tablets',
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Powered by the Apple M1 chip, the iPad Air delivers performance and all-day battery life in a thin and light design.',
    specifications: {
      'Processor': 'Apple M1',
      'RAM': '8GB',
      'Storage': '256GB',
      'Display': '10.9-inch Liquid Retina',
      'Camera': '12MP Wide front and rear',
      'Battery': 'Up to 10 hours',
      'OS': 'iPadOS 16'
    },
    averageRating: 4.8,
    reviewCount: 1253,
    lowestPrice: 59900,
    highestPrice: 64990
  },
  {
    id: 'p8',
    name: 'Dyson V15 Detect Absolute Cordless Vacuum Cleaner',
    brand: 'Dyson',
    category: 'Home Appliances',
    image: 'https://images.pexels.com/photos/6195124/pexels-photo-6195124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'The Dyson V15 Detect reveals invisible dust with a laser and automatically optimizes suction and runtime.',
    specifications: {
      'Suction Power': 'Up to 240 AW',
      'Runtime': 'Up to 60 minutes',
      'Bin Volume': '0.76L',
      'Weight': '3.1kg',
      'Filtration': 'HEPA',
      'Battery': 'Lithium-ion',
      'Features': 'Laser Detect, LCD screen, acoustic dust sensing'
    },
    averageRating: 4.6,
    reviewCount: 896,
    lowestPrice: 57900,
    highestPrice: 64990
  }
];

// Mock Retailers
export const mockRetailers: RetailerOffer[] = [
  // iPhone 15 Pro
  {
    id: 'r1p1',
    retailerId: 'r1',
    retailerName: 'Amazon',
    retailerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    productId: 'p1',
    price: 104990,
    originalPrice: 109990,
    discount: 5,
    inStock: true,
    deliveryTime: '1-2 days',
    deliveryFee: 0,
    dealScore: 8.7,
    productUrl: 'https://www.amazon.in',
    rating: 4.8,
    freeShipping: true
  },
  {
    id: 'r2p1',
    retailerId: 'r2',
    retailerName: 'Flipkart',
    retailerLogo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
    productId: 'p1',
    price: 99900,
    originalPrice: 109990,
    discount: 9,
    inStock: true,
    deliveryTime: '2-3 days',
    deliveryFee: 0,
    dealScore: 9.2,
    productUrl: 'https://www.flipkart.com',
    rating: 4.7,
    freeShipping: true
  },
  {
    id: 'r3p1',
    retailerId: 'r3',
    retailerName: 'Croma',
    retailerLogo: 'https://www.crusadersmarket.com/cdn/shop/collections/Croma-logo.jpg?v=1654850644',
    productId: 'p1',
    price: 105990,
    originalPrice: 109990,
    discount: 4,
    inStock: true,
    deliveryTime: '2-4 days',
    deliveryFee: 99,
    dealScore: 7.8,
    productUrl: 'https://www.croma.com',
    rating: 4.6,
    freeShipping: false
  },
  
  // Samsung Galaxy S24 Ultra
  {
    id: 'r1p2',
    retailerId: 'r1',
    retailerName: 'Amazon',
    retailerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    productId: 'p2',
    price: 129990,
    originalPrice: 134990,
    discount: 4,
    inStock: true,
    deliveryTime: '1-2 days',
    deliveryFee: 0,
    dealScore: 8.4,
    productUrl: 'https://www.amazon.in',
    rating: 4.7,
    freeShipping: true
  },
  {
    id: 'r2p2',
    retailerId: 'r2',
    retailerName: 'Flipkart',
    retailerLogo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
    productId: 'p2',
    price: 124990,
    originalPrice: 134990,
    discount: 7,
    inStock: true,
    deliveryTime: '2-3 days',
    deliveryFee: 0,
    dealScore: 9.0,
    productUrl: 'https://www.flipkart.com',
    rating: 4.6,
    freeShipping: true
  },
  {
    id: 'r3p2',
    retailerId: 'r3',
    retailerName: 'Croma',
    retailerLogo: 'https://www.crusadersmarket.com/cdn/shop/collections/Croma-logo.jpg?v=1654850644',
    productId: 'p2',
    price: 132990,
    originalPrice: 134990,
    discount: 1,
    inStock: true,
    deliveryTime: '2-4 days',
    deliveryFee: 0,
    dealScore: 7.6,
    productUrl: 'https://www.croma.com',
    rating: 4.5,
    freeShipping: true
  },
  
  // MacBook Air
  {
    id: 'r1p3',
    retailerId: 'r1',
    retailerName: 'Amazon',
    retailerLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png',
    productId: 'p3',
    price: 119990,
    originalPrice: 129900,
    discount: 8,
    inStock: true,
    deliveryTime: '1-2 days',
    deliveryFee: 0,
    dealScore: 8.9,
    productUrl: 'https://www.amazon.in',
    rating: 4.9,
    freeShipping: true
  },
  {
    id: 'r2p3',
    retailerId: 'r2',
    retailerName: 'Flipkart',
    retailerLogo: 'https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png',
    productId: 'p3',
    price: 114990,
    originalPrice: 129900,
    discount: 11,
    inStock: true,
    deliveryTime: '2-3 days',
    deliveryFee: 0,
    dealScore: 9.4,
    productUrl: 'https://www.flipkart.com',
    rating: 4.8,
    freeShipping: true
  },
  {
    id: 'r4p3',
    retailerId: 'r4',
    retailerName: 'Apple Store',
    retailerLogo: 'https://img.freepik.com/premium-vector/apple-logo-isolated-white-background_269568-596.jpg',
    productId: 'p3',
    price: 129900,
    originalPrice: 129900,
    discount: 0,
    inStock: true,
    deliveryTime: '3-5 days',
    deliveryFee: 0,
    dealScore: 7.2,
    productUrl: 'https://www.apple.com/in/store',
    rating: 5.0,
    freeShipping: true
  },
  
  // Generate mock price history data
  // This creates a 90-day price history with some realistic fluctuations
];

export const generateMockPriceHistory = (productId: string): PriceHistory[] => {
  const history: PriceHistory[] = [];
  const retailersForProduct = mockRetailers.filter(r => r.productId === productId);
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product || retailersForProduct.length === 0) {
    return [];
  }
  
  const today = new Date();
  const basePrice = retailersForProduct[0].originalPrice || product.lowestPrice;
  
  // Create price points for each retailer
  for (const retailer of retailersForProduct) {
    // Generate data for the last 90 days
    for (let i = 0; i < 90; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Create some random fluctuations in price
      // More significant changes less frequently
      let priceModifier = 1;
      
      if (i % 30 === 0) {
        // Bigger change every 30 days
        priceModifier = 1 + (Math.random() * 0.1 - 0.05);
      } else if (i % 10 === 0) {
        // Medium change every 10 days
        priceModifier = 1 + (Math.random() * 0.05 - 0.025);
      } else if (i % 7 === 0) {
        // Small change every week
        priceModifier = 1 + (Math.random() * 0.02 - 0.01);
      }
      
      const price = Math.round(basePrice * priceModifier);
      
      history.push({
        date: date.toISOString().split('T')[0],
        price,
        retailerId: retailer.retailerId,
        retailerName: retailer.retailerName
      });
    }
  }
  
  // Sort by date ascending
  return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const generateMockPrediction = (productId: string): PricePrediction => {
  const product = mockProducts.find(p => p.id === productId);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  const today = new Date();
  const dates: string[] = [];
  const prices: number[] = [];
  const upperBound: number[] = [];
  const lowerBound: number[] = [];
  
  // Base price from the product's current lowest price
  const basePrice = product.lowestPrice;
  
  // Generate prediction for next 30 days
  for (let i = 1; i <= 30; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
    
    // Generate a price trend - generally decreasing over time
    // with a significant drop planned at some point
    const dropDay = 15; // Plan a price drop around day 15
    
    let trendModifier = 1;
    
    if (i >= dropDay && i < dropDay + 3) {
      // Price drop period
      trendModifier = 1 - (0.05 + Math.random() * 0.07);
    } else if (i >= dropDay + 3) {
      // After the drop, prices stay low
      trendModifier = 1 - (0.08 + Math.random() * 0.04);
    } else {
      // Before the drop, slight fluctuations
      trendModifier = 1 - (Math.random() * 0.02);
    }
    
    const predictedPrice = Math.round(basePrice * trendModifier);
    prices.push(predictedPrice);
    
    // Add confidence intervals
    // Wider intervals the further into the future
    const confidenceMargin = 0.01 + (i * 0.001);
    upperBound.push(Math.round(predictedPrice * (1 + confidenceMargin)));
    lowerBound.push(Math.round(predictedPrice * (1 - confidenceMargin)));
  }
  
  // Find the lowest predicted price and its date
  const lowestPredictedPrice = Math.min(...prices);
  const lowestPredictedIndex = prices.indexOf(lowestPredictedPrice);
  const lowestPredictedDate = dates[lowestPredictedIndex];
  
  // Calculate price drop percentage
  const priceDropPercentage = ((basePrice - lowestPredictedPrice) / basePrice) * 100;
  
  return {
    dates,
    prices,
    confidence: {
      upper: upperBound,
      lower: lowerBound
    },
    lowestPredictedPrice,
    lowestPredictedDate,
    priceDropPercentage
  };
};