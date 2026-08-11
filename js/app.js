const products = [
  {id:1, cat:"bags", badge:"BESTSELLER", title:"Classic Canvas Shopping Bag — Large", price:299, mrp:499, off:"40% OFF", img:"assets/prod-shopping-bag.jpg", rating:"★★★★★ 4.8 (212)", category:"Shopping Bags"},
  {id:2, cat:"bags", badge:"TRENDING", title:"Women's Caramel Handbag with Gold Clasp", price:899, mrp:1499, off:"40% OFF", img:"assets/prod-handbag.jpg", rating:"★★★★★ 4.9 (98)", category:"Women's Handbags"},
  {id:3, cat:"crochet", badge:"HANDMADE", title:"Boho Crochet Shoulder Bag — Cream", price:650, mrp:999, off:"35% OFF", img:"assets/prod-crochet-bag.jpg", rating:"★★★★☆ 4.6 (64)", category:"Crochet"},
  {id:4, cat:"pickle", badge:"HOMEMADE", title:"Lemon Pickle (Nimbu Achar) — 300g", price:149, mrp:199, off:"25% OFF", img:"assets/prod-lemon-pickle.jpg", rating:"★★★★★ 4.8 (312)", category:"Pickles"},
  {id:5, cat:"pickle", badge:"SPICY", title:"Mango Pickle (Aam Achar) — 300g", price:169, mrp:229, off:"26% OFF", img:"assets/prod-mango-pickle.jpg", rating:"★★★★★ 4.7 (278)", category:"Pickles"},
  {id:6, cat:"pickle", badge:"IRON RICH", title:"Veldt Grape (Pirandai) Pickle — 300g", price:189, mrp:249, off:"24% OFF", img:"assets/prod-veldt-pickle.jpg", rating:"★★★★☆ 4.6 (143)", category:"Pickles"},
  {id:7, cat:"pickle", badge:"TANGY", title:"Tomato Pickle — Andhra Style 300g", price:159, mrp:209, off:"24% OFF", img:"assets/prod-tomato-pickle.jpg", rating:"★★★★★ 4.7 (201)", category:"Pickles"},
  {id:8, cat:"crochet", badge:"SET OF 4", title:"Crochet Coasters — Golden Beige", price:399, mrp:599, off:"33% OFF", img:"assets/prod-crochet-coasters.jpg", rating:"★★★★☆ 4.5 (52)", category:"Crochet"},
  {id:9, cat:"bags", badge:"ECO", title:"Natural Jute Shopping Bag — Reusable", price:349, mrp:549, off:"36% OFF", img:"assets/prod-jute-bag.jpg", rating:"★★★★★ 4.8 (87)", category:"Shopping Bags"},
  {id:10, cat:"crochet", badge:"NEW", title:"Crochet Tote — Mustard & Cream Stripes", price:750, mrp:1099, off:"32% OFF", img:"assets/prod-crochet-bag.jpg", rating:"★★★★☆ 4.6 (41)", category:"Crochet"},
  {id:11, cat:"pickle", badge:"COMBO", title:"Pickle Combo — All 4 Flavours (4x200g)", price:599, mrp:856, off:"30% OFF", img:"assets/banner3.jpg", rating:"★★★★★ 4.9 (89)", category:"Pickles"},
  {id:12, cat:"bags", badge:"MINI", title:"Mini Handbag — Pastel Collection", price:549, mrp:799, off:"31% OFF", img:"assets/prod-handbag.jpg", rating:"★★★★☆ 4.5 (63)", category:"Women's Handbags"},
];

let cart = JSON.parse(localStorage.getItem('itszhop_cart')||'[]');
let wishlist = JSON.parse(localStorage.getItem('itszhop_wish')||'[]');

const grid = document.getElementById('productGrid');
const cartCount = document.getElementById('cartCount');
const cartCountDrawer = document.getElementById('cartCountDrawer');
const cartTotal = document.getElementById('cartTotal');
const cartItems = document.getElementById('cartItems');
const wishCount = document.getElementById('wishCount');

