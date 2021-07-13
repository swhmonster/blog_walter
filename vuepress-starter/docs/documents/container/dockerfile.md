# 使用 Dockerfile 创建镜像
## 基本结构
Dockerfile分为四部分：基础镜像信息、维护者信息、镜像操作指令和容器启动时执行指令。
```dockerfile
# This Dockerfile uses the ubuntu image
# VERSION 2 - EDITION 1
# Author: docker_user
# Command format: Instruction [arguments / command] ..
# Base image to use, this must be set as the first line
FROM ubuntu
# Maintainer: docker_user <docker_user at email.com> (@docker_user)
MAINTAINER docker_user docker_user@email.com
# Commands to update the image
RUN echo "deb http://archive.ubuntu.com/ubuntu/ raring main universe" >> /etc/apt/sources.list
RUN apt-get update && apt-get install -y nginx
RUN echo "\ndaemon off;" >> /etc/nginx/nginx.conf
# Commands when creating a new container
CMD /usr/sbin/nginx
```
>一开始必须指明所基于的镜像名称，接下来一般是说明维护者信息。后面则是镜像操作指令，例如RUN指令，RUN指令将对镜像执行跟随的命令。每运行一条RUN指令，镜像就添加新的一层，并提交。最后是CMD指令，用来指定运行容器时的操作命令。
## 指令说明
|指令|说明|
|:---|:---|
|FROM|指定所创建镜像的基础镜像|
|MAINTAINER|指定维护者信息|
|RUN|运行命令|
|CMD|指定启动容器时默认执行命令|
|LABEL|指定生成镜像的元数据标签信息|
|EXPOSE|声明镜像内服务所监听的端口|
|ENV|指定环境变量|
|ADD|复制指定的<src>路径下的内容到容器中的<dest>路径下，<src>可以为URL；如果为tar文件，则会自动解压到<dest>路径下|
|COPY|复制本地主机的<src>路径下的内容到镜像中的<dest>路径下；一般情况下推荐使用COPY，而不是ADD|
|ENTRYPOINT|指定镜像的默认入口|
|VOLUME|创建数据卷挂载点|
|USER|指定运行容器时的用户名或UID|
|WORKDIR|配置工作目录|
|ARG|指定镜像内使用的参数（例如版本号信息等）|
|ONBUILD|配置当所创建镜像作为其他镜像的基础镜像时，所执行的创建操作指令|
|STOPSIGNAL|容器退出型号值|
|HEALTHCHECK|如何进行健康检查|
|SHELL|指定使用shell时的默认shell类型|
## 创建镜像
编写完成Dockerfile之后，可以通过docker build命令来创建镜像。

基本的格式为docker build[选项]内容路径，该命令将读取指定路径下（包括子目录）的Dockerfile，并将该路径下的所有内容发送给Docker服务端，由服务端来创建镜像。因此除非生成镜像需要，否则一般建议放置Dockerfile的目录为空目录。有两点经验：
- 如果使用非内容路径下的Dockerfile，可以通过-f选项来指定其路径。
- 要指定生成镜像的标签信息，可以使用-t选项。

例如，指定Dockerfile所在路径为/tmp/docker_builder/，并且希望生成镜像标签为build_repo/first_image，可以使用下面的命令：
```
$ docker build -t build_repo/first_image /tmp/docker_builder/
```
## 使用 .dockerignore 文件
可以通过.dockerignore文件（每一行添加一条匹配模式）来让Docker忽略匹配模式路径下的目录和文件。例如：
```
# comment
*/temp*
*/*/temp*
tmp?
~*
```
## 实操创建镜像文件
1. 从dockerhub上，下载centos的dockerfile
```dockerfile
FROM centos:7
ENV container docker
RUN (cd /lib/systemd/system/sysinit.target.wants/; for i in *; do [ $i == \
systemd-tmpfiles-setup.service ] || rm -f $i; done); \
rm -f /lib/systemd/system/multi-user.target.wants/*;\
rm -f /etc/systemd/system/*.wants/*;\
rm -f /lib/systemd/system/local-fs.target.wants/*; \
rm -f /lib/systemd/system/sockets.target.wants/*udev*; \
rm -f /lib/systemd/system/sockets.target.wants/*initctl*; \
rm -f /lib/systemd/system/basic.target.wants/*;\
rm -f /lib/systemd/system/anaconda.target.wants/*;
VOLUME [ "/sys/fs/cgroup" ]
CMD ["/usr/sbin/init"]
```
执行构建命令：
```shell
$ docker build --rm -t local/c7-systemd .
```
