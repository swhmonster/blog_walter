# sftp 基础使用
## 心法：命令前加"l"代表操作远端服务器，命令前不加"l"代表操作本地服务器
- 列举几个常用命令
  - 文件下载
  ```shell
  sftp>get [-Ppr] remote [local]
  ```
  如：get test.txt ./Project/

  将远程当前目录下的文件test.txt下载到本地当前目录的Project文件夹中。
  - 文件上传
  ```shell
  sftp>put [-Ppr] local [remote]
  ```
  如：put /home/walter/Software/RHEL_5.5\ x86_64.iso /home/walter/test/

  将本地/home/walter/Software/目录下的ios文件传送到远程登陆主机的/home/walter/test/目录下。
  - 其他命令，查看sftp help，help命令如下：
  ```shell
  sftp>help
  ```
