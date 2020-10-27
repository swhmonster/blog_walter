# Git笔记
- 基于基准分支创建新分支
    - git checkout -b dev_create_new dev_base_branch

- 删除远端分支
    - git push origin --delete dev_origin

- 删除本地分支
    - git branch -d dev_local

- 强制推送
    - git push --force local_branch

- 推送远端没有的分支，推送并新建
    - git push --set-upstream origin local_branch

- 从分支记录中拿出一段分支记录，放到另一分支提交（支持单记录和多记录）
    >步骤：1.找到修改的commitid，2.切换到需要提交的分支使用cherry pick命令

    - git cherry-pick add571^..3ab0bd