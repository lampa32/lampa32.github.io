server {
    listen 80;
    server_name lampa.run.place; # Замените на ваше доменное имя

    location / {
        proxy_pass http://localhost:3000; # Замените порт, если сервер работает на другом порту
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
