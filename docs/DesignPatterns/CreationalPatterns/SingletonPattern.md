## 单例模式


**是一种 创建型设计模式， 它确保 一个类只有一个实例， 并提供一个全局访问点**来访问该实例

### 核心特点

1. **唯一实例：保证一个类只有一个实例存在**
2. **全局访问： 提供全局访问该实例的方式**
3. **延迟初始化：通常采用懒加载方式创建实例**
4. **线程安全：多线程环境下也能保证单例**

### 饿汉式
> 已造成空间的浪费，一开始某些属性没有使用，但是直接创建了整个实例
```java
/**
 * 单例模式： 饿汉式
 * 易造成空间的浪费
 */
public class Hungry {
    
    private byte[] bytes_1 = new byte[1024*1024];
    private byte[] bytes_2 = new byte[1024*1024];
    private byte[] bytes_3 = new byte[1024*1024];
    // 构造器私有
    private Hungry(){

    }
    // 直接创建对象实例
    private static  Hungry hungry = new Hungry();

    public static Hungry getInstance(){
        return hungry;
    }
}
```

### 懒汉式
```java
/**
 * 单例模式：懒汉式
 */
public class LazyMan {

    private LazyMan(){
        System.out.println(Thread.currentThread().getName() + "ok");
    }
    private static LazyMan lazyMan;

    public static LazyMan getInstance(){
        if(lazyMan == null){
            lazyMan = new LazyMan();
        }
        return lazyMan;
    }
    // 单线程模式下可以保证使用无误，但是多线程并发下无法保证单例
    public static void main(String[] args) {
        for (int i = 0; i < 10; i++) {
            new Thread(()->{
                LazyMan.getInstance();
            }).start();
        }
    }
}
```


结果
```
Thread-6ok
Thread-9ok
Thread-3ok
Thread-7ok
Thread-0ok
Thread-8ok
Thread-4ok
Thread-5ok
Thread-2ok
Thread-1ok
``` 
### 双重检查锁

为了解决上述多线程并发问题，引入DCL 懒汉式
```java
/**
 * 单例模式：懒汉式  dcl 双重检测锁
 */
public class LazyMan {

    private LazyMan(){
        System.out.println(Thread.currentThread().getName() + "ok");
    }
    private volatile static LazyMan lazyMan;

    public static LazyMan getInstance(){
        if(lazyMan == null){
            synchronized (LazyMan.class){
                if(lazyMan == null){
                    lazyMan = new LazyMan(); // 不是一个原子性操作
                    /**
                     * 1. 分配内存空间
                     * 2. 执行构造方法 初始化对象
                     * 3. 把对象指向空间
                     *
                     * 默认指令执行顺序 123
                     * 若发生指令重排  132
                     * 当A线程执行到3，lazyMan对象的空间已经被占用，但是初始化对象未完成
                     * 此时B线程执行 if(lazyMan == null) 会直接返回 return lazyMan;
                     * 但是该对象实际不存在
                     */
                }
            }
        }
        return lazyMan;
    }
}
```
### volatile 

在 Java 中，volatile 是一个**轻量级的同步机制**，主要用于**解决多线程环境下的内存可见性问题和禁止指令重排序**

#### 保证变量的内存可见性

**问题背景**
> 在多线程编程中，每个线程都有自己的工作内存（CPU缓存），当线程操作共享变量时，可能会直接从工作内存读取副本，而不是从主内存获取新值，导致线程间数据不一致
> volatile 作用 
> 1. 当一个线程修改 `volatile` 修饰的变量的值时，立刻会将新值刷新到主内存中
> 2. 当其他线程读取该变量时，**会强制从主内存中加载最新的值**，而不是使用工作内存中的副本

#### 禁止指令重排序

**问题背景**
> JVM 和 CPU 为了提高性能，可能会对指令进行重排序（如单例模式中的双重检查锁定问题）。
> volatile 的作用：
> 1.通过插入内存屏障（Memory Barrier），禁止编译器和 CPU 对 volatile 变量操作的指令重排序。
> 2.确保写操作前的指令不会重排到写操作之后，读操作后的指令不会重排到读操作之前。

#### 注意事项
- 不保证原子性：
volatile 不能替代 synchronized 或 AtomicInteger 等原子类。例如，volatile int i; i++ 不是原子操作（需改用 AtomicInteger）。

- 性能开销：
读操作性能接近普通变量，但写操作会插入内存屏障，略慢于非 volatile 变量。




### 静态内部类
```java

/**
 * 单例模式：静态内部类
 */
public class Holder {

    private Holder(){}

    public static Holder getInstance(){
        return inner.INSTANCE;
    }
    
    public static class inner{
        
        public static final Holder INSTANCE = new Holder();
    }
}
```
> 上述都不安全，由于反射
---

