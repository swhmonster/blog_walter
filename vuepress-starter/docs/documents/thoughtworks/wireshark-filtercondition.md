Wireshark is an open source network packet analysis tool that can be used to capture, analyze, and debug network packets. When using Wireshark for packet analysis, it is often necessary to use filtering criteria to filter packets in order to find specific packets or analyze network performance.
## Filter Protocol
Filter packets for specific protocols, such as:
- TCP: Filter TCP protocol packets.
- Udp: Filter UDP protocol packets.
- ICMP: Filter ICMP protocol packets.
## Filter IP addresses
Filter specific IP addresses or IP address ranges, such as:
- Ip.src: Filter packets with a source IP address of 192.168.0.1.
```
Ip. src==192.168.0.1
```
- IP. dst: Filter packets with a destination IP address of 192.168.0.1.
```
Ip. dst==192.168.0.1
```
- IP. addr: Filter packets with a source or destination IP address of 192.168.0.1.
```
Ip. addr==192.168.0.1
```
- IP. addr: Filter packets with source or destination IP addresses in the range of 192.168.0.1 to 192.168.0.255.
```
Ip. addr>=192.168.0.1 and ip. addr<=192.168.0.255
```
## Filter out specific MAC addresses
You can use 'eth. addr' to filter out specific MAC addresses, such as:
- Filter packets with source MAC address 00:11:22:33:44:55
```
Eth.src==00:11:22:33:44:55
```
- Filter packets with MAC address 00:11:22:33:44:55 as the destination
```
Eth. dst==00:11:22:33:44:55
```
## Filter Port
Filter specific ports or port ranges, such as:
- TCP. port: Filter TCP protocol packets with a destination port of 80.
```
TCP. port==80
```
- Udp. port: Filter UDP protocol packets with a destination port of 53.
```
Udp. port==53
```
- TCP. port: Filter TCP protocol packets with a source or destination port in the range of 1024 to 65535.
```
TCP. port>=1024 and TCP. port<=65535
```
## Combined filtering conditions
Combine multiple filtering conditions, such as:
- Ip.src: Filter TCP protocol packets with a source IP address of 192.168.0.1 and a destination port of 80.
```
Ip. src==192.168.0.1 and TCP. port==80
```
- IP. addr: Filter TCP protocol packets with a source or destination IP address of 192.168.0.1 and a destination port of 80 or 443.
```
Ip. addr=192.168.0.1 and (TCP. port==80 or TCP. port==443)
```
## Filter packet length
Filter packets of specific length, such as:
- Frame. len: Filter packets with a packet length of 1500 bytes.
```
Frame. len==1500
```
- Frame. len: Filter packets with a packet length greater than 1024 bytes.
```
Frame. len>1024
```
## Filter TCP flags
Filter packets with specific TCP flags, such as:
- TCP. flags. syn: Filter TCP protocol packets with SYN flag 1.
```
TCP. flags. syn==1
```
- TCP. flags. fin: Filter TCP protocol packets with FIN flag 1.
```
TCP. flags. fin==1
```
Filter TCP packets with FIN or RST flags
```
TCP. flags. fin==1 or TCP. flags. rst==1
```
## Filter HTTP messages
Filter HTTP messages, such as:
- HTTP: Filter data packets using the HTTP protocol.
- HTTP. request. method: Filter packets with HTTP request method GET.
```
Http. request. method==GET
```
- HTTP. response. code: Filter packets with an HTTP response status code of 200.
```
Http. response. code==200
```
## Filter out packets containing a certain keyword
Using 'contains' can filter out packets containing a certain keyword, such as:
- Filter packets containing 'login'
```
Frame contains "login"
```
## Filter out data packets within a specific time period
Using 'time' can filter out data packets within a specific time period, such as:
- Filter packets between 8:00 and 10:00
```
Time>="08:00:00" and time<="10:00:00"
```
## Filter out packets with specific protocol versions
Using 'version' can filter out packets of specific protocol versions, such as:
- Filter packets with TLS protocol version 1.2
```
Tls. version=="TLSv1.2"
```
## Filter out specific packet traffic
Using 'tcp. stream' or 'udp. stream' can filter out specific packet traffic, such as:
- Filter packets numbered 123 for TCP traffic
```
Tcp.stream eq 123
```
## Filter out specific command or response packets
For specific applications or protocols, specific filtering conditions can be used to filter out specific command or response packets, such as:
- Filter the command "TreeConnectAndX" in the SMB protocol
```
Smb. command==0x75
```
- Filter response 'No such name' in DNS protocol
```
Dns. flags. response==1 and dns. flags. rcode==3
```
## Filter out specific types of packets
You can use 'type' to filter out specific types of data packets, such as:
- Filter ARP requests
```
Arp. opcode==1
```
- Filter DHCP requests
```
Bootp. type==1
```
## Filter out packets from specific source or destination ports
You can use "tcp. srcport" and "tcp. dstport" or "udp. srcport" and "udp. dstport" to filter out specific source or destination port packets, such as:
- Filter TCP packets with source port 80
```
Tcp. srcport==80
```
- Filter UDP packets with destination port 53
```
Udp. dstport==53
```
## Filter out packets with specific workloads
You can use 'data' to filter out packets with specific workloads, such as:
- Filter HTTP requests containing the 'admin' keyword
```
Http. request. uri contains "admin"
```
- Filter FTP commands and responses containing 'password' or 'passwd'
```
(ftp. request. command contains "password" or ftp. request. command contains "passwd") or (ftp. response. code==331 and ftp. response. message contains "password")
```

***The above are some commonly used Wireshark filtering conditions that can be selected and combined according to actual needs***