Wireshark 是一款开源网络数据包分析工具，可以用于捕获、分析和调试网络数据包。在使用 Wireshark 进行数据包分析时，常常需要使用过滤条件来过滤数据包，以便查找特定的数据包或者分析网络性能。
## 过滤协议
过滤特定协议的数据包，如：
tcp：过滤 TCP 协议的数据包。
udp：过滤 UDP 协议的数据包。
icmp：过滤 ICMP 协议的数据包。
## 过滤 IP 地址
过滤特定的 IP 地址或 IP 地址范围，如：
- ip.src：过滤源 IP 地址为 192.168.0.1 的数据包。
```
ip.src == 192.168.0.1
```
- ip.dst：过滤目的 IP 地址为 192.168.0.1 的数据包。
```
ip.dst == 192.168.0.1
```
- ip.addr：过滤源或目的 IP 地址为 192.168.0.1 的数据包。
```
ip.addr == 192.168.0.1
```
- ip.addr：过滤源或目的 IP 地址在 192.168.0.1 到 192.168.0.255 范围内的数据包。
```
ip.addr >= 192.168.0.1 and ip.addr <= 192.168.0.255
```
## 过滤出特定的 MAC 地址

可以使用 "eth.addr" 过滤出特定的 MAC 地址，如：

- 过滤源 MAC 地址为 00:11:22:33:44:55 的数据包
```
eth.src == 00:11:22:33:44:55
```
- 过滤目的 MAC 地址为 00:11:22:33:44:55 的数据包
```
eth.dst == 00:11:22:33:44:55
```
## 过滤端口
过滤特定的端口或端口范围，如：
- tcp.port：过滤目的端口为 80 的 TCP 协议数据包。
```
tcp.port == 80
```
- udp.port：过滤目的端口为 53 的 UDP 协议数据包。
```
udp.port == 53
```
- tcp.port：过滤源或目的端口在 1024 到 65535 范围内的 TCP 协议数据包。
```
tcp.port >= 1024 and tcp.port <= 65535
```
## 组合过滤条件
组合多个过滤条件，如：
- ip.src：过滤源 IP 地址为 192.168.0.1，目的端口为 80 的 TCP 协议数据包。
```
ip.src == 192.168.0.1 and tcp.port == 80
```
- ip.addr：过滤源或目的 IP 地址为 192.168.0.1，且目的端口为 80 或 443 的 TCP 协议数据包。
```
ip.addr == 192.168.0.1 and (tcp.port == 80 or tcp.port == 443)
```
## 过滤数据包长度

过滤特定长度的数据包，如：

- frame.len：过滤数据包长度为 1500 字节的数据包。
```
frame.len == 1500
```
- frame.len：过滤数据包长度大于 1024 字节的数据包。
```
frame.len > 1024
```
## 过滤 TCP 标志

过滤特定 TCP 标志的数据包，如：

- tcp.flags.syn：过滤 SYN 标志为 1 的 TCP 协议数据包。
```
tcp.flags.syn == 1
```
- tcp.flags.fin：过滤 FIN 标志为 1 的 TCP 协议数据包。
```
tcp.flags.fin == 1
```
过滤 FIN 或 RST 标志的 TCP 数据包
```
tcp.flags.fin == 1 or tcp.flags.rst == 1
```
## 过滤 HTTP 报文

过滤 HTTP 报文，如：

- http：过滤 HTTP 协议的数据包。

- http.request.method：过滤 HTTP 请求方法为 GET 的数据包。
```
http.request.method == GET
```
- http.response.code：过滤 HTTP 响应状态码为 200 的数据包。
```
http.response.code == 200
```
## 过滤出包含某个关键词的数据包

使用 "contains" 可以过滤出包含某个关键词的数据包，例如：

- 过滤包含 "login" 的数据包
```
frame contains "login"
```
## 过滤出特定时间段内的数据包

使用 "time" 可以过滤出特定时间段内的数据包，例如：

- 过滤 8:00 到 10:00 之间的数据包
```
time >= "08:00:00" and time <= "10:00:00"
```
## 过滤出特定协议版本的数据包

使用 "version" 可以过滤出特定协议版本的数据包，例如：

- 过滤 TLS 协议版本为 1.2 的数据包
```
tls.version == "TLSv1.2"
```
## 过滤出特定数据包的流量

使用 "tcp.stream" 或 "udp.stream" 可以过滤出特定数据包的流量，例如：

- 过滤 TCP 流量的编号为 123 的数据包
```
tcp.stream eq 123
```
## 过滤出特定命令或响应的数据包

对于一些特定的应用或协议，可以使用特定的过滤条件过滤出特定命令或响应的数据包，例如：

- 过滤 SMB 协议中的命令 "TreeConnectAndX"
```
smb.command == 0x75
```
- 过滤 DNS 协议中的响应 "No such name"
```
dns.flags.response == 1 and dns.flags.rcode == 3
```
## 过滤出特定类型的数据包

可以使用 "type" 过滤出特定类型的数据包，如：
- 过滤 ARP 请求
```
arp.opcode == 1
```
- 过滤 DHCP 请求
```
bootp.type == 1
```
## 过滤出特定源或目的端口的数据包

可以使用 "tcp.srcport" 和 "tcp.dstport" 或 "udp.srcport" 和 "udp.dstport" 过滤出特定源或目的端口的数据包，如：

- 过滤源端口为 80 的 TCP 数据包
```
tcp.srcport == 80
```
- 过滤目的端口为 53 的 UDP 数据包
```
udp.dstport == 53
```
## 过滤出特定负载的数据包

可以使用 "data" 过滤出特定负载的数据包，如：

- 过滤包含 "admin" 关键词的 HTTP 请求
```
http.request.uri contains "admin"
```
- 过滤包含 "password" 或 "passwd" 的 FTP 命令和响应
```
(ftp.request.command contains "password" or ftp.request.command contains "passwd") or (ftp.response.code == 331 and ftp.response.message contains "password")
```

***以上是一些常用的 Wireshark 过滤条件，可以根据实际需要进行选择和组合。***