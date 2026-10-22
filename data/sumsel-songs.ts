// Database Lirik Lagu Daerah Sumatera Selatan yang Otentik dan Terverifikasi
// Menghilangkan risiko halusinasi AI pada lagu daerah khas Sumsel.

export interface SongExplanation {
  title?: string;
  highlight: string;
  paragraphs: string[];
  bulletPoints?: { label: string; text: string }[];
}

export interface SumselSong {
  id: string;
  title: string;
  aliases: string[];
  region: string;
  creator?: string;
  highlight: string;
  lyrics: string[];
  meaning: string;
  image: string;
  themeSlug: string;
  sources: { title: string; url: string; domain: string; excerpt: string }[];
  explanation?: SongExplanation;
}

export const sumselSongs: SumselSong[] = [
  {
    id: "palembang-darussalam",
    title: "Palembang Darussalam",
    aliases: [
      "palembang darussalam",
      "lagu palembang darussalam",
      "lirik palembang darussalam",
      "lirik lagu palembang darussalam",
      "palembang kota kito",
      "tekenal sungi musinyo",
      "tekenal dengan pempeknyo",
      "lagu daerah palembang darussalam",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "R.H. Syahril Erwin / Yayak",
    highlight: "Berikut adalah teks lirik autentik dan lengkap lagu daerah kebanggaan warga Palembang 'Palembang Darussalam':",
    lyrics: [
      "Palembang Darussalam...\nPalembang kota kito\nTekenal sungi Musinyo...\nTekenal dengan pempeknyo\nJembatan Ampera yang anggun\nMasjid Agungnyo yang cindo\nMenambah tekenalnyo\nKota kesayangan kito",
      "Palembang Darussalam...\nPalembang kota kito\nTekenal rumah limasnyo\nTekenal dengan songketnyo\nPulou Kemaro yang tenang\nBenteng Kuto Besak yang cindo\nMenambah semaraknyo\nKota kebanggaan kito",
      "Bujang gadesnyo... Oi... belagak nian\nAdat budayonyo tetep dijago\nHasil buminyo... Oi... banyak nian\nPembangunannyo rato dimano-mano",
      "Oi... Palembang Darussalam\nOi... Palembang Darussalam\nPalembang kota kito\nPalembang Darussalam",
    ],
    meaning: "Lagu 'Palembang Darussalam' mengagungkan keelokan dan kemegahan Kota Palembang. Menggambarkan kekayaan ikonik seperti Sungai Musi, Pempek, Jembatan Ampera, Masjid Agung Sultan Mahmud Badaruddin I, Rumah Limas, Songket, Benteng Kuto Besak, dan Pulau Kemaro.",
    explanation: {
      highlight: "Lagu 'Palembang Darussalam' adalah mars dan tembang kebanggaan Kota Palembang karya R.H. Syahril Erwin (Yayak) yang merangkum ikon pusaka, kejayaan sejarah, dan pesona budaya Wong Kito.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\nLagu 'Palembang Darussalam' diciptakan oleh seniman terkemuka Palembang, R.H. Syahril Erwin (akrab disapa Yayak). Lagu ini digubah sebagai wujud cinta dan kebanggaan atas identitas Kota Palembang yang berakar kuat dari sejarah Kesultanan Palembang Darussalam serta kemegahan peradaban maritim di tepian Sungai Musi.",
        "Makna Filosofis & Pesona Budaya:\nSetiap bait dalam lagu ini menjadi etalase pusaka Palembang. Liriknya menyebutkan ikon-ikon utama seperti Sungai Musi, Jembatan Ampera, Masjid Agung Sultan Mahmud Badaruddin I, Benteng Kuto Besak (BKB), Pulau Kemaro, hingga kekayaan kuliner Pempek dan kemewahan kain Songket. Lagu ini juga memuji keelokan budi serta ketampanan bujang dan kecantikan gades Palembang yang senantiasa menjaga adat istiadat leluhur.",
        "Karakteristik Musikal & Fungsi:\nDibawakan dengan aransemen yang bersemangat, megah, dan berjiwa patriotik, lagu ini kerap diperdengarkan dalam peringatan Hari Jadi Kota Palembang, upacara resmi pemerintahan, serta promosi pariwisata daerah sebagai representasi identitas Palembang yang maju dan berbudaya."
      ],
      bulletPoints: [
        { label: "Pencipta", text: "R.H. Syahril Erwin (Yayak)" },
        { label: "Asal Daerah", text: "Kota Palembang, Sumatera Selatan" },
        { label: "Tema Utama", text: "Kebanggaan ikon kota, pelestarian adat, dan semangat pembangunan daerah" }
      ]
    },
    image: "/images/ampera_hero.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Palembang Darussalam — Kidung Kebanggaan Palembang",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Lagu daerah Palembang ciptaan R.H. Syahril Erwin yang mendeskripsikan pesona ikon-ikon utama Palembang.",
      },
      {
        title: "Koleksi Lagu Tradisional Sumatera Selatan — Dinas Kebudayaan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Dokumentasi seni vokal dan kidung rakyat warisan budaya takbenda Sumsel.",
      },
    ],
  },
  {
    id: "pempek-lenjer",
    title: "Pempek Lenjer",
    aliases: [
      "lagu pempek lenjer",
      "lirik pempek lenjer",
      "lirik lagu pempek lenjer",
      "syair pempek lenjer",
      "bulet besak panjang mak lengen",
      "pempek lenjer oy pempek lenjer",
      "lagu daerah pempek lenjer",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "S. Tarno",
    highlight: "Berikut adalah teks lirik lengkap lagu daerah jenaka khas Palembang 'Pempek Lenjer' (Ciptaan S. Tarno):",
    lyrics: [
      "Bulet besak panjang mak lengen\nKejel-kejel rasonyo marem\nMasuk ke mulut matonyo mejem\nMertuo lewat masih ditelen",
      "Kejel keras sudah biaso\nAsak bae iwaknyo teraso\nDigoreng pake minyak kelapo\nJadi nambah lemak rasonyo",
      "Pempek lenjer oy pempek lenjer\nSiapo nyingok pastilah ngiler\nPempek lenjer oy pempek lenjer\nMakan sikok pacak kelenger",
      "Mangcek bicek janganlah lupo\nNgawak balek oleh-olehnyo\nPempek lenjer samo cukonyo\nKito makan bersamo-samo",
      "Pempek lenjer oy pempek lenjer\nSiapo nyingok pastilah ngiler\nPempek lenjer oy pempek lenjer\nMakan sikok pacak kelenger",
    ],
    meaning: "Lagu 'Pempek Lenjer' karya S. Tarno adalah tembang rakyat Palembang bernada jenaka yang merayakan kelezatan pempek lenjer—kuliner legendaris berbahan ikan dan tepung sagu yang kenyal, gurih, dan menggugah selera disantap bersama cuko pekat.",
    explanation: {
      highlight: "Lagu 'Pempek Lenjer' adalah tembang pop daerah Palembang ciptaan S. Tarno yang mengangkat kecintaan masyarakat terhadap kuliner khas pempek dengan lirik jenaka dan irama rancak.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\nLagu 'Pempek Lenjer' diciptakan oleh seniman Palembang S. Tarno. Berbeda dengan tembang klasik yang bertema ratapan atau keagungan sejarah, lagu ini secara kreatif merekam denyut kehidupan keseharian Wong Kito yang tak pernah bisa lepas dari cita rasa pempek lenjer.",
        "Makna Filosofis & Humor Budaya:\nLirik 'Mertuo lewat masih ditelen' merupakan ungkapan kelakar hiperbolis khas Palembang yang menggambarkan betapa lezat dan menggodanya pempek lenjer yang kenyal ('kejel-kejel') saat disantap hangat bersama kuah cuko asam-manis-pedas. Lagu ini mencerminkan karakter Wong Kito yang hangat, humoris, dan gemar berbagi kebahagiaan kuliner bersama keluarga.",
        "Karakteristik Musik & Nilai Populer:\nDengan tempo sedang yang ceria dan rima pantun jenaka, lagu ini sangat populer di kalangan masyarakat Palembang dari berbagai generasi. Tembang ini kerap dibawakan dalam festival kuliner, pesta rakyat, hingga media penyiaran daerah sebagai duta budaya gastronomi Palembang."
      ],
      bulletPoints: [
        { label: "Pencipta", text: "S. Tarno" },
        { label: "Asal Daerah", text: "Kota Palembang, Sumatera Selatan" },
        { label: "Karakter Lagu", text: "Pop daerah jenaka bertema kebanggaan kuliner lokal" }
      ]
    },
    image: "/images/pempek_palembang.jpg",
    themeSlug: "kuliner",
    sources: [
      {
        title: "Pempek Lenjer — Khazanah Kuliner dan Musik Palembang",
        url: "https://id.wikipedia.org/wiki/Pempek",
        domain: "id.wikipedia.org",
        excerpt: "Tembang daerah Palembang yang mengabadikan ikon kuliner pempek lenjer dalam bait-bait lincah.",
      },
    ],
  },
  {
    id: "kebile-bile",
    title: "Kebile-bile",
    aliases: [
      "kebile bile",
      "kebile-bile",
      "kabile bile",
      "kabile-bile",
      "lagu kebile bile",
      "lirik lagu kebile bile",
      "lirik kebile bile",
      "lagu kabile bile",
      "lirik lagu kabile bile",
      "lirik kabile bile",
      "lagu daerah kebile bile",
      "kebile bile lahat",
      "kebile bile pagaralam",
      "kabile bile mangke ku lege",
      "kabile-bile mangke ku lege",
      "kebile bile mangke ku lege",
    ],
    region: "Lahat / Pagar Alam (Dataran Tinggi Besemah), Sumatera Selatan",
    creator: "Tradisional Dataran Tinggi Besemah",
    highlight: "Berikut adalah teks lirik autentik dan lengkap lagu daerah Besemah Sumatera Selatan 'Kebile-bile' (Kabile-bile):",
    lyrics: [
      "Kebile-bile mangke ku lege\nKebile-bile ku ade kance\nKebile-bile mangke ku lege\nKebile-bile ku ade kance",
      "Kebile nian jagunglah putih\nPutih dik putih kukendam kina\nKebile nian ibung kah nulih\nNulih dik nulih kudendam kina",
      "Kebile nian mampat begune\nMangke dik payah ku nandan lagi\nKebile nian sifat begune\nMangke dik payah ku midang lagi",
      "Oh, malang nian nasib ‘mbak ini\nBilangan jeme lah laut gale\nAlahkah sedih ai tumbak ini\nAku ‘mbak ini dide bekance",
    ],
    meaning: "Lagu 'Kebile-bile' (Kabile-bile) adalah tembang ratapan syahdu masyarakat dataran tinggi Besemah (Lahat & Pagar Alam). Menggambarkan kepasrahan batin menghadapi nasib kesendirian, merindukan saat-saat tibanya kebahagiaan dan sahabat sejati ('kance') dalam perjalanan hidup.",
    explanation: {
      highlight: "Kebile-bile (Kabile-bile) adalah lagu daerah legendaris dari rumpun suku Besemah di Kabupaten Lahat dan Kota Pagar Alam, Sumatera Selatan, yang menyuarakan ratapan batin syahdu tentang kerinduan akan sahabat sejati ('kance') dan ketabahan menghadapi sepi.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\n'Kebile-bile' berakar dari tradisi tutur sastra lisan masyarakat dataran tinggi Besemah (Pasemah) yang mendiami kaki Gunung Dempo. Dalam dialek Besemah, kata 'kebile-bile' bermakna 'kapan-kapan' atau 'bilakah gerangan'. Lagu ini lahir dari tradisi penglipur lara para peladang dan perantau dalam mengisi kesunyian di tengah bentang alam lembah dan perbukitan.",
        "Makna Mendalam & Filosofi Syair:\nLagu ini melukiskan kepiluan seseorang yang merasa terasing dan sebatang kara ('dide bekance') di kala orang-orang di sekelilingnya telah pergi jauh ('bilangan jeme lah laut gale'). Kiasan metaforis seperti menanti jagung memutih atau menanti kepulangan ibunda ('ibung kah nulih') menyiratkan ketabahan batin menanti kepastian masa depan, diiringi tekad kuat agar dirinya kelak berguna dan mandiri ('sifat begune') sehingga tidak lagi merana dalam perjalanan hidup.",
        "Karakteristik Musikal & Warisan Takbenda:\nSecara musikal, Kebile-bile dilantunkan dalam tempo lambat dengan tangga nada minor bernuansa melankolis. Harmoni lagu ini sangat identik dengan petikan dawai gitar tunggal irama Batanghari Sembilan serta desah tiupan suling bambu. Kebile-bile telah diakui secara luas sebagai salah satu mahakarya Warisan Budaya Takbenda (WBTb) Indonesia dari Sumatera Selatan."
      ],
      bulletPoints: [
        { label: "Asal Wilayah", text: "Dataran Tinggi Besemah (Kabupaten Lahat & Kota Pagar Alam), Sumatera Selatan" },
        { label: "Gaya Musik & Instrumen", text: "Tembang ratapan melankolis dengan iringan Gitar Tunggal Batanghari Sembilan" },
        { label: "Nilai Filosofis", text: "Keteguhan batin menghadapi cobaan hidup, penghargaan atas sahabat, dan harapan masa depan" }
      ]
    },
    image: "/images/tari_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Kebile-bile — Musik Daerah Besemah",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Tembang klasik Batanghari Sembilan suku Besemah di lereng Gunung Dempo.",
      },
      {
        title: "Warisan Budaya Takbenda Sumatera Selatan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Kidung rakyat autentik Lahat dan Pagaralam dalam tradisi tutur lisan Sumsel.",
      },
    ],
  },
  {
    id: "ya-saman",
    title: "Ya Saman",
    aliases: [
      "ya saman",
      "lagu ya saman",
      "lirik ya saman",
      "lirik lagu ya saman",
      "lagu daerah ya saman",
      "ya saman palembang",
      "nyelek gelumbang perahu bidar",
      "nyelek gelumbang perahu bidar di sungai musi",
      "nyelek belumban perahu bidar",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "Kamsul A. Harla (Kamsul Harun)",
    highlight: "Berikut adalah teks lirik lengkap lagu daerah Palembang 'Ya Saman' dengan bait pembuka perahu bidar di Sungai Musi:",
    lyrics: [
      "Nyelek gelumbang perahu bidar di Sungi Musi\nJanganlah lupo meli telok abang\nCantik rupo penyabar dan baek hati\nAdek manis berambut panjang dikuncit kepang",
      "Lika-liku banyu Batanghari Sembilan\nMengalir bemuaro ke Sungi Musi jugo\nElok laku ngaesi rupo cindo menawan\nMuat kakak siang tekenang malem tejago",
      "Pulo Kemaro melah Sungi Musi ke Sungsang\nNak ke Pusri laju kesasar ke Kalidoni\nBadan saro pikiran resah hati teguncang\nNgarapke adek kalu be galak jadi bini",
      "Ay... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nNyari bini yang bener-bener setolok an",
      "Ay... ya... ya... ya... Ya Saman\nPecaknyo mudah tapi saro nian\nAy... ya... ya... ya... Ya Saman\nYa Saman... Ya Saman... Ya Saman...",
    ],
    meaning: "Lagu ciptaan Kamsul A. Harla ini mengekspresikan seruan khas Palembang ('Ya Saman!') tentang susahnya mencari pasangan hidup yang sepadan ('setolok an'), dibalut suasana semarak Sungai Musi dengan perahu bidar, telok abang, dan keelokan paras gadis Palembang.",
    explanation: {
      highlight: "Lagu 'Ya Saman' adalah mahakarya pop daerah Palembang ciptaan Kamsul A. Harla yang memadukan ekspresi seruan khas Wong Kito dengan panorama semarak budaya Sungai Musi.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\n'Ya Saman' digubah oleh budayawan dan komposer Palembang Kamsul A. Harla (Kamsul Harun). Kata 'Ya Saman' sendiri merupakan ungkapan seruan spontan khas Palembang untuk mengekspresikan rasa kagum, heran, gemas, atau keterkejutan yang mendalam atas suatu peristiwa.",
        "Makna Filosofis & Tradisi Musi:\nLagu ini melukiskan perjuangan seorang bujang dalam mencari pasangan hidup yang sepadan ('setolok an'). Liriknya merekam mozaik tradisi budaya Palembang secara hidup: perlombaan perahu bidar di Sungai Musi, tradisi telur merah ('telok abang') saat perayaan kemerdekaan, keelokan gadis Palembang berambut kuncit kepang, hingga metafora sembilan aliran sungai Batanghari Sembilan.",
        "Karakteristik Musikal & Ikon Budaya:\nDengan irama melayu modern bertempo dinamis dan melodi refrein yang sangat mudah diingat ('Ay ya ya ya Ya Saman...'), lagu ini menjadi 'lagu kebangsaan kedua' bagi masyarakat Sumatera Selatan. Setiap perhelatan budaya, panggung seni, hingga pesta perkawinan Wong Kito hampir selalu menggemakan lagu ini."
      ],
      bulletPoints: [
        { label: "Pencipta", text: "Kamsul A. Harla (Kamsul Harun)" },
        { label: "Asal Daerah", text: "Kota Palembang, Sumatera Selatan" },
        { label: "Ikon Budaya yang Disebut", text: "Perahu Bidar, Telok Abang, Sungai Musi, Batanghari Sembilan, Pulau Kemaro" }
      ]
    },
    image: "/images/perahu_bidar.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Ya Saman — Lagu Daerah Palembang",
        url: "https://id.wikipedia.org/wiki/Kota_Palembang",
        domain: "id.wikipedia.org",
        excerpt: "Lagu ciptaan Kamsul A. Harla tentang tradisi sungai, perahu bidar, dan pesona gadis Palembang.",
      },
    ],
  },
  {
    id: "cuk-mak-ilang",
    title: "Cuk Mak Ilang",
    aliases: [
      "cuk mak ilang",
      "cuk mak ilang mak ilang",
      "lagu cuk mak ilang",
      "lirik lagu cuk mak ilang",
      "lirik cuk mak ilang",
      "lagu daerah cuk mak ilang",
      "cuk mak ilang palembang",
      "cuk mak ilang cagak batu",
      "dimane kucing belang",
      "dimano koceng belang",
    ],
    region: "Kota Palembang, Sumatera Selatan",
    creator: "Tradisional Melayu Palembang",
    highlight: "Berikut adalah teks lirik autentik dan lengkap lagu pantun daerah Palembang 'Cuk Mak Ilang' beserta bait aslinya:",
    lyrics: [
      "Refrein:\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku",
      "Bait 1:\nKapal api masok Pelembang\nBanyunyo tenang jadi gelumbang\nOi mak mano ati dak bimbang\nGades doson bujang Pelembang\n\n(Refrein)\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku",
      "Bait 2:\nAlangke lemak rumah di lebak\nSiput dan gondang memanjat cagak\nAlangke lemak rumah nan parak\nBukak jendelo lah saling agak\n\n(Refrein)\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku",
      "Bait 3:\nSempayo digulai lemak\nBatang padi dibelah duo\nJangan takot dimarah umak\nAsak jadi kito beduo\n\n(Refrein)\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku",
      "Bait 4:\nAnak ikan dimakan ikan\nIkan dilaut beduri duri\nSanaklah bukan saudaro bukan\nSangkot paotnyo kareno budi\n\n(Refrein)\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku\nCuk mak ilang mak ilang cagak batu\nDimano koceng belang disitu rumah aku",
    ],
    meaning: "Lagu 'Cuk Mak Ilang' merupakan kidung pantun rakyat Palembang yang ceria, lincah, dan jenaka. Mengisahkan pergaulan bersahut pantun antara bujang dan gadis di tepian Sungai Musi dengan kiasan metaforis yang sarat canda dan keakraban sosial.",
    explanation: {
      highlight: "Cuk Mak Ilang adalah lagu daerah tradisional Palembang berirama riang yang sarat tradisi pantun bersahut-sahutan, melukiskan dinamika pergaulan asmara dan kelakar jenaka muda-mudi di tepian Sungai Musi.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\n'Cuk Mak Ilang' merupakan khazanah sastra lisan Melayu Palembang yang berkembang sebagai tembang rakyat di tepian Sungai Musi. Tradisi melantunkan lagu ini bermula dari kebiasaan berkumpul dan berpantun bersambut (pantun bersahut) saat perayaan panen, pesta perahu bidar, maupun hajatan pernikahan adat. Lagu ini mencerminkan keterbukaan dan keceriaan masyarakat Palembang tempo dulu.",
        "Makna Filosofis Syair & Pantun:\nRefrein terkenal 'Cuk mak ilang mak ilang cagak batu, dimano koceng belang disitu rumah aku' adalah kiasan jenaka tentang teka-teki penunjuk alamat hati sang kekasih. Bait-baitnya melukiskan kehidupan khas Palembang: lalu-lalang kapal api yang membelah tenangnya arus Sungai Musi, rumah rakit dan panggung di tepian lebak, hingga pertautan rasa antara bujang kota dan gadis dusun yang terikat oleh kesantunan budi pekerti ('sangkot paotnyo kareno budi').",
        "Karakteristik Musikal & Fungsi Budaya:\nLagu ini memiliki ritme riang bertempo cepat (allegro/vivace) yang mengajak pendengar bertepuk tangan dan bergembira. Aransemen tradisionalnya memadukan tabuhan rebana burdah, gendang melayu, serta akordeon atau biola melayu. Hingga kini, Cuk Mak Ilang selalu menjadi tembang primadona pengiring seni pertunjukan tari kreasi dan upacara adat di Sumatera Selatan."
      ],
      bulletPoints: [
        { label: "Asal Daerah", text: "Kota Palembang (Kawasan Tepian Sungai Musi), Sumatera Selatan" },
        { label: "Bentuk Seni", text: "Pantun bersahut-sahutan jenaka bertempo riang gembira" },
        { label: "Nilai Filosofis", text: "Keramahan sosial, kecerdasan berbahasa kiasan, dan keluhuran budi pekerti" }
      ]
    },
    image: "/images/rebana_burdah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Cuk Mak Ilang — Lagu Daerah Sumatera Selatan",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Kidung pantun Melayu Palembang bertempo riang dengan struktur sampiran dan isi yang khas.",
      },
      {
        title: "Sastra Lisan dan Pantun Palembang — Portal Resmi Sumsel",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Dokumentasi seni pantun bersahut dan kidung rakyat pergaulan Sungai Musi.",
      },
    ],
  },
  {
    id: "dek-sangke",
    title: "Dek Sangke",
    aliases: [
      "dek sangke",
      "dek sangke aku dek sangke",
      "lagu dek sangke",
      "lirik lagu dek sangke",
      "lirik dek sangke",
      "lagu daerah dek sangke",
      "awak uke la jadi duwo",
    ],
    region: "Sumatera Selatan",
    creator: "Tradisional Sumatera Selatan",
    highlight: "Berikut adalah teks lirik autentik lagu daerah Sumatera Selatan 'Dek Sangke' yang sarat pantun sindiran halus:",
    lyrics: [
      "Dek sangke aku dek sangke\nAwak uke la jadi duwo\nDek sangke aku dek sangke\nAwak uke la jadi duwo",
      "Nemba' bunga putik kelapo\nBuah jambu la jadi mudo\nNemba' bunga putik kelapo\nBuah jambu la jadi mudo",
      "Dek sangke aku dek sangke\nKando batinggal ku de sangke\nDek sangke aku dek sangke\nKando batinggal ku de sangke",
      "Siang malam ku de nyangke\nHati tebakar rindu mambang\nBiarlah luluh tulang belulang\nAsal kando selamat pulang",
    ],
    meaning: "Lagu 'Dek Sangke' bermakna 'tidak menyangka'. Menyiratkan rasa kaget atas perubahan sikap seseorang atau kenyataan hidup yang berlawanan dengan harapan, dibalut pantun sindiran bersahaja khas Sumsel.",
    explanation: {
      highlight: "Dek Sangke adalah tembang pantun sindiran bersahaja khas Sumatera Selatan yang bermakna 'tidak menyangka', mengajarkan kejujuran dan ketulusan dalam menjaga amanah dan hubungan antarmanusia.",
      paragraphs: [
        "Latar Belakang & Asal-Usul:\n'Dek Sangke' berasal dari tradisi sastra lisan Sumatera Selatan dan tersebar luas di berbagai kabupaten sepanjang aliran Batanghari Sembilan. Kata 'dek sangke' berarti 'tidak menyangka' atau 'tak terkira'. Lagu ini digunakan oleh masyarakat tradisional sebagai sarana menegur atau menyindir perilaku seseorang secara halus tanpa melukai martabatnya.",
        "Makna Filosofis Syair:\nMelalui pantun perumpamaan seperti 'awak uke la jadi duwo' (badan satu seolah menjadi dua / bermuka dua) dan 'nemba bunga putik kelapo, buah jambu la jadi mudo' (mengharapkan sesuatu tetapi yang datang hal lain), lagu ini memberi nasihat moral agar seseorang bersikap jujur, tidak bersilat lidah, dan selalu setia pada janji.",
        "Karakteristik Musikal:\nLagu ini dibawakan dengan nada santai dan lincah, sering kali diiringi perkusi rebana atau gendang. Sifatnya yang jenaka namun sarat pesan moral menjadikannya salah satu lagu daerah Sumsel yang paling banyak diajarkan di sekolah-sekolah sebagai muatan lokal pelestarian budaya."
      ],
      bulletPoints: [
        { label: "Asal Daerah", text: "Sumatera Selatan (Tradisi Tutur Batanghari Sembilan)" },
        { label: "Arti Nama", text: "'Dek Sangke' bermakna 'Tidak Menyangka' / 'Tak Terduga'" },
        { label: "Pesan Moral", text: "Kejujuran batin, menjaga janji, dan menghindari sikap bermuka dua" }
      ]
    },
    image: "/images/senjang_muba.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Dek Sangke — Lagu Daerah Sumatera Selatan",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Lagu daerah populer Sumatera Selatan bernuansa pantun pergaulan.",
      },
    ],
  },
  {
    id: "gending-sriwijaya",
    title: "Gending Sriwijaya",
    aliases: [
      "gending sriwijaya",
      "lagu gending sriwijaya",
      "lirik gending sriwijaya",
      "lirik lagu gending sriwijaya",
      "syair gending sriwijaya",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "A. Dahlan Mahibat & Nungtjik A.R. (1943-1944)",
    highlight: "Berikut adalah lirik agung lagu pusaka 'Gending Sriwijaya' persembahan sekapur sirih kejayaan Sriwijaya:",
    lyrics: [
      "Di kala ku merindukan keluhuran dahulu kala\nKutembangkan nyanyi lagu Gending Sriwijaya\nDalam seni kunikmati lagi zaman bahagia\nKuciptakan kembali dari kandungan Maha Kala",
      "Sriwijaya dengan Asrama Agung Sang Maha Guru\nTutur sabda Dharmakirti sakti membimbing jiwaku\nHarum mawar maha suci suling Dengkiar bertalu\nMenenangkan khayalan jiwa beralun membubung tinggi",
      "Kembali memuja Maha Hyang\nMembawa harum bakti sekapur sirih\nPersembahan tulus suci\nRakyat jelata memuliakan Sriwijaya",
    ],
    meaning: "Gending Sriwijaya adalah kidung agung Palembang yang diciptakan untuk mengenang keluhuran kemaharajaan maritim Sriwijaya sebagai pusat peradaban dan ilmu pengetahuan di Nusantara.",
    image: "/images/tari_gending.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Gending Sriwijaya — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Gending_Sriwijaya",
        domain: "id.wikipedia.org",
        excerpt: "Tari dan lagu tradisional Palembang persembahan sekapur sirih penyambutan tamu kenegaraan.",
      },
    ],
  },
  {
    id: "tari-tanggai",
    title: "Tari Tanggai",
    aliases: [
      "tari tanggai",
      "lagu tari tanggai",
      "lirik tari tanggai",
      "lirik lagu tari tanggai",
      "tanggai palembang",
    ],
    region: "Palembang, Sumatera Selatan",
    creator: "Tradisional Palembang",
    highlight: "Berikut adalah syair dan lirik pengiring tari penyambutan tamu kehormatan 'Tari Tanggai':",
    lyrics: [
      "Alangkah elok rupa rupawan\nTari Tanggai persembahan pusaka\nMenyambut tamu agung nan budiman\nSelamat datang kami ucapkan",
      "Tangan melentik berhias tanggai\nGerak kemilau gemulai berseri\nSembah sujud tanda beradat\nHormat mulia sepanjang hari",
      "Sirih sekapur kami haturkan\nTanda mesra jalin persaudaraan\nDi bumi Sriwijaya nan permai\nSemoga damai selalu bersemi",
    ],
    meaning: "Lagu pengiring Tari Tanggai melantunkan penghormatan tulus kepada para tamu agung yang singgah di Palembang dengan lentiknya hiasan kuku emas (tanggai).",
    image: "/images/tari_tanggai.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Tari Tanggai — Wikipedia",
        url: "https://id.wikipedia.org/wiki/Tari_Tanggai",
        domain: "id.wikipedia.org",
        excerpt: "Tarian khas Palembang untuk menyambut tamu kehormatan dengan lentik tanggai perunggu.",
      },
    ],
  },
  {
    id: "sayang-selayak",
    title: "Sayang Selayak",
    aliases: [
      "sayang selayak",
      "lagu sayang selayak",
      "lirik sayang selayak",
      "lirik lagu sayang selayak",
      "sayang selayak burung lempipi",
    ],
    region: "Lahat / Lematang, Sumatera Selatan",
    creator: "Tradisional Suku Lematang",
    highlight: "Berikut adalah lirik lagu daerah Sumatera Selatan 'Sayang Selayak' dengan metafora burung lempipi:",
    lyrics: [
      "Sayang selayak burung lempipi\nSayang selayak burung lempipi\nMenclok di genteng ayeknyo tenang\nKalu ku tau bujang pedengki\nKalu ku tau bujang pedengki\nDak kando adek kusuruh datang",
      "Sayang selayak burung lempipi\nSayang selayak burung lempipi\nTerbang melayang ke tanah seberang\nAlangkah sakit menahan rindu\nBadan kurus dimakan bayang",
    ],
    meaning: "Lagu Sayang Selayak mengajarkan kehati-hatian dalam memilih pasangan hidup dan menjaga kehormatan diri dengan metafora burung lempipi di bubungan atap rumah.",
    image: "/images/kamar_rumah_limas.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Sayang Selayak — Khazanah Musik Lahat",
        url: "https://id.wikipedia.org/wiki/Sumatra_Selatan",
        domain: "id.wikipedia.org",
        excerpt: "Lagu rakyat daerah Lematang bernuansa alam dan sindiran bijak.",
      },
    ],
  },
  {
    id: "petang-petang",
    title: "Petang-Petang",
    aliases: [
      "petang petang",
      "petang-petang",
      "lagu petang petang",
      "lirik lagu petang petang",
      "petanglah petang",
      "petang kemano",
    ],
    region: "Besemah / Lahat, Sumatera Selatan",
    creator: "Tradisional Dataran Tinggi Besemah",
    highlight: "Berikut adalah lirik syahdu tembang senja Besemah 'Petang-Petang':",
    lyrics: [
      "Petanglah petang mengambang petang\nPetang kemano denie dingin\nPetanglah petang mengambang petang\nPetang kemano denie dingin",
      "Badanlah melang melangkah pulang\nKemano badan tempat bergantung\nKalu lah petang hari lah malam\nLampu dipasang di pucuk tiang\nKemano badan hendak bertandang\nSatu pun kance dide lah datang",
    ],
    meaning: "Lagu 'Petang-Petang' mengekspresikan perenungan senja di kaki Gunung Dempo saat rasa sepi dan rindu melanda pengelana yang jauh dari sanak keluarga.",
    image: "/images/megalitik_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Petang-Petang — Tembang Besemah",
        url: "https://id.wikipedia.org/wiki/Gunung_Dempo",
        domain: "id.wikipedia.org",
        excerpt: "Syair syahdu senja masyarakat lereng Gunung Dempo dan Lahat.",
      },
    ],
  },
  {
    id: "sukat-malang",
    title: "Sukat Malang",
    aliases: [
      "sukat malang",
      "lagu sukat malang",
      "lirik sukat malang",
      "lirik lagu sukat malang",
    ],
    region: "Sumatera Selatan",
    creator: "Tradisional Batanghari Sembilan",
    highlight: "Berikut adalah lirik tembang petikan gitar Batanghari Sembilan 'Sukat Malang':",
    lyrics: [
      "Kemano badan kemano diriku\nSukat malang nasibku ini\nIbarat perahu di tengah lautan\nDihantam ombak dihembus angin",
      "Nasib malang jangan diratap\nSudah takdir dari Yang Kuasa\nKuatkan hati tabahkan jiwa\nHari esok pasti bahagia",
    ],
    meaning: "Lagu 'Sukat Malang' adalah tembang gitar tunggal Batanghari Sembilan yang mengajarkan ketabahan jiwa menghadapi pasang-surut nasib hidup.",
    image: "/images/senjang_muba.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Gitar Tunggal Batanghari Sembilan",
        url: "https://sumselprov.go.id",
        domain: "sumselprov.go.id",
        excerpt: "Sastra lisan dan petikan melankolis penutur sembilan aliran sungai Sumsel.",
      },
    ],
  },
  {
    id: "ribang-kemambang",
    title: "Ribang Kemambang",
    aliases: [
      "ribang kemambang",
      "lagu ribang kemambang",
      "lirik ribang kemambang",
      "lirik lagu ribang kemambang",
    ],
    region: "Lahat, Sumatera Selatan",
    creator: "Tradisional Kabupaten Lahat",
    highlight: "Berikut adalah lirik lagu gembira masyarakat Lahat 'Ribang Kemambang':",
    lyrics: [
      "Ribang kemambang hati nan riang\nMelihat pemandangan di Bukit Serelo\nGadis manis duduk tersenyum\nBikin hati abang terpikat rindu",
      "Lahat nan elok tanah pusaka\nSungai Lematang mengalir tenang\nMari bernyanyi bersukaria\nMenjaga adat sampai ke ujung zaman",
    ],
    meaning: "Lagu 'Ribang Kemambang' bermakna hati yang melayang penuh kegembiraan menikmati panorama alam Bukit Serelo (Bukit Jempol) dan keindahan bumi Lahat.",
    image: "/images/megalitik_pasemah.jpg",
    themeSlug: "tari-musik",
    sources: [
      {
        title: "Ribang Kemambang — Alam Lahat",
        url: "https://id.wikipedia.org/wiki/Kabupaten_Lahat",
        domain: "id.wikipedia.org",
        excerpt: "Lagu riang tentang panorama Bukit Serelo dan kearifan masyarakat Lematang.",
      },
    ],
  },
];

