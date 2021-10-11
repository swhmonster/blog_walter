# swagger注释@API详细说明

swagger是当前最好用的Restful  API文档生成的开源项目,通过swagger-spring项目实现了springMVC框架的无缝集成功能,方便生成restful风格的接口文档,

同时,swagger-ui还可以测试spring  restful风格的接口功能


|作用范围           |              API                    |                      使用位置           |                                                                                               
|         ---          |               ---                      |                   ---                      |                                                                                                  
|对象属性           |             @ApiModelProperty       |         用在参数对象的字段上            |                                                                                                 
|协议集描述         |           @Api                      |                  用在Conntroller类上    |                                                                                                
|协议描述           |             @ApiOperation           |             用在controller方法上        |                                                                                                
|Response集         |          @ApiResponses              |        用在controller方法上             |                                                                                                
|Response           |           @ApiResponse              |          用在@ApiResponses里面          |                                                                                                 
|非对象参数集       |          @ApilmplicitParams         |       用在controller方法上              |


非对象参数描述	@ApiImplicitParam	用在@ApiImplicitParams的方法里边
描述返回对象的意义	@ApiModel	用在返回对象类上
 

 

## @ApiModelProperty的用法   

value–字段说明 
name–重写属性名字 
dataType–重写属性类型 
required–是否必填 
example–举例说明 
hidden–隐藏

```java
	//  我这个用在实体类的get()方法上了
	/**
     * 获取城市编号
     * @return 城市编号
     */
    @ApiModelProperty(value="城市编号",example="058",required=true)
    public String getCode() {
        return code;
    }

    /**
     * 设置城市编号
     * @param code  城市编号
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 获取城市名称
     * @return 城市名称
     */
    @ApiModelProperty(value="城市名称",example="guangZhou",required=true)
    public String getName() {
        return name;
    }
    
```
 

 

## @Api
value - 字段说明

description - 注释说明这个类

 

## @ApiOperation
value - 字段说明

notes - 注释说明

httpMethod - 说明这个方法被请求的方式

response - 方法的返回值的类型



 
# @ApiResponse
code - 响应的HTTP状态码

message - 响应的信息内容
