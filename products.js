// products.js — Trophies-Site public products page
// Loads products from Firebase Firestore (real-time)

document.addEventListener('DOMContentLoaded', () => {
  // Firebase SDKs must be loaded before this script
  if (typeof firebase === 'undefined') {
    document.getElementById('product-grid').innerHTML =
      '<p style="text-align:center;color:#999;">Could not connect to database.</p>';
    return;
  }

  const productGrid = document.getElementById('product-grid');

  productGrid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px;color:#999;">
      <i class="fa-solid fa-spinner fa-spin" style="font-size:24px;"></i>
      <p style="margin-top:10px;">Loading products...</p>
    </div>`;

  db.collection('products')
    .orderBy('createdAt', 'desc')
    .onSnapshot(snapshot => {
      if (snapshot.empty) {
        productGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#999;padding:40px;">No products available yet.</p>';
        return;
      }

      productGrid.innerHTML = '';

      snapshot.forEach(doc => {
        const p   = doc.data();
        const id  = doc.id;

        const thumb = p.images && p.images[0]
          ? `<img src="${p.images[0]}" alt="${p.name}" style="width:100%;height:200px;object-fit:cover;border-radius:12px;margin-bottom:14px;">`
          : `<div style="height:200px;background:#eef0fa;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px;"><i class="fa-solid fa-trophy" style="font-size:40px;color:#2f308d;"></i></div>`;

        const stockLabel = p.stock === 0
          ? '<span style="color:#c00;font-size:13px;">Out of stock</span>'
          : p.stock <= 5
            ? `<span style="color:#a07000;font-size:13px;">Only ${p.stock} left</span>`
            : '<span style="color:#1a7a3a;font-size:13px;">In stock</span>';

        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.cssText = 'cursor:pointer;text-align:left;';
        card.innerHTML = `
          ${thumb}
          ${p.categoryName ? `<span style="background:#eef0fa;color:#2f308d;font-size:11px;font-weight:600;padding:3px 10px;border-radius:20px;">${p.categoryName}</span>` : ''}
          <h3 style="margin:10px 0 6px;font-size:16px;">${p.name}</h3>
          <p style="font-size:13px;color:#666;margin-bottom:10px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${p.description || ''}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <strong style="font-size:18px;color:#2f308d;">R${Number(p.price).toFixed(2)}</strong>
            ${stockLabel}
          </div>
        `;
        productGrid.appendChild(card);
      });
    }, err => {
      console.error('Products error:', err);
      productGrid.innerHTML = '<p style="text-align:center;grid-column:1/-1;color:#999;padding:40px;">Error loading products. Please try again later.</p>';
    });
});
