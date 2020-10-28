# 前端导出Excel支持自定义单元格格式
##### 现在场外系统有很多地方使用前端来直接导出表格数据到Excel，就会有设置单元格格式、支持数学操作等需求，之前无法实现。

-  现在场外系统的前端导出生成Excel主要使用export_json_to_excel.js来实现。
    ```
    require.ensure([], () => {
        const {
            export_json_to_excel
        } = require('@OIS/vendor/Export2Excel.js');
        export_json_to_excel(colhead, exportData, fileName);
    });
    ```
- 导出时数据为Number类型，即可支持千分位自动求和等数学操作。
##### 现简单改造了export_json_to_excel.js可以支持单元格格式设置。
##### 需求提出的几种格式：文本、自定义、数值、常规，已验证没有问题。其他格式后续有需要再支持。
参考新股申购-导出询价文件：

```
// 按照单元格格式导出Excel
exportOption = ["@", "@", "@", "@", "@", "@", "@", "G/通用格式", "G/通用格式", "@", "G/通用格式", "@"];
// ...
require.ensure([], () => {
    const {
        export_json_to_excel
    } = require('@OIS/vendor/Export2Excel.js');
    // 4个入参：列标题、表格数据、导出文件名、列格式
    export_json_to_excel(colhead, exportDataDetail, fileName, exportOption);
});
```
方法export_json_to_excel，增加了第4个入参option代表列格式（可不传），option数组对应表格列，不同符号对应不同格式。比如设置格式为"@"，生成的excel单元格格式是文本。

格式名 | 字段
---|---
文本 | "@"
自定义 | "G/通用格式"
数值 | "0_ "
常规 | ""

tip：如果遇到生成的Excel文件打开时说已损坏，一般是设置的格式和对应数据的类型不匹配。

[SheetJS js-xlsx 参考文档](https://www.npmjs.com/package/xlsx#workbook-file-properties)
