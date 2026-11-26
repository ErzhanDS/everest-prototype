(function () {
  'use strict';

  var I = {
    dash: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
    req: '<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.5 2.5-2.5-.5-.5-2.5z"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0113 0"/><path d="M16 4.5a3.5 3.5 0 010 7M18 14a6 6 0 013.5 6"/>',
    building: '<rect x="5" y="3" width="14" height="18"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/>',
    news: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    bell: '<path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/>',
    master: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0114 0"/><path d="M9 4.5h6"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    ext: '<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    send: '<path d="M21 3L10 14M21 3l-7 18-4-7-7-4z"/>',
    refresh: '<path d="M20 11a8 8 0 10-2.3 5.7M20 4v7h-7"/>'
  };
  function ic(n, s) { return '<svg width="' + (s || 18) + '" height="' + (s || 18) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + I[n] + '</svg>'; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function $(id) { return document.getElementById(id); }

  var A = { reqTab: 'all', reqQ: '', reqJK: '', resQ: '', open: null, fresh: {} };
  var NAV = [
    ['dash', 'dash', 'Дашборд'], ['requests', 'req', 'Заявки'], ['residents', 'users', 'Жители'],
    ['masters', 'master', 'Мастера'], ['projects', 'building', 'Проекты (каталог)'], ['content', 'news', 'Акции и новости'], ['push', 'bell', 'Push-уведомления']
  ];
  var TITLES = {}; NAV.forEach(function (n) { TITLES[n[0]] = n[2]; });

  function route() { var r = location.hash.replace('#/', ''); return TITLES[r] ? r : 'dash'; }
  function logoSrc() {
    var id = null; try { id = localStorage.getItem('everest-logo'); } catch (e) {}
    if (id === 'custom') { try { return localStorage.getItem('everest-logo-custom') || '../img/logo-app.svg'; } catch (e) {} }
    return id === 'ed' || id === 'ed-blue' ? '../img/logos/ed-white.svg' : '../img/logo-app.svg';
  }
  function st(code) { return '<span class="st ' + code + '">' + (ED.REQ_STATUS[code] || ED.JK_STATUS[code] || code) + '</span>'; }
  function stars(n) { return n ? '<span class="stars">' + '★★★★★'.slice(0, n) + '<span style="opacity:.25">' + '★★★★★'.slice(n) + '</span></span>' : '<span class="mut">—</span>'; }
  function jkOf(flat) { return flat.split(',')[0]; }

  function toast(html) {
    var el = document.createElement('div'); el.className = 'toast'; el.innerHTML = html;
    $('toasts').appendChild(el); setTimeout(function () { el.remove(); }, 3500);
  }

  // ---------- chrome ----------
  function renderSide() {
    var r = route(), newCount = ED.requests().filter(function (x) { return x.status === 'new'; }).length;
    $('side').innerHTML = '<img class="logo" src="' + logoSrc() + '" alt="Логотип" onerror="this.src=\'../img/logo-app.svg\'"><div class="org">УК «Эверест» · админ-панель</div>' +
      NAV.map(function (n) {
        return '<a href="#/' + n[0] + '" class="' + (n[0] === r ? 'on' : '') + '">' + ic(n[1]) + n[2] + (n[0] === 'requests' && newCount ? '<span class="badge">' + newCount + '</span>' : '') + '</a>';
      }).join('') +
      '<div class="foot"><a href="../#/services" target="_blank" rel="noopener">' + ic('ext', 16) + 'Открыть приложение</a>Прототип. Данные хранятся в этом браузере.</div>';
  }
  function renderTop() {
    $('top').innerHTML = '<h1>' + TITLES[route()] + '</h1><span class="demo">Демо-данные</span><div class="sp"></div>' +
      '<button class="btn ghost sm" data-act="reset" title="Вернуть исходные демо-данные">' + ic('refresh', 16) + 'Сбросить</button>' +
      '<div class="who"><div class="ava">ЕВ</div><span>Елена В.<br><span class="mut sm">Менеджер объекта</span></span></div>';
  }

  // ---------- pages ----------
  function Dash() {
    var R = ED.requests();
    var cnt = function (s) { return R.filter(function (r) { return r.status === s; }).length; };
    var week = R.filter(function (r) { return r.status === 'done' && (Date.now() - new Date(r.created)) < 7 * 864e5; }).length;
    var rated = R.filter(function (r) { return r.rating; });
    var avg = rated.length ? (rated.reduce(function (a, r) { return a + r.rating; }, 0) / rated.length).toFixed(1) : '—';
    var h = '<div class="hint">' + ic('ext', 20) + '<div><b>Как показать связку:</b> откройте <a href="../#/services" target="_blank" rel="noopener">приложение</a> в соседней вкладке и отправьте заявку. Она появится здесь в разделе «Заявки». Назначьте мастера или смените статус, и приложение обновится. Акции, видимость ЖК и push-уведомления тоже уходят в приложение.</div></div>';
    h += '<div class="grid g4">' +
      kpi(cnt('new'), 'Новые заявки', 'ждут назначения мастера') +
      kpi(cnt('work'), 'В работе', 'назначен мастер') +
      kpi(week, 'Выполнено за 7 дней', 'из ' + R.length + ' заявок всего') +
      kpi(avg + (avg !== '—' ? ' ★' : ''), 'Средняя оценка', rated.length + ' отзывов жителей') + '</div>';
    // by day
    var days = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(); d.setDate(d.getDate() - i);
      var n = R.filter(function (r) { return new Date(r.created).toDateString() === d.toDateString(); }).length;
      days.push({ n: n, l: i === 0 ? 'Сегодня' : d.toLocaleDateString('ru-RU', { weekday: 'short' }), today: i === 0 });
    }
    var max = Math.max.apply(null, days.map(function (x) { return x.n; }).concat([1]));
    var cats = {};
    R.forEach(function (r) { cats[r.cat] = (cats[r.cat] || 0) + 1; });
    var catArr = Object.keys(cats).map(function (k) { return [k, cats[k]]; }).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 6);
    var cmax = catArr.length ? catArr[0][1] : 1;
    h += '<div class="grid g21"><div class="card"><h2>Заявки за 7 дней</h2><div class="bars">' + days.map(function (x) {
      return '<div class="bar' + (x.today ? ' today' : '') + '"><b>' + x.n + '</b><i style="height:' + Math.round(x.n / max * 110) + 'px"></i><span>' + x.l + '</span></div>';
    }).join('') + '</div></div>' +
      '<div class="card"><h2>По категориям</h2>' + catArr.map(function (c) {
        return '<div class="hbar"><span>' + esc(c[0]) + '</span><div><i style="width:' + Math.round(c[1] / cmax * 100) + '%"></i></div><b>' + c[1] + '</b></div>';
      }).join('') + '</div></div>';
    h += '<div class="card" style="padding:0"><div class="between" style="padding:16px 18px"><h2 style="margin:0">Последние заявки</h2><a class="btn ghost sm" href="#/requests">Все заявки</a></div>' + reqTable(R.slice(0, 6), true) + '</div>';
    var pubs = ED.content().filter(function (c) { return c.published; }).length;
    h += '<div class="grid g3">' +
      kpi(ED.jk().length + ' / ' + ED.JK_BASE.length, 'Проектов в каталоге приложения', '<a href="#/projects">Управлять каталогом</a>') +
      kpi(pubs, 'Опубликовано акций и новостей', '<a href="#/content">Редактировать</a>') +
      kpi(ED.notifs().length, 'Push-уведомлений отправлено', '<a href="#/push">Новое уведомление</a>') + '</div>';
    return h;
  }
  function kpi(v, l, d) { return '<div class="card kpi"><div class="v">' + v + '</div><div class="l">' + l + '</div><div class="d">' + d + '</div></div>'; }

  function reqTable(list, compact) {
    if (!list.length) return '<div class="mut" style="padding:30px;text-align:center">Заявок не найдено</div>';
    return '<div class="tw" style="' + (compact ? 'border:0;border-top:1px solid var(--line);border-radius:0 0 14px 14px' : '') + '"><table><thead><tr><th>№</th><th>Создана</th><th>Житель / объект</th><th>Локация · категория</th><th>Работа</th><th>Мастер</th><th>Статус</th>' + (compact ? '' : '<th>Оценка</th>') + '</tr></thead><tbody>' +
      list.map(function (r) {
        var m = ED.master(r.master);
        return '<tr class="click' + (A.fresh[r.id] ? ' fresh' : '') + '" data-act="openreq" data-arg="' + r.id + '"><td><b>' + r.id + '</b></td><td class="mut" style="white-space:nowrap">' + ED.fmtDate(r.created) + '</td>' +
          '<td><div style="font-weight:500">' + esc(r.resident) + (r.flat === ED.MY_FLAT ? '<span class="me">с телефона</span>' : '') + '</div><div class="mut sm">' + esc(r.flat) + '</div></td>' +
          '<td>' + esc(r.loc) + ' · ' + esc(r.cat) + '</td><td>' + esc(r.work) + '</td><td>' + (m ? esc(m.name) : '<span class="mut">не назначен</span>') + '</td><td>' + st(r.status) + '</td>' +
          (compact ? '' : '<td>' + stars(r.rating) + '</td>') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  function Requests() {
    var R = ED.requests();
    var tabs = [['all', 'Все'], ['new', 'Новые'], ['work', 'В работе'], ['done', 'Выполнены'], ['cancel', 'Отменены']];
    var jks = []; R.forEach(function (r) { var j = jkOf(r.flat); if (jks.indexOf(j) < 0) jks.push(j); });
    var q = A.reqQ.toLowerCase();
    var list = R.filter(function (r) {
      return (A.reqTab === 'all' || r.status === A.reqTab) && (!A.reqJK || jkOf(r.flat) === A.reqJK) &&
        (!q || (r.id + ' ' + r.resident + ' ' + r.flat + ' ' + r.work + ' ' + r.cat + ' ' + r.comment).toLowerCase().indexOf(q) >= 0);
    });
    var h = '<div class="between" style="flex-wrap:wrap"><div class="tabs">' + tabs.map(function (t) {
      var n = t[0] === 'all' ? R.length : R.filter(function (r) { return r.status === t[0]; }).length;
      return '<button class="tab' + (A.reqTab === t[0] ? ' on' : '') + '" data-act="reqtab" data-arg="' + t[0] + '">' + t[1] + ' <b>' + n + '</b></button>';
    }).join('') + '</div><div class="row" style="flex-wrap:wrap">' +
      '<select class="input" id="reqjk" style="width:auto"><option value="">Все объекты</option>' + jks.map(function (j) { return '<option' + (A.reqJK === j ? ' selected' : '') + '>' + esc(j) + '</option>'; }).join('') + '</select>' +
      '<label class="search"><span class="mut">' + ic('search', 16) + '</span><span class="sr">Поиск</span><input id="reqq" placeholder="№, житель, работа…" value="' + esc(A.reqQ) + '"></label></div></div>';
    h += '<div id="reqlist">' + reqTable(list) + '</div>';
    return h;
  }

  function reqDrawer(id) {
    var r = ED.requests().filter(function (x) { return x.id === id; })[0];
    if (!r) return closeDrawer();
    A.open = id;
    var opts = '<option value="">— не назначен —</option>' + ED.MASTERS.map(function (m) { return '<option value="' + m.id + '"' + (r.master === m.id ? ' selected' : '') + '>' + esc(m.name) + ' — ' + esc(m.spec) + '</option>'; }).join('');
    var tl = ['<div><i></i><span>Создана жителем · ' + ED.fmtDate(r.created) + '</span></div>'];
    if (r.master) tl.push('<div><i></i><span>Назначен: ' + esc(ED.master(r.master).name) + '</span></div>');
    if (r.status === 'done') tl.push('<div><i style="background:var(--done)"></i><span>Выполнена' + (r.rating ? ' · оценка жителя ' + r.rating + '/5' : '') + '</span></div>');
    if (r.status === 'cancel') tl.push('<div><i style="background:var(--cancel)"></i><span>Отменена</span></div>');
    $('drawer').innerHTML = '<div class="ovl" data-act="closedrawer"></div><aside class="drawer" role="dialog" aria-label="Заявка ' + r.id + '">' +
      '<div class="hd between"><div><div class="mut sm">Заявка</div><h2 style="font-size:20px">№' + r.id + ' · ' + esc(r.work) + '</h2></div><button class="btn ghost sm" data-act="closedrawer" aria-label="Закрыть">' + ic('close', 16) + '</button></div>' +
      '<div class="bd"><div>' + st(r.status) + '</div>' +
      '<dl class="kv"><dt>Житель</dt><dd>' + esc(r.resident) + '</dd><dt>Объект</dt><dd>' + esc(r.flat) + '</dd><dt>Телефон</dt><dd>' + esc(r.phone) + '</dd>' +
      '<dt>Локация</dt><dd>' + esc(r.loc) + '</dd><dt>Категория</dt><dd>' + esc(r.cat) + '</dd><dt>Создана</dt><dd>' + ED.fmtDate(r.created) + '</dd><dt>Оценка</dt><dd>' + stars(r.rating) + '</dd></dl>' +
      (r.comment ? '<div><div class="mut sm" style="margin-bottom:6px">Комментарий жителя</div><div class="quote">' + esc(r.comment) + '</div></div>' : '') +
      '<label class="f">Исполнитель<select class="input" id="assign">' + opts + '</select></label>' +
      '<div><div class="mut sm" style="margin-bottom:8px">История</div><div class="timeline">' + tl.join('') + '</div></div></div>' +
      '<div class="ft">' +
      (r.status === 'new' || r.status === 'work' ? '<button class="btn" data-act="setst" data-arg="done">Отметить выполненной</button>' : '') +
      (r.status === 'done' || r.status === 'cancel' ? '<button class="btn ghost" data-act="setst" data-arg="work">Вернуть в работу</button>' : '') +
      (r.status !== 'cancel' && r.status !== 'done' ? '<button class="btn danger" data-act="setst" data-arg="cancel">Отменить</button>' : '') +
      '<a class="btn ghost" href="tel:" style="margin-left:auto">' + ic('phone', 16) + 'Позвонить</a></div></aside>';
  }
  function closeDrawer() { A.open = null; $('drawer').innerHTML = ''; }

  function Residents() {
    var seen = {}, list = [];
    ED.requests().forEach(function (r) {
      var k = r.resident + r.flat; if (seen[k]) { seen[k].n++; return; }
      seen[k] = { name: r.resident, flat: r.flat, phone: r.phone, n: 1, role: /Отдел/.test(r.resident) ? 'Сотрудник' : (r.id % 3 ? 'Собственник' : 'Арендатор') };
      list.push(seen[k]);
    });
    var q = A.resQ.toLowerCase();
    var f = list.filter(function (x) { return !q || (x.name + x.flat + x.phone).toLowerCase().indexOf(q) >= 0; });
    var h = '<div class="between" style="flex-wrap:wrap"><label class="search"><span class="mut">' + ic('search', 16) + '</span><span class="sr">Поиск</span><input id="resq" placeholder="Имя, объект, телефон" value="' + esc(A.resQ) + '"></label>' +
      '<button class="btn" data-act="invite">' + ic('plus', 16) + 'Пригласить жителя</button></div>';
    h += '<div class="tw"><table><thead><tr><th>Житель</th><th>Объект</th><th>Телефон</th><th>Роль</th><th>Заявок</th><th>В приложении</th></tr></thead><tbody>' +
      f.map(function (x) {
        return '<tr><td><div class="row"><div class="ava" style="width:30px;height:30px;font-size:11px">' + esc(x.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2)) + '</div><b>' + esc(x.name) + '</b></div></td><td>' + esc(x.flat) + '</td><td class="mut">' + esc(x.phone) + '</td><td>' + x.role + '</td><td>' + x.n + '</td><td><span class="st done">Активен</span></td></tr>';
      }).join('') + '</tbody></table></div>';
    return h;
  }

  function Masters() {
    var R = ED.requests();
    return '<div class="grid g3">' + ED.MASTERS.map(function (m) {
      var mine = R.filter(function (r) { return r.master === m.id; });
      var act = mine.filter(function (r) { return r.status === 'work'; }).length;
      var done = mine.filter(function (r) { return r.status === 'done'; }).length;
      var rt = mine.filter(function (r) { return r.rating; });
      var avg = rt.length ? (rt.reduce(function (a, r) { return a + r.rating; }, 0) / rt.length).toFixed(1) + ' ★' : '—';
      return '<div class="card"><div class="row" style="margin-bottom:14px"><div class="ava">' + esc(m.name.split(' ').map(function (w) { return w[0]; }).join('').slice(0, 2)) + '</div><div><b>' + esc(m.name) + '</b><div class="mut sm">' + esc(m.spec) + '</div></div></div>' +
        '<div class="grid g3" style="gap:8px;text-align:center"><div><div style="font-size:22px;font-weight:700">' + act + '</div><div class="mut sm">в работе</div></div><div><div style="font-size:22px;font-weight:700">' + done + '</div><div class="mut sm">выполнено</div></div><div><div style="font-size:22px;font-weight:700">' + avg + '</div><div class="mut sm">оценка</div></div></div>' +
        (act ? '<div style="margin-top:14px;display:flex;flex-direction:column;gap:6px">' + mine.filter(function (r) { return r.status === 'work'; }).map(function (r) { return '<button class="btn ghost sm" style="justify-content:space-between" data-act="openreq" data-arg="' + r.id + '"><span>№' + r.id + ' · ' + esc(r.work) + '</span>' + st('work') + '</button>'; }).join('') + '</div>' : '') +
        '</div>';
    }).join('') + '</div>';
  }

  function Projects() {
    var all = ED.jkAll();
    var h = '<div class="hint">' + ic('building', 20) + '<div>Скрытые проекты не показываются в каталоге приложения. Статус и срок сдачи меняются сразу у всех жителей.</div></div>';
    h += '<div class="tw"><table><thead><tr><th></th><th>Проект</th><th>Класс</th><th>Адрес</th><th>Статус</th><th>Срок сдачи</th><th>В каталоге</th></tr></thead><tbody>' +
      all.map(function (j) {
        return '<tr><td><span class="thumb" style="overflow:hidden"><img src="' + j.img + '" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block" onerror="this.remove()"></span></td><td><b>' + esc(j.name) + '</b><div class="mut sm">' + esc(j.near) + '</div></td><td>' + esc(j.cls) + '</td><td class="mut">' + esc(j.addr) + '</td>' +
          '<td><select class="input" data-jk="' + j.id + '" data-field="st" style="width:auto">' + Object.keys(ED.JK_STATUS).map(function (k) { return '<option value="' + k + '"' + (j.st === k ? ' selected' : '') + '>' + ED.JK_STATUS[k] + '</option>'; }).join('') + '</select></td>' +
          '<td><input class="input" data-jk="' + j.id + '" data-field="term" value="' + esc(j.term) + '" placeholder="напр. IV кв. 2027" style="width:150px"></td>' +
          '<td><button class="sw' + (j.hidden ? '' : ' on') + '" data-act="jkvis" data-arg="' + j.id + '" aria-label="Показывать в каталоге"></button></td></tr>';
      }).join('') + '</tbody></table></div>';
    return h;
  }
  function setJK(id, patch) {
    var o = ED.jkOverrides(); o[id] = o[id] || {};
    for (var k in patch) o[id][k] = patch[k];
    ED.set('jk', o);
  }

  function Content() {
    var C = ED.content();
    var h = '<div class="between"><div class="mut">Опубликованные материалы появляются на главном экране приложения: в карусели «Акции» и в ленте новостей.</div><button class="btn" data-act="newcontent">' + ic('plus', 16) + 'Добавить</button></div>';
    h += '<div class="grid g3">' + C.map(function (c) {
      return '<div class="card" style="display:flex;flex-direction:column;gap:10px"><div class="between"><span class="st ' + (c.published ? 'done' : 'cancel') + '">' + (c.published ? 'Опубликовано' : 'Черновик') + '</span><span class="mut sm">' + new Date(c.date).toLocaleDateString('ru-RU') + '</span></div>' +
        '<div><div style="font-size:18px;font-weight:700">' + esc(c.title) + '</div><div class="mut">' + esc(c.sub) + '</div></div><div style="font-size:13px;line-height:1.45">' + esc(c.text) + '</div>' +
        '<div class="row" style="margin-top:auto;padding-top:8px"><button class="sw' + (c.published ? ' on' : '') + '" data-act="pub" data-arg="' + c.id + '" aria-label="Опубликовано"></button><span class="sm mut">В приложении</span><span style="flex:1"></span>' +
        '<button class="btn ghost sm" data-act="editcontent" data-arg="' + c.id + '">' + ic('edit', 14) + 'Изменить</button><button class="btn danger sm" data-act="delcontent" data-arg="' + c.id + '" aria-label="Удалить">' + ic('trash', 14) + '</button></div></div>';
    }).join('') + '</div>';
    return h;
  }
  function contentModal(id) {
    var c = ED.content().filter(function (x) { return x.id === id; })[0] || { id: '', kind: 'promo', title: '', sub: '', full: '', text: '', date: new Date().toISOString().slice(0, 10), published: true };
    $('modal').innerHTML = '<div class="ovl" data-act="closemodal"></div><form class="modal" id="cform"><div class="between"><h2 style="font-size:18px">' + (id ? 'Редактировать' : 'Новая акция / новость') + '</h2><button type="button" class="btn ghost sm" data-act="closemodal" aria-label="Закрыть">' + ic('close', 16) + '</button></div>' +
      '<input type="hidden" name="id" value="' + esc(c.id) + '">' +
      '<div class="grid g2" style="gap:12px"><label class="f">Заголовок на карточке<input class="input" name="title" required value="' + esc(c.title) + '" placeholder="Скидка 7%"></label><label class="f">Подзаголовок<input class="input" name="sub" value="' + esc(c.sub) + '" placeholder="на кладовые"></label></div>' +
      '<label class="f">Заголовок новости<input class="input" name="full" value="' + esc(c.full) + '" placeholder="Полный заголовок для ленты новостей"></label>' +
      '<label class="f">Текст<textarea class="input" name="text" rows="4">' + esc(c.text) + '</textarea></label>' +
      '<div class="grid g2" style="gap:12px"><label class="f">Дата<input class="input" type="date" name="date" value="' + esc(c.date) + '"></label><label class="f">Показывать<select class="input" name="kind"><option value="promo"' + (c.kind === 'promo' ? ' selected' : '') + '>В акциях и новостях</option><option value="news"' + (c.kind === 'news' ? ' selected' : '') + '>Только в новостях</option></select></label></div>' +
      '<label class="row" style="font-weight:500"><input type="checkbox" name="published"' + (c.published ? ' checked' : '') + '> Опубликовать в приложении</label>' +
      '<div class="row" style="justify-content:flex-end"><button type="button" class="btn ghost" data-act="closemodal">Отмена</button><button class="btn" type="submit">Сохранить</button></div></form>';
  }

  function Push() {
    var N = ED.notifs();
    var audiences = ['Все жители'].concat(ED.jkAll().filter(function (j) { return j.st === 'done'; }).map(function (j) { return 'Жители ' + j.name; }));
    var h = '<div class="grid g2"><form class="card" id="pform" style="display:flex;flex-direction:column;gap:14px"><h2 style="margin:0">Новое уведомление</h2>' +
      '<label class="f">Кому<select class="input" name="audience">' + audiences.map(function (a) { return '<option>' + esc(a) + '</option>'; }).join('') + '</select></label>' +
      '<label class="f">Заголовок<input class="input" name="title" id="ptitle" required maxlength="60" placeholder="Плановое отключение воды"></label>' +
      '<label class="f">Текст<textarea class="input" name="text" id="ptext" rows="3" maxlength="160" placeholder="27 ноября с 10:00 до 14:00 в блоке Б"></textarea></label>' +
      '<div class="row"><button class="btn gold" type="submit">' + ic('send', 16) + 'Отправить</button><span class="mut sm">Придёт в колокольчик приложения</span></div></form>' +
      '<div class="card"><h2>Как увидит житель</h2><div class="phone"><div class="pn"><div class="ic"><img src="../img/icon-ed-192.png" alt=""></div><div style="min-width:0"><div class="row" style="justify-content:space-between;font-size:12px;opacity:.7"><span>EVEREST</span><span>сейчас</span></div><div style="font-weight:600;font-size:14px" id="pvt">Заголовок уведомления</div><div style="font-size:13px;opacity:.85" id="pvx">Текст уведомления</div></div></div></div></div></div>';
    h += '<div class="card" style="padding:0"><div style="padding:16px 18px"><h2 style="margin:0">Отправленные</h2></div><div class="tw" style="border:0;border-top:1px solid var(--line);border-radius:0 0 14px 14px"><table><thead><tr><th>Дата</th><th>Заголовок</th><th>Текст</th><th>Кому</th><th>Статус</th></tr></thead><tbody>' +
      N.map(function (n) { return '<tr><td class="mut" style="white-space:nowrap">' + ED.fmtDate(n.date) + '</td><td><b>' + esc(n.title) + '</b></td><td>' + esc(n.text) + '</td><td>' + esc(n.audience) + '</td><td>' + (n.read ? '<span class="st done">Прочитано</span>' : '<span class="st new">Доставлено</span>') + '</td></tr>'; }).join('') +
      '</tbody></table></div></div>';
    return h;
  }

  var PAGES = { dash: Dash, requests: Requests, residents: Residents, masters: Masters, projects: Projects, content: Content, push: Push };
  function render() {
    renderSide(); renderTop();
    $('content').innerHTML = PAGES[route()]();
    if (A.open) reqDrawer(A.open);
  }

  // ---------- events ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-act]'); if (!el) return;
    var a = el.getAttribute('data-act'), arg = el.getAttribute('data-arg');
    switch (a) {
      case 'openreq': return reqDrawer(+arg);
      case 'closedrawer': return closeDrawer();
      case 'setst': ED.updateRequest(A.open, { status: arg }); toast('Заявка №' + A.open + ': <b>' + ED.REQ_STATUS[arg] + '</b>'); return render();
      case 'reqtab': A.reqTab = arg; return render();
      case 'jkvis': var j = ED.jkAll().filter(function (x) { return x.id === arg; })[0]; setJK(arg, { hidden: !j.hidden }); toast(j.hidden ? 'Проект показан в каталоге' : 'Проект скрыт из каталога'); return render();
      case 'pub': var C = ED.content(); C.forEach(function (c) { if (c.id === arg) c.published = !c.published; }); ED.saveContent(C); return render();
      case 'newcontent': return contentModal('');
      case 'editcontent': return contentModal(arg);
      case 'delcontent': if (!confirm('Удалить материал?')) return; ED.saveContent(ED.content().filter(function (c) { return c.id !== arg; })); toast('Удалено'); return render();
      case 'closemodal': $('modal').innerHTML = ''; return;
      case 'invite': return toast('Приглашение: житель получит SMS со ссылкой на приложение (в прототипе не отправляется)');
      case 'reset': if (!confirm('Вернуть исходные демо-данные? Заявки, акции и уведомления, созданные в демо, будут удалены.')) return; ED.reset(); closeDrawer(); toast('Демо-данные сброшены'); return render();
    }
  });
  document.addEventListener('input', function (e) {
    var t = e.target;
    if (t.id === 'reqq') { A.reqQ = t.value; var keep = t.selectionStart; render(); var n = $('reqq'); n.focus(); n.setSelectionRange(keep, keep); }
    if (t.id === 'resq') { A.resQ = t.value; var k2 = t.selectionStart; render(); var n2 = $('resq'); n2.focus(); n2.setSelectionRange(k2, k2); }
    if (t.id === 'ptitle') $('pvt').textContent = t.value || 'Заголовок уведомления';
    if (t.id === 'ptext') $('pvx').textContent = t.value || 'Текст уведомления';
  });
  document.addEventListener('change', function (e) {
    var t = e.target;
    if (t.id === 'reqjk') { A.reqJK = t.value; return render(); }
    if (t.id === 'assign') {
      var r = ED.requests().filter(function (x) { return x.id === A.open; })[0];
      var patch = { master: t.value };
      if (t.value && r.status === 'new') patch.status = 'work';
      ED.updateRequest(A.open, patch);
      toast(t.value ? 'Назначен <b>' + esc(ED.master(t.value).name) + '</b>, заявка в работе' : 'Исполнитель снят');
      return render();
    }
    if (t.dataset && t.dataset.jk) {
      var p = {}; p[t.dataset.field] = t.value; setJK(t.dataset.jk, p); toast('Сохранено, каталог в приложении обновлён');
    }
  });
  document.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = e.target, d = new FormData(f);
    if (f.id === 'cform') {
      var C = ED.content(), id = d.get('id');
      var item = { id: id || 'c' + Date.now(), kind: d.get('kind'), title: d.get('title'), sub: d.get('sub'), full: d.get('full') || d.get('title'), text: d.get('text'), date: d.get('date'), published: !!d.get('published') };
      if (id) C = C.map(function (c) { return c.id === id ? item : c; }); else C.unshift(item);
      ED.saveContent(C); $('modal').innerHTML = ''; toast(item.published ? 'Опубликовано в приложении' : 'Сохранено как черновик'); return render();
    }
    if (f.id === 'pform') {
      var N = ED.notifs();
      N.unshift({ id: Date.now(), title: d.get('title'), text: d.get('text'), date: new Date().toISOString(), audience: d.get('audience'), read: false });
      ED.saveNotifs(N); toast('Уведомление <b>отправлено</b>'); return render();
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); $('modal').innerHTML = ''; } });

  // Живое обновление: заявка из приложения в соседней вкладке
  var known = {}; ED.requests().forEach(function (r) { known[r.id] = 1; });
  window.addEventListener('storage', function (e) {
    if (!e.key || e.key.indexOf('ed.') !== 0) return;
    if (e.key === 'ed.requests') {
      ED.requests().forEach(function (r) {
        if (!known[r.id]) { known[r.id] = 1; A.fresh[r.id] = 1; toast('Новая заявка <b>№' + r.id + '</b>: ' + esc(r.work)); }
      });
    }
    var active = document.activeElement;
    if (active && /INPUT|TEXTAREA|SELECT/.test(active.tagName) && !$('drawer').innerHTML) return;
    render();
  });
  window.addEventListener('hashchange', function () { closeDrawer(); render(); window.scrollTo(0, 0); });
  render();
})();
