# Java Polymorphic Serialization - Avoiding Pitfalls
## 1. Polymorphic Serialization Solution:
- Jackson serialization defaults to the @ class attribute, which is mapped to the corresponding subclass during deserialization based on the @ class attribute
- Fastjson uses SerializerFeature (such as SerializerFeature. WriteClassName), which carries the @ Type attribute during serialization. When deserializing, it maps to the corresponding subclass based on the @ Type attribute
## 2. What are the pits here?
### 2.1. Where is the pit:
When using the above two methods for serialization, what are the problems with so when the @ class and @ Type attribute values are the full path of the class? **The answer is: If the serialized data exists in the database, the project structure of these classes will not be changed**
### 2.2. Problem Solving:
Decouple serialization and project structure through the alias method annotated by Jackson (i.e., corresponding subclass tags can be specified or customized).
### 2.3. Jackson's usage of avoiding pits
- @JsonTypeInfo

  Applied to classes/interfaces, used to enable polymorphic type processing, effective for both base/interface and subclass/implementation classes
- @JsonTypeInfo(use = JsonTypeInfo.Id.NAME,include = JsonTypeInfo.As.PROPERTY,property = "name")

  This annotation has some attributes:
  - use:Define which type of identification code to use, which has the following optional values:
    - JsonTypeInfo.Id.CLASS：Using fully qualified class names for identification
    - JsonTypeInfo.Id.MINIMAL_CLASS：If the base class and subclass are in the same package class, use the class name (ignoring the package name) as the identification code
    - JsonTypeInfo.Id.NAME：A logical specified name
    - JsonTypeInfo.Id.CUSTOM：Custom identification code, corresponding to @ JsonTypeIdResolver, to be explained later
    - JsonTypeInfo.Id.NONE：Do not use identification codes
  - Include (optional): Specify how the identification code is included, which has the following optional values:
    - JsonTypeInfo.As.PROPERTY：As a sibling attribute of data
    - JsonTypeInfo.As.EXISTING_PROPERTY：As an existing attribute in POJO
    - JsonTypeInfo.As.EXTERNAL_PROPERTY：As an extended attribute
    - JsonTypeInfo.As.WRAPPER_OBJECT：As an object of packaging
    - JsonTypeInfo.As.WRAPPER_ARRAY：As an array of packaging
  - Property (optional): Specify the attribute name for the identification code

    This property can only be used when:
    - Use is JsonTypeInfo. Id.CLASS (default to @ class if property is not specified), JsonTypeInfo. Id.MINIMAL_ Class (defaults to @ c if property is not specified), JsonTypeInfo. Id. NAME (defaults to @ type if property is not specified),
    - Include as JsonTypeInfo. As. Property, JsonTypeInfo. As. EXISTING_ PROPERTY、JsonTypeInfo.As.EXTERNAL_ Only valid when Property
  - DefaultImpl (optional): If the type identifier does not exist or is invalid, this attribute can be used to specify the default type used for deserialization
  - Visible (optional, default to false): whether it is visible

  The attribute defines whether the value of the type identifier will become part of the deserializer through the JSON stream, with a default value of false. This means that Jackson will process and delete the type identifier from the JSON content before passing it to the JsonDeserializer.
- @JsonSubTypes

  Applied to a class/interface, used to list the subclasses of a given class. It is only used when the subclass type cannot be detected, usually in conjunction with @ JsonTypeInfo on the base class. For example:
    ```java
    @JsonTypeInfo(use = JsonTypeInfo.Id.NAME,include =   JsonTypeInfo.As.PROPERTY,property = "typeName")  
    @JsonSubTypes({@JsonSubTypes.Type(value=Sub1.class,name = "sub1"),@JsonSubTypes.Type(value=Sub2.class,name = "sub2")})
    ```
@The value of JsonSubtypes is an array of @ JsonSubtypes. Type [], which enumerates polymorphic types (value corresponds to subclasses) and identifier values of types (name corresponds to the value of property identifier name in @ JsonTypeInfo, which is an optional value. If not specified, it needs to be determined by @ JsonTypeName on subclasses)
- @JsonTypeName

  Applied to subclasses, used to specify the value of type identifiers for polymorphic subclasses, such as:
  ```java
  @JsonTypeName(value = "sub1")
  ```
