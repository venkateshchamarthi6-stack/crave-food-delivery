/**
 * CRAVE — Premium Food Delivery Interactive Platform Scripts
 * Handles cart management, price calculations, category filters, modals, and toasts.
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Sticky Navbar & Scroll Effect ---
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-menu .nav-item');

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    const scrollPos = window.pageYOffset + 120;
    sections.forEach((sec) => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- 2. Mobile Drawer Navigation ---
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- 3. Interactive Location Selector ---
  const locationPicker = document.getElementById('locationPicker');
  const currentLocation = document.getElementById('currentLocation');
  const mobileCurrentLocation = document.getElementById('mobileCurrentLocation');
  const searchLocationInput = document.getElementById('searchLocationInput');
  const cartDeliveryAddress = document.getElementById('cartDeliveryAddress');

  const cities = [
    'Indiranagar, Bengaluru',
    'Koramangala, Bengaluru',
    'Bandra West, Mumbai',
    'Connaught Place, New Delhi',
    'Jubilee Hills, Hyderabad'
  ];
  let cityIndex = 0;

  if (locationPicker) {
    locationPicker.addEventListener('click', () => {
      cityIndex = (cityIndex + 1) % cities.length;
      const selected = cities[cityIndex];
      if (currentLocation) currentLocation.textContent = selected;
      if (mobileCurrentLocation) mobileCurrentLocation.textContent = selected;
      if (searchLocationInput) searchLocationInput.value = selected;
      if (cartDeliveryAddress) cartDeliveryAddress.textContent = selected;
      showToast(`Delivery location updated to: ${selected}`);
    });
  }

  // --- 4. Category Carousel Horizontal Scroll Arrows ---
  const catCarousel = document.getElementById('categoriesCarousel');
  const catLeft = document.getElementById('catScrollLeft');
  const catRight = document.getElementById('catScrollRight');

  if (catLeft && catCarousel) {
    catLeft.addEventListener('click', () => {
      catCarousel.scrollBy({ left: -260, behavior: 'smooth' });
    });
  }
  if (catRight && catCarousel) {
    catRight.addEventListener('click', () => {
      catCarousel.scrollBy({ left: 260, behavior: 'smooth' });
    });
  }

  // --- 5. Category Click to Filter Restaurants ---
  const categoryCards = document.querySelectorAll('.category-card');
  const restaurantCards = document.querySelectorAll('.restaurant-card');
  const restaurantsSection = document.getElementById('restaurants');

  categoryCards.forEach((card) => {
    card.addEventListener('click', () => {
      const cat = card.getAttribute('data-category');
      showToast(`Showing popular places for "${cat}"`);
      
      // Filter matching restaurant cards
      filterRestaurantsByCategory(cat);

      // Smooth scroll to restaurant section
      if (restaurantsSection) {
        const offset = restaurantsSection.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  function filterRestaurantsByCategory(category) {
    const catLower = category.toLowerCase();
    restaurantCards.forEach((card) => {
      const cuisine = (card.getAttribute('data-cuisine') || '').toLowerCase();
      if (cuisine.includes(catLower) || catLower === 'all') {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // --- 6. Restaurant Filter Tabs (All, Fast, Rating, Free) ---
  const restTabs = document.querySelectorAll('.rest-tab-btn');

  restTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      restTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      restaurantCards.forEach((card) => {
        const tags = card.getAttribute('data-tags') || '';
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 7. Integrated Search Bar ---
  const searchInput = document.getElementById('searchInput');
  const searchSubmitBtn = document.getElementById('searchSubmitBtn');
  const quickTags = document.querySelectorAll('.filter-tag');

  const performSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      restaurantCards.forEach((card) => (card.style.display = 'flex'));
      return;
    }

    let matchCount = 0;
    restaurantCards.forEach((card) => {
      const name = card.querySelector('.restaurant-name').textContent.toLowerCase();
      const cuisine = card.getAttribute('data-cuisine').toLowerCase();
      if (name.includes(q) || cuisine.includes(q)) {
        card.style.display = 'flex';
        matchCount++;
      } else {
        card.style.display = 'none';
      }
    });

    showToast(`Found ${matchCount} kitchens for "${query}"`);
    if (restaurantsSection) {
      window.scrollTo({ top: restaurantsSection.offsetTop - 80, behavior: 'smooth' });
    }
  };

  if (searchSubmitBtn && searchInput) {
    searchSubmitBtn.addEventListener('click', () => performSearch(searchInput.value));
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch(searchInput.value);
    });
  }

  quickTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      const query = tag.getAttribute('data-query');
      if (searchInput) searchInput.value = query;
      performSearch(query);
    });
  });

  // --- 8. Favorite Heart Button Toggle ---
  document.querySelectorAll('.btn-favorite').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const isFav = btn.classList.contains('active');
      btn.innerHTML = isFav ? '&hearts;' : '&hearts;';
      showToast(isFav ? 'Added to your favorites!' : 'Removed from favorites');
    });
  });

  // --- 9. Cart System & Slide-Out Drawer ---
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const closeCartBtn = document.getElementById('closeCartBtn');
  const cartDrawerBackdrop = document.getElementById('cartDrawerBackdrop');
  const cartCount = document.getElementById('cartCount');
  const cartHeaderCount = document.getElementById('cartHeaderCount');
  const cartItemsList = document.getElementById('cartItemsList');

  // Pricing elements
  const billSubtotal = document.getElementById('billSubtotal');
  const billDiscount = document.getElementById('billDiscount');
  const billTotal = document.getElementById('billTotal');
  const btnPayAmount = document.getElementById('btnPayAmount');
  const discountRow = document.getElementById('discountRow');

  // State
  let cart = [
    { id: 1, name: 'Truffle Cheese Smash Burger', rest: 'Burger District', price: 249, qty: 1 },
    { id: 2, name: 'Classic Margherita Pizza', rest: 'Napoli House', price: 349, qty: 1 }
  ];
  let discountAmount = 100;

  const openCart = () => {
    cartDrawerBackdrop.classList.add('open');
    cartDrawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawerBackdrop.classList.remove('open');
    cartDrawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartDrawerBackdrop) {
    cartDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === cartDrawerBackdrop) closeCart();
    });
  }

  // Render & recalculate
  function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = totalItems;
    if (cartHeaderCount) cartHeaderCount.textContent = `(${totalItems} items)`;

    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const taxes = Math.round(subtotal * 0.05);
    const finalDiscount = subtotal > 0 ? discountAmount : 0;
    const total = Math.max(0, subtotal - finalDiscount + taxes);

    if (billSubtotal) billSubtotal.textContent = `₹${subtotal}`;
    if (billTotal) billTotal.textContent = `₹${total}`;
    if (btnPayAmount) btnPayAmount.textContent = `₹${total}`;

    // Render items
    if (cartItemsList) {
      if (cart.length === 0) {
        cartItemsList.innerHTML = `
          <div style="text-align:center; padding: 40px 0; color:#6B7280;">
            <p style="font-size:2rem; margin-bottom:8px;">🍲</p>
            <strong>Your bag is empty!</strong>
            <p style="font-size:0.85rem; margin-top:4px;">Explore delicious dishes from popular restaurants.</p>
          </div>
        `;
        if (discountRow) discountRow.style.display = 'none';
      } else {
        if (discountRow) discountRow.style.display = 'flex';
        cartItemsList.innerHTML = cart.map(item => `
          <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-details">
              <h4 class="cart-item-name">${item.name}</h4>
              <span class="cart-item-rest">${item.rest}</span>
              <span class="cart-item-price">₹${item.price}</span>
            </div>
            <div class="cart-qty-ctrl">
              <button class="qty-btn btn-minus" data-id="${item.id}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-num">${item.qty}</span>
              <button class="qty-btn btn-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
          </div>
        `).join('');

        // Re-attach listeners to + / -
        cartItemsList.querySelectorAll('.btn-plus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = cart.find(i => i.id === id);
            if (item) {
              item.qty++;
              updateCartUI();
            }
          });
        });

        cartItemsList.querySelectorAll('.btn-minus').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            const item = cart.find(i => i.id === id);
            if (item) {
              item.qty--;
              if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== id);
              }
              updateCartUI();
            }
          });
        });
      }
    }
  }

  // Quick Add Special from Restaurant Cards
  document.querySelectorAll('.btn-quick-add').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dish = btn.getAttribute('data-dish');
      const rest = btn.getAttribute('data-rest');
      const price = parseInt(btn.getAttribute('data-price') || '199');

      const existing = cart.find(i => i.name === dish);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({
          id: Date.now(),
          name: dish,
          rest: rest,
          price: price,
          qty: 1
        });
      }

      updateCartUI();
      showToast(`Added ${dish} to your bag!`);
      openCart();
    });
  });

  // Coupon Application
  const applyCouponBtn = document.getElementById('applyCouponBtn');
  const cartCouponInput = document.getElementById('cartCouponInput');
  const couponFeedback = document.getElementById('couponFeedback');

  if (applyCouponBtn && cartCouponInput) {
    applyCouponBtn.addEventListener('click', () => {
      const code = cartCouponInput.value.trim().toUpperCase();
      if (code === 'CRAVE50') {
        discountAmount = 100;
        couponFeedback.innerHTML = `&check; Coupon <b>CRAVE50</b> applied! Saved ₹100`;
        couponFeedback.style.display = 'block';
        showToast('Coupon CRAVE50 applied successfully!');
      } else if (code === 'PARTY150') {
        discountAmount = 150;
        couponFeedback.innerHTML = `&check; Coupon <b>PARTY150</b> applied! Saved ₹150`;
        couponFeedback.style.display = 'block';
        showToast('Coupon PARTY150 applied successfully!');
      } else if (code === 'FREEDEL') {
        discountAmount = 50;
        couponFeedback.innerHTML = `&check; Coupon <b>FREEDEL</b> applied! Free priority delivery`;
        couponFeedback.style.display = 'block';
        showToast('Coupon FREEDEL applied successfully!');
      } else {
        couponFeedback.innerHTML = `<span style="color:#DC2626;">&times; Invalid code. Try CRAVE50</span>`;
        couponFeedback.style.display = 'block';
      }
      updateCartUI();
    });
  }

  // Checkout Button
  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Your bag is empty! Add food first.');
        return;
      }
      checkoutBtn.disabled = true;
      checkoutBtn.innerHTML = `<span>Placing order...</span>`;
      setTimeout(() => {
        showToast('🎉 Order placed successfully! Live delivery tracker initiated.');
        cart = [];
        updateCartUI();
        closeCart();
        checkoutBtn.disabled = false;
        checkoutBtn.innerHTML = `<span>Proceed to Checkout</span>`;
      }, 1200);
    });
  }

  // --- 10. Sign-In / Register Modal ---
  const signInModal = document.getElementById('signInModal');
  const openSignInBtn = document.getElementById('openSignInBtn');
  const mobileSignInBtn = document.getElementById('mobileSignInBtn');
  const closeSignInBtn = document.getElementById('closeSignInBtn');
  const authForm = document.getElementById('authForm');

  const openAuth = () => {
    signInModal.classList.add('open');
    signInModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeAuth = () => {
    signInModal.classList.remove('open');
    signInModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (openSignInBtn) openSignInBtn.addEventListener('click', openAuth);
  if (mobileSignInBtn) mobileSignInBtn.addEventListener('click', () => {
    mobileDrawer.classList.remove('open');
    mobileToggle.classList.remove('active');
    openAuth();
  });
  if (closeSignInBtn) closeSignInBtn.addEventListener('click', closeAuth);

  if (signInModal) {
    signInModal.addEventListener('click', (e) => {
      if (e.target === signInModal) closeAuth();
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('authPhone');
      showToast(`OTP sent to ${input.value}!`);
      setTimeout(() => {
        closeAuth();
        showToast('Signed in as verified user!');
      }, 1000);
    });
  }

  // --- 11. Copy Coupon Code on Click ---
  document.querySelectorAll('.coupon-box').forEach((box) => {
    box.addEventListener('click', () => {
      const code = box.getAttribute('data-code');
      if (cartCouponInput) cartCouponInput.value = code;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(code);
      }
      showToast(`Copied code "${code}" to clipboard!`);
    });
  });

  // --- 12. Contact Form Submission ---
  const contactForm = document.getElementById('contactForm');
  const contactFeedback = document.getElementById('contactFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactFeedback) contactFeedback.classList.add('visible');
      contactForm.reset();
      showToast('Support ticket opened! We will respond shortly.');
      setTimeout(() => {
        if (contactFeedback) contactFeedback.classList.remove('visible');
      }, 6000);
    });
  }

  // --- 13. Toast Notification Helper ---
  const craveToast = document.getElementById('craveToast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer;

  function showToast(msg) {
    if (!craveToast || !toastMessage) return;
    toastMessage.textContent = msg;
    craveToast.classList.add('visible');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      craveToast.classList.remove('visible');
    }, 3800);
  }

  // Close modals with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (cartDrawerBackdrop && cartDrawerBackdrop.classList.contains('open')) closeCart();
      if (signInModal && signInModal.classList.contains('open')) closeAuth();
    }
  });

  // Initialize
  updateCartUI();

});
