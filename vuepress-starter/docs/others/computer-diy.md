# 配置
>装机放在公司用于开发，奈何公司cpu是在惨不忍睹，i5-5500的U，根本不能满足现在微服务开发的日常需求。本人又想DIY一台自己的台式机，于是有了接下来的一路踩坑。

### 鲁大师扫描清单：
>电脑型号	X64 兼容 台式电脑  (扫描时间：2020年06月15日)
操作系统	Windows 10 专业版 64位 ( DirectX 12 )
	
1. 处理器	英特尔 Core i7-9700 @ 3.00GHz 八核
2. 主板	华硕 TUF B365M-PLUS GAMING ( 300 Series 芯片组 Family (B365) )
3. 内存	32 GB ( 金士顿 DDR4 2666MHz )
4. 主硬盘	 HS-SSD-C2000Pro 1024G ( 1024 GB / 固态硬盘 )
5. 显卡	Nvidia GeForce GTX 1660 SUPER ( 华硕 )
6. 显示器	戴尔 DELA0C9 DELL E2416H ( 24 英寸  )
7. 声卡	英特尔 High Definition Audio 控制器
8. 网卡	英特尔 Ethernet Connection  I219-V / 华硕

# 遇到的问题清单
-  装好机屏幕不亮，主板有供电（RGB有亮）
	1. 重新插拔了内存条（马甲条）
	2. 每个内存插槽都试过
	3. 最后发现还是内存没怼到位
- 点亮后，装好系统，用了3天，开始有自动关机现象，即在使用了15-20分钟，电脑蓝屏跳出“正在关机”字样
	1. 因为不是直接黑屏，而是提示了关机，所以排除了电源问题
	2. 后来以为是有恶意脚本，或是中病毒了，准备重新装系统；但是在重装之前，试了下短接电源启动，发现没有问题
- **最终问题（难以发现）**：机箱自身的电源线有问题
	1.将reset线接到power接口上，启动电脑，没有出现自动关机现象（排除了主板问题）
	2. 短接启动没有自动重启问题
	3. 只有电源线会有问题，最终问题定位为机箱电源按钮链接线的问题（难以发现）
>显卡支架建议搞一个
# 启动原理
### 电脑开机过程
1. 电源启动后，首先bios自检，如果cpu故障，就是常见的故障卡00不跑码
2. bios自检后会载入一些数据到内存，如果内存条没插好或内存条故障，会出现黑屏，即没图像啥都亮
3. 内存检查完后，电脑会检测显卡、cpu风扇、硬盘、io设备等，检测通过后，屏幕会显示主板log或者bios图标等信息。有些时候显卡检测不通过，有的主板会正常启动，有的主板会报错
4. 前面步骤完成后，bios会在系统硬盘寻找系统引导，然后启动系统，并把系统的操控权交给系统
>bios不同自检顺序会不同
# 跑分
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615145014822.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200615145033982.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)