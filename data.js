/* Общие данные прототипа Everest: приложение (/) и админка (/admin/).
   Хранятся в localStorage браузера, поэтому изменения в админке сразу видны в приложении
   (на одном устройстве / в одном браузере). Сброс: ED.reset(). */
(function () {
  'use strict';
  var ST = 'https://ed.group/storage/';
  var JK_BASE = [
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

  var JK_STATUS = { build: 'Строится', sale: 'В продаже', done: 'Сдан', soon: 'Скоро' };
  var REQ_STATUS = { new: 'Новая', work: 'В работе', done: 'Выполнена', cancel: 'Отменена' };
  var MASTERS = [
    { id: 'i', name: 'Мастер И.', spec: 'Электрик' },
    { id: 'a', name: 'Мастер А.', spec: 'Сантехник' },
    { id: 's', name: 'Мастер С.', spec: 'Слаботочные системы' },
    { id: 'b', name: 'Мастер Б.', spec: 'Универсал' },
    { id: 'k', name: 'Служба клининга', spec: 'Уборка' }
  ];
  var MY_FLAT = 'ЖК Everest, Блок Б, кв. 104';

  function daysAgo(d, h) { var t = new Date(); t.setDate(t.getDate() - d); t.setHours(h || 10, (d * 17) % 60, 0, 0); return t.toISOString(); }

  // Демо-данные (условные жители, для показа админки)
  function seedRequests() {
    return [
      { id: 1048, created: daysAgo(0, 9), flat: 'ЖК Everest, Блок А, кв. 12', resident: 'Айгерим С.', phone: '+7 701 *** 12 40', loc: 'Квартира', cat: 'Электричество', work: 'Не работает свет', comment: 'В коридоре не горит свет после замены лампы', status: 'new', master: '' },
      { id: 1047, created: daysAgo(0, 8), flat: 'ЖК Everest Boulevard, кв. 57', resident: 'Данияр М.', phone: '+7 777 *** 08 15', loc: 'Паркинг', cat: 'Шлагбаум', work: 'Ремонт', comment: 'Шлагбаум не открывается с пульта', status: 'work', master: 'b' },
      { id: 1046, created: daysAgo(1, 16), flat: 'ЖК Turar, дом 7, кв. 88', resident: 'Ольга В.', phone: '+7 705 *** 33 02', loc: 'Подъезд', cat: 'Лифт', work: 'Диагностика', comment: 'Лифт останавливается между этажами', status: 'work', master: 's' },
      { id: 1045, created: daysAgo(1, 11), flat: 'ЖК Everest, Блок В, кв. 203', resident: 'Ерлан Т.', phone: '+7 702 *** 71 19', loc: 'Квартира', cat: 'Сантехника', work: 'Устранение засора', comment: '', status: 'done', master: 'a', rating: 5 },
      { id: 1044, created: daysAgo(2, 14), flat: 'ЖК Arna, кв. 31', resident: 'Гульнара Ж.', phone: '+7 708 *** 45 60', loc: 'Двор', cat: 'Освещение', work: 'Ремонт', comment: 'Не горят фонари у детской площадки', status: 'new', master: '' },
      { id: 1043, created: daysAgo(3, 10), flat: 'ЖК Everest Boulevard, кв. 112', resident: 'Тимур К.', phone: '+7 747 *** 90 27', loc: 'Подъезд', cat: 'Уборка', work: 'Другое', comment: 'Строительный мусор после ремонта соседей', status: 'done', master: 'k', rating: 4 },
      { id: 1042, created: daysAgo(4, 18), flat: MY_FLAT, resident: 'Мадина (вы)', phone: '+7 700 *** 11 22', loc: 'Квартира', cat: 'Домофон', work: 'Настройка домофона', comment: '', status: 'done', master: 's', rating: 0 },
      { id: 1041, created: daysAgo(6, 12), flat: MY_FLAT, resident: 'Мадина (вы)', phone: '+7 700 *** 11 22', loc: 'Квартира', cat: 'Сантехника', work: 'Устранение протечки', comment: 'Подтекает под раковиной', status: 'done', master: 'a', rating: 0 },
      { id: 1040, created: daysAgo(8, 15), flat: MY_FLAT, resident: 'Мадина (вы)', phone: '+7 700 *** 11 22', loc: 'Квартира', cat: 'Электричество', work: 'Ремонт розетки', comment: '', status: 'done', master: 'i', rating: 0 },
      { id: 1039, created: daysAgo(9, 9), flat: 'ЖК Premier (шоурум)', resident: 'Отдел продаж', phone: 'внутр.', loc: 'Дом/фасад', cat: 'Фасад', work: 'Диагностика', comment: 'Проверка подсветки фасада', status: 'cancel', master: '' }
    ];
  }
  function seedContent() {
    return [
      { id: 'promo7', kind: 'promo', title: 'Скидка 7%', sub: '7 героев. 7 квартир', full: '7 героев. 7 квартир. Скидка 7%', text: 'Акция Everest Development от 16 сентября 2026. Условия уточняйте в отделе продаж.', date: '2026-09-16', published: true },
      { id: 'mortgage', kind: 'promo', title: 'Ипотека', sub: 'с Банком ЦентрКредит', full: 'Партнёрская ипотека с Банком ЦентрКредит', text: 'Ипотека с Банком ЦентрКредит на квартиры Everest Development. Ставки и условия — у менеджера.', date: '2026-06-01', published: true },
      { id: 'storage', kind: 'promo', title: 'Кладовые', sub: 'TURAR · Boulevard · ARNA', full: 'Кладовые помещения в ЖК TURAR, Everest Boulevard и ARNA', text: 'Кладовые в ЖК TURAR, Everest Boulevard и ARNA.', date: '2026-06-01', published: true }
    ];
  }
  function seedNotifs() {
    return [
      { id: 1, title: '7 героев. 7 квартир. Скидка 7%', text: 'Новая акция Everest Development', date: daysAgo(2, 12), audience: 'Все жители', read: false }
    ];
  }

  var P = 'ed.';
  function get(k, seed) {
    try { var v = localStorage.getItem(P + k); if (v) return JSON.parse(v); } catch (e) {}
    var d = seed ? seed() : null; if (d !== null) set(k, d); return d;
  }
  function set(k, v) { try { localStorage.setItem(P + k, JSON.stringify(v)); } catch (e) {} }

  var ED = {
    ST: ST, JK_BASE: JK_BASE, JK_STATUS: JK_STATUS, REQ_STATUS: REQ_STATUS, MASTERS: MASTERS, MY_FLAT: MY_FLAT,
    get: get, set: set,
    // Проекты с правками из админки (скрыть, сменить статус/срок)
    jkOverrides: function () { return get('jk', function () { return {}; }); },
    jkAll: function () {
      var o = ED.jkOverrides();
      return JK_BASE.map(function (j) { var x = {}; for (var k in j) x[k] = j[k]; var ov = o[j.id] || {}; for (var k2 in ov) x[k2] = ov[k2]; return x; });
    },
    jk: function () { return ED.jkAll().filter(function (j) { return !j.hidden; }); },
    requests: function () { return get('requests', seedRequests); },
    saveRequests: function (r) { set('requests', r); },
    addRequest: function (r) {
      var all = ED.requests();
      r.id = all.reduce(function (m, x) { return Math.max(m, x.id); }, 1000) + 1;
      r.created = new Date().toISOString(); r.status = 'new'; r.master = '';
      all.unshift(r); ED.saveRequests(all); return r;
    },
    updateRequest: function (id, patch) {
      var all = ED.requests();
      all.forEach(function (r) { if (r.id === id) for (var k in patch) r[k] = patch[k]; });
      ED.saveRequests(all);
    },
    content: function () { return get('content', seedContent); },
    saveContent: function (c) { set('content', c); },
    notifs: function () { return get('notifs', seedNotifs); },
    saveNotifs: function (n) { set('notifs', n); },
    master: function (id) { return MASTERS.filter(function (m) { return m.id === id; })[0]; },
    reset: function () { ['requests', 'content', 'notifs', 'jk'].forEach(function (k) { try { localStorage.removeItem(P + k); } catch (e) {} }); },
    fmtDate: function (iso) {
      var d = new Date(iso), now = new Date();
      var hm = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
      var days = Math.floor((new Date(now.toDateString()) - new Date(d.toDateString())) / 864e5);
      if (days === 0) return 'Сегодня, ' + hm;
      if (days === 1) return 'Вчера, ' + hm;
      return d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' }) + ', ' + hm;
    }
  };
  window.ED = ED;
})();
