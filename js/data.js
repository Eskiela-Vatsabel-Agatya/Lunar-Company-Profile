/**
 * data.js - LunAR portfolio catalog.
 *
 * These 9 items are a real case study built for a furniture/lifestyle-goods
 * client (Grizelle Souvenir), reused here to demonstrate LunAR's WebAR
 * capability. Schema and rendering logic are copied verbatim from that
 * client build; only the WhatsApp target and lead-gen copy point back to
 * LunAR instead of the client.
 */

const WHATSAPP_NUMBER = '6288216564572';

const R2 = (file) => `https://grizelle-3d.lunarcreativa.workers.dev/${file}`;

const products = [
  {
    id: 'A002',
    name: 'Pouch Kanvas Miniso',
    category: 'Pouch',
    bestSeller: true,
    hasAR: true,
    description: 'Pouch multifungsi untuk ponsel, kosmetik, atau uang pecahan. Studi kasus katalog interaktif yang dibangun LunAR untuk Grizelle Souvenir.',
    moq: 'Hubungi kami',
    material: 'Miniso',
    dimensions: '18 x 13 x 3 cm',
    media: { modelGlb: R2('A003.glb'), modelUsdz: R2('A003.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 4700, img: 'assets/products/pouch-kanvas-miniso.jpg', tiers: [
        { qty: 100, price: 5500 },
        { qty: 300, price: 5100 },
        { qty: 500, price: 4900 },
        { qty: 1000, price: 4700 },
      ]},
    ],
    addOns: [
      { name: 'Tali', priceText: '+Rp 400' },
      { name: 'Label Kulit', priceText: '+Rp 500' },
      { name: 'Kemas Mika + Pita', priceText: '+Rp 2500' },
    ],
  },
  {
    id: 'A010',
    name: 'Pouch Prada Metalik',
    category: 'Pouch',
    bestSeller: true,
    hasAR: true,
    description: 'Pouch berbahan sintetis metalik dengan emboss custom. Salah satu produk unggulan Grizelle yang divisualisasikan dalam AR oleh tim LunAR.',
    moq: 'Hubungi kami',
    material: 'Prada',
    dimensions: '18 x 13 x 3 cm',
    media: { modelGlb: R2('A001.glb'), modelUsdz: R2('A001.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 4500, img: 'assets/products/pouch-prada-metalik.jpg', tiers: [
        { qty: 100, price: 5300 },
        { qty: 300, price: 4900 },
        { qty: 500, price: 4800 },
        { qty: 1000, price: 4500 },
      ]},
    ],
    addOns: [
      { name: 'Tali', priceText: '+Rp 400' },
      { name: 'Kemas Mika + Pita', priceText: '+Rp 2500' },
    ],
  },
  {
    id: 'A011',
    name: 'Pouch Kulit Prada / Miniso',
    category: 'Pouch',
    bestSeller: true,
    hasAR: true,
    description: 'Pouch kulit sintetis dengan finishing emboss dan kemasan box putih. Contoh produk dengan model 3D beresolusi tinggi untuk pratinjau AR.',
    moq: 'Hubungi kami',
    material: 'Prada, kulit',
    dimensions: '13 x 18 x 3 cm',
    media: { modelGlb: R2('A002.glb'), modelUsdz: R2('A002.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 5700, img: 'assets/products/pouch-kulit-prada.png', tiers: [
        { qty: 100, price: 6300 },
        { qty: 200, price: 5700 },
      ]},
    ],
    addOns: [],
  },
  {
    id: 'B013',
    name: 'Tumbler Kaca Doff',
    category: 'Tumbler Kaca',
    bestSeller: true,
    hasAR: true,
    description: 'Tumbler kaca dengan finishing doff. Bagian dari katalog AR Grizelle yang memungkinkan pelanggan melihat detail material sebelum memesan.',
    moq: 'Hubungi kami',
    material: 'Kaca',
    dimensions: '6.5 x 19 cm, 420 mL',
    media: { modelGlb: R2('B001.glb'), modelUsdz: R2('B001.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 7700, img: 'assets/products/tumbler-kaca-doff.jpg', tiers: [
        { qty: 50, price: 9800 },
        { qty: 200, price: 9200 },
        { qty: 500, price: 8200 },
        { qty: 1000, price: 7700 },
      ]},
    ],
    addOns: [
      { name: 'Kemas Mika + Pita', priceText: '+Rp 3000' },
      { name: 'Grafir atau UV', priceText: '+Rp 10000' },
    ],
  },
  {
    id: 'E004',
    name: 'Gelas Kaca Coffee Belt',
    category: 'Gelas',
    bestSeller: true,
    hasAR: true,
    description: 'Gelas klasik dari koleksi souvenir Grizelle. Model AR-nya membantu calon pembeli menilai proporsi dan warna sebelum menentukan jumlah pesanan.',
    moq: 'Hubungi kami',
    material: 'Kaca',
    dimensions: '',
    media: { modelGlb: R2('D001.glb'), modelUsdz: R2('D001.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 8400, img: 'assets/products/gelas-coffee-belt.jpg', tiers: [
        { qty: 50, price: 10500 },
        { qty: 200, price: 9300 },
        { qty: 500, price: 9000 },
        { qty: 1000, price: 8400 },
      ]},
    ],
    addOns: [
      { name: 'Kemas Mika + Pita', priceText: '+Rp 2500' },
    ],
  },
  {
    id: 'H002',
    name: 'Handsoap Pump',
    category: 'Handsoap',
    bestSeller: true,
    hasAR: true,
    description: 'Botol handsoap dengan sablon custom, salah satu produk non-tekstil dalam katalog Grizelle yang tetap mendapat model AR penuh.',
    moq: 'Hubungi kami',
    material: 'Plastik',
    dimensions: '',
    media: { modelGlb: R2('I001.glb'), modelUsdz: R2('I001.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 10500, img: 'assets/products/handsoap-pump.jpg', tiers: [
        { qty: 50, price: 13000 },
        { qty: 100, price: 12500 },
        { qty: 200, price: 11700 },
        { qty: 300, price: 10500 },
      ]},
    ],
    addOns: [],
  },
  {
    id: 'J001',
    name: 'Classic Ceramic Bowl',
    category: 'Mangkok',
    bestSeller: true,
    hasAR: false,
    description: 'Mangkok keramik klasik. Produk ini belum memiliki model 3D, jadi tampil sebagai contoh nyata bagaimana katalog LunAR tetap rapi meski AR belum tersedia untuk satu item.',
    moq: 'Hubungi kami',
    material: 'Keramik',
    dimensions: '',
    media: { modelGlb: '', modelUsdz: '', videoId: null },
    variants: [
      { name: 'Produk', price: 24000, img: 'assets/products/classic-ceramic-bowl.jpg', tiers: [
        { qty: 25, price: 27000 },
        { qty: 100, price: 24500 },
        { qty: 500, price: 24000 },
      ]},
    ],
    addOns: [],
  },
  {
    id: 'J003',
    name: 'Mangkok Two Tone',
    category: 'Mangkok',
    bestSeller: true,
    hasAR: false,
    description: 'Mangkok keramik dua warna dengan opsi decal custom. Contoh lain dari graceful fallback ke mode foto saat model 3D belum tersedia.',
    moq: 'Hubungi kami',
    material: 'Keramik',
    dimensions: '14.5 x 6.5 cm',
    media: { modelGlb: '', modelUsdz: '', videoId: null },
    variants: [
      { name: 'Produk', price: 10000, img: 'assets/products/mangkok-two-tone.jpg', tiers: [
        { qty: 50, price: 13000 },
        { qty: 200, price: 11500 },
        { qty: 500, price: 10800 },
        { qty: 1000, price: 10000 },
      ]},
    ],
    addOns: [],
  },
  {
    id: 'T001',
    name: 'Totebag Blacu Kanvas Lipat',
    category: 'Totebag',
    bestSeller: true,
    hasAR: true,
    description: 'Totebag kanvas lipat dengan label kulit custom. Salah satu item tekstil dalam katalog AR Grizelle yang dibangun tim LunAR.',
    moq: 'Hubungi kami',
    material: 'Blacu',
    dimensions: '28 x 33 cm',
    media: { modelGlb: R2('F001.glb'), modelUsdz: R2('F001.usdz'), videoId: null },
    variants: [
      { name: 'Produk', price: 8800, img: 'assets/products/totebag-blacu-kanvas.jpg', tiers: [
        { qty: 25, price: 11000 },
        { qty: 100, price: 8800 },
      ]},
    ],
    addOns: [
      { name: 'Kemas Mika + Pita', priceText: '+Rp 3500' },
    ],
  },
];
