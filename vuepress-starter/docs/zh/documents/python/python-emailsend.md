# python2 smtplib发送邮件带附件
```python
# !/usr/bin/python
# !coding=gbk

import json
import smtplib
import time
import urllib
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart

import xlrd
import xlwt
import socket
from email.mime.text import MIMEText

socket.setdefaulttimeout(30)

# 指定url
url = "http://192.168.162.101:10315/oismail/tianjian/newEmail"
# 第三方 SMTP 服务配置
mail_host = 'mail.hundsun.com'  # 设置服务器
mail_user = 'username'  # 用户名
mail_pass = 'password'  # 口令
sender = 'emailAddress'# 发件人
mail_recipient = 'emailAddress1,emailAddress2' #收件人
file_path = "E:\\seeauto"  # 代理服务器文件存储路径
file_prefix = "xxx"  # 文件前缀


# mail_host = '#mail_host#'  # 设置服务器
# mail_user = '#mail_user#'  # 用户名
# mail_pass = '#mail_pass#'  # 口令
# mail_recipient = '#mail_recipient#'  # 收件人
# sender = '#sender#'  # 发件人
# file_path = "#file_path#"
# file_prefix = "#file_prefix#"


def sendMail(subject, receiver, content, carbon_copy):
    receivers = receiver.split(",")  # 接收邮件人
    message = MIMEMultipart()
    # message = MIMEText(content, 'html', 'utf-8')
    message['From'] = sender
    message['To'] = receiver
    message['Cc'] = carbon_copy
    message['Subject'] = subject
    message.attach(MIMEText(content))
    file_absoulte_path = file_path + "\\" + file_prefix + str(time.time()) + ".xls"
    buildExcel(content, file_absoulte_path)
    xlsx = MIMEApplication(open(file_absoulte_path, 'rb').read())
    xlsx["Content-Type"] = 'application/octet-stream'
    xlsx.add_header('Content-Disposition', 'attachment', filename=file_prefix + ".xls")
    message.attach(xlsx)
    if not carbon_copy:
        print("邮件主题：" + subject + "，收件人：" + receiver)
    else:
        print("邮件主题：" + subject + "，收件人：" + receiver + "，抄送人：" + carbon_copy)
    try:
        smtpObj = smtplib.SMTP()
        smtpObj.connect(mail_host, '25')  # 25 为 SMTP 端口号
        smtpObj.login(mail_user, mail_pass)
        smtpObj.sendmail(sender, receivers, message.as_string())
        print("邮件发送成功")
        return
    except Exception as e:
        print("Error: 无法发送邮件", e)
        return


def buildExcel(content, file_absoulte_path):
    wb = xlwt.Workbook()
    sheet = wb.add_sheet('sheet'.decode('gbk'))
    sheet.write(0, 0, '证券名称'.decode('gbk'))
    return wb.save(file_absoulte_path)


def main():
    response = urllib.urlopen(url=url)

    data = response.read()
    data = data.decode('utf-8')
    print data
    data = json.loads(data)

    # headers = {'Content-type': 'application/json'}
    # connection = http.client.HTTPConnection("localhost:10315", timeout=10)
    # params = urllib.parse.urlencode({})
    # connection.request("GET", "/oismail/tianjian/newEmail", params, headers)
    # response = json.loads(connection.getresponse().read())

    # 需要发邮件时不等于0
    if data["error_no"] != 0:
        for e in data["email"]:
            if not e["mail_recipient"] or not e["email_subject"] or not e["email_content"]:
                raise Exception("收件人、主题或邮件正文为空")
            subject = e["email_subject"]
            receivers = e["mail_recipient"].decode('utf-8').encode('gbk')
            content = e["email_content"]
            # content = base64.b64decode(e["email_content"])
            if not e["mail_carbon_copy"]:
                carbon_copy = None
            else:
                carbon_copy = e["mail_carbon_copy"].decode('utf-8').encode('gbk')
            sendMail(subject, mail_recipient, content, carbon_copy)
    else:
        print(data["error_no"], data["error_info"])


main()

```
