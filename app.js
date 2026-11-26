(function () {
  'use strict';

  // ---------- icons ----------
  var I = {
    bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
    down: '<path d="M6 9l6 6 6-6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    check: '<path d="M5 12l5 5 9-10"/>',
    clip: '<path d="M21 11l-8.5 8.5a5 5 0 01-7-7L14 4a3.5 3.5 0 015 5l-8.5 8.5a2 2 0 01-3-3L15 7"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z"/>',
    home: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1z"/>',
    myhome: '<path d="M3 11l9-7 9 7v9a1 1 0 01-1 1H4a1 1 0 01-1-1z"/><circle cx="12" cy="13" r="2.2"/><path d="M12 15.2V19"/>',
    wrench: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z"/><path d="M9 4v14M15 6v14"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><rect x="9" y="11" width="6" height="5" rx="1"/><path d="M10 11V9.5a2 2 0 014 0V11"/>',
    broom: '<path d="M19 3l-7 7"/><path d="M12 10l2 2-5 9H4l1-6z"/><path d="M16 15l1.5 1.5M19 13l1 1"/>',
    truck: '<rect x="2" y="7" width="12" height="9" rx="1"/><path d="M14 10h4l3 3v3h-7z"/><circle cx="6" cy="18" r="1.8"/><circle cx="17" cy="18" r="1.8"/>',
    card: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/>',
    case: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5h6v2M3 12h18"/>',
    doc: '<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 12h7M9 16h5"/>',
    face: '<path d="M4 8V5a1 1 0 011-1h3M16 4h3a1 1 0 011 1v3M20 16v3a1 1 0 01-1 1h-3M8 20H5a1 1 0 01-1-1v-3"/><path d="M9 10v1M15 10v1M12 10v3h-1M9.5 16c1.5 1 3.5 1 5 0"/>',
    cam: '<path d="M3 8l13-3 2 6-13 3z"/><path d="M18 9l3-1M8 13l1 4H5"/>',
    meter: '<path d="M4 16a8 8 0 1116 0"/><path d="M12 16l4-5"/><circle cx="12" cy="16" r="1.3"/>',
    staff: '<circle cx="12" cy="9" r="3"/><path d="M6.5 18a5.5 5.5 0 0111 0"/><circle cx="12" cy="12" r="9"/>',
    poll: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M8 10l1.5 1.5L12 9M8 15l1.5 1.5L12 14M14 10h2M14 15h2"/>',
    chart: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 17l2.5-3 2 2 3-4"/>',
    pipe: '<path d="M4 8h9a3 3 0 013 3v2"/><path d="M4 5v6M14 13h4v3h-4zM16 16v2M15 20h2"/>',
    bolt: '<path d="M13 3L5 14h6l-1 7 8-11h-6z"/>',
    ruler: '<path d="M4 18L18 4l2 2L6 20z"/><path d="M8 14l1.5 1.5M11 11l1.5 1.5M14 8l1.5 1.5"/>',
    intercom: '<rect x="6" y="3" width="10" height="18" rx="2"/><circle cx="11" cy="8" r="1.5"/><path d="M9 13h4M9 16h4M19 9a4 4 0 010 6"/>',
    window: '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
    door: '<path d="M6 21V3h12v18M4 21h16"/><circle cx="15" cy="12" r="1"/>',
    fan: '<path d="M3 8h12a3 3 0 10-3-3M3 12h16a3 3 0 11-3 3M3 16h8"/>',
    lamp: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-4 10.5V16h8v-2.5A6 6 0 0012 3z"/>',
    lift: '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M12 3v18M8.5 9l1.5-2 1.5 2M12.5 15l1.5 2 1.5-2"/>',
    tree: '<path d="M12 21v-6M7 15h10l-5-12z"/>',
    car: '<path d="M5 16V12l2-5h10l2 5v4z"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/><path d="M5 12h14"/>',
    building: '<rect x="5" y="3" width="14" height="18"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>'
  };
  function ic(n, s, w) {
    return '<svg width="' + (s || 22) + '" height="' + (s || 22) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + (w || 1.8) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[n] + '</svg>';
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  // ---------- data ----------
  var FLATS = ['ЖК Everest, кв. 104', 'ЖК Everest Boulevard, кв. 57', 'Паркинг Everest, м/м 12'];
  var LOCS = [
    { name: 'Квартира', icon: 'building', cats: [['Сантехника', 'pipe'], ['Электричество', 'bolt'], ['Плотницкие работы', 'ruler'], ['Домофон', 'intercom'], ['Окна', 'window'], ['Двери', 'door'], ['Вентиляция', 'fan']] },
    { name: 'Подъезд', icon: 'door', cats: [['Освещение', 'lamp'], ['Лифт', 'lift'], ['Уборка', 'broom'], ['Домофон', 'intercom'], ['Двери', 'door']] },
    { name: 'Паркинг', icon: 'car', cats: [['Шлагбаум', 'shield'], ['Освещение', 'lamp'], ['Уборка', 'broom'], ['Вентиляция', 'fan']] },
    { name: 'Двор', icon: 'tree', cats: [['Благоустройство', 'tree'], ['Освещение', 'lamp'], ['Детская площадка', 'ruler'], ['Безопасность', 'shield']] },
    { name: 'Дом/фасад', icon: 'building', cats: [['Кровля', 'building'], ['Фасад', 'window'], ['Водосток', 'pipe'], ['Освещение', 'lamp']] }
  ];
  var WORKS = {
    'Сантехника': ['Установка/ремонт смесителя', 'Устранение протечки', 'Устранение засора', 'Замена сифона'],
    'Электричество': ['Ремонт розетки', 'Замена выключателя', 'Не работает свет', 'Установка светильника'],
    'Домофон': ['Настройка домофона', 'Не открывает дверь', 'Нет звука']
  };
  // Данные с ed.group (Everest Development). Цен на сайте нет — показываем «Узнать цену».
  var ST = 'https://ed.group/storage/';
  var JK = [
    { id: 'athletic', name: 'ЖК «Athletic Park»', cls: 'Комфорт', addr: 'пр. Рыскулова – Онгарсыновой', near: '2 мин до Almaty Arena', st: 'build', term: 'I кв. 2027', units: '694 квартиры', site: 'athleticpark.kz', img: ST + 'projects/November2026/athletic-q2-04.jpg' },
    { id: 'premier', name: 'ЖК «Premier»', cls: 'Бизнес', addr: '12 мкр., ул. Шаляпина', near: '10 мин до ТРЦ MOSKVA', st: 'build', term: 'I кв. 2027', units: '5 блоков', site: 'premier.ed.group', img: ST + 'projects/August2026/UHFamj52wFOrxjVkoD4q.jpg' },
    { id: 'boulevard', name: 'ЖК «Everest Boulevard»', cls: 'Комфорт +', addr: 'ул. Халиуллина, мкр. Думан-2', near: '10 мин до аэропорта', st: 'sale', term: '', units: '8 блоков', site: 'everest-boulevard.kz', img: ST + 'projects/June2025/yo9FyUrhuCASvCPWFTVD.jpg' },
    { id: 'arna', name: 'ЖК «Arna»', cls: 'Комфорт', addr: 'Ташкентский тракт, с. Иргели', near: '5 мин до Aport Mall', st: 'sale', term: '', units: '', site: 'arna-almaty.kz', img: ST + 'projects/June2025/TdrM5n3PKFfkWUqgaW53.jpg' },
    { id: 'shygys', name: 'ЖК «Shygys»', cls: 'Комфорт', addr: 'Талгарский р-н, Алатауская трасса', near: '2 мин до Aport Mall', st: 'build', term: 'I кв. 2028', units: '', site: '', img: ST + 'projects/August2026/shygys-1.jpg', note: '«Шығыс» — «Восток», сторона, откуда начинается день.' },
    { id: 'turkistan', name: 'Turkistan Apartments', cls: 'Инвестиционный', addr: 'ул. Макатаева 51/34', near: '8 мин до парка 28 панфиловцев', st: 'sale', term: '', units: '125 номеров (апарт-отель)', site: 'turkistan-almaty.kz', img: ST + 'projects/June2025/QSLiZwAOOMXVrk64TX7F.jpg' },
    { id: 'ermensai', name: 'Таунхаусы «Ermensai Village»', cls: 'Бизнес', addr: 'мкр. Нурлытау, 14-я улица', near: '5 мин до пр. Аль-Фараби', st: 'done', term: 'Сдан', units: 'Таунхаусы', site: 'e-village.kz', img: ST + 'projects/June2025/KmAealvYadrkCSHBwWIw.webp' },
    { id: 'baganashil', name: 'Коттеджный городок «Baganashil Hills»', cls: 'Премиум', addr: 'мкр. Баганашил', near: '7 мин до пр. Аль-Фараби', st: 'sale', term: '', units: 'Коттеджи', site: 'b-hills.kz', img: ST + 'projects/June2025/AqWhWtIaElUFGQAVv5Go.webp' },
    { id: 'everest', name: 'ЖК «Everest»', cls: 'Комфорт +', addr: 'ул. Утеген батыра, 11', near: '3 мин до ТРЦ GrandPark', st: 'done', term: 'Сдан', units: '', site: 'everest.moydom.kz', img: ST + 'projects/June2025/fg1iWgzCj9LZ8npcVUGE.webp' },
    { id: 'turar', name: 'ЖК «Turar»', cls: 'Комфорт', addr: 'пр. Рыскулова', near: '12 мин до центра', st: 'done', term: 'Сдан', units: '35 домов', site: 'turar-almaty.kz', img: ST + 'projects/June2025/sp4JkG5M0EBEv65BvH0C.jpg' },
    { id: 'park', name: 'ЖК «Everest Park»', cls: 'Скоро', addr: 'мкр. Ботакоз, у Almaty Arena', near: '4 мин до Almaty Arena', st: 'soon', term: '', units: '', site: '', img: ST + 'projects/August2026/everest-park-1.jpg' },
    { id: 'promenade', name: 'Полицентр «Almaty Promenade»', cls: 'Скоро', addr: 'Медеуский р-н, у Aport Mall East', near: '6 мин до Halyk Arena', st: 'soon', term: '', units: 'Многофункциональный', site: '', img: ST + 'projects/August2026/venice-1.jpg' }
  ];
  var STATUS = { build: 'Строится', sale: 'В продаже', done: 'Сдан', soon: 'Скоро' };
  var CLASSES = ['Все классы', 'Комфорт', 'Комфорт +', 'Бизнес', 'Премиум', 'Инвестиционный'];
  var STATUSES = [['Любой статус', ''], ['Строится', 'build'], ['В продаже', 'sale'], ['Сдан', 'done'], ['Скоро', 'soon']];
  var PHONE = '+7 (700) 040-04-00', TEL = 'tel:+77000400400', WA = 'https://wa.me/77000400400';
  var OFFICES = ['ул. Толе би, 101, БЦ «Толе би», 1 этаж', 'пр. Абая, 44а, ТРК «PROMENADE», 1 этаж', 'Ташкентский тракт, с. Иргели', 'ул. Халиуллина, 154Б, мкр. Думан-2', 'мкр. Ботакоз 2 (у школы-гимназии № 209)'];

  // ---------- логотипы ----------
  // Чтобы добавить логотип клиента: положить файл в img/logos/ и добавить строку сюда.
  var LOGOS = [
    { id: 'app', name: 'Everest App', note: 'вариант для прототипа', src: 'img/logo-app.svg', icon: 'img/icon-192.png', manifest: 'manifest.webmanifest' },
    { id: 'ed', name: 'Everest Development', note: 'фирменный, белый', src: 'img/logos/ed-white.svg', icon: 'img/icon-ed-192.png', manifest: 'manifest-ed.webmanifest' },
    { id: 'ed-blue', name: 'Everest Development', note: 'фирменный, синий (для светлого фона)', light: true, src: 'img/logos/ed-blue.svg', icon: 'img/icon-ed-192.png', manifest: 'manifest-ed.webmanifest' }
  ];
  var LS_LOGO = 'everest-logo', LS_CUSTOM = 'everest-logo-custom', LS_WHITE = 'everest-logo-white';
  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); return true; } catch (e) { return false; } }
  var urlLogo = (location.search.match(/[?&]logo=([\w-]+)/) || [])[1];
  var LOGO = {
    id: urlLogo || lsGet(LS_LOGO) || 'app',
    custom: lsGet(LS_CUSTOM),
    white: (location.search.match(/[?&]white=1/) ? '1' : lsGet(LS_WHITE)) === '1'
  };
  function logoById(id) { return LOGOS.filter(function (l) { return l.id === id; })[0]; }
  function logoSrc() {
    if (LOGO.id === 'custom' && LOGO.custom) return LOGO.custom;
    return (logoById(LOGO.id) || LOGOS[0]).src;
  }
  function logoImg(cls, src) {
    return '<img class="' + cls + (LOGO.white ? ' white' : '') + '" src="' + (src || logoSrc()) + '" alt="Логотип" onerror="this.src=\'img/logo-app.svg\'">';
  }
  function applyLogo() {
    var cur = LOGO.id === 'custom' ? null : (logoById(LOGO.id) || LOGOS[0]);
    var icon = cur ? cur.icon : LOGO.custom;
    ['link[rel=icon]', 'link[rel=apple-touch-icon]'].forEach(function (q) { var l = document.querySelector(q); if (l) l.href = icon; });
    var m = document.querySelector('link[rel=manifest]');
    if (m) m.href = cur ? cur.manifest : 'manifest.webmanifest';
  }
  function shareLink() {
    var base = location.origin + location.pathname;
    return base + '?logo=' + LOGO.id + (LOGO.white ? '&white=1' : '') + '#/main';
  }
  function logoSheet() {
    var opts = LOGOS.slice();
    if (LOGO.custom) opts.push({ id: 'custom', name: 'Свой файл', note: 'только на этом устройстве', src: LOGO.custom });
    sheet.innerHTML = '<div class="overlay"><div class="bg" data-act="close"></div><div class="panel" role="dialog" aria-label="Логотип"><div class="grab"></div>' +
      '<div class="between"><h2 style="font-size:22px;font-weight:600">Логотип приложения</h2><button class="iconbtn" data-act="close" aria-label="Закрыть">' + ic('close', 20, 2) + '</button></div>' +
      '<div style="display:flex;flex-direction:column;gap:10px;max-height:46vh;overflow-y:auto">' +
      opts.map(function (o) {
        var on = o.id === LOGO.id;
        return '<button class="logoopt' + (on ? ' on' : '') + '" data-act="picklogo" data-arg="' + o.id + '"><span class="lprev"' + (o.light ? ' style="background:#fff"' : '') + '>' + logoImg('lp', o.src) + '</span>' +
          '<span style="flex:1;min-width:0;text-align:left"><span style="display:block;font-size:15px;font-weight:600">' + esc(o.name) + '</span><span class="mut" style="font-size:12px">' + esc(o.note) + '</span></span>' +
          '<span class="gold">' + (on ? ic('check', 20, 2.2) : '') + '</span></button>';
      }).join('') +
      '<label class="logoopt" style="cursor:pointer"><span class="lprev gold">' + ic('clip', 22, 2) + '</span><span style="flex:1"><span style="display:block;font-size:15px;font-weight:600">Загрузить свой</span><span class="mut" style="font-size:12px">PNG или SVG, лучше на прозрачном фоне</span></span><input type="file" id="logofile" accept="image/png,image/svg+xml,image/jpeg,image/webp" class="sr"></label>' +
      '</div>' +
      '<button class="logoopt" data-act="logowhite" style="justify-content:space-between"><span style="font-size:15px">Сделать логотип белым<span class="mut" style="display:block;font-size:12px">если он тёмный и не виден на фоне</span></span><span class="switch' + (LOGO.white ? ' on' : '') + '"><i></i></span></button>' +
      (LOGO.id === 'custom' ? '' : '<button class="btn outline" data-act="copylogo">Скопировать ссылку с этим логотипом</button>') +
      '<button class="btn" data-act="close">Готово</button></div></div>';
  }
  function splash() {
    var el = document.createElement('div');
    el.className = 'splash';
    el.innerHTML = logoImg('splashlogo');
    document.querySelector('.screen').appendChild(el);
    setTimeout(function () { el.classList.add('out'); }, 900);
    setTimeout(function () { el.remove(); }, 1400);
  }
  var SHEETS = {
    pay: { title: 'Оплата', text: 'Коммунальные услуги и обслуживание по кв. 104.', rows: [['К оплате', '[СУММА] ₸'], ['Период', '[МЕСЯЦ]']], cta: 'Оплатить' },
    docs: { title: 'Документы', text: 'Договоры, акты и квитанции по объекту.', rows: [['Договор ДДУ', 'PDF'], ['Акт приёма-передачи', 'PDF']], cta: 'Готово' },
    access: { title: 'Face ID / доступ', text: 'Управление доступом в подъезд, паркинг и на территорию.', rows: [['Подъезд Блок Б', 'Открыть'], ['Шлагбаум паркинга', 'Открыть'], ['Гостевой пропуск', 'Создать']], cta: 'Готово' },
    cams: { title: 'Камеры ЖК', text: 'Видеонаблюдение общих зон.', rows: [['Въезд в паркинг', 'Смотреть'], ['Детская площадка', 'Смотреть']], cta: 'Готово' },
    meters: { title: 'Счётчики', text: 'Передайте показания до [ДАТА] текущего месяца.', rows: [['Холодная вода', 'Ввести'], ['Горячая вода', 'Ввести'], ['Электричество', 'Ввести']], cta: 'Отправить показания' },
    staff: { title: 'Персонал объекта', text: 'Контакты сотрудников УК на вашем объекте.', rows: [['Менеджер объекта', 'Елена В.'], ['Охрана', 'Позвонить']], cta: 'Готово' },
    polls: { title: 'Опросы', text: 'Голосования собственников ЖК.', rows: [['Благоустройство двора', 'Голосовать']], cta: 'Готово' },
    reports: { title: 'Отчёты', text: 'Отчёты УК о расходах и выполненных работах.', rows: [['Отчёт за квартал', 'PDF']], cta: 'Готово' },
    chat: { title: 'Елена В.', text: 'Менеджер объекта — УК Эверест. Напишите вопрос, ответ придёт в уведомления.', rows: [], cta: 'Открыть чат' },
    promo7: { title: '7 героев. 7 квартир. Скидка 7%', text: 'Акция Everest Development от 16 сентября 2026. Условия уточняйте в отделе продаж.', rows: [['Отдел продаж', PHONE, TEL], ['WhatsApp', 'Написать', WA]], cta: 'Закрыть' },
    mortgage: { title: 'Партнёрская ипотека', text: 'Ипотека с Банком ЦентрКредит на квартиры Everest Development. Ставки и условия — у менеджера.', rows: [['Отдел продаж', PHONE, TEL], ['WhatsApp', 'Написать', WA]], cta: 'Закрыть' },
    storage: { title: 'Кладовые помещения', text: 'Кладовые в ЖК TURAR, Everest Boulevard и ARNA.', rows: [['Отдел продаж', PHONE, TEL], ['WhatsApp', 'Написать', WA]], cta: 'Закрыть' },
    contacts: { title: 'Everest Development', text: 'Отдел продаж: sales@ed.group. Короткий номер — 202.', rows: [['Позвонить', PHONE, TEL], ['WhatsApp', 'Написать', WA], ['Telegram', 'everest_development', 'https://t.me/everest_development'], ['Instagram', 'everest_development_kz', 'https://instagram.com/everest_development_kz']].concat(OFFICES.map(function (o, i) { return ['Офис ' + (i + 1), o]; })), cta: 'Закрыть' },
    notif: { title: 'Уведомления', text: 'Новые предложения Everest Development', rows: [['7 героев. 7 квартир. Скидка 7%', 'Новое'], ['Партнёрская ипотека ЦентрКредит', ''], ['Кладовые в TURAR, Boulevard, ARNA', '']], cta: 'Закрыть' }
  };

  // ---------- state ----------
  var S = {
    flat: 0, flatOpen: false,
    step: 'home', loc: 0, cat: 0, work: '', comment: '', extra: [], rated: {},
    q: '', cls: 0, status: 0, favOnly: false, favs: {}
  };
  try { var saved = JSON.parse(localStorage.getItem('everest') || '{}'); S.favs = saved.favs || {}; S.extra = saved.extra || []; } catch (e) {}
  function persist() { try { localStorage.setItem('everest', JSON.stringify({ favs: S.favs, extra: S.extra })); } catch (e) {} }

  var view = document.getElementById('view');
  var sheet = document.getElementById('sheet');
  var tabbar = document.getElementById('tabbar');

  function route() { return (location.hash.replace('#/', '') || 'main'); }

  // ---------- screens ----------
  function header(title, right) {
    return '<div class="between"><h1>' + title + '</h1>' + right + '</div>';
  }
  function addrAvatar() {
    return '<div class="row"><div class="addr">ЖК Everest,<br>Блок Б, кв. 104</div><div class="avatar">М</div></div>';
  }

  function Main() {
    var h = '<button class="logobtn" data-act="logo" aria-label="Сменить логотип">' + logoImg('logo') + '</button>' +
      '<div class="between" style="align-items:flex-start;margin-top:-8px"><div class="col" style="gap:6px"><h1>Главная</h1>' +
      '<button class="link gold" data-act="flat" style="font-size:16px;min-height:28px">' + esc(FLATS[S.flat]) + ' ' + ic('down', 16, 2) + '</button></div>' +
      '<div class="row"><button class="iconbtn" data-act="sheet" data-arg="notif" aria-label="Уведомления">' + ic('bell', 24) + '<span class="dot"></span></button><div class="avatar">М</div></div></div>';
    if (S.flatOpen) {
      h += '<div class="dropdown">' + FLATS.map(function (f, i) {
        return '<button data-act="pickflat" data-arg="' + i + '" class="' + (i === S.flat ? 'on' : '') + '"><span>' + esc(f) + '</span><span class="gold">' + (i === S.flat ? ic('check', 18, 2.2) : '') + '</span></button>';
      }).join('') + '</div>';
    }
    var promos = [['promo7', 'Скидка 7%', '7 героев. 7 квартир', '#3A3420,#1A2234'], ['mortgage', 'Ипотека', 'с Банком ЦентрКредит', '#36404F,#1A2234'], ['storage', 'Кладовые', 'TURAR · Boulevard · ARNA', '#2B3B4A,#15202F']];
    h += '<section class="col"><h2>Акции и спец-предложения</h2><div class="hs">' + promos.map(function (p) {
      return '<button class="promo" style="all:unset;box-sizing:border-box;cursor:pointer;flex:0 0 180px;height:120px;border-radius:18px;padding:12px;border:1px solid rgba(255,255,255,.12);display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;background:linear-gradient(160deg,' + p[3] + ')" data-act="sheet" data-arg="' + p[0] + '"><span class="chip sm">Акции</span><div><b>' + p[1] + '</b><span style="font-size:14px">' + p[2] + '</span></div></button>';
    }).join('') + '</div></section>';
    var onSale = JK.filter(function (j) { return j.st !== 'done'; }).length;
    h += '<section class="col"><a href="#/catalog" class="link" style="font-size:19px;font-weight:500">Каталог наших ЖК <span class="gold">' + ic('arrow', 18, 2) + '</span></a>' +
      '<a href="#/catalog" class="hero"><img src="' + JK[0].img + '" alt="" onerror="this.src=\'img/towers.jpg\'"><div class="t">Каталог<br>наших ЖК</div><div class="p"><span class="chip">' + JK.length + ' проектов</span><span class="chip">' + onSale + ' в продаже и скоро</span></div></a></section>';
    var stats = [['134 000+', 'м² жилья сдано'], ['3 068+', 'жителей получили ключи'], ['10+', 'проектов'], ['5 лет', 'на рынке']];
    h += '<section class="col"><h2>Everest Development в цифрах</h2><div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px">' + stats.map(function (x) {
      return '<div class="box" style="padding:12px 14px"><div class="gold" style="font-size:22px;font-weight:700">' + x[0] + '</div><div class="mut" style="font-size:13px">' + x[1] + '</div></div>';
    }).join('') + '</div></section>';
    var svc = [['wrench', 'Вызов мастера'], ['shield', 'Безопасность'], ['broom', 'Уборка'], ['truck', 'Доставка']];
    h += '<section class="col"><h2>Услуги</h2><div class="svc">' + svc.map(function (s) {
      return '<a href="#/services"><span>' + ic(s[0], 28, 1.7) + '</span>' + s[1] + '</a>';
    }).join('') + '</div></section>';
    var news = [['promo7', '16 сен 2026', '7 героев. 7 квартир. Скидка 7%'], ['mortgage', 'Ипотека', 'Партнёрская ипотека с Банком ЦентрКредит'], ['storage', 'Кладовые', 'Кладовые помещения в ЖК TURAR, Everest Boulevard и ARNA']];
    h += '<section class="col"><h2>Новости Everest Development</h2>' + news.map(function (n, i) {
      return '<button class="news" style="all:unset;box-sizing:border-box;cursor:pointer;border-radius:20px;padding:16px;background:' + (i ? 'var(--card)' : 'linear-gradient(135deg,#3A4A63 0%,#1C2840 70%)') + ';border:1px solid var(--line);display:flex;flex-direction:column;gap:8px" data-act="sheet" data-arg="' + n[0] + '"><div class="between"><span class="mut" style="font-size:12px">' + n[1] + '</span><span class="chip sm">Читать →</span></div><div style="font-size:' + (i ? 16 : 19) + 'px;font-weight:500;line-height:1.25">' + n[2] + '</div></button>';
    }).join('') + '</section>';
    h += '<button class="box row" style="all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;border-radius:18px;background:var(--card);border:1px solid var(--line);padding:14px" data-act="sheet" data-arg="contacts"><span class="gold">' + ic('staff', 28, 1.6) + '</span><div style="flex:1"><div style="font-size:16px;font-weight:600">Отдел продаж</div><div class="mut" style="font-size:13px">' + PHONE + ' · 5 офисов в Алматы</div></div><span class="gold">' + ic('arrow', 18, 2) + '</span></button>';
    return h;
  }

  function Home() {
    var tiles = [['pay', 'card', 'Оплата', ''], ['service', 'case', 'Заявка<br>в сервис', ''], ['docs', 'doc', 'Документы', 'blue'],
      ['access', 'face', 'Face ID /<br>доступ', ''], ['cams', 'cam', 'Камеры<br>ЖК', 'blue'], ['meters', 'meter', 'Счётчики', ''],
      ['staff', 'staff', 'Персонал<br>объекта', ''], ['polls', 'poll', 'Опросы', ''], ['reports', 'chart', 'Отчёты', 'blue']];
    var h = header('Мой дом', '<div class="row"><span class="tag">Собственник</span><div class="avatar">М</div></div>');
    h += '<button class="sel" data-act="toast" data-arg="Выбор объекта — в следующей версии">ЖК Everest, Блок Б, кв. 104 ' + ic('down', 16, 2) + '</button>';
    h += '<div class="tiles">' + tiles.map(function (t) {
      var act = t[0] === 'service' ? 'data-act="go" data-arg="services"' : 'data-act="sheet" data-arg="' + t[0] + '"';
      return '<button class="tile ' + t[3] + '" ' + act + '><span class="gold">' + ic(t[1], 34, 1.6) + '</span>' + t[2] + '</button>';
    }).join('') + '</div>';
    h += '<div class="box row"><div class="avatar" style="width:52px;height:52px;background:linear-gradient(145deg,#8A6E58,#4A3A30);border:0;font-size:18px">ЕВ</div>' +
      '<div style="flex:1;min-width:0"><div style="font-weight:600;font-size:16px">Менеджер объекта — ЖК</div><div class="mut" style="font-size:13px;margin-top:2px">Елена В. • УК Эверест</div></div>' +
      '<button class="side" data-act="sheet" data-arg="chat"><svg width="22" height="22" viewBox="0 0 24 24" fill="#E2BF6A" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>Написать<span class="mut" style="font-size:11px">Прямая связь</span></button></div>';
    h += '<div class="box row"><div style="flex:1"><div style="font-size:16px">Перейти в чат дома</div><div class="mut row" style="font-size:13px;margin-top:4px;gap:6px">WhatsApp / Telegram <span style="width:16px;height:16px;border-radius:50%;background:#25D366"></span><span style="width:16px;height:16px;border-radius:50%;background:#2AABEE"></span></div></div>' +
      '<button class="side gold" style="font-size:15px" data-act="sheet" data-arg="contacts">Войти →</button></div>';
    return h;
  }

  function Services() {
    var h = header('Услуги', addrAvatar());
    h += '<label class="field"><span class="mut">' + ic('search', 18, 2) + '</span><span class="sr">Поиск услуг</span><input placeholder="Поиск услуг..."></label>';
    var loc = LOCS[S.loc];
    if (S.step === 'home') {
      h += '<h2 style="font-size:17px;font-weight:600">Локация</h2><div class="grid3">' + LOCS.map(function (l, i) {
        return '<button class="card" style="height:92px;font-size:14px" data-act="loc" data-arg="' + i + '"><span class="ic">' + ic(l.icon, 30, 1.6) + '</span>' + l.name + '</button>';
      }).join('') + '</div>';
      var base = [{ title: 'Ремонт розетки', who: 'Мастер И.' }, { title: 'Устранение протечки', who: 'Мастер А.' }, { title: 'Настройка домофона', who: 'Мастер С.' }];
      var all = S.extra.concat(base);
      h += '<div class="box" style="background:#121B2F"><h2 style="font-size:17px;font-weight:600;margin-bottom:6px">История заявок</h2>' + all.map(function (r, i) {
        var live = r.live;
        var btn = live ? 'Отменить' : (S.rated[r.title] ? 'Спасибо!' : 'Оставить отзыв');
        var act = live ? 'data-act="cancel" data-arg="' + i + '"' : 'data-act="rate" data-arg="' + esc(r.title) + '"';
        return '<div class="hist"><span class="mut" style="width:18px;font-size:14px">' + (i + 1) + '.</span><div style="flex:1;min-width:0"><div style="font-size:15px">' + esc(r.title) + '</div><div class="mut" style="font-size:12px">' + esc(r.who) + ' · ' + (live ? '<span class="gold">В работе</span>' : 'Выполнена') + '</div></div><button ' + act + '>' + btn + '</button></div>';
      }).join('') + '</div>';
    } else if (S.step === 'form') {
      var cat = loc.cats[S.cat][0];
      var works = WORKS[cat] || ['Диагностика', 'Ремонт', 'Замена', 'Другое'];
      if (works.indexOf(S.work) < 0) S.work = works[0];
      var n = loc.cats.length;
      h += '<button class="locbar" data-act="back"><span class="gold">' + ic('left', 18, 2) + '</span><span style="flex:1">' + loc.name + '</span><span style="font-size:12px;color:#C9D0DC">Сменить</span></button>';
      h += '<div><div style="font-size:16px;font-weight:600">Все категории работ: <span class="gold">' + loc.name + '</span></div><div class="mut" style="font-size:13px;margin-top:2px">' + n + (n >= 5 ? ' категорий' : ' категории') + '</div></div>';
      h += '<div class="grid3">' + loc.cats.map(function (c, i) {
        return '<button class="card ' + (i === S.cat ? 'on' : '') + '" style="height:88px" data-act="cat" data-arg="' + i + '"><span class="ic">' + ic(c[1], 28, 1.6) + '</span>' + c[0] + '</button>';
      }).join('') + '</div>';
      h += '<label class="f">Выбор работы<select id="work">' + works.map(function (w) {
        return '<option' + (w === S.work ? ' selected' : '') + '>' + esc(w) + '</option>';
      }).join('') + '</select></label>';
      h += '<label class="f">Комментарий<textarea id="comment" rows="3" placeholder="Опишите проблему (например, подтекает кран)">' + esc(S.comment) + '</textarea></label>';
      h += '<button class="link mut" style="align-self:flex-end;font-size:13px;min-height:32px" data-act="toast" data-arg="Загрузка фото/видео — в следующей версии">' + ic('clip', 14, 2) + 'Прикрепить фото/видео</button>';
      h += '<button class="btn send" data-act="send">ОТПРАВИТЬ ЗАЯВКУ</button>';
    } else {
      var last = S.extra[0] || { title: '' };
      h += '<div class="done"><span style="width:64px;height:64px;border-radius:50%;background:rgba(226,191,106,.16);display:flex;align-items:center;justify-content:center" class="gold">' + ic('check', 32, 2.2) + '</span>' +
        '<h2 style="font-size:22px;font-weight:600">Заявка отправлена</h2><div class="mut" style="font-size:15px;line-height:1.45">' + esc(last.title) + ' (' + esc(last.who) + '). Мастер свяжется с вами, статус — в истории заявок.</div>' +
        '<button class="btn" style="padding:13px 22px" data-act="back">К услугам</button></div>';
    }
    return h;
  }

  function jkList() {
    var q = S.q.trim().toLowerCase();
    var list = JK.filter(function (d) {
      return (!q || (d.name + ' ' + d.addr + ' ' + d.near).toLowerCase().indexOf(q) >= 0) &&
        (!S.cls || d.cls === CLASSES[S.cls]) && (!S.status || d.st === STATUSES[S.status][1]) && (!S.favOnly || S.favs[d.id]);
    });
    if (!list.length) return '<div class="mut" style="padding:28px;text-align:center;border-radius:16px;border:1px dashed rgba(255,255,255,.2)">Ничего не найдено. Измените фильтры.</div>';
    return list.map(function (d) {
      var meta = [d.cls, STATUS[d.st] + (d.term && d.st !== 'done' ? ' · ' + d.term : ''), d.units].filter(Boolean);
      return '<div class="jk"><div class="ph" style="position:relative;height:190px;border-radius:14px;overflow:hidden;background:linear-gradient(135deg,#2B3A58,#141E33)"><img src="' + d.img + '" alt="' + esc(d.name) + '" loading="lazy" style="height:100%" onerror="this.remove()"><span class="chip sm" style="position:absolute;left:10px;top:10px">' + STATUS[d.st] + '</span></div>' +
        '<div class="between" style="padding:4px 8px 0;align-items:flex-start"><div><div style="font-size:19px;font-weight:500">' + esc(d.name) + '</div><div style="font-size:14px;color:#C9D0DC">' + esc(d.addr) + '</div><div class="gold" style="font-size:13px;margin-top:2px">' + esc(d.near) + '</div></div>' +
        '<button class="heart ' + (S.favs[d.id] ? 'on' : '') + '" data-act="fav" data-arg="' + d.id + '" aria-label="В избранное"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' + I.heart + '</svg></button></div>' +
        '<div class="meta" style="flex-wrap:wrap;gap:4px 10px;justify-content:flex-start">' + meta.map(function (m) { return '<span>' + esc(m) + '</span>'; }).join('<span style="opacity:.4">|</span>') + '</div>' +
        '<div class="row" style="margin:0 8px 6px;gap:8px"><button class="btn outline" style="flex:1" data-act="jk" data-arg="' + d.id + '">Подробнее</button><a class="btn" style="flex:1;padding:11px;border-radius:12px;font-size:14px" href="' + WA + '?text=' + encodeURIComponent('Здравствуйте! Интересует ' + d.name + '. Подскажите цены и планировки.') + '" target="_blank" rel="noopener">Узнать цену</a></div>' +
        '</div>';
    }).join('');
  }

  function Catalog() {
    var h = '<div class="between"><h1 style="font-weight:500">Каталог</h1><div class="addr" style="text-align:center">Everest<br>Development</div><button class="avatar" style="cursor:pointer;color:inherit" data-act="sheet" data-arg="contacts" aria-label="Контакты">' + ic('staff', 20) + '</button></div>';
    h += '<div class="row"><label class="field" style="flex:1"><span class="mut">' + ic('search', 18, 2) + '</span><span class="sr">Искать ЖК</span><input id="q" placeholder="Название, улица, ориентир" value="' + esc(S.q) + '"></label>' +
      '<button class="pill" style="height:46px;border-radius:12px;background:#1E2B43" data-act="clearq">' + (S.q ? 'Сброс' : 'Искать') + '</button></div>';
    h += '<div class="row" style="flex-wrap:wrap;gap:8px">' +
      '<button class="pill ' + (S.favOnly ? 'on' : '') + '" data-act="favonly">' + ic('heart', 16, 2) + 'Избранное</button>' +
      '<button class="pill ' + (S.cls ? 'on' : '') + '" data-act="cls">' + CLASSES[S.cls] + ' ' + ic('down', 14, 2) + '</button>' +
      '<button class="pill ' + (S.status ? 'on' : '') + '" data-act="status">' + STATUSES[S.status][0] + ' ' + ic('down', 14, 2) + '</button></div>';
    h += '<h2 style="font-size:22px">Проекты Everest Development</h2><div id="jklist" class="col" style="gap:14px">' + jkList() + '</div>';
    h += '<div class="mut" style="font-size:11px;line-height:1.4">Информация носит справочный характер и не является публичной офертой. Реализация начинается после получения разрешения на привлечение денег дольщиков согласно законодательству РК о долевом участии в жилищном строительстве.</div>';
    return h;
  }

  var SCREENS = { main: Main, home: Home, services: Services, catalog: Catalog };
  var TABS = [['main', 'home', 'Главная'], ['home', 'myhome', 'Мой дом'], ['services', 'wrench', 'Услуги'], ['catalog', 'map', 'Каталог']];

  function render(keepScroll) {
    var r = route();
    if (!SCREENS[r]) r = 'main';
    var top = view.scrollTop;
    view.innerHTML = SCREENS[r]();
    view.scrollTop = keepScroll ? top : 0;
    tabbar.innerHTML = TABS.map(function (t) {
      return '<a href="#/' + t[0] + '" class="' + (t[0] === r ? 'on' : '') + '">' + ic(t[1]) + t[2] + '</a>';
    }).join('');
  }

  function openSheet(k) {
    var s = typeof k === 'string' ? SHEETS[k] : k;
    sheet.innerHTML = '<div class="overlay"><div class="bg" data-act="close"></div><div class="panel" role="dialog" aria-label="' + esc(s.title) + '"><div class="grab"></div>' +
      '<div class="between"><h2 style="font-size:22px;font-weight:600">' + s.title + '</h2><button class="iconbtn" data-act="close" aria-label="Закрыть">' + ic('close', 20, 2) + '</button></div>' +
      '<div class="scrollin" style="display:flex;flex-direction:column;gap:10px;max-height:52vh;overflow-y:auto">' +
      (s.img ? '<img src="' + s.img + '" alt="" style="width:100%;height:170px;object-fit:cover;border-radius:14px;flex:none" onerror="this.remove()">' : '') +
      '<div class="mut" style="font-size:15px;line-height:1.45">' + s.text + '</div>' +
      s.rows.map(function (r) {
        var inner = '<span>' + r[0] + '</span><span class="gold" style="text-align:right">' + r[1] + '</span>';
        return r[2] ? '<a class="srow" href="' + r[2] + '" target="_blank" rel="noopener" style="gap:12px">' + inner + '</a>' : '<div class="srow" style="gap:12px">' + inner + '</div>';
      }).join('') + '</div>' +
      '<button class="btn" data-act="close">' + s.cta + '</button></div></div>';
  }
  function jkSheet(id) {
    var d = JK.filter(function (j) { return j.id === id; })[0];
    var rows = [['Класс', d.cls], ['Статус', STATUS[d.st]], ['Адрес', d.addr], ['Рядом', d.near]];
    if (d.term && d.st !== 'done') rows.push(['Срок сдачи', d.term]);
    if (d.units) rows.push(['Объём', d.units]);
    if (d.site) rows.push(['Сайт проекта', d.site, 'https://' + d.site]);
    rows.push(['Отдел продаж', PHONE, TEL]);
    openSheet({ title: d.name, img: d.img, text: d.note || 'Проект Everest Development в Алматы.', rows: rows, cta: 'Закрыть' });
  }

  var toastT;
  function toast(t) {
    var el = document.createElement('div');
    el.className = 'toast'; el.textContent = t;
    document.querySelector('.screen').appendChild(el);
    clearTimeout(toastT); toastT = setTimeout(function () { el.remove(); }, 1800);
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]');
    if (!el) return;
    var a = el.getAttribute('data-act'), arg = el.getAttribute('data-arg');
    switch (a) {
      case 'flat': S.flatOpen = !S.flatOpen; return render(true);
      case 'pickflat': S.flat = +arg; S.flatOpen = false; return render(true);
      case 'sheet': return openSheet(arg);
      case 'logo': return logoSheet();
      case 'picklogo': LOGO.id = arg; lsSet(LS_LOGO, arg); applyLogo(); render(true); return logoSheet();
      case 'logowhite': LOGO.white = !LOGO.white; lsSet(LS_WHITE, LOGO.white ? '1' : null); render(true); return logoSheet();
      case 'copylogo':
        var link = shareLink();
        if (navigator.clipboard) navigator.clipboard.writeText(link).then(function () { toast('Ссылка скопирована'); }, function () { prompt('Ссылка:', link); });
        else prompt('Ссылка:', link);
        return;
      case 'close': sheet.innerHTML = ''; return;
      case 'go': location.hash = '#/' + arg; return;
      case 'toast': return toast(arg);
      case 'loc': S.step = 'form'; S.loc = +arg; S.cat = 0; S.work = ''; S.comment = ''; return render();
      case 'cat': S.cat = +arg; S.work = ''; return render(true);
      case 'back': S.step = 'home'; return render();
      case 'send':
        S.extra.unshift({ title: S.work, who: LOCS[S.loc].name + ', ' + LOCS[S.loc].cats[S.cat][0], live: true });
        S.step = 'sent'; persist(); return render();
      case 'cancel': S.extra.splice(+arg, 1); persist(); toast('Заявка отменена'); return render(true);
      case 'rate': S.rated[arg] = true; toast('Спасибо за отзыв!'); return render(true);
      case 'fav': S.favs[arg] = !S.favs[arg]; persist(); return render(true);
      case 'favonly': S.favOnly = !S.favOnly; return render(true);
      case 'cls': S.cls = (S.cls + 1) % CLASSES.length; return render(true);
      case 'status': S.status = (S.status + 1) % STATUSES.length; return render(true);
      case 'jk': return jkSheet(arg);
      case 'clearq': S.q = ''; return render(true);
    }
  });
  document.addEventListener('input', function (e) {
    if (e.target.id === 'q') { S.q = e.target.value; var l = document.getElementById('jklist'); if (l) l.innerHTML = jkList(); }
    if (e.target.id === 'comment') S.comment = e.target.value;
  });
  document.addEventListener('change', function (e) {
    if (e.target.id === 'logofile' && e.target.files[0]) {
      var f = e.target.files[0];
      if (f.size > 1500000) { toast('Файл больше 1.5 МБ'); return; }
      var rd = new FileReader();
      rd.onload = function () {
        LOGO.custom = rd.result; LOGO.id = 'custom';
        if (!lsSet(LS_CUSTOM, rd.result)) toast('Не сохранится после перезагрузки');
        lsSet(LS_LOGO, 'custom'); applyLogo(); render(true); logoSheet();
      };
      rd.readAsDataURL(f);
      return;
    }
    if (e.target.id === 'work') S.work = e.target.value;
  });
  window.addEventListener('hashchange', function () { sheet.innerHTML = ''; S.flatOpen = false; render(); });

  applyLogo();
  render();
  splash();
})();
