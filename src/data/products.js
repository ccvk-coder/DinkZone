import { images } from './images';
const shoeSizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'];
const apparelSizes = ['S', 'M', 'L', 'XL'];
const grips = ['4.125"', '4.25"'];
const products = [
  {
    id: 'p-vanguard',
    name: 'Vanguard Power Air Invikta',
    brand: 'Selkirk',
    category: 'Paddles',
    price: 13490,
    rating: 4.9,
    reviewCount: 86,
    skill: ['Advanced'],
    image: images.paddle,
    sizes: grips,
    stock: { '4.125"': 3, '4.25"': 0 },
    specs: [
      { label: 'Weight', value: '7.8\u20138.2 oz' },
      { label: 'Face', value: 'Raw carbon fiber' },
      { label: 'Core', value: '16 mm polymer honeycomb' },
      { label: 'Shape', value: 'Elongated' }
    ],
    description:
      'Elongated power paddle with an air-dynamic throat for faster hand speed at the kitchen line.',
    reviews: [
      {
        author: 'Paolo R.',
        rating: 5,
        date: 'Oct 2, 2026',
        text: 'Serves got noticeably heavier. Worth it if you play 3+ times a week.'
      },
      {
        author: 'Trish M.',
        rating: 5,
        date: 'Sep 18, 2026',
        text: 'Huge sweet spot for an elongated shape.'
      }
    ]
  },
  {
    id: 'p-hyperion',
    name: 'Hyperion CFS 16 Ben Johns',
    brand: 'JOOLA',
    category: 'Paddles',
    price: 11990,
    compareAt: 12990,
    rating: 4.8,
    reviewCount: 124,
    skill: ['Intermediate', 'Advanced'],
    image: images.paddle,
    sizes: grips,
    stock: { '4.125"': 7, '4.25"': 4 },
    specs: [
      { label: 'Weight', value: '8.0 oz' },
      { label: 'Face', value: 'Carbon friction surface' },
      { label: 'Core', value: '16 mm Reactive Polymer' },
      { label: 'Shape', value: 'Hybrid' }
    ],
    description:
      'Control-first paddle with heavy spin, used on the pro tour. A favorite for doubles dinkers.',
    reviews: [
      {
        author: 'Kenji A.',
        rating: 5,
        date: 'Oct 11, 2026',
        text: 'Spin is unreal. Third-shot drops just sit down.'
      }
    ]
  },
  {
    id: 'p-signature',
    name: 'Signature Pro 14',
    brand: 'Franklin',
    category: 'Paddles',
    price: 6490,
    rating: 4.6,
    reviewCount: 61,
    skill: ['Intermediate'],
    image: images.paddle,
    sizes: grips,
    stock: { '4.125"': 10, '4.25"': 6 },
    specs: [
      { label: 'Weight', value: '7.9 oz' },
      { label: 'Face', value: 'Fiberglass' },
      { label: 'Core', value: '14 mm polypropylene' },
      { label: 'Shape', value: 'Standard' }
    ],
    description:
      'Lively fiberglass face and a forgiving core \u2014 a great step up from your first paddle.',
    reviews: [
      {
        author: 'Gelo S.',
        rating: 4,
        date: 'Sep 30, 2026',
        text: 'Pop for days. Grip is a bit thin for me.'
      }
    ]
  },
  {
    id: 'p-z5',
    name: 'Graphite Z5',
    brand: 'Onix',
    category: 'Paddles',
    price: 5290,
    rating: 4.5,
    reviewCount: 203,
    skill: ['Beginner', 'Intermediate'],
    image: images.paddle,
    sizes: grips,
    stock: { '4.125"': 14, '4.25"': 9 },
    specs: [
      { label: 'Weight', value: '7.8 oz' },
      { label: 'Face', value: 'Graphite' },
      { label: 'Core', value: 'Nomex honeycomb' },
      { label: 'Shape', value: 'Wide body' }
    ],
    description:
      'The classic all-rounder. Wide body, big sweet spot, and a quiet core for indoor play.',
    reviews: [
      {
        author: 'Ana L.',
        rating: 5,
        date: 'Aug 22, 2026',
        text: 'Perfect first \u201Creal\u201D paddle.'
      }
    ]
  },
  {
    id: 'p-starter',
    name: 'Court Starter Paddle',
    brand: 'DinkZone',
    category: 'Paddles',
    price: 1990,
    rating: 4.3,
    reviewCount: 312,
    skill: ['Beginner'],
    image: images.paddle,
    sizes: ['Standard'],
    stock: { Standard: 42 },
    specs: [
      { label: 'Weight', value: '8.2 oz' },
      { label: 'Face', value: 'Fiberglass' },
      { label: 'Core', value: '13 mm polymer' },
      { label: 'Shape', value: 'Standard' }
    ],
    description: 'Our house paddle \u2014 durable, forgiving, and priced so you can stop renting.',
    reviews: [
      {
        author: 'Joy P.',
        rating: 4,
        date: 'Oct 15, 2026',
        text: 'Bought after my second rental. No regrets.'
      }
    ]
  },
  {
    id: 'p-radical',
    name: 'Radical Tour Raw',
    brand: 'HEAD',
    category: 'Paddles',
    price: 8990,
    rating: 4.7,
    reviewCount: 48,
    skill: ['Intermediate', 'Advanced'],
    image: images.paddle,
    sizes: grips,
    stock: { '4.125"': 2, '4.25"': 5 },
    specs: [
      { label: 'Weight', value: '8.1 oz' },
      { label: 'Face', value: 'Raw carbon' },
      { label: 'Core', value: '16 mm Optimized Polymer' },
      { label: 'Shape', value: 'Hybrid' }
    ],
    description: 'Balanced power and touch with a thermoformed edge for consistency.',
    reviews: [
      {
        author: 'Rafa D.',
        rating: 5,
        date: 'Sep 3, 2026',
        text: 'Feels like a premium paddle at a fair price.'
      }
    ]
  },
  {
    id: 'b-x40',
    name: 'X-40 Outdoor Balls \xB7 3-pack',
    brand: 'Franklin',
    category: 'Balls',
    price: 690,
    rating: 4.8,
    reviewCount: 540,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.balls,
    sizes: ['3-pack', '12-pack'],
    stock: { '3-pack': 88, '12-pack': 12 },
    specs: [
      { label: 'Use', value: 'Outdoor' },
      { label: 'Holes', value: '40' },
      { label: 'Approval', value: 'USA Pickleball' }
    ],
    description: 'The official ball of most Cebu tournaments. Consistent bounce in the heat.',
    reviews: [
      {
        author: 'Mark T.',
        rating: 5,
        date: 'Oct 9, 2026',
        text: 'Lasts longer than the cheap ones.'
      }
    ]
  },
  {
    id: 'b-dura',
    name: 'Dura Fast 40 \xB7 6-pack',
    brand: 'Onix',
    category: 'Balls',
    price: 1290,
    rating: 4.6,
    reviewCount: 211,
    skill: ['Intermediate', 'Advanced'],
    image: images.balls,
    sizes: ['6-pack'],
    stock: { '6-pack': 30 },
    specs: [
      { label: 'Use', value: 'Outdoor' },
      { label: 'Holes', value: '40' },
      { label: 'Approval', value: 'USA Pickleball' }
    ],
    description: 'Fast, hard ball for competitive outdoor play.',
    reviews: [
      {
        author: 'Ian C.',
        rating: 4,
        date: 'Sep 12, 2026',
        text: 'Fast \u2014 cracks after a few weeks of heavy use.'
      }
    ]
  },
  {
    id: 'b-fuse',
    name: 'Fuse Indoor Balls \xB7 3-pack',
    brand: 'Onix',
    category: 'Balls',
    price: 590,
    rating: 4.5,
    reviewCount: 97,
    skill: ['Beginner', 'Intermediate'],
    image: images.balls,
    sizes: ['3-pack'],
    stock: { '3-pack': 0 },
    specs: [
      { label: 'Use', value: 'Indoor' },
      { label: 'Holes', value: '26' },
      { label: 'Approval', value: 'USA Pickleball' }
    ],
    description: 'Softer indoor ball with larger holes for controlled rallies.',
    reviews: []
  },
  {
    id: 's-express',
    name: 'Express Light Pickleball',
    brand: 'K-Swiss',
    category: 'Shoes',
    price: 5990,
    rating: 4.7,
    reviewCount: 74,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.shoes,
    sizes: shoeSizes,
    stock: { 'US 7': 2, 'US 8': 5, 'US 9': 6, 'US 10': 3, 'US 11': 0 },
    specs: [
      { label: 'Outsole', value: 'Non-marking Aosta 7.0' },
      { label: 'Weight', value: '320 g' },
      { label: 'Fit', value: 'True to size' }
    ],
    description: 'Lightweight court shoe built for quick lateral moves at the kitchen line.',
    reviews: [
      { author: 'Bea G.', rating: 5, date: 'Oct 1, 2026', text: 'So light. No more ankle rolls.' }
    ]
  },
  {
    id: 's-renma',
    name: 'Gel-Renma',
    brand: 'ASICS',
    category: 'Shoes',
    price: 6490,
    rating: 4.8,
    reviewCount: 102,
    skill: ['Intermediate', 'Advanced'],
    image: images.shoes,
    sizes: shoeSizes,
    stock: { 'US 7': 4, 'US 8': 6, 'US 9': 1, 'US 10': 7, 'US 11': 3 },
    specs: [
      { label: 'Outsole', value: 'AHAR rubber' },
      { label: 'Cushion', value: 'GEL rearfoot' },
      { label: 'Fit', value: 'Runs slightly narrow' }
    ],
    description: 'Pickleball-specific court shoe with GEL cushioning for long tournament days.',
    reviews: [
      {
        author: 'Carlo V.',
        rating: 5,
        date: 'Sep 27, 2026',
        text: 'Survived a full weekend at the Cebu Open.'
      }
    ]
  },
  {
    id: 's-viper',
    name: 'Viper Court Pro',
    brand: 'Skechers',
    category: 'Shoes',
    price: 5490,
    rating: 4.6,
    reviewCount: 66,
    skill: ['Beginner', 'Intermediate'],
    image: images.shoes,
    sizes: shoeSizes,
    stock: { 'US 7': 8, 'US 8': 8, 'US 9': 5, 'US 10': 4, 'US 11': 2 },
    specs: [
      { label: 'Outsole', value: 'Goodyear rubber' },
      { label: 'Insole', value: 'Arch Fit' },
      { label: 'Fit', value: 'Wide toe box' }
    ],
    description: 'Comfort-first court shoe with a roomy toe box and arch support.',
    reviews: []
  },
  {
    id: 's-jet',
    name: 'Jet Mach 3 All Court',
    brand: 'Babolat',
    category: 'Shoes',
    price: 7990,
    rating: 4.7,
    reviewCount: 39,
    skill: ['Advanced'],
    image: images.shoes,
    sizes: shoeSizes,
    stock: { 'US 7': 0, 'US 8': 2, 'US 9': 3, 'US 10': 2, 'US 11': 1 },
    specs: [
      { label: 'Outsole', value: 'Michelin rubber' },
      { label: 'Weight', value: '305 g' },
      { label: 'Fit', value: 'True to size' }
    ],
    description:
      'Premium speed shoe with a Michelin outsole that grips even on dusty outdoor courts.',
    reviews: [
      { author: 'Lito F.', rating: 4, date: 'Aug 30, 2026', text: 'Fast and grippy. Pricey.' }
    ]
  },
  {
    id: 'g-tour',
    name: 'Tour Backpack',
    brand: 'Selkirk',
    category: 'Bags',
    price: 4990,
    rating: 4.8,
    reviewCount: 58,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.bag,
    sizes: ['One size'],
    stock: { 'One size': 11 },
    specs: [
      { label: 'Capacity', value: '4 paddles' },
      { label: 'Shoe pocket', value: 'Ventilated' },
      { label: 'Material', value: 'Water-resistant nylon' }
    ],
    description: 'Carries four paddles, shoes, and a change of clothes. Fence hook included.',
    reviews: [
      {
        author: 'Nina O.',
        rating: 5,
        date: 'Oct 6, 2026',
        text: 'The fence hook is a game changer.'
      }
    ]
  },
  {
    id: 'g-duffle',
    name: 'Vision Duffle',
    brand: 'JOOLA',
    category: 'Bags',
    price: 5490,
    rating: 4.6,
    reviewCount: 22,
    skill: ['Intermediate', 'Advanced'],
    image: images.bag,
    sizes: ['One size'],
    stock: { 'One size': 4 },
    specs: [
      { label: 'Capacity', value: '6 paddles' },
      { label: 'Compartments', value: '5' },
      { label: 'Material', value: 'Ripstop polyester' }
    ],
    description: 'Tournament-ready duffle with a separate thermal paddle sleeve.',
    reviews: []
  },
  {
    id: 'g-sling',
    name: 'Court Sling',
    brand: 'DinkZone',
    category: 'Bags',
    price: 1490,
    rating: 4.4,
    reviewCount: 87,
    skill: ['Beginner', 'Intermediate'],
    image: images.bag,
    sizes: ['One size'],
    stock: { 'One size': 26 },
    specs: [
      { label: 'Capacity', value: '2 paddles' },
      { label: 'Weight', value: '420 g' },
      { label: 'Material', value: 'Recycled canvas' }
    ],
    description: 'Minimal sling for quick sessions \u2014 two paddles, phone, keys, done.',
    reviews: [{ author: 'Rico B.', rating: 4, date: 'Sep 8, 2026', text: 'Simple and tough.' }]
  },
  {
    id: 'a-tee',
    name: 'Court Line Dri-Fit Tee',
    brand: 'DinkZone',
    category: 'Apparel',
    price: 890,
    rating: 4.7,
    reviewCount: 143,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.apparel,
    sizes: apparelSizes,
    stock: { S: 10, M: 18, L: 12, XL: 0 },
    specs: [
      { label: 'Fabric', value: '100% recycled polyester' },
      { label: 'Fit', value: 'Athletic' },
      { label: 'UPF', value: '40+' }
    ],
    description: 'Quick-dry tee built for Cebu humidity, with a subtle court-line print.',
    reviews: [
      { author: 'Dana K.', rating: 5, date: 'Oct 12, 2026', text: 'Dries fast even at noon games.' }
    ]
  },
  {
    id: 'a-visor',
    name: 'Sun Visor',
    brand: 'DinkZone',
    category: 'Apparel',
    price: 590,
    rating: 4.5,
    reviewCount: 68,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.apparel,
    sizes: ['One size'],
    stock: { 'One size': 34 },
    specs: [
      { label: 'Fabric', value: 'Moisture-wicking twill' },
      { label: 'Closure', value: 'Velcro strap' }
    ],
    description: 'Wide brim, sweatband, and a strap that stays put through long rallies.',
    reviews: []
  },
  {
    id: 'a-shorts',
    name: 'Performance Shorts 7"',
    brand: 'HEAD',
    category: 'Apparel',
    price: 1190,
    rating: 4.6,
    reviewCount: 41,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.apparel,
    sizes: apparelSizes,
    stock: { S: 3, M: 7, L: 6, XL: 4 },
    specs: [
      { label: 'Inseam', value: '7 inches' },
      { label: 'Pockets', value: 'Deep ball pockets' }
    ],
    description: 'Stretch shorts with ball-sized pockets so you never run back to the bench.',
    reviews: []
  },
  {
    id: 'a-skort',
    name: 'Rally Skort',
    brand: 'K-Swiss',
    category: 'Apparel',
    price: 1390,
    rating: 4.8,
    reviewCount: 52,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.apparel,
    sizes: apparelSizes,
    stock: { S: 6, M: 9, L: 2, XL: 1 },
    specs: [
      { label: 'Fabric', value: '4-way stretch' },
      { label: 'Liner', value: 'Built-in shorts' }
    ],
    description: 'Flattering, breathable skort with built-in shorts and ball pockets.',
    reviews: [{ author: 'Mae T.', rating: 5, date: 'Oct 4, 2026', text: 'Comfortable all day.' }]
  },
  {
    id: 'x-overgrip',
    name: 'Tacky Overgrip \xB7 3-pack',
    brand: 'Gamma',
    category: 'Accessories',
    price: 390,
    rating: 4.6,
    reviewCount: 180,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.paddle,
    sizes: ['3-pack'],
    stock: { '3-pack': 60 },
    specs: [
      { label: 'Feel', value: 'Tacky' },
      { label: 'Thickness', value: '0.6 mm' }
    ],
    description: 'Fresh grip for sweaty hands. Wrap one before every tournament.',
    reviews: []
  },
  {
    id: 'x-edge',
    name: 'Edge Guard Tape',
    brand: 'Selkirk',
    category: 'Accessories',
    price: 290,
    rating: 4.3,
    reviewCount: 35,
    skill: ['Intermediate', 'Advanced'],
    image: images.paddle,
    sizes: ['One size'],
    stock: { 'One size': 22 },
    specs: [
      { label: 'Length', value: 'Fits 2 paddles' },
      { label: 'Weight', value: '+3 g' }
    ],
    description: 'Protect your paddle edge from scrapes on hard courts.',
    reviews: []
  },
  {
    id: 'x-wrist',
    name: 'Terry Wristbands \xB7 Pair',
    brand: 'DinkZone',
    category: 'Accessories',
    price: 250,
    rating: 4.4,
    reviewCount: 29,
    skill: ['Beginner', 'Intermediate', 'Advanced'],
    image: images.apparel,
    sizes: ['One size'],
    stock: { 'One size': 5 },
    specs: [{ label: 'Material', value: 'Cotton terry' }],
    description: 'Keeps sweat off your grip during humid evening sessions.',
    reviews: []
  }
];
const productCategories = ['All', 'Paddles', 'Balls', 'Shoes', 'Bags', 'Apparel', 'Accessories'];
export { productCategories, products };
