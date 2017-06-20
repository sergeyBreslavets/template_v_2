# template_v_2.5
# bootstrap jq  gulp
# сборка front-end проекта
```
how install?

npm install 
bower update

```
gulp task
```
gulp  -- одна команда и все 
gulp watch - просто запустить watch
gulp build
gulp webserver  
gulp sprites
gulp html:build
gulp js:build
gulp style:build
gulp fonts:build
gulp fontsbs:build
gulp image:build
```
Описание:
20.06.2017  обновил пакеты

Сборка front-end проекта.

Для работы требуеться nodejs.
node -v 4.5.0 
на windows требуется поставить mingw или другую анологичную консоль типо bash.

Шаблон для быстрого старта npm + bower + gulp  + bootstrap3  
для работы встроеного сервера сконфигурируй имя (browserSync) в gulpfile.js; 

var config = {
    server: {
        baseDir: "./www"
    },
    tunnel: true,
    host: 'templ',  - имя хоста 
    port: 8080,
    logPrefix: "Frontend" - ваше имя в консоле 
};



первое при установке 
npm install 
могут быть ошибки на windows не хватает прав запускаем консольот имени администратора
ошибки могут быть, но на работу это не влияет, некоторые пакеты просто не ставиться (

bower update
для установки bower на windows требуется поставить mingw или другую анологичную консоль типо bash. (пользуюсь консолью от git) 
стандартная консоль не ставит

