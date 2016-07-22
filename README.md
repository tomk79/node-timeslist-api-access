# timeslist-api-access

TIMESLIST の API アクセスを提供します。

see more about TIMESLIST API: https://timeslist.com/WCM0400/input/

## インストール - Install

```
$ npm install --save timeslist-api-access
```

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

## API 一覧 - API List

- 取得系
    - timeslistApi.project(params, callback)
    - timeslistApi.team(params, callback)
    - timeslistApi.phase(params, callback)
    - timeslistApi.facttype(params, callback)
    - timeslistApi.factstatus(params, callback)
    - timeslistApi.factpublic(params, callback)
    - timeslistApi.factuser(params, callback)
    - timeslistApi.category(params, callback)
    - timeslistApi.factweighting(params, callback)
    - timeslistApi.fact(params, callback)
    - timeslistApi.factrel(params, callback)
    - timeslistApi.factpersonal(params, callback)
    - timeslistApi.authusers(params, callback)
- ポスト系
    - timeslistApi.postFact(params, callback)
    - timeslistApi.postComment(params, callback)
    - timeslistApi.postRequest(params, callback)

### params
それぞれAPIの公式ドキュメントを参照してください。

### callback

`res`, `json`, `status`, `headers` の4つの引数が渡されます。

### login API

ログイン処理は、各APIが暗黙的に実行するので、明示的に発行する必要はありません。

明示的に発行したい場合には、 `timeslistApi.login(callback[, force])` が利用できます。


## ライセンス - License

MIT License


## 作者 - Author

- (C)Tomoya Koyanagi <tomk79@gmail.com>
- website: <http://www.pxt.jp/>
- Twitter: @tomk79 <http://twitter.com/tomk79/>
