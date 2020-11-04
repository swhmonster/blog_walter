# allatori集成

## why allatori
- Java编译后的class容易被反编译，从而暴露代码逻辑。
经过混淆器处理后的字节码会重新组织，在保证不影响运行逻辑的前提下，保护逻辑不会被人类易读地泄露。

## what allatori
- Allatori是一个Java 混淆器,它属于第二代的混淆器，提供了全方位的保护知识产权的能力。 Allatori具有以下几种保护方式：命名混淆，流混淆，调试信息混淆，字符串混淆，以及水印技术。

## how allatori
>一般要求只需混淆最终启动的项目包
### step 1 放置文件
- 在maven项目的顶级目录里建立目录allatori，放入allatori的配置文件allatori.xml，在其下的lib目录里放入allatori.jar和allatori-annotations.jar
    - emp:

        
            │  pom.xml
            │
            ├─allatori
            │  │  allatori.xml
            │  │
            │  └─lib
            │          allatori-annotations.jar
            │          allatori.jar
            │
            └─src
                └─main
                    ├─java
                    └─resources
### step 2 pom依赖中增加allatori编译插件
<details><summary>pom配置</summary>

```xml
<!-- Allatori plugin start -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>2.6</version>
    <executions>
        <execution>
            <id>copy-and-filter-allatori-config</id>
            <phase>package</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <outputDirectory>${basedir}/target</outputDirectory>
                <resources>
                    <resource>
                        <directory>allatori</directory>
                        <includes>
                            <include>allatori.xml</include>
                        </includes>
                        <filtering>true</filtering>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
<plugin>
    <groupId>org.codehaus.mojo</groupId>
    <artifactId>exec-maven-plugin</artifactId>
    <version>1.2.1</version>
    <executions>
        <execution>
            <id>run-allatori</id>
            <phase>package</phase>
            <goals>
                <goal>exec</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <executable>java</executable>
        <arguments>
            <argument>-Xms128m</argument>
            <argument>-Xmx512m</argument>
            <argument>-jar</argument>
            <argument>allatori/lib/allatori.jar</argument>
            <argument>${basedir}/target/allatori.xml</argument>
        </arguments>
    </configuration>
</plugin>
<!-- Allatori plugin end -->
```
</details>

### step 3 配置allatori.xml
>具体配置标签解释，参见allatori官网：<http://www.allatori.com/doc.html>
<details><summary>allatori.xml配置</summary>

```xml
<config>
    <input>
        <jar in="${project.build.finalName}.jar" out="${project.build.finalName}.jar"/>       <!--混淆后直接覆盖原文件 -->
    </input>
    <keep-names>
        <class access="protected+">                             <!-- protected/public的都保留名称 -->
            <field access="protected+"/>
            <method access="protected+"/>
        </class>
    </keep-names>
    <!-- 指定依赖的jar包路径 -->
    <classpath basedir="${settings.localRepository}"> <!-- 加入本地maven仓库，以解决allatori混淆时查找引用包的问题 -->
        <jar name="**/*.jar"/>
    </classpath>
    <property name="log-file" value="log.xml"/>
    <property name="line-numbers" value="keep"/>             <!-- 保留原行号，便于debug -->
    <property name="classes-naming" value="keep-$-sign"/>    <!-- 保留$，支持内部类使用 -->
    <property name="local-variables-naming" value="keep"/>    <!-- 保留局部变量名，便于debug -->
    <property name="string-encryption" value="disable"/>
    <property name="fields-naming" value="abc"/>
    <property name="skip-renaming" value="enable"/>
    <ignore-classes>   <!-- 以各个项目的实体类、工具类、切面、接口等路径进行配置，只需要对接口实现进行混淆即可-->
        <class template="class *.dto.*"/>
        <class template="class *.entity.*"/>
        <class template="class *.dao.*"/>
        <class template="class *.httpservice.*"/>
        <class template="class *Aspect"/><!-- Aspect中会有切面定义，也排除 -->
        <class template="class *.obj.*"/>
        <class template="class *.common.*"/>
        <class template="class *.service"/>
        <class template="class *.dbclass.*"/>
        <class template="class *.enums.*"/>
        <class template="class *.Msgbox.*"/>
        <class template="class *.utils.*"/>
        <class template="class *.CxfConfig"/>
        <class template="class *.ServerConfiguration"/>
        <class template="class *.ServerStarter"/>
        <class template="class *.ServerTheradConfig"/>
        <class template="class *.transferinterface"/>
        <class template="class *.ipstemp"/>
        <class template="class *.interceptor"/>
        <class template="class *.listeners.*"/>
        <class template="class *.scheduled"/>
        <class template="class *.producers.*"/>
    </ignore-classes>
</config>
```
</details>
