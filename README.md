# virtuoso.js

## Описание тега
Одной из особенностей данного фреймворка является то, что весь пользовательский интерфейс может быть описан в базе знаний.
Серверная сторона должна предоставлять данные в виде деревьев тегов в формате JSON.
Пример описания тега:

HTML:
```
<span id="sc_addr_158957794" name="example" class="btn btn-success" style="color=#fff; background-color=#000;" onclick="helloWorld(event, 'sc_addr_358557793')">
    Example text
</span>
```

JSON:
```
<tag0> = {
    "name": "span",                // По умолчанию "div"
    "test": "Example text",        // По умолчанию ""
    "attributes": [
        {
            "name": "id",                    // Обязательный атрибут
            "value": "sc_addr_158957794"     // всех тегов!
        },
        {
            "name": "name",
            "value": "example"
        }
    ],
    "classes": [
        "btn",
        "btn-success"
    ],
    "styles": [
        {
            "name": "color",
            "value": "#fff"
        },
        {
            "name": "background-color",
            "value": "#000"
        }
    ],
    "events": [
        {
            "name": "onclick",
            "value": {
                "name": "helloWorld",
                "params": [
                    "sc_addr_358557793"
                ]
            }
        }
    ],
    "children": [
        <tag1>,
        <tag2>,
        <tag3>,
    ]
}
```

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