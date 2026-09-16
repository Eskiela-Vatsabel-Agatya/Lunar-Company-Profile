(function () {
  function formatRp(n) {
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  function cardTemplate(product) {
    var variant = product.variants[0];
    return (
      '<a class="p-card" href="' + (window.LUNAR_DETAIL_PATH || 'detail.html') + '?id=' + product.id + '">' +
        '<div class="photo">' +
          '<img src="' + variant.img + '" alt="' + product.name + '" loading="lazy">' +
          (product.hasAR ? '<span class="ar-badge">Lihat dalam AR</span>' : '') +
          '<span class="best-badge">Best Seller</span>' +
        '</div>' +
        '<div class="info">' +
          '<p class="cat">' + product.category + '</p>' +
          '<h3>' + product.name + '</h3>' +
          '<p class="price">Harga mulai dari ' + formatRp(variant.price) + '</p>' +
        '</div>' +
      '</a>'
    );
  }

  function renderGrid(targetId, limit) {
    var grid = document.getElementById(targetId);
    if (!grid) return;
    var list = limit ? products.slice(0, limit) : products;
    grid.innerHTML = list.map(cardTemplate).join('');
  }

  window.renderPortfolioGrid = renderGrid;
})();
