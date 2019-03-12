# 如何集成 CI


在项目根目录创建 `.gitlab-ci.yml`。

内容如下：

```
image: registry.pdtv.io/panda-fe/node-ci:latest

before_script:
  - npm cache verify
  - npm install

cache:
  untracked: true
  key: "$CI_BUILD_REF_NAME"
  paths:
    - node_modules/

stages:
  - build

linting:
  stage: build
  script:
    - eva lint
```

更多关于 CI 的操作，可以查找相关文档。
