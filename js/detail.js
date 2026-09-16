(function () {
  var el = function (id) { return document.getElementById(id); };
  var mediaStage = el('mediaStage');
  var modeToggle = el('modeToggle');
  var categoryEl = el('category');
  var nameEl = el('name');
  var descEl = el('description');
  var optionsSection = el('optionsSection');
  var optionList = el('optionList');
  var priceHeadline = el('priceHeadline');
  var specEl = el('spec');
  var tiersEl = el('tiers');
  var addonSection = el('addonSection');
  var addonList = el('addonList');
  var addonPreview = el('addonPreview');
  var addonPreviewContent = el('addonPreviewContent');
  var addonPreviewClose = el('addonPreviewClose');
  var waLink = el('wa');

  var WA_BASE = 'https://wa.me/' + WHATSAPP_NUMBER;

  var ICONS = {
    chevronLeft: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    chevronRight: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    whatsapp: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.06L2 22L7.09 20.65C8.52 21.5 10.2 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" fill="#fff"/><path d="M17 14.3C16.7 14.15 15.3 13.45 15 13.35C14.75 13.25 14.55 13.2 14.35 13.5C14.15 13.8 13.6 14.45 13.45 14.65C13.3 14.85 13.1 14.85 12.8 14.7C12.5 14.55 11.6 14.25 10.5 13.25C9.65 12.5 9.1 11.55 8.95 11.25C8.8 10.95 8.9 10.8 9.05 10.65C9.2 10.5 9.35 10.3 9.5 10.15C9.65 10 9.7 9.9 9.8 9.7C9.9 9.5 9.85 9.35 9.8 9.2C9.75 9.05 9.2 7.65 9 7.05C8.8 6.5 8.55 6.55 8.4 6.55C8.25 6.55 8.05 6.55 7.85 6.55C7.65 6.55 7.3 6.6 7 6.9C6.7 7.2 5.9 7.95 5.9 9.35C5.9 10.75 7.05 12.1 7.2 12.3C7.35 12.5 9.05 15.2 11.7 16.3C14.35 17.4 14.35 17 14.85 16.95C15.35 16.9 16.4 16.3 16.6 15.65C16.8 15 16.8 14.45 16.75 14.35C16.7 14.25 16.5 14.2 17 14.3Z" fill="#25D366"/></svg>',
  };

  var id = new URLSearchParams(location.search).get('id');
  var product = products.find(function (p) { return p.id === id; });

  if (!product) {
    document.querySelector('.layout').innerHTML =
      '<section style="grid-column:1/-1"><h1>Produk tidak ditemukan</h1>' +
      '<p class="desc">Produk yang diminta tidak ditemukan. Silakan kembali ke portofolio untuk memilih produk lain.</p>' +
      '<a class="btn btn-primary btn-large" href="../portofolio.html">Kembali ke Portofolio</a></section>';
    return;
  }

  var activeVariantIndex = 0;
  var activeMode = null;
  var selectedTierIndex = null;
  var selectedAddOns = [];
  var lastClickedAddonWithImage = null;

  function formatRp(n) { return 'Rp ' + n.toLocaleString('id-ID'); }
  function currentVariant() { return product.variants[activeVariantIndex]; }

  function effectiveMedia(variantIndex) {
    var v = product.variants[variantIndex];
    var vm = v.media || {};
    var pm = product.media || {};
    return {
      modelGlb: vm.modelGlb || pm.modelGlb || null,
      modelUsdz: vm.modelUsdz || pm.modelUsdz || null,
      videoId: vm.videoId || pm.videoId || null,
    };
  }

  function availableModes(media) {
    var modes = [];
    if (media.modelGlb) modes.push('ar');
    if (currentVariant().img) modes.push('foto');
    return modes;
  }

  function defaultMode(modes) {
    if (modes.indexOf('ar') !== -1) return 'ar';
    if (modes.indexOf('foto') !== -1) return 'foto';
    return modes[0] || 'foto';
  }

  function renderModeToggle(modes) {
    var labels = { ar: 'AR / 3D', foto: 'Foto' };
    modeToggle.innerHTML = modes.map(function (m) {
      return '<button type="button" class="mode-btn' + (m === 'ar' ? ' mode-ar' : '') + (m === activeMode ? ' active' : '') + '" data-mode="' + m + '">' + labels[m] + '</button>';
    }).join('');
    Array.prototype.forEach.call(modeToggle.children, function (btn) {
      btn.addEventListener('click', function () {
        activeMode = btn.dataset.mode;
        renderModeToggle(modes);
        renderMediaStage();
      });
    });
  }

  function renderOnboardHint(text) {
    var hint = document.createElement('div');
    hint.className = 'onboard-hint';
    hint.textContent = text;
    mediaStage.appendChild(hint);
  }

  function renderMediaStage() {
    var media = effectiveMedia(activeVariantIndex);
    var variant = currentVariant();
    mediaStage.innerHTML = '';

    if (activeMode === 'ar' && media.modelGlb) {
      var mv = document.createElement('model-viewer');
      mv.id = 'arViewer';
      mv.setAttribute('src', media.modelGlb);
      mv.setAttribute('ios-src', media.modelUsdz || '');
      mv.setAttribute('alt', product.name);
      mv.setAttribute('ar', '');
      mv.setAttribute('ar-modes', 'scene-viewer webxr quick-look');
      mv.setAttribute('ar-scale', 'auto');
      mv.setAttribute('touch-action', 'pan-y');
      mv.setAttribute('camera-controls', '');
      mv.setAttribute('shadow-intensity', '1');
      mv.innerHTML =
        '<div slot="poster" class="ar-poster">Menyiapkan pratinjau 3D...</div>' +
        '<button slot="ar-button" class="ar-cta" style="display:none">Lihat dalam AR</button>';
      mediaStage.appendChild(mv);

      var arBtn = mv.querySelector('.ar-cta');
      mv.addEventListener('load', function () { arBtn.style.display = 'inline-flex'; });
      mv.addEventListener('error', function () { renderStaticImage(variant.img, product.name); });
      renderOnboardHint('Geser untuk melihat 3D');
    } else {
      renderStaticImage(variant.img, product.name);
      if (product.variants.length > 1) {
        renderCarouselArrows();
        renderOnboardHint('Geser untuk lihat variasi');
      }
    }
  }

  function renderStaticImage(src, alt) {
    var img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    mediaStage.appendChild(img);
  }

  function renderCarouselArrows() {
    if (product.variants.length < 2) return;
    var prev = document.createElement('button');
    prev.type = 'button';
    prev.className = 'carousel-arrow prev';
    prev.setAttribute('aria-label', 'Varian sebelumnya');
    prev.innerHTML = ICONS.chevronLeft;
    prev.addEventListener('click', function () {
      selectVariant((activeVariantIndex - 1 + product.variants.length) % product.variants.length);
    });

    var next = document.createElement('button');
    next.type = 'button';
    next.className = 'carousel-arrow next';
    next.setAttribute('aria-label', 'Varian berikutnya');
    next.innerHTML = ICONS.chevronRight;
    next.addEventListener('click', function () {
      selectVariant((activeVariantIndex + 1) % product.variants.length);
    });

    mediaStage.appendChild(prev);
    mediaStage.appendChild(next);

    var dots = document.createElement('div');
    dots.className = 'carousel-dots';
    dots.innerHTML = product.variants.map(function (_, i) {
      return '<span class="' + (i === activeVariantIndex ? 'active' : '') + '"></span>';
    }).join('');
    mediaStage.appendChild(dots);
  }

  function renderPricing() {
    var variant = currentVariant();
    priceHeadline.innerHTML = formatRp(variant.price) + '<small>Harga mulai dari, per pcs</small>';

    tiersEl.innerHTML = (variant.tiers && variant.tiers.length)
      ? '<div class="tier"><p class="tier-name">Kemasan ' + variant.name + ', klik jumlah untuk memilih</p><div class="tier-prices">' +
        variant.tiers.map(function (t, i) {
          return '<button type="button" class="tier-option' + (i === selectedTierIndex ? ' active' : '') + '" data-i="' + i + '"><span>' + t.qty + ' pcs</span><strong>' + formatRp(t.price) + '</strong></button>';
        }).join('') + '</div></div>'
      : '<div class="notice">Harga per pcs untuk varian ini sedang diperbarui. Hubungi kami untuk informasi tercepat.</div>';

    Array.prototype.forEach.call(tiersEl.querySelectorAll('.tier-option'), function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.dataset.i);
        selectedTierIndex = selectedTierIndex === i ? null : i;
        renderPricing();
        updateWhatsAppLink();
      });
    });
  }

  function renderSpec() {
    var variant = currentVariant();
    var rows = [
      ['Kode produk', product.id],
      ['Kategori', product.category],
      ['Varian aktif', variant.name],
    ];
    if (product.material) rows.push(['Material', product.material]);
    if (product.dimensions) rows.push(['Dimensi', product.dimensions]);
    if (product.moq) rows.push(['Minimum order', product.moq]);
    specEl.innerHTML = rows.map(function (r) { return '<div><span>' + r[0] + '</span><span>' + r[1] + '</span></div>'; }).join('');
  }

  function renderVariantPills() {
    if (product.variants.length <= 1) {
      optionsSection.hidden = false;
      optionList.innerHTML = '';
      return;
    }
    optionsSection.hidden = false;
    optionList.innerHTML = product.variants.map(function (v, i) {
      return '<button type="button" class="option-pill' + (i === activeVariantIndex ? ' active' : '') + '" data-i="' + i + '">' + v.name + '</button>';
    }).join('');
    Array.prototype.forEach.call(optionList.children, function (btn, i) {
      btn.addEventListener('click', function () { selectVariant(i); });
    });
  }

  function renderAddOns() {
    if (!product.addOns || !product.addOns.length) {
      addonSection.hidden = true;
      return;
    }
    addonSection.hidden = false;
    addonList.innerHTML = product.addOns.map(function (a) {
      return '<button type="button" class="addon-pill" data-name="' + a.name + '">' + a.name + '<span class="addon-price">' + a.priceText + '</span></button>';
    }).join('');

    Array.prototype.forEach.call(addonList.querySelectorAll('.addon-pill'), function (btn) {
      btn.addEventListener('click', function () {
        var name = btn.dataset.name;
        btn.classList.toggle('active');
        var idx = selectedAddOns.indexOf(name);
        var addonData = product.addOns.find(function (a) { return a.name === name; });

        if (btn.classList.contains('active')) {
          if (idx === -1) selectedAddOns.push(name);
          if (addonData && addonData.image) lastClickedAddonWithImage = addonData;
        } else {
          if (idx !== -1) selectedAddOns.splice(idx, 1);
          if (lastClickedAddonWithImage && lastClickedAddonWithImage.name === name) {
            lastClickedAddonWithImage = null;
          }
        }
        updateWhatsAppLink();
        updateAddonPreview();
      });
    });
  }

  function updateAddonPreview() {
    if (!addonPreview) return;
    if (lastClickedAddonWithImage) {
      addonPreviewContent.innerHTML =
        '<div class="addon-card" style="width:100%"><img src="' + lastClickedAddonWithImage.image + '" alt="Referensi ' + lastClickedAddonWithImage.name + '"><p class="addon-preview-label">' + lastClickedAddonWithImage.name + '</p></div>';
      addonPreview.hidden = false;
      requestAnimationFrame(function () { addonPreview.classList.add('visible'); });
    } else {
      addonPreview.classList.remove('visible');
      setTimeout(function () {
        if (!addonPreview.classList.contains('visible')) {
          addonPreview.hidden = true;
          addonPreviewContent.innerHTML = '';
        }
      }, 280);
    }
  }

  // Lead-gen message for LunAR's own services, not a Grizelle order.
  function updateWhatsAppLink() {
    var variant = currentVariant();
    var tier = (selectedTierIndex !== null && variant.tiers) ? variant.tiers[selectedTierIndex] : null;

    var lines = ['Halo LunAR, saya tertarik dengan pengalaman AR seperti ' + product.name + '.'];
    lines.push('Bisakah tim LunAR membantu membuat WebAR serupa untuk produk saya?');
    if (tier) {
      lines.push('Referensi skala: ' + tier.qty + ' pcs pada studi kasus ini.');
    }
    if (selectedAddOns.length) lines.push('Fitur yang saya suka: ' + selectedAddOns.join(', '));

    waLink.href = WA_BASE + '?text=' + encodeURIComponent(lines.join('\n'));
  }

  function renderWaButtonLabel() {
    waLink.innerHTML = ICONS.whatsapp + ' Diskusikan Proyek Anda';
  }

  if (addonPreviewClose) {
    addonPreviewClose.addEventListener('click', function () {
      addonPreview.classList.remove('visible');
      setTimeout(function () { if (!addonPreview.classList.contains('visible')) addonPreview.hidden = true; }, 280);
    });
  }

  function selectVariant(index) {
    activeVariantIndex = index;
    selectedTierIndex = null;
    var media = effectiveMedia(activeVariantIndex);
    var modes = availableModes(media);
    if (modes.indexOf(activeMode) === -1) activeMode = defaultMode(modes);
    renderModeToggle(modes);
    renderMediaStage();
    renderPricing();
    renderSpec();
    renderVariantPills();
    updateWhatsAppLink();
  }

  categoryEl.textContent = product.category;
  nameEl.textContent = product.name;
  descEl.textContent = product.description;
  renderAddOns();
  renderWaButtonLabel();

  var initialMedia = effectiveMedia(activeVariantIndex);
  var initialModes = availableModes(initialMedia);
  activeMode = defaultMode(initialModes);
  renderModeToggle(initialModes);
  renderMediaStage();
  renderPricing();
  renderSpec();
  renderVariantPills();
  updateWhatsAppLink();
})();