在 Java 反射中，`Class` 类提供了三种获取构造函数的方法：`getDeclaredConstructor()`、`getConstructor()` 和 `getConstructors()`。它们的主要区别在于访问权限和返回结果的形式。



1. `getConstructor(Class<?>... parameterTypes)`

- 只能获取`public`的构造函数
- 需要指定参数类型来匹配特定的构造函数
- 找不到匹配的`public`构造函数，会抛出`NoSuchMethodException`异常

2. `getDeclaredConstructor(Class<?>... parameterTypes)`

- 可以获取`所有访问权限`的构造函数
- 需要指定参数类型来匹配特定的构造函数
- 会抛出 `NoSuchMethodException` 如果找不到匹配的构造函数

3. `getConstructors()`

- 返回类中 `所有 public 构造函数` 的数组
- 不需要参数，返回所有可公开访问的构造方法
- 不会抛出异常，如果没有 public 构造方法则返回空数组

>当需要获取非`public`的构造函数时，只能使用`getDeclaredConstructor()`方法，需要配合`setAccessible(true)` 来调用私有构造

**DCL 双检锁就一定安全吗？**

```java
public class LazyMan {

    private LazyMan(){}
    private volatile static LazyMan lazyMan;

    public static LazyMan getInstance(){
        if(lazyMan == null){
            synchronized (LazyMan.class){
                if(lazyMan == null){
                    lazyMan = new LazyMan(); // 不是一个原子性操作
                }
            }
        }
        return lazyMan;
    }


    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        LazyMan lazyMan1 = LazyMan.getInstance();
        // 反射获取
        Constructor<LazyMan> constructor = LazyMan.class.getDeclaredConstructor(null);
        constructor.setAccessible(true);
        LazyMan lazyMan2 = constructor.newInstance(null);
        System.out.println(lazyMan1);
        System.out.println(lazyMan2);
    }
}
```

 运行结果：

```
com.liu.designPatterns.signle.LazyMan@56cbfb61
com.liu.designPatterns.signle.LazyMan@1134affc
```

可以看出通过单例模式创建的对象与通过反射所创建的对象并不相同。

所以反射破坏了单例模式，将私有构造器改为了可访问的。

上述代码时通过构造器创建了对象，对此可以在构造器中使用锁判断是否已创建过对象

构造器改造：

```java
private LazyMan(){
    synchronized (LazyMan.class){
        if(lazyMan != null){
            throw new RuntimeException("不要通过反射搞破坏");
        }
    }
}
```

上述代码测试，第一个对象是使用单例模式创建的对象。`LazyMan lazyMan1 = LazyMan.getInstance();`。若用反射来创建两个对象，其结果依旧是两个对象不同

```
com.liu.designPatterns.signle.LazyMan@56cbfb61
com.liu.designPatterns.signle.LazyMan@1134affc
```

为防止这种问题，使用一个标志位。

```java
private static boolean flag = false;

private LazyMan(){
    synchronized (LazyMan.class){
        if(!flag) flag = true;
        else{
            throw new RuntimeException("不要通过反射搞破坏");
        }
    }
}
```

但是通过反编译依旧可以找到代码中的标志位，之后可以创建完第一个对象之后将该标志位置为初始状态，再创建第二个对象。

**获取定义的属性**

```java
Field[] declaredFields = LazyMan.class.getDeclaredFields();
for (Field field : declaredFields) {
    System.out.println(field.getName());
}
```

结果

```
flag
lazyMan
```

得到这个flag属性，破坏其私有属性

```java
public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException, NoSuchFieldException {
    //LazyMan lazyMan1 = LazyMan.getInstance();
    // 反射获取
    Field[] declaredFields = LazyMan.class.getDeclaredFields();
    for (Field field : declaredFields) {
        System.out.println(field.getName());
    }
    Field flag1 = LazyMan.class.getDeclaredField("flag");
    flag1.setAccessible(true);
    Constructor<LazyMan> constructor = LazyMan.class.getDeclaredConstructor(null);
    constructor.setAccessible(true);
    LazyMan lazyMan1 = constructor.newInstance(null);
    flag1.set(lazyMan1,false);
    LazyMan lazyMan2 = constructor.newInstance(null);
    System.out.println(lazyMan1);
    System.out.println(lazyMan2);
}
```

结果：

```
com.liu.designPatterns.signle.LazyMan@2c8d66b2
com.liu.designPatterns.signle.LazyMan@5a39699c
```

单例依旧被反射所破坏。

**源码**

