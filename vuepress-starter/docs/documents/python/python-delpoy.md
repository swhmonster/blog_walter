# 预备工作
 注册账号：https://test.pypi.org/manage/projects/
# 一个简单的项目
本教程使用一个名为的简单项目example_pkg。如果您不熟悉Python的模块和导入包，请花几分钟时间阅读包含文件包和模块的Python文档。即使您已经有一个要打包的项目，我们仍然建议您按照本示例包使用此示例包，然后尝试使用自己的包。
 
 要在本地创建此项目，请创建以下文件结构：
 

```
/packaging_tutorial
  /example_pkg
    __init__.py
```
这只是为了让您可以在本教程后面验证它是否正确安装，并且PyPI不会使用它。
# 创建包文件
您现在将创建一些文件来打包此项目并准备分发。创建下面列出的新文件 - 您将在以下步骤中向其添加内容。

```
/packaging_tutorial
  /example_pkg
    __init__.py
  setup.py
  LICENSE
  README.md
```
# 创建setup.py
setup.py是setuptools的构建脚本。它告诉setuptools你的包（例如名称和版本）以及要包含的代码文件。

打开setup.py并输入以下内容。更新软件包名称以包含您的用户名（例如，example-pkg-theacodes），这可确保您拥有唯一的软件包名称，并且您的软件包与本教程后其他人上传的软件包不会发生冲突。

```
import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="example-pkg-your-username",
    version="0.0.1",
    author="Example Author",
    author_email="author@example.com",
    description="A small example package",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/pypa/sampleproject",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
)
```
setup()需要几个论点。此示例包使用相对最小的集：

- name是包的分发名称。只要包含字母，数字_和，就可以是任何名称-。它也不能在pypi.org上使用。请务必使用您的用户名更新此内容，因为这样可确保您不会尝试上传与上传程序包时已存在的程序包相同的程序包。
- version 是包版本看 PEP 440有关版本的更多详细信息。
- author并author_email用于识别包的作者。
- description 是一个简短的，一句话的包的总结。
- long_description是包的详细说明。这显示在Python Package Index的包详细信息包中。在这种情况下，加载长描述README.md是一种常见模式。
- long_description_content_type告诉索引什么类型的标记用于长描述。在这种情况下，它是Markdown。
url是项目主页的URL。对于许多项目，这只是一个指向GitHub，GitLab，Bitbucket或类似代码托管服务的链接。
- packages是应包含在分发包中的所有Python 导入包的列表。我们可以使用 自动发现所有包和子包，而不是手动列出每个包。在这种情况下，包列表将是example_pkg，因为它是唯一存在的包。find_packages()
- classifiers给出了指数和点子你的包一些额外的元数据。在这种情况下，该软件包仅与Python 3兼容，根据MIT许可证进行许可，并且与操作系统无关。您应始终至少包含您的软件包所使用的Python版本，软件包可用的许可证以及您的软件包将使用的操作系统。有关分类器的完整列表，请参阅 https://pypi.org/classifiers/。
# 创建README.md 
打开README.md并输入以下内容。如果您愿意，可以自定义此项。
```
# Example Package

This is a simple example package. You can use
[Github-flavored Markdown](https://guides.github.com/features/mastering-markdown/)
to write your content.
```
# 创建许可证
上传到Python Package Index的每个包都包含许可证，这一点很重要。这告诉用户安装您的软件包可以使用您的软件包的条款。有关选择许可证的帮助，请访问 https://choosealicense.com/。选择许可证后，打开 LICENSE并输入许可证文本。例如，如果您选择了MIT许可证：
```
Copyright (c) 2018 The Python Packaging Authority

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
# 生成分发档案
下一步是为包生成分发包。这些是上传到包索引的档案，可以通过pip安装。

确保您拥有setuptools并wheel 安装了最新版本：

```
python3 -m pip install --user --upgrade setuptools wheel
```
现在从setup.py位于的同一目录运行此命令：

```
python3 setup.py sdist bdist_wheel
```
此命令应输出大量文本，一旦完成，应在dist目录中生成两个文件：

```
dist/
  example_pkg_your_username-0.0.1-py3-none-any.whl
  example_pkg_your_username-0.0.1.tar.gz
```
该tar.gz文件是源存档，而该.whl文件是 构建的分发。较新的pip版本优先安装构建的发行版，但如果需要，将回退到源代码存档。您应该始终上传源存档并为项目兼容的平台提供构建的存档。在这种情况下，我们的示例包在任何平台上都与Python兼容，因此只需要一个构建的发行版。
# 上传分发档案
您需要做的第一件事是在Test PyPI上注册一个帐户。Test PyPI是用于测试和实验的包索引的单独实例。这对于像我们不一定想要上传到真实索引的本教程这样的东西很棒。要注册帐户，请访问 https://test.pypi.org/account/register/并完成该页面上的步骤。在您上传任何套餐之前，您还需要验证您的电子邮件地址。有关Test PyPI的更多详细信息，请参阅 使用TestPyPI。

现在您已注册，您可以使用twine上传分发包。你需要安装Twine：

```
python3 -m pip install --user --upgrade twine
```
安装完成后，运行Twine以上传所有存档dist：

```
python3 -m twine upload --repository-url https://test.pypi.org/legacy/ dist/*
```
系统将提示您输入使用Test PyPI注册的用户名和密码。命令完成后，您应该看到与此类似的输出：

```
Uploading distributions to https://test.pypi.org/legacy/
Enter your username: [your username]
Enter your password:
Uploading example_pkg_your_username-0.0.1-py3-none-any.whl
100%|█████████████████████| 4.65k/4.65k [00:01<00:00, 2.88kB/s]
Uploading example_pkg_your_username-0.0.1.tar.gz
100%|█████████████████████| 4.25k/4.25k [00:01<00:00, 3.05kB/s]
```
上传后，您的软件包应该可以在TestPyPI上查看，例如，https://test.pypi.org/project/example-pkg-your-username

# 安装新上传的软件包
登录之前注册的网站登录即可看到自己发布的项目：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190604203016377.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1NvdWxfUHJvZ3JhbW1lcl9Td2g=,size_16,color_FFFFFF,t_70)
通过pip命令即可安装

>官网教程：https://packaging.python.org/tutorials/packaging-projects/
