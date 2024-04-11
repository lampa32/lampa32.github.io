(function () {
    'use strict';
    Lampa.Platform.tv();

  function applyCustomStyles() {
      var styles = "\n      \n        .full-person.focus {\n            background-color: #c22222;\n            color: #fff;\n        }\n        .full-descr__tag.focus {\n            background-color: #c22222;\n            color: #fff;\n        }\n    \n      \n        .full-start {padding: 0 1.5em;display: -webkit-box;display: -webkit-flex;display: -moz-box;display: -ms-flexbox;display: flex;-webkit-box-orient: vertical;-webkit-box-direction: normal;-webkit-flex-direction: column;-moz-box-orient: vertical;-moz-box-direction: normal;-ms-flex-direction: column;flex-direction: column;position: relative;}\n        \n        .wrap__left {\n            width: 15em;\n            padding-top: 4em;\n            flex-shrink: 0;\n            margin-left: -15em;\n            z-index: 2;\n            position: relative;\n        \n        \n            background-image: none; /* \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u0440\u043E\u0433\u043E \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0444\u043E\u043D\u0430 */\n        }\n        \n        /* \u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u0441\u0442\u0438\u043B\u0438, \u0435\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u043E \u0441\u0442\u0438\u043B\u0438\u0437\u043E\u0432\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u044B \u0432\u043D\u0443\u0442\u0440\u0438 .wrap__left */\n        .wrap__left h1,\n        .wrap__left h2,\n        .wrap__left p {\n            color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 */\n        }\n        \n        .wrap__left a {\n            color: #e50914; /* \u041A\u0440\u0430\u0441\u043D\u044B\u0439 \u0446\u0432\u0435\u0442 \u0441\u0441\u044B\u043B\u043E\u043A, \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u043D\u044B\u0439 \u0434\u043B\u044F Netflix */\n            text-decoration: none; /* \u0423\u0431\u0438\u0440\u0430\u0435\u043C \u043F\u043E\u0434\u0447\u0435\u0440\u043A\u0438\u0432\u0430\u043D\u0438\u0435 */\n        }\n        \n        /* \u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u044D\u0444\u0444\u0435\u043A\u0442\u043E\u0432 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 \u0434\u043B\u044F \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0441\u0442\u0438 */\n        .wrap__left a:hover,\n        .wrap__left a:focus {\n            text-decoration: underline; /* \u041F\u043E\u0434\u0447\u0435\u0440\u043A\u0438\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 */\n            color: #b20710; /* \u0422\u0435\u043C\u043D\u043E-\u043A\u0440\u0430\u0441\u043D\u044B\u0439 \u0446\u0432\u0435\u0442 \u043F\u0440\u0438 \u043D\u0430\u0432\u0435\u0434\u0435\u043D\u0438\u0438 */\n        }\n     \n        \n        .wrap {\n            display: -webkit-box;\n            display: -webkit-flex;\n            display: -ms-flexbox;\n            display: flex;\n            position: relative;\n            z-index: 10;\n            background-color: #121212bf;\n        }\n        \n        body.glass--style .selectbox-item.focus,\nbody.glass--style .settings-folder.focus,\nbody.glass--style .settings-param.focus {\n    background-color: #c22222;\n    color: #fff;\n}\n        \n        \n        \n        \n        \n        \n        .head {\n          position: fixed;\n        top: 0;\n          left: 0;\n          width: 100%;\n          z-index: 15;\n        \n          color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0446\u0432\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u0430 */\n        }\n        \n        .head__body {\n        \n          display: flex;\n          align-items: center;\n        \n        }\n        \n        .head__logo-icon {\n          width: 10em;\n          flex-shrink: 0;\n        }\n        \n        @media screen and (max-width: 580px) {\n          .head__logo-icon {\n            margin-right: 1em;\n          }\n          .head__logo-icon + .head__split {\n            display: none;\n          }\n        }\n        \n        .head__split {\n        //   background: url(../img/icons/split.svg) no-repeat 50% 50%;\n          background-size: contain;\n          width: 1em;\n          height: 1.3em;\n          margin: 0 1em;\n         opacity: 0.80;\n        }\n        \n        .head__actions {\n          display: flex;\n           opacity: 0.80;\n        }\n        \n      \n        \n        .head__logo {\n          margin-right: 1em;\n          width: 5.6em;\n        }\n        \n     \n        \n        .head__title {\n          font-size: 1.7em;\n          margin-left: 0.3em;\n          font-weight: 300;\n          margin-right: auto;\n          white-space: nowrap;\n          overflow: hidden;\n          text-overflow: ellipsis;\n          line-height: 1.2;\n        }\n        \n        .head__action {\n          width: 2.8em;\n          height: 2.8em;\n          border-radius: 100%;\n          display: flex;\n          align-items: center;\n          justify-content: center;\n          padding: 0.6em;\n          margin-left: 1.5em;\n          flex-shrink: 0;\n          background-color: transparent; /* \u0424\u043E\u043D\u043E\u0432\u044B\u0439 \u0446\u0432\u0435\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 */\n        \n        }\n        \n        .head__action.focus {\n          background-color: #c22222;\n          color: #fff;\n        }\n        \n        .head__action.active {\n          position: relative;\n        }\n        \n        \n        \n        .head__time {\n          display: flex;\n          white-space: nowrap;\n          margin-top: -0.2em;\n           opacity: 0.80;\n                 width: 12em;\n        \n        }\n        \n        .head__time-now {\n          font-weight: 600;\n          font-size: 2em;\n          line-height: 0.9;\n          margin-right: 0.5em;\n          color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0446\u0432\u0435\u0442 \u0434\u043B\u044F \u0432\u0440\u0435\u043C\u0435\u043D\u0438 */\n        }\n        \n        .head__time-date, .head__time-week {\n          font-size: 0.9em;\n          line-height: 1;\n          color: #ddd; /* \u0421\u0432\u0435\u0442\u043B\u043E-\u0441\u0435\u0440\u044B\u0439 \u0446\u0432\u0435\u0442 \u0434\u043B\u044F \u0434\u0430\u0442\u044B \u0438 \u0434\u043D\u044F \u043D\u0435\u0434\u0435\u043B\u0438 */\n        }\n        \n       \n        .menu__item.focus, .menu__item.traverse, .menu__item.hover {\n        background-color: #fff0;\n        color: #fff;\n        }\n        \n        \n        .menu__item.focus, .menu__item.traverse, .menu__item.hover {\n      background: #c22222;\n        color: #fff;\n        }\n        \n        .menu__item.focus .menu__ico path[fill],\n        .menu__item.focus .menu__ico rect[fill],\n        .menu__item.focus .menu__ico circle[fill], .menu__item.traverse .menu__ico path[fill],\n        .menu__item.traverse .menu__ico rect[fill],\n        .menu__item.traverse .menu__ico circle[fill], .menu__item.hover .menu__ico path[fill],\n        .menu__item.hover .menu__ico rect[fill],\n        .menu__item.hover .menu__ico circle[fill] {fill: #fff;}\n        \n        \n        .menu__split {\n          margin: 1em 1em;\n          width: 2.3em;\n          border-top: 2px solid rgba(255, 255, 255, 0.1); /* \u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C */\n        }\n        \n        .menu__list {\n          margin: 0;\n          list-style: none; /* \u0423\u0434\u0430\u043B\u0435\u043D\u0438\u0435 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0445 \u043C\u0430\u0440\u043A\u0435\u0440\u043E\u0432 \u0441\u043F\u0438\u0441\u043A\u0430 */\n          padding-left: 0em;\n        }\n        \n        .menu__item {\n          display: flex;\n          align-items: center;\n          color: #ddd; /* \u0421\u0432\u0435\u0442\u043B\u043E-\u0441\u0435\u0440\u044B\u0439 \u0446\u0432\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u0430 */\n          position: relative;\n          \n              border-radius: 0em 15em 14em 0em;\n        }\n        \n        .menu__item.focus .menu__ico [stroke], .menu__item.traverse .menu__ico [stroke], .menu__item.hover .menu__ico [stroke] {\n            stroke: #fff;\n        }\n        .menu__item.focus .menu__ico > img, .menu__item.traverse .menu__ico > img, .menu__item.hover .menu__ico > img {\n         -webkit-filter: inone; \n         filter: none;\n         color: white;}\n        .menu__item.focus .menu__ico [stroke], .menu__item.traverse .menu__ico [stroke], .menu__item.hover .menu__ico [stroke] {\n        stroke: #fff;\n        }\n        .menu__item + li {\n          margin-top: 0.1em;\n        }\n        \n        \n        \n        .menu__item.focus:after, .menu__item:hover:after {\n          display: block;\n        }\n        \n        .menu__ico {\n          margin-right: 1.5em;\n          width: 1.5em;\n          height: 1.5em;\n          flex-shrink: 0;\n        }\n        \n        .menu__ico > img {\n          width: 100%;\n          height: 100%;\n        }\n        \n        .menu__text {\n          font-size: 1.4em;\n          font-weight: 300;\n          line-height: 1.2;\n          margin-top: -0.1em;\n          color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0446\u0432\u0435\u0442 \u0442\u0435\u043A\u0441\u0442\u0430 \u0434\u043B\u044F \u043B\u0443\u0447\u0448\u0435\u0439 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u0438 */\n        }\n        \n        \n        \n        \n        \n        body.selectbox--open .selectbox__layer {\n            display: block;\n            // background-color: rgba(20, 20, 20, 0.9);\n            -webkit-backdrop-filter: blur(0.5em);\n            backdrop-filter: blur(0.5em);\n        }     \n        \n        \n        \n        .settings {\n          position: fixed;\n          top: 0;\n          right: 0;\n          z-index: 20;\n        }\n        \n        .settings__layer {\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 100%;\n            display: none;\n            // background-color: rgba(20, 20, 20, 0.9);\n            -webkit-backdrop-filter: blur(0.5em);\n            backdrop-filter: blur(0.5em);\n            transition: backdrop-filter 0.5s ease; /* \u041F\u043B\u0430\u0432\u043D\u0430\u044F \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F */\n          }\n          \n    \n          \n        .modal {\n            position: fixed;\n            top: 0;\n            left: 0;\n            // background-color: rgba(0, 0, 0, 0.3);\n             padding: 1.5em;\n            z-index: 50;\n            -webkit-backdrop-filter: blur(0.5em);\n            backdrop-filter: blur(0.5em);\n            transition: backdrop-filter 0.5s ease; /* \u041F\u043B\u0430\u0432\u043D\u0430\u044F \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u044F */\n          }\n          \n\n\n\n        .settings__content {\n          position: fixed;\n          top: 0;\n          right: -100%;\n          transition: right 0.3s;\n        //   background: rgba(38, 40, 41, 0.95); /* \u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0444\u043E\u043D \u0441 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u0438\u043C \u043E\u0442\u0442\u0435\u043D\u043A\u043E\u043C */\n          width: 35%;\n          display: flex;\n          flex-direction: column;\n         \n        }\n        \n        \n        \n        .settings__head {\n          flex-shrink: 0;\n          padding: 2em;\n          padding-bottom: 0;\n        }\n        \n        .settings__body {\n          flex-grow: 1;\n          display: flex;\n        }\n        \n        .settings__body > * {\n          width: 100%;\n        }\n        \n        \n        \n        .settings-param-title > span {\n          font-size: 1.2em;\n          font-weight: 600;\n          color: #6f6f6f;\n        }\n        \n        .settings-input {\n          position: fixed;\n          top: 0;\n          left: 0;\n          right: 0;\n          bottom: 0;\n          display: flex;\n          z-index: 21;\n          background: rgba(0, 0, 0, 0.6); /* \u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0447\u0435\u0440\u043D\u044B\u0439 \u0444\u043E\u043D */\n          backdrop-filter: blur(5px); /* \u042D\u0444\u0444\u0435\u043A\u0442 \u0440\u0430\u0437\u043C\u044B\u0442\u0438\u044F */\n        }\n        \n        \n        .settings-input__input {\n          font-size: 2.1em;\n          margin-bottom: 1em;\n          min-height: 2.3em;\n          border-bottom: 2px solid #4e4e4e;\n          padding: 0.6em 0;\n          background: transparent; /* \u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0444\u043E\u043D \u0434\u043B\u044F \u043F\u043E\u043B\u044F \u0432\u0432\u043E\u0434\u0430 */\n        //   color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 */\n        }\n        \n        \n        \n        \n        \n        .full-descr__tag {\n          background-color: rgba(255, 255, 255, 0.1); /* \u041F\u043E\u043B\u0443\u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439 \u0431\u0435\u043B\u044B\u0439 \u0444\u043E\u043D \u0434\u043B\u044F \u0442\u0435\u0433\u043E\u0432 */\n          color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 */\n        }\n        \n        .full-descr__tag.focus {\n          background-color: #fff; /* \u0411\u0435\u043B\u044B\u0439 \u0444\u043E\u043D \u0434\u043B\u044F \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0442\u0435\u0433\u0430 */\n          color: #000; /* \u0427\u0435\u0440\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 */\n        }\n        \n  \n        \n  \n        \n   \n        \n        \n        \n        \n        \n        \n        \n        .search-source {\n            display: none; /* \u043F\u043E\u043B\u043D\u043E\u0435 \u0441\u043A\u0440\u044B\u0442\u0438\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u0430 */\n        }\n        \n        \n        .extensions {\n          background-color: #141414; /* \u0422\u0435\u043C\u043D\u044B\u0439 \u0444\u043E\u043D, \u043A\u0430\u043A \u0432 Netflix */\n          color: #e5e5e5; /* \u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442, \u043A\u0430\u043A \u0432 Netflix */\n        }\n        \n        /* \u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0440\u0430\u0437\u043C\u044B\u0442\u0438\u0435 \u0434\u043B\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432, \u043F\u043E\u044F\u0432\u043B\u044F\u044E\u0449\u0438\u0445\u0441\u044F \u043F\u043E\u0432\u0435\u0440\u0445 */\n        .element-overlay {\n          backdrop-filter: blur(10px);\n        }\n        \n        /* \u0418\u0437\u043C\u0435\u043D\u044F\u0435\u043C \u0441\u0442\u0438\u043B\u0438 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u0438 \u0442\u0435\u043A\u0441\u0442\u0430 \u0434\u043B\u044F \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0438\u044F \u0441\u0442\u0438\u043B\u044E Netflix */\n        .extensions__head-title, .extensions__block-title, .extensions__item-name, .extensions__item-descr {\n          color: #e5e5e5; /* \u0421\u0432\u0435\u0442\u043B\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 */\n        }\n        \n        .extensions__item, .extensions__block-add, .extensions__block-empty {\n          background-color: #181818; /* \u0422\u0435\u043C\u043D\u044B\u0439 \u0444\u043E\u043D \u0434\u043B\u044F \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432, \u043A\u0430\u043A \u0432 Netflix */\n        }\n        \n        .extensions__item-author, .extensions__item-status, .extensions__item-disabled {\n          color: #8d8d8d; /* \u0421\u0435\u0440\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u0438 */\n        }\n        \n        \n        \n        \n    \n        \n        \n        \n        \n        \n        .tmdb-text {\n          background: -webkit-linear-gradient(66.47deg, rgb(192, 254, 207) -15.94%, rgb(30, 213, 169) 62.41%);\n          -webkit-background-clip: text;\n          color: transparent; /* \u0414\u0435\u043B\u0430\u0435\u0442 \u0442\u0435\u043A\u0441\u0442 \u043F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u043C */\n              font-weight: bold;\n        }\n        \n        \n        \n        \n        \n        \n        \n        .full-start__button.focus {\n               \n                    background: #c22222;\n                    color: white;\n                  \n                    background-size: 200% 200%;\n                    animation: gradientAnimation 5s ease infinite;\n        }\n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        \n        .logo-container {\n            display: flex;\n            align-items: center;\n        }\n        \n        .movie-logo {\n            max-width: 10em;\n            font-size: 4em;\n            max-height: 2.85em;\n            display: flex;\n        }\n        \n        \n        \n        \n        \n        \n        .new-line {\n            display: block;\n            margin-bottom: 1em;\n        }\n        \n        .new-interface .card--small.card--wide {\n            width: 18.3em;\n        }\n        \n        .new-interface-info {\n             position: relative;\n            display: flex;\n            flex-direction: column;\n            padding: 1.5em;\n            height: 20em;\n            justify-content: flex-end;\n        }\n        \n        .new-interface-info__body {\n        \n            width: 80%;\n            padding-top: 1.1em;\n        }\n        \n        .new-interface-info__head {\n            color: rgba(255, 255, 255, 0.6);\n            margin-bottom: 1em;\n            font-size: 1.3em;\n            min-height: 1em;\n                position: absolute;\n            top: 1em;\n        }\n        \n        .new-interface-info__head span {\n            color: #fff;\n        }\n        .new-interface-info__title {\n       //     font-size: 4em;\n            font-weight: 600;\n            margin-bottom: 0.2em;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            margin-left: -0.03em;\n            line-height: 1.3;\n            display: flex;\n            align-items: center;\n            /* \u0414\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u043C \u0441\u0442\u0438\u043B\u044C \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0430 \u043D\u0430 \u0432\u0442\u043E\u0440\u0443\u044E \u0441\u0442\u0440\u043E\u043A\u0443 */\n            white-space: pre-line;\n        }\n        .new-interface-info__title span {\n            font-family: 'Druk Start Bold', sans-serif; /* \u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u043C \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0439 \u0448\u0440\u0438\u0444\u0442 */\n        }\n        \n        \n        .new-interface-info__details {\n            display: flex;\n            align-items: center;\n            flex-wrap: wrap;\n            min-height: 1.9em;\n            font-size: 1.1em;\n        }\n        \n        .new-interface-info__split {\n            margin: 0 1em;\n            font-size: 0.7em;\n        }\n        \n        .new-interface-info__description {\n            font-size: 1.2em;\n            font-weight: 300;\n            line-height: 1.5;\n            overflow: hidden;\n            text-overflow: ellipsis;\n            display: -webkit-box;\n            -webkit-line-clamp: 2;\n            line-clamp: 4;\n            -webkit-box-orient: vertical;\n            width: 70%;\n        }\n        \n        .new-interface .card-more__box {\n            padding-bottom: 95%;\n        }\n        \n        .new-interface .full-start__background {\n            height: 108%;\n            top: -6em;\n        }\n        \n        .new-interface .full-start__rate {\n            font-size: 2em;\n            margin-right: 0;\n        }\n        \n        .new-interface .card__promo {\n            display: none;\n        }\n        \n        .new-interface .card.card--wide+.card-more .card-more__box {\n            padding-bottom: 95%;\n        }\n        \n        .new-interface .card.card--wide .card-watched {\n            display: none !important;\n        }\n        \n        body.light--version .new-interface-info__body {\n            width: 69%;\n            padding-top: 1.5em;\n        }\n        \n        body.light--version .new-interface-info {\n            height: 25.3em;\n        }\n        \n        \n        \n        \n                @keyframes gradientAnimation {\n                    0% { background-position: 0% 50%; }\n                    50% { background-position: 100% 50%; }\n                    100% { background-position: 0% 50%; }\n                }\n        \n                .ambi {\n                    font-size: 2.2em;\n                    display: inline-block;\n                    text-shadow: 0 0 1em red;\n                    font-weight: bold;\n                    background: #c22222;\n                    color: transparent;\n                    background-clip: text;\n                    -webkit-background-clip: text;\n                    background-size: 200% 200%;\n                    animation: gradientAnimation 5s ease infinite;\n                }\n        \n        \n        \n        \n                // .full-start__buttons {\n                //     display: flex;\n                //     flex-direction: row;\n                // }\n                \n                // .view--online {\n                //     order: 1; /* \u041F\u0435\u0440\u0432\u044B\u0439 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 */\n                // }\n                \n                // .view--torrent {\n                //     order: 2; /* \u0412\u0442\u043E\u0440\u043E\u0439 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 */\n                // }\n        \n                // .view--trailer {\n                //     order: 3; /* \u0412\u0442\u043E\u0440\u043E\u0439 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 */\n                // }\n        \n                // .button--otzyv {\n                //     order: 4; /* \u0412\u0442\u043E\u0440\u043E\u0439 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 */\n                // }\n                // .button--book {\n                //     order: 5; /* \u0412\u0442\u043E\u0440\u043E\u0439 \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 */\n                // }\n        \n                .movie-card {\n                    position: relative;\n                    background-position: top;\n                    background-repeat: no-repeat;\n                    background-size: cover;\n                    padding-top: 160%;\n                    border-radius: $border-radius;\n                    margin-bottom: 1rem;\n                }\n                \n                .movie-card .btn {\n                    position: absolute;\n                    top: 50%;\n                    left: 50%;\n                    transform: translate(-50%, -50%) scale(0);\n                    transition: transform 0.3s ease, box-shadow 0.3s ease;\n                }\n                \n                .movie-card::before {\n                    content: \"\";\n                    position: absolute;\n                    top: 0;\n                    left: 0;\n                    bottom: 0;\n                    right: 0;\n                    background-color: $black;\n                    opacity: 0;\n                    transition: opacity 0.3s ease;\n                    border-radius: $border-radius;\n                }\n                \n                @media (hover: hover) and (pointer: fine) {\n                    .movie-card:hover::before {\n                        opacity: 0.8;\n                    }\n                \n                    .movie-card:hover .btn {\n                        transform: translate(-50%, -50%) scale(1);\n                    }\n                }\n        \n        \n        \n        \n           ";
      var styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      styleElement.appendChild(document.createTextNode(styles));
      document.head.appendChild(styleElement);
    }
    applyCustomStyles();
})();