```java
T newInstanceWithCaller(Object[] args, boolean checkAccess, Class<?> caller) throws InstantiationException, IllegalAccessException, InvocationTargetException {
        if (checkAccess) {
            this.checkAccess(caller, this.clazz, this.clazz, this.modifiers);
        }

        if ((this.clazz.getModifiers() & 16384) != 0) {
            throw new IllegalArgumentException("Cannot reflectively create enum objects");
        } else {
            ConstructorAccessor ca = this.constructorAccessor;
            if (ca == null) {
                ca = this.acquireConstructorAccessor();
            }

            T inst = (T)ca.newInstance(args);
            return inst;
        }
    }
```

从上述源码中可以看出枚举类型对象不能被反射所创建

---

### 枚举实现

```java
public enum EnumSingle {
    INSTANCE;

    public static EnumSingle getInstance(){
        return INSTANCE;
    }
}

class test{
    public static void main(String[] args) {
        EnumSingle instance1 = EnumSingle.getInstance();
        EnumSingle instance2 = EnumSingle.getInstance();

        System.out.println(instance1 == instance2);
    }
}
```

结果： true

想通过反射破坏枚举对象的单例，首先模仿DCL部分的步骤

看该枚举类的反编译源码中的构造器

```java
public enum EnumSingle {
    INSTANCE;

    private EnumSingle() {
    }

    public static EnumSingle getInstance() {
        return INSTANCE;
    }
}
```

反编译出的源码存在一个无参构造器

对此通过反射得到构造器来创建对象

测试类

```java
class test{
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        EnumSingle instance1 = EnumSingle.getInstance();
        Constructor<EnumSingle> constructor = EnumSingle.class.getDeclaredConstructor(null);
        constructor.setAccessible(true);
        EnumSingle instance2 = constructor.newInstance(null);
        System.out.println(instance1 == instance2);
    }
}
```

结果

```
Exception in thread "main" java.lang.NoSuchMethodException: com.liu.designPatterns.signle.EnumSingle.<init>()
at java.base/java.lang.Class.getConstructor0(Class.java:3585)
at java.base/java.lang.Class.getDeclaredConstructor(Class.java:2754)
at com.liu.designPatterns.signle.test.main(EnumSingle.java:17)

```

>看出报错信息是：不存在无参构造器



使用`javap -p `反编译

```
Compiled from "EnumSingle.java"
public final class com.liu.designPatterns.signle.EnumSingle extends java.lang.Enum<com.liu.designPatterns.signle.EnumSingle> {
  public static final com.liu.designPatterns.signle.EnumSingle INSTANCE;
  private static final com.liu.designPatterns.signle.EnumSingle[] $VALUES;
  public static com.liu.designPatterns.signle.EnumSingle[] values();
  public static com.liu.designPatterns.signle.EnumSingle valueOf(java.lang.String);
  private com.liu.designPatterns.signle.EnumSingle();
  public static com.liu.designPatterns.signle.EnumSingle getInstance();
  private static com.liu.designPatterns.signle.EnumSingle[] $values();
  static {};
}
```

`private com.liu.designPatterns.signle.EnumSingle();`这句中可以看出含有一个无参构造器，但是实际上并没有构造器

对此使用`jad`进行反编译,以下是反编译的结果

```java
public final class EnumSingle extends Enum
{

    public static EnumSingle[] values()
    {
        return (EnumSingle[])$VALUES.clone();
    }

    public static EnumSingle valueOf(String name)
    {
        return (EnumSingle)Enum.valueOf(com/liu/designPatterns/signle/EnumSingle, name);
    }

    private EnumSingle(String s, int i)
    {
        super(s, i);
    }

    public static EnumSingle getInstance()
    {
        return INSTANCE;
    }

    private static EnumSingle[] $values()
    {
        return (new EnumSingle[] {
            INSTANCE
        });
    }

    public static final EnumSingle INSTANCE = new EnumSingle("INSTANCE", 0);
    private static final EnumSingle $VALUES[] = $values();

}
```

可以看出枚举含有的是有参构造器

```java
private EnumSingle(String s, int i)
{
    super(s, i);
}
```

对此再进行测试；测试类

```java
class test{
    public static void main(String[] args) throws NoSuchMethodException, InvocationTargetException, InstantiationException, IllegalAccessException {
        EnumSingle instance1 = EnumSingle.getInstance();
        Constructor<EnumSingle> constructor = EnumSingle.class.getDeclaredConstructor(String.class,int.class);
        constructor.setAccessible(true);
        EnumSingle instance2 = constructor.newInstance(null);
        System.out.println(instance1 == instance2);
    }
}
```

测试结果：

```
Exception in thread "main" java.lang.IllegalArgumentException: Cannot reflectively create enum objects
	at java.base/java.lang.reflect.Constructor.newInstanceWithCaller(Constructor.java:493)
	at java.base/java.lang.reflect.Constructor.newInstance(Constructor.java:481)
	at com.liu.designPatterns.signle.test.main(EnumSingle.java:19)
```

与源码相匹配

### 优缺点
