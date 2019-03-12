# 自定义域名调试

## 客户端

客户端配置非常简单。通常的情况是：

1. 在 `eva.config.js` 中，添加 `port: 80` 。
2. 配置自定义域名的 `host`。

## 服务端

服务端需要 nginx 做反向代理。

```
cd /usr/local/nginx/conf/include/

touch yangpengfei_eva_act_ngx.conf
```

conf 内容参考：

```
server{
	listen 80;
	server_name yangpengfei.act.panda.tv;

	location / {
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
		proxy_set_header Host $http_host;
		proxy_set_header X-NginX-Proxy true;
		proxy_pass http://127.0.0.1:58000/;
		proxy_redirect off;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection "upgrade";
		proxy_redirect off;
		proxy_set_header X-Forwarded-Proto $scheme;
	}
}

```

添加完成后

```
// 测试 conf 正确性
sudo nginx -t

// 重启 nginx 服务
sudo service nginx restart
```

有两点需要注意：

1. nginx conf 命名参考 ${user}____eva_${prj_name}____ngx.conf
2. 配置文件内按需调整， listen 、 server_name 以及 proxy_pass 的端口号。
