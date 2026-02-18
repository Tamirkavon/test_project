// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "La Bella Italia",
    cuisine: "Italian",
    description: "Authentic Italian cuisine in a cozy setting. Known for handmade pasta, wood-fired pizzas, and a carefully curated wine list. A neighborhood favorite for over 15 years.",
    emoji: "🍝",
    rating: 4.5,
    reviews: [
      { reviewerName: "Sarah M.", rating: 5, comment: "The best carbonara I've ever had outside of Rome. Absolutely incredible.", date: "2025-12-10" },
      { reviewerName: "James K.", rating: 4, comment: "Great ambiance and solid food. The tiramisu is a must-try.", date: "2025-11-22" }
    ]
  },
  {
    id: 2,
    name: "Tokyo Ramen House",
    cuisine: "Japanese",
    description: "A ramen-focused spot serving rich, slow-simmered broths with fresh noodles. The tonkotsu and miso ramen are crowd favorites, alongside crispy gyoza and matcha desserts.",
    emoji: "🍜",
    rating: 4.7,
    reviews: [
      { reviewerName: "Alex T.", rating: 5, comment: "Tonkotsu broth is unbelievably rich. Worth the wait.", date: "2026-01-05" },
      { reviewerName: "Maria L.", rating: 4, comment: "Loved the spicy miso. Portions are generous.", date: "2025-12-18" }
    ]
  },
  {
    id: 3,
    name: "The Grill Pit",
    cuisine: "American BBQ",
    description: "Low and slow smoked meats done right. Brisket, ribs, and pulled pork with house-made sauces. Sides include mac & cheese, coleslaw, and cornbread.",
    emoji: "🥩",
    rating: 4.3,
    reviews: [
      { reviewerName: "Tom B.", rating: 5, comment: "The brisket melts in your mouth. Best BBQ in the city.", date: "2026-01-15" },
      { reviewerName: "Nina P.", rating: 4, comment: "Solid ribs and great sides. Sauce is a bit sweet for my taste.", date: "2025-11-30" }
    ]
  },
  {
    id: 4,
    name: "Spice Garden",
    cuisine: "Indian",
    description: "Vibrant Indian flavors with dishes ranging from creamy butter chicken to fiery vindaloo. Fresh naan baked in a tandoor oven and a fantastic selection of vegetarian options.",
    emoji: "🍛",
    rating: 4.6,
    reviews: [
      { reviewerName: "Priya S.", rating: 5, comment: "Feels like home cooking. The paneer tikka is outstanding.", date: "2026-02-01" },
      { reviewerName: "David R.", rating: 4, comment: "Great flavors. The lamb biryani is a standout dish.", date: "2025-12-28" }
    ]
  },
  {
    id: 5,
    name: "Le Petit Bistro",
    cuisine: "French",
    description: "Classic French bistro fare in an intimate setting. From coq au vin to crème brûlée, every dish is prepared with care and traditional technique.",
    emoji: "🥐",
    rating: 4.4,
    reviews: [
      { reviewerName: "Emily C.", rating: 5, comment: "The duck confit was perfectly crispy. Wonderful wine pairings.", date: "2026-01-20" },
      { reviewerName: "Mark H.", rating: 4, comment: "Charming atmosphere. The onion soup is comforting and delicious.", date: "2025-12-05" }
    ]
  },
  {
    id: 6,
    name: "Taco Loco",
    cuisine: "Mexican",
    description: "Street-style tacos and burritos bursting with flavor. Fresh salsas, handmade tortillas, and generous portions. The al pastor and carnitas are legendary.",
    emoji: "🌮",
    rating: 4.2,
    reviews: [
      { reviewerName: "Carlos G.", rating: 4, comment: "Authentic street taco vibes. The al pastor is legit.", date: "2026-01-08" },
      { reviewerName: "Lisa W.", rating: 4, comment: "Love the fresh salsa bar. Great value for the price.", date: "2025-11-15" }
    ]
  }
];

// Get all reviews including user-submitted ones from localStorage
function getReviews(restaurantId) {
  const restaurant = restaurants.find(r => r.id === restaurantId);
  const builtIn = restaurant ? restaurant.reviews : [];
  const stored = JSON.parse(localStorage.getItem("userReviews") || "[]");
  const userReviews = stored.filter(r => r.restaurantId === restaurantId);
  return [...builtIn, ...userReviews];
}

// Save a user review to localStorage
function saveReview(review) {
  const stored = JSON.parse(localStorage.getItem("userReviews") || "[]");
  stored.push(review);
  localStorage.setItem("userReviews", JSON.stringify(stored));
}

// Calculate average rating including user reviews
function getAverageRating(restaurantId) {
  const allReviews = getReviews(restaurantId);
  if (allReviews.length === 0) return 0;
  const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / allReviews.length) * 10) / 10;
}

// Render star HTML
function renderStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.3;
  const empty = 5 - full - (half ? 1 : 0);
  let html = "";
  for (let i = 0; i < full; i++) html += "&#9733;";
  if (half) html += "&#9733;";
  for (let i = 0; i < empty; i++) html += '<span class="empty">&#9733;</span>';
  return html;
}

// Render a restaurant card
function renderCard(restaurant) {
  const avg = getAverageRating(restaurant.id);
  const reviewCount = getReviews(restaurant.id).length;
  return `
    <a class="card" href="review.html?id=${restaurant.id}">
      <div class="card-img">${restaurant.emoji}</div>
      <div class="card-body">
        <h3>${restaurant.name}</h3>
        <div class="cuisine">${restaurant.cuisine}</div>
        <div class="stars">${renderStars(avg)} <span style="color:#777; font-size:0.85rem;">(${avg} - ${reviewCount} reviews)</span></div>
        <div class="excerpt">${restaurant.description.substring(0, 90)}...</div>
      </div>
    </a>
  `;
}

// Get query param
function getParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}