function renderProducts(filter='all', search=''){
  grid.innerHTML='';
  let list = products.filter(p=>{
    const f = filter==='all' || p.cat===filter;
    const s = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return f && s;
  });
  if(list.length===0){
    grid.innerHTML='<p style="grid-column:1/-1;text-align:center;padding:30px;color:#7a6a4a">No products found. Try another search.</p>';
    return;
  }
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className='prod-card';
    card.innerHTML=`
      <div class="prod-img">
        <img src="${p.img}" alt="${p.title}" loading="lazy">
        ${p.badge?`<span class="badge-sale">${p.badge}</span>`:''}
        <button class="wish" data-wish="${p.id}" title="Wishlist">${wishlist.includes(p.id)?'♥':'♡'}</button>
      </div>
      <div class="prod-body">
        <div class="prod-cat">${p.category}</div>
        <div class="prod-title">${p.title}</div>
        <div class="stars">${p.rating}</div>
        <div class="price-row">
          <span class="price">₹${p.price.toLocaleString('en-IN')}</span>
          <span class="mrp">₹${p.mrp.toLocaleString('en-IN')}</span>
          <span class="off">${p.off}</span>
        </div>
        <div class="prod-actions">
          <button class="btn-sm add" data-add="${p.id}">Add to Cart</button>
          <button class="btn-sm view" data-view="${p.id}">View</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}
renderProducts();

// filters
document.querySelectorAll('.filter-btn').forEach(b=>{
  b.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    renderProducts(b.dataset.filter, document.getElementById('searchInput').value);
  });
});
document.querySelectorAll('.cat-card').forEach(c=>{
  c.addEventListener('click',()=> {
    document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
    document.querySelector(`.filter-btn[data-filter="${c.dataset.filter}"]`).classList.add('active');
    renderProducts(c.dataset.filter);
    document.getElementById('products').scrollIntoView({behavior:'smooth'});
  });
});

function handleSearch(val){
  const active = document.querySelector('.filter-btn.active')?.dataset.filter||'all';
  renderProducts(active, val);
}
document.getElementById('searchInput').addEventListener('input', e=> handleSearch(e.target.value));
document.getElementById('searchInputMobile').addEventListener('input', e=>{
  document.getElementById('searchInput').value = e.target.value;
  handleSearch(e.target.value);
});

// slider
const slides = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('dots');
let cur=0, timer;
slides.forEach((_,i)=>{
  const d=document.createElement('span');
  if(i===0) d.classList.add('active');
  d.addEventListener('click',()=>go(i));
  dotsWrap.appendChild(d);
});
function go(n){
  slides[cur].classList.remove('active');
  dotsWrap.children[cur].classList.remove('active');
  cur=(n+slides.length)%slides.length;
  slides[cur].classList.add('active');
  dotsWrap.children[cur].classList.add('active');
}
document.getElementById('nextSlide').onclick=()=>go(cur+1);
document.getElementById('prevSlide').onclick=()=>go(cur-1);
function auto(){ timer=setInterval(()=>go(cur+1), 4000);}
auto();
document.getElementById('slider').addEventListener('mouseenter',()=>clearInterval(timer));
document.getElementById('slider').addEventListener('mouseleave',auto);

// cart
function save(){ localStorage.setItem('itszhop_cart', JSON.stringify(cart)); localStorage.setItem('itszhop_wish', JSON.stringify(wishlist));}
function updateCartUI(){
  const count = cart.reduce((s,i)=>s+i.qty,0);
  cartCount.textContent=count;
  cartCountDrawer.textContent=count;
  wishCount.textContent=wishlist.length;
  // total
  const total = cart.reduce((s,i)=> s + i.qty * products.find(p=>p.id===i.id).price, 0);
  cartTotal.textContent='₹'+ total.toLocaleString('en-IN');
  // items
  if(cart.length===0){
    cartItems.innerHTML='<p class="empty-cart">Your cart is empty. Add some golden finds! ✨</p>';
    return;
  }
  cartItems.innerHTML='';
  cart.forEach(entry=>{
    const p=products.find(x=>x.id===entry.id);
    const div=document.createElement('div');
    div.className='cart-item';
    div.innerHTML=`
      <img src="${p.img}" alt="">
      <div style="flex:1">
        <h4>${p.title}</h4>
        <p>₹${p.price.toLocaleString('en-IN')} × ${entry.qty} = <strong>₹${(p.price*entry.qty).toLocaleString('en-IN')}</strong></p>
        <div class="qty">
          <button data-dec="${p.id}">−</button>
          <span>${entry.qty}</span>
          <button data-inc="${p.id}">+</button>
          <button style="margin-left:auto; color:#b00; border-color:#f0c0c0" data-rem="${p.id}">Remove</button>
        </div>
      </div>`;
    cartItems.appendChild(div);
  });
}
updateCartUI();

function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2200);
}

// delegation
document.addEventListener('click', e=>{
  const add=e.target.closest('[data-add]');
  if(add){
    const id=+add.dataset.add;
    const found=cart.find(c=>c.id===id);
    if(found) found.qty++; else cart.push({id, qty:1});
    save(); updateCartUI(); toast('Added to cart 🛒');
  }
  const wish=e.target.closest('[data-wish]');
  if(wish){
    const id=+wish.dataset.wish;
    if(wishlist.includes(id)) wishlist=wishlist.filter(x=>x!==id);
    else wishlist.push(id);
    save(); updateCartUI(); renderProducts(document.querySelector('.filter-btn.active').dataset.filter, document.getElementById('searchInput').value);
    toast(wishlist.includes(id)?'Added to wishlist ♡':'Removed from wishlist');
  }
  const inc=e.target.closest('[data-inc]');
  if(inc){ cart.find(c=>c.id==inc.dataset.inc).qty++; save(); updateCartUI();}
  const dec=e.target.closest('[data-dec]');
  if(dec){
    const item=cart.find(c=>c.id==dec.dataset.dec);
    item.qty=Math.max(1,item.qty-1); save(); updateCartUI();
  }
  const rem=e.target.closest('[data-rem]');
  if(rem){ cart=cart.filter(c=>c.id!=rem.dataset.rem); save(); updateCartUI(); toast('Removed from cart');}
  const view=e.target.closest('[data-view]');
  if(view){
    const p=products.find(x=>x.id==view.dataset.view);
    toast(p.title+' — ₹'+p.price.toLocaleString('en-IN'));
  }
});

// drawer
const drawer=document.getElementById('cartDrawer');
const overlay=document.getElementById('cartOverlay');
function openCart(){drawer.classList.add('open'); overlay.classList.add('open')}
function closeCart(){drawer.classList.remove('open'); overlay.classList.remove('open')}
document.getElementById('cartBtn').onclick=openCart;
document.getElementById('closeCart').onclick=closeCart;
document.getElementById('continueShop').onclick=closeCart;
overlay.onclick=closeCart;
document.getElementById('checkoutBtn').onclick=()=>{
  if(cart.length===0) return toast('Your cart is empty');
  const total = cart.reduce((s,i)=> s + i.qty * products.find(p=>p.id===i.id).price,0);
  toast('Order placed! Total ₹'+ total.toLocaleString('en-IN')+' — COD confirmed 🎉');
  cart=[]; save(); updateCartUI(); closeCart();
};

// newsletter
document.getElementById('newsletterForm').addEventListener('submit', e=>{
  e.preventDefault();
  toast('Thank you! Check email for 10% coupon 💛');
  e.target.reset();
});

// hamburger
document.getElementById('hamburger').onclick=()=> document.getElementById('nav').classList.toggle('open');

// LOGO preservation note: if user uploads new logo.png to assets/logo.png it will auto-replace
// Ensure logo is not altered by CSS filters
const logoImg=document.getElementById('logoImg');
if(logoImg){
  logoImg.style.filter='none';
  logoImg.style.mixBlendMode='normal';
}

// ─── Dark Mode ───
(function(){
  const KEY='itszhop_theme';
  const toggle=document.getElementById('themeToggle');
  const root=document.documentElement;

  function applyTheme(theme){
    if(theme==='dark'){
      root.setAttribute('data-theme','dark');
      toggle.textContent='☀️';
    } else {
      root.removeAttribute('data-theme');
      toggle.textContent='🌙';
    }
  }

  // Read saved preference, or fall back to system preference
  const saved=localStorage.getItem(KEY);
  if(saved){
    applyTheme(saved);
  } else if(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches){
    applyTheme('dark');
  }

  toggle.addEventListener('click',()=>{
    const isDark=root.getAttribute('data-theme')==='dark';
    const next=isDark?'light':'dark';
    applyTheme(next);
    localStorage.setItem(KEY,next);
  });

  // React to system preference changes (if no saved preference)
  window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change',e=>{
    if(!localStorage.getItem(KEY)){
      applyTheme(e.matches?'dark':'light');
    }
  });
})();
