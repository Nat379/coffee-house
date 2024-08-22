//  refresh button

const loadMoreButton = document.getElementById('refresh-button');
const cards = document.querySelectorAll('.card');

loadMoreButton.addEventListener('click', () => {
  cards.forEach(card => {
    if (card.classList.contains('hidden')) {
      card.classList.remove('hidden');
    }
  });
  loadMoreButton.style.display = 'none';
});

// menu-tabs

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(item => {
          item.classList.remove('active-tab-text', 'active', 'inactive-link');
        });
  
        tab.classList.add('active-tab-text', 'active', 'inactive-link');
      });
    });
  });

//   menu-cards

const coffeeTab = document.querySelector('.coffee-tab');
const teaTab = document.querySelector('.tea-tab');
const dessertTab = document.querySelector('.dessert-tab');
const menuCards = document.querySelector('.menu-cards');

  function loadProductsByCategory(category) {
    fetch('../products.json')
      .then(response => response.json())
      .then(data => {
        const products = data.filter(product => product.category === category);

        menuCards.innerHTML = '';

        products.forEach(product => {
          const card = document.createElement('div');
          card.classList.add('card');
          card.innerHTML = `
            <div class="img-container"><img src="../assets/products/${product.name}.png" alt="${product.name}"></div>
            <div class="card-description">
              <div class="card-title">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
              </div>
              <div class="card-price">$${parseFloat(product.price).toFixed(2)}</div>
            </div>
          `;
          menuCards.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Помилка завантаження продуктів:', error);
      });
  }

  coffeeTab.addEventListener('click', () => {
    loadProductsByCategory('coffee');
  });

  teaTab.addEventListener('click', () => {
    loadProductsByCategory('tea');
  });

  dessertTab.addEventListener('click', () => {
    loadProductsByCategory('dessert');
  });

  document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeButton = modal.querySelector('.button-close');
  
    function loadProductsByCategory(category) {
      fetch('../products.json')
        .then(response => response.json())
        .then(data => {
          const products = data.filter(product => product.category === category);
  
          menuCards.innerHTML = ''; // Clear previous cards
  
          products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
              <div class="img-container"><img src="../assets/products/${product.name}.png" alt="${product.name}"></div>
              <div class="card-description">
                <div class="card-title">
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                </div>
                <div class="card-price">$${parseFloat(product.price).toFixed(2)}</div>
              </div>
            `;
            menuCards.appendChild(card);
            card.addEventListener('click', openModalWithData);
          });
        })
        .catch(error => {
          console.error('Error loading products:', error);
        });
    }
  
    function openModalWithData(event) {
      const card = event.currentTarget;
      const title = card.querySelector('.card-description h3').textContent;
    
      fetch('../products.json')
        .then(response => response.json())
        .then(data => {
          const product = data.find(product => product.name === title);
    
          const imgSrc = product ? `../assets/products/${product.name}.png` : card.querySelector('img').src;
          const modalTitleText = product ? product.name : title;
          const modalDescriptionText = product ? product.description : card.querySelector('.card-description p').textContent;
          const modalPriceText = product ? `$${parseFloat(product.price).toFixed(2)}` : card.querySelector('.card-price').textContent;
    
          const modalImg = modal.querySelector('.img-container img');
          const modalTitle = modal.querySelector('.modal-description .card-title h3');
          const modalDescription = modal.querySelector('.modal-description .card-title p');
          const modalPrice = modal.querySelector('.total-price .card-title:last-child');
    
          modalImg.src = imgSrc;
          modalTitle.textContent = modalTitleText;
          modalDescription.textContent = modalDescriptionText;
          modalPrice.textContent = modalPriceText;
    
          modal.style.display = 'flex';
          modalOverlay.style.display = 'block';
          document.body.style.overflow = 'hidden';
        })
        .catch(error => {
          console.error('Error loading data:', error);
        });
    }
  
    function closeModal() {
      modal.style.display = 'none';
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  
    coffeeTab.addEventListener('click', () => {
      loadProductsByCategory('coffee');
    });
  
    teaTab.addEventListener('click', () => {
      loadProductsByCategory('tea');
    });
  
    dessertTab.addEventListener('click', () => {
      loadProductsByCategory('dessert');
    });
  
    closeButton.addEventListener('click', () => {
      closeModal();
    });
  
    window.addEventListener('click', event => {
      if (event.target === modalOverlay) {
        closeModal();
      }
    });
  
    loadProductsByCategory('coffee'); // Load the "coffee" category after loading the page
  });

  