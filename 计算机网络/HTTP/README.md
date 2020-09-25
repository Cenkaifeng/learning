## 前言

为了恶补 HTTP 协议的基础，在极客时间买了课程《[透视 HTTP 协议](https://time.geekbang.org/column/intro/189)》，确实获益良多。

本文是课程的手打课程内容，因为打字的时候会默念才记得住一点。

而课程有音频、更多生活案例类比讲解、讨论区以及实操教程，所以更建议去买课程。

## 目录

1. [HTTP 历史](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/1.HTTP%E5%8E%86%E5%8F%B2.md)
2. [HTTP 是什么，又不是什么](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/2.HTTP%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%8C%E5%8F%88%E4%B8%8D%E6%98%AF%E4%BB%80%E4%B9%88.md)
3. [与 HTTP 相关的各种概念](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/3.%E4%B8%8EHTTP%E7%9B%B8%E5%85%B3%E7%9A%84%E5%90%84%E7%A7%8D%E6%A6%82%E5%BF%B5.md)
4. [四层和七层](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/4.%E5%9B%9B%E5%B1%82%E5%92%8C%E4%B8%83%E5%B1%82.md)
5. [域名](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/5.%E5%9F%9F%E5%90%8D.md)
6. [搭建 HTTP 实验环境](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/6.%E6%90%AD%E5%BB%BAHTTP%E5%AE%9E%E9%AA%8C%E7%8E%AF%E5%A2%83.md)
7. [键入网址再按回车，究竟发生了什么](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/7.%20%E9%94%AE%E5%85%A5%E7%BD%91%E5%9D%80%E5%86%8D%E6%8C%89%E5%9B%9E%E8%BD%A6%EF%BC%8C%E7%A9%B6%E7%AB%9F%E5%8F%91%E7%94%9F%E4%BA%86%E4%BB%80%E4%B9%88.md)
8. [HTTP 报文](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/8.HTTP%E6%8A%A5%E6%96%87.md)
9. [请求方法](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/9.%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95.md)
10. [URI 和 URL](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/10.URI%E5%92%8CURL.md)
11. [响应状态码](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/11.%E5%93%8D%E5%BA%94%E7%8A%B6%E6%80%81%E7%A0%81.md)
12. [HTTP 特点](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/12.HTTP%E7%89%B9%E7%82%B9.md)
13. [HTTP 的实体数据](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/13.HTTP%E7%9A%84%E5%AE%9E%E4%BD%93%E6%95%B0%E6%8D%AE.md)
14. [HTTP 传输大文件的方法](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/14.HTTP%E4%BC%A0%E8%BE%93%E5%A4%A7%E6%96%87%E4%BB%B6%E7%9A%84%E6%96%B9%E6%B3%95.md)
15. [HTTP 的连接管理](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/15.HTTP%E7%9A%84%E8%BF%9E%E6%8E%A5%E7%AE%A1%E7%90%86.md)
16. [HTTP 的重定向和跳转](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/16.HTTP%E7%9A%84%E9%87%8D%E5%AE%9A%E5%90%91%E5%92%8C%E8%B7%B3%E8%BD%AC.md)
17. [HTTP 的 Cookie 机制](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/17.HTTP%E7%9A%84Cookie%E6%9C%BA%E5%88%B6.md)
18. [HTTP 的缓存控制](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/18.HTTP%E7%9A%84%E7%BC%93%E5%AD%98%E6%8E%A7%E5%88%B6.md)
19. [HTTP 的代理服务](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/19.HTTP%E7%9A%84%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1.md)
20. [HTTP 的缓存代理](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/20.HTTP%E7%9A%84%E7%BC%93%E5%AD%98%E4%BB%A3%E7%90%86.md)
21. [什么是 HTTPS](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/21.%E4%BB%80%E4%B9%88%E6%98%AFHTTPS.md)
22. [对称加密和非对称加密](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/22.%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86%E5%92%8C%E9%9D%9E%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86.md)
23. [数字证书与签名](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/23.%E6%95%B0%E5%AD%97%E8%AF%81%E4%B9%A6%E4%B8%8E%E7%AD%BE%E5%90%8D.md)
24. [TLS1.2 解析过程](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/24.TLS1.2%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B.md)
25. [TLS1.3 的特性](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/25.TLS1.3%E7%9A%84%E7%89%B9%E6%80%A7.md)
26. [HTTPS 的优化](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/26.HTTPS%E7%9A%84%E4%BC%98%E5%8C%96.md)
27. [HTTP2 的特性](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/27.HTTP2%E7%9A%84%E7%89%B9%E6%80%A7.md)
28. [HTTP2 实现剖析](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/28.HTTP2%E5%AE%9E%E7%8E%B0%E5%89%96%E6%9E%90.md)
29. [展望 HTTP3](https://github.com/a298003154/learning/blob/master/front_end/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C/HTTP/29.%E5%B1%95%E6%9C%9BHTTP3.md)
