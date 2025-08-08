/* app.js - تفاعلية: قائمة موبيل، انيميشن عند التمرير، وظائف صفحات */
document.addEventListener('DOMContentLoaded', () => {
  // mobile nav toggle
  const burger = document.getElementById('burgerBtn');
  const mainnav = document.getElementById('mainNav');
  if (burger) burger.addEventListener('click', ()=> {
    mainnav.classList.toggle('open');
    if (mainnav.classList.contains('open')){
      mainnav.style.display = 'flex';
      mainnav.style.flexDirection = 'column';
    } else {
      mainnav.style.display = '';
    }
  });

  // fade-in on scroll
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) e.target.classList.add('inview');
    });
  }, {threshold:0.12});
  document.querySelectorAll('.card, .table, .hero').forEach(el=> io.observe(el));

  // school search (if present)
  const searchInput = document.getElementById('schoolSearch');
  if (searchInput){
    searchInput.addEventListener('input', (e)=>{
      const q = e.target.value.trim().toLowerCase();
      document.querySelectorAll('.school-item').forEach(li=>{
        const txt = li.dataset.name.toLowerCase();
        li.style.display = txt.includes(q) ? '' : 'none';
      });
    });
  }

  // payments verify toggle
  document.querySelectorAll('.verify-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const row = document.getElementById('payment-'+id);
      if (!row) return;
      row.querySelector('.status').innerText = 'تمت المطابقة';
      row.querySelector('.status').classList.add('badge');
      btn.disabled = true;
    });
  });

  // store cart
  const cart = [];
  document.querySelectorAll('.add-to-cart').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = Number(btn.dataset.price);
      cart.push({id,name,price});
      updateCartCounter();
      alert(name + ' أضيفت إلى السلة');
    });
  });
  function updateCartCounter(){
    const el = document.getElementById('cartCount');
    if (el) el.innerText = cart.length;
  }

  // Jobs apply modal
  document.querySelectorAll('.apply-job').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const modal = document.getElementById('jobModal');
      if (!modal) return;
      modal.classList.add('show');
      modal.querySelector('.modal-backdrop').classList.add('show');
      const title = btn.dataset.title || 'طلب وظيفة';
      modal.querySelector('.modal h3').innerText = 'التقديم: ' + title;
    });
  });
  document.querySelectorAll('.modal-close').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const modal = btn.closest('.modal-wrapper');
      modal.classList.remove('show');
      modal.querySelector('.modal-backdrop').classList.remove('show');
    });
  });

  // simple contact submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      alert('تم إرسال الرسالة — شكراً لتواصلكم (ديمو)');
      contactForm.reset();
    });
  }
});