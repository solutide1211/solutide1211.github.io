## javaIO装饰器模式

装饰器模式通过将对象包装在装饰器类中，以便动态地修改其行为。

这种模式创建了一个装饰类，用来包装原有的类，并在保持类方法签名完整性的前提下，提供了额外的功能。

### UML 类图

### 装饰器模式uml类图

![装饰器uml](../public/装饰器模式uml类图.jpg)

#### **关键元素说明**

| 元素                               | 说明                                                                      |
| ---------------------------------- | ------------------------------------------------------------------------- |
| **`Component`**            | 抽象组件接口（或抽象类），定义核心功能（如 `operation()`）。            |
| **`ConcreteComponent`**    | 具体组件，实现基础功能。                                                  |
| **`Decorator`**            | 抽象装饰器，持有 `Component` 的引用（组合关系），并实现 `Component`。 |
| **`ConcreteDecoratorA/B`** | 具体装饰器，添加额外功能（如状态或行为）。                                |

**示例代码**

**抽象组件接口**

```java
public interface Component {
    public String doOperation();
}

```

**具体组件**

```java
/**
 * 具体组件
 */
public class ConcreteComponent implements Component {

    @Override
    public String doOperation() {
        return "ConcreteComponent";
    }
}
```

**抽象装饰器**

```java
/**
 * 抽象装饰器
 */
public abstract class Decorator implements Component {

    private Component component;

    public Decorator(Component component){
        this.component = component;
    }

    @Override
    public String doOperation() {
        return component.doOperation();
    }
}
```

**具体装饰器**

```java

public class ConcreteComponentA extends Decorator{
    // A装饰器添加状态
    public ConcreteComponentA(Component component) {
        super(component);
    }

    @Override
    public String doOperation() {
        return super.doOperation() + "A装饰器正常状态";
    }
}
// B装饰器添加行为
public class ConcreteComponentB extends Decorator{
    public ConcreteComponentB(Component component) {
        super(component);
    }

    @Override
    public String doOperation() {
        return super.doOperation();
    }

    public void addBehaviour(){
        System.out.println("ConcreteComponentB.addBehaviour");
    }
}
```
### IO 装饰器模式

**InputStream**


