# Shell 脚本 Demo
```shell
#!/bin/bash
#hello world
echo "hello world!"
echo "=========================================="


#字符串
my_name="walter"
echo "my name is ${my_name}."


readonly_my_name="readonly_my_name"
readonly readonly_my_name
#readonly_my_name="wajijiwa"


echo "my_name 字符串长度：${#my_name}"
echo "my_name 提取2-3的字符："${my_name:1:2}
echo "=========================================="




#数组
my_array=('value1','value2','value3')
echo "获取数组所有元素：${my_array[@]}"
echo "=========================================="


#Shell 传递参数实例！
echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
echo "参数个数为：$#";
echo "=========================================="


#printf
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg  
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876
echo "=========================================="


#if-else if -else
if test $0==1
then
    echo "option 1"
elif test $1==2
then
    echo "option 2"
else
    echo "option other"
fi
echo "=========================================="


#函数
demoFun(){
    echo "这是我的第一个 shell 函数!"
}
echo "-----函数开始执行-----"
demoFun
echo "-----函数执行完毕-----"
echo "=========================================="
```
