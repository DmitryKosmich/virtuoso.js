# virtuoso.js

## Установка проекта

####Установка Node.js
[http://nodejs.org/download/]

####Установка Gulp.js
[http://gulpjs.com/] Менеджер выполнения задач JavaScript. Может быть установлен с помощью пакетного менеджера NPM,
необходимо установить глобально, выполнив команду:
```
$ npm install -g gulp
```

####Установка JSDoc
[https://www.npmjs.com/package/jsdoc] API для генерации документации JavaScript. Необходимо установить глобально, выполнив команду:
```
$ npm install -g jsdoc
```

####Установка библиотек и зависимостей
В корневой директории проекта необходимо выполнить команду:
```
$ npm install
```

## Доступные Gulp команды
gulp - стандартная команда для запуска проекта. При ее выполнении происходит проверка JavaScript кода на ошибки, объединение
всех JavaScript файлов в один, сжатие(минификация) полученного файла. Минифицированная и полная версия файла сохраняется в директории "dist".
Устонавливается режим "Watch". Gulp отслеживает изменения в проекте и выполняет вышеуказанные задачи заново.

```
$ gulp
```

gulp test - происходит запуск unit-тестов

```
$ gulp test
```

gulp doc - происходит генерация документации. Она сохраняется в директории "out"

```
$ gulp doc
```