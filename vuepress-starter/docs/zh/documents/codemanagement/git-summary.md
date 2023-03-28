配置文件  
git config -l
查看当前生效的配置信息
git config [--global | --system] -e	编辑配置文件，--global：全局级，--system：系统级，默认本地级
git config [--global | --system] [--add] <name><value>
设置单值或多值（--add）配置项

git config [--global | --system] --unset <name>	删除配置项
git config [--global | --system] [--get-all] <name>	查询单值或多值（--get-all）配置项

创建版本库  
git init [--bare] <仓库路径>
创建一个新仓库
git clone <远程仓库网址> [本地目录]
克隆远程仓库到本地

修改和提交  
git status
查看本地仓库的状态
git diff
查看本地文件改动
git diff --cached
查看暂存区文件改动
git diff <版本>
查看本地文件和指定版本之间的差异
git add <路径>
把本地文件的改动添加到暂存区
git add -p
选择本地部分修改加入暂存区
git add -u	仅添加已被跟踪文件的本地修改
git add -A	添加本地所有的改动到暂存区
git mv <源文件> <目标文件>	重命名指定的文件或文件夹
git rm <文件>	删除指定文件
git rm --cached <文件>
只删除暂存区文件，不删除本地文件
git clean -i

清理本地文件（-i进入交互式界面）
git commit -m <描述信息> [-m <描述信息> ...]
提交并使用指定描述作为提交说明
git commit --amend
修补当前提交
git commit --fixup <提交>
修补历史提交，后续可用 git rebase - i --autosquash 压缩提交

查看提交日志  
git log	打印所有提交记录
git log --online <版本1>..<版本2>
对于<版本1>到<版本2>新增提交，每个提交显示一行简短说明
git log -p [<路径>]
显示日志及详细的提交补丁
git blame [-Lm,+n][<版本>] --<路径>
对于文件逐行显示最近一次的修改信息

撤销操作  
git reset
撤销暂存区改动
git reset --soft <版本>
软重置：仅修改HEAD指向，暂存区和本地文件均不修改
git reset [--mixed] <版本>
混合重置：本地文件不修改，但HEAD选项指向和暂存区都修改
git reset --hard <版本>
硬重置：HEAD指向、暂存区、本地文件全都修改
git revert [-m 1] <版本>	生成一个新的提交来撤销某次历史提交（-m参数用于撤销合并提交）

远程操作  
git remote add <别名> <URL>
添加一个远程仓库
git remote -v
查看远程仓库的详细信息
git remote remove <别名>
删除指定名称的远程仓库
git remote set -url <别名> <新URL>
修改远程仓库的URL地址
git fetch [--prune] <远程仓库别名>
获取远程仓库引用，使用--prune会清理本地缓存的已由远程仓库删除的引用
git fetch <远程仓库别名> <分支名>
将远程仓库指定分支的最新版本取回到本地
git pull <远程仓库别名> <分支名>	拉取远程仓库某个分支的更新，再与本地指定分支合并
git push <远程仓库别名> <本地分支名>:<远程分支名>	把本地仓库的分支推送到远程仓库的指定分支
git push <远程仓库别名> --delete <远程分支名>	删除指定的远程仓库的分支
git push <远程仓库别名> <标签名称>	将指定的标签提交到远程仓库
git push <远程仓库别名> --tags	将本地所有的标签全部提交到远程仓库

分支与标签  
git branch [-a]
查看本地分支（参数-a显示远程分支）
git branch <新分支> [<基线>]
从基线创建新分支
git branch -d <本地分支名>	删除指定分支
git checkout <本地分支名>
切换到指定分支。新版本Git建议使用git switch命令
git checkout -b <新分支> <基线>
创建并切换到新分支。新版本Git建议使用git switch 命令
git chechout <版本> -- <文件>
用指定版本的文件覆盖本地文件，新版本Git建议使用git restore 命令
git tag
查看本地所有标签
git tag -m <标签描述信息> <标签名称> [<版本>]
基于指定提交（未指定为最新提交）创建新标签。请使用-m参数添加说明
git tag -s -u <key-id> -m <标签描述信息> <标签名称> [<版本>]
创建带有PGP签名的标签
git tag -d <标签名称>	删除指定的标签

合并与变基  
git merge <分支名称>
把指定的分支合并到当前所在的分支下
git merge (--continue | --abort | --quit)
合并冲突，选择继续或终止
git rebase <分支名称>
变基：把当前分支改动在新分支的基线上重放
git rebase -i --autosquash <分支名称>
交互式变基，通常用于整理提交
git rebase (--continue | --skip | --abort | --quit | --edit -todo)
变基暂停后，选择继续、跳过、终止，或者编辑变基任务
