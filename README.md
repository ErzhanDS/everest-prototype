# Everest App — прототип (PWA)

Статический сайт без сборки и зависимостей: `index.html`, `app.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `img/`.
Экраны: `#/main`, `#/home`, `#/services`, `#/catalog`.
На компьютере открывается в рамке телефона, на телефоне — на весь экран, можно «Добавить на экран Домой».

Локально: `python3 -m http.server 8000` → http://localhost:8000

## Netlify Drop
app.netlify.com/drop → перетащить папку `everest-site` → получить ссылку `*.netlify.app`.

## GitHub Pages
```bash
cd everest-site
git init && git add . && git commit -m "Everest prototype"
gh repo create everest-prototype --public --source=. --push
gh api -X POST repos/{owner}/everest-prototype/pages -f "source[branch]=main" -f "source[path]=/"
```
Ссылка: https://<логин>.github.io/everest-prototype/

## Свой сервер (nginx)
```bash
scp -r everest-site root@SERVER_IP:/var/www/everest
```
```nginx
server {
    listen 80;
    server_name everest.example.kz;
    root /var/www/everest;
    index index.html;
    location = /sw.js { add_header Cache-Control "no-cache"; }
}
```
Потом `certbot --nginx -d everest.example.kz` — PWA и установка на экран работают только по HTTPS.

## Обновление
После правок поменяйте `CACHE = 'everest-v1'` в `sw.js` на `v2`, чтобы у пользователей подтянулась новая версия.