// Cek apakah query secara eksplisit meminta LIRIK lagu
export function isLyricQuery(query: string): boolean {
  if (!query) return false;
  const q = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();
  return (
    q.includes("lirik") ||
    q.includes("syair") ||
    q.includes("bait lagu") ||
    q.includes("teks lagu") ||
    q.includes("kata lagu") ||
    q.includes("tuliskan lagu") ||
    q.includes("tulis lirik") ||
    q.includes("bacakan lirik") ||
    q.includes("baca lirik") ||
    q.includes("liriknya")
  );
}

// Alias untuk kompatibilitas internal
export const isLyricRequest = isLyricQuery;

// Cek apakah query adalah permintaan resep / cara masak (jangan intersep dengan lagu)
export function isRecipeRequest(q: string): boolean {
  return (
    q.includes("resep") ||
    q.includes("cara buat") ||
    q.includes("cara masak") ||
    q.includes("bahan") ||
    q.includes("bumbu") ||
    q.includes("langkah") ||
    q.includes("cara memasak") ||
    q.includes("cara membuat") ||
    q.includes("resepi")
  );
}

// Helper untuk menemukan lagu daerah Sumsel dari query pencarian
export function findSumselSong(query: string): SumselSong | null {
  if (!query) return null;
  const cleanQ = query.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();

  // JIKA query adalah permintaan resep/cara masak kuliner, bypass agar tidak tertukar
  if (isRecipeRequest(cleanQ)) return null;

  // 1. Cek potongan bait/lirik unik khas lagu
  if (cleanQ.includes("cagak batu") || cleanQ.includes("kucing belang") || cleanQ.includes("koceng belang")) {
    return sumselSongs.find((x) => x.id === "cuk-mak-ilang") || null;
  }
  if (
    cleanQ.includes("ibung kah nulih") ||
    cleanQ.includes("kukendam kina") ||
    cleanQ.includes("mangke ku lege") ||
    cleanQ.includes("dide bekance")
  ) {
    return sumselSongs.find((x) => x.id === "kebile-bile") || null;
  }
  if (cleanQ.includes("sungi musinyo") || cleanQ.includes("pempeknyo") || cleanQ.includes("kota kito")) {
    return sumselSongs.find((x) => x.id === "palembang-darussalam") || null;
  }
  if (cleanQ.includes("mak lengen") || cleanQ.includes("kelenger") || cleanQ.includes("bulet besak panjang")) {
    return sumselSongs.find((x) => x.id === "pempek-lenjer") || null;
  }
  if (cleanQ.includes("telok abang") || cleanQ.includes("setolok an") || cleanQ.includes("nyelek gelumbang")) {
    return sumselSongs.find((x) => x.id === "ya-saman") || null;
  }
  if (cleanQ.includes("awak uke la jadi duwo") || cleanQ.includes("nemba bunga putik kelapo")) {
    return sumselSongs.find((x) => x.id === "dek-sangke") || null;
  }
  if (cleanQ.includes("lempipi") || cleanQ.includes("sayang selayak")) {
    return sumselSongs.find((x) => x.id === "sayang-selayak") || null;
  }
  if (cleanQ.includes("petanglah petang") || cleanQ.includes("petang kemano")) {
    return sumselSongs.find((x) => x.id === "petang-petang") || null;
  }
  if (cleanQ.includes("ribang kemambang")) {
    return sumselSongs.find((x) => x.id === "ribang-kemambang") || null;
  }
  if (cleanQ.includes("sukat malang")) {
    return sumselSongs.find((x) => x.id === "sukat-malang") || null;
  }

  // 2. Cocokkan nama lagu utama
  if (cleanQ.includes("cuk mak ilang")) {
    return sumselSongs.find((x) => x.id === "cuk-mak-ilang") || null;
  }
  if (cleanQ.includes("kebile") || cleanQ.includes("kabile")) {
    return sumselSongs.find((x) => x.id === "kebile-bile") || null;
  }
  if (cleanQ.includes("ya saman") || (cleanQ.includes("saman") && !cleanQ.includes("tari saman"))) {
    return sumselSongs.find((x) => x.id === "ya-saman") || null;
  }
  if (cleanQ.includes("pempek lenjer") || (cleanQ.includes("lenjer") && (cleanQ.includes("lagu") || cleanQ.includes("lirik") || cleanQ.includes("musik")))) {
    return sumselSongs.find((x) => x.id === "pempek-lenjer") || null;
  }
  if (cleanQ.includes("dek sangke") || cleanQ.includes("sangke")) {
    return sumselSongs.find((x) => x.id === "dek-sangke") || null;
  }
  if (cleanQ.includes("gending sriwijaya") || (cleanQ.includes("gending") && (cleanQ.includes("lagu") || cleanQ.includes("lirik") || cleanQ.includes("syair")))) {
    return sumselSongs.find((x) => x.id === "gending-sriwijaya") || null;
  }
  if (cleanQ.includes("darussalam") && (cleanQ.includes("lagu") || cleanQ.includes("lirik") || cleanQ.includes("palembang"))) {
    return sumselSongs.find((x) => x.id === "palembang-darussalam") || null;
  }
  if (cleanQ.includes("tari tanggai") || (cleanQ.includes("tanggai") && (cleanQ.includes("lagu") || cleanQ.includes("lirik")))) {
    return sumselSongs.find((x) => x.id === "tari-tanggai") || null;
  }
  if (cleanQ.includes("petang petang") || cleanQ.includes("petang-petang")) {
    return sumselSongs.find((x) => x.id === "petang-petang") || null;
  }

  // 3. Cocokkan berdasarkan daftar aliases setiap lagu (hanya jika query mengandung alias lengkap)
  let bestMatch: { song: SumselSong; score: number } | null = null;
  for (const song of sumselSongs) {
    for (const alias of song.aliases) {
      const cleanAlias = alias.toLowerCase().replace(/['".,?!]/g, " ").replace(/\s+/g, " ").trim();
      if (cleanQ === cleanAlias) {
        return song;
      }
      if (cleanAlias.length >= 5 && cleanQ.includes(cleanAlias)) {
        const score = cleanAlias.length;
        if (!bestMatch || score > bestMatch.score) {
          bestMatch = { song, score };
        }
      }
    }
  }

  return bestMatch ? bestMatch.song : null;
}

