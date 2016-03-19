# timeslist-api-access

TIMESLIST の API アクセスを提供します。

see more about TIMESLIST API: https://timeslist.com/WCM0400/input/

## 使い方 - Usage

```js
var TimeslistApi = require('timeslist-api-access'),
    timeslistApi = new TimeslistApi(conf.user_id, conf.user_pw);

// 所属プロジェクト情報取得
timeslistApi.project({
    'offset': 0, // リストのオフセット
    'limit': 10, // リストの取得数
    'param1': 12345, // アカウントユーザーNO
    'param2': 'project_id', // プロジェクトID
    'param3': 12345, // プロジェクトNO
    'param4': 1 // 表示フラグ
},function(res, json, status, headers){
	console.log(res);
});
```


## ライセンス - License

MIT License


## 作者 - Author

- (C)Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>
