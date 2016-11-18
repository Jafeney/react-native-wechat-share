# ReactNative微信分享组件
> Jafeney 2016-11-18 692270687@qq.com

## 模块依赖
```JSON
"dependencies": {
  "react-native-modalbox": "^1.3.8",
  "react-native-wechat": "^1.7.0"
}
```

## 让`ReactNative`完全支持`ES7`
`async`和`await`是`ES7`比较新的提案，让`ReactNative`完全支持`stage-0`，首先我们需要安装 `babel-preset-react-native-stage-0` 模块:

```shell
npm install babel-preset-react-native-stage-0 --save-dev
```

并设置 `.babelrc`

```JSON
{
  "presets": [ "react-native-stage-0" ],
}
```
## 演示效果
![演示效果1](http://photo.jafeney.com:9999/file/TnBdv5PDgvGgQq2Gi9DSFFMQ.PNG)
![演示效果2](http://photo.jafeney.com:9999/file/v5hSAsf7ABL3ZU59g1BWnT1_.PNG)
![演示效果3](http://photo.jafeney.com:9999/file/gJb6Dqx8SE5P7t17xblUn6ps.PNG)
