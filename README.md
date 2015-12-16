## Менеджер заметок

#### Настройка

Помимо настройки виртуального окружения и установки зависимостей для python, также требуется установить node и bower зависимости:

```shell
npm install
bower install
```

Таблицы стилей создаются при помощи [sass](http://sass-lang.com/) (синтаксис scss), в режиме разработки запускается задача gulp watch, которая отслеживает изменения в каталоге src/scc и записывает в один css файл.

```shell
gulp watch
```

Front-end реализован с помощью [angularjs](https://angularjs.org/).
В качестве основы для стилей использованы [bootstrap](http://getbootstrap.com/) и [bootstrap-material-design](https://fezvrasta.github.io/bootstrap-material-design/).


