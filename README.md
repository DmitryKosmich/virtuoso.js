# virtuoso.js

## Описание тега
Серверная сторона должна предоставлять данные в виде деревьев тегов в формате JSON.

####Общий пример:

HTML:
```
<span id="sc_addr_158957794" name="example" class="btn btn-success"
 style="color=#fff; background-color=#000;" onclick="helloWorld(event, 'sc_addr_358557793')">
    Example text
</span>
```

JSON:
```
{
    "name": "span",
    "text": "Example text",
    "attributes": [
        {
            "name": "id",
            "value": "sc_addr_158957794"
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
        { ... },
        { ... }
    ]
}
```
**Внимание:**
 - Атрибут id является обязательным атрибутом каждого тега.
 - Поле "classes" допускается, но не рекомендуется к использованию, так как это противоречит идее полного описания пользоветельского интерфейса в базе знаний.

####Дочерние теги:
Содержимое атрибута "text" может включать id дочерних тегов, заключенные в двойные фигурные скобки.
При динамической генерации страниц, это позволит указать место нахождения дочернего тега, если родительский имеет как "text", так и "children".
По умолчанию дочерние теги добавляются в конец "text"

HTML:
```
<span name="example">Example <a>link</a>text </span>
```

JSON:
```
{
    "name": "span",
    "text": "Example {{sc_addr_358557793}}text",

    ...

    "children": [
        {
            "name": "a"
            "text": "link",
            ...
        }
    ]
}
```

####Зачем нужен JSON?
Может возникнуть вопрос: зачем нужен промежуточный формат JSON, если можно сразу присылать на клиент HTML? Да, в данном случае JSON и HTML один в один накладываются друг на друга.
Но что если мы планируем отображать интерфейс (описанный в базе знаний) на устройстве, где для построения пользовательского интерфейса не используется HTML. В таком случае нам пришлось бы
разбирать HTML, что значительно сложнее чем JSON, так как JSON - один из наиболее популярных и удобных форматов для передачи данных на настояший момен.
Для его разбора существует множество библиотек практически для всех языков программирования.

Также может возникнуть следующий вопрос: почему именно такая структура выбрана для JSON. На мой взгляд в HTML используется наилучшая модель
описания пользовательских интерфесов. Она проверена временем, она универсальна и широко используется. Потому структура JSON сообщений в этом случае
опирается на HTML. К тому же пользователю данной структуры не придется изучать новый формат, новые свойства и атрибуты. HTML знают практически все,
 если нет, то всегда можно заглянуть в документацию.

####Заключение:
 - Одной из особенностей данного фреймворка является то, что весь пользовательский интерфейс может быть описан в базе знаний.
 Для этого должны использоваться поля "name", "text", "attributes", "style", "children". (отображение)
 - Также имеется возможность подключения внещних модулей (стилей), реализуемая через поле "classes".
 - Взаимодействие с пользователем (редактирование) осуществляется через поле "events".
 В котором содержится описание вызываемых методов и их параметры. Тела методов подключаются извне и реализуются на стороне клиета для каждой платформы.

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