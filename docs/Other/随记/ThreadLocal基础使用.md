**一、ThreadLocal是什么？有何作用**

[
]()

在多线程环境下，我们通常需要保证不同线程间的数据互不干扰（即线程安全）。

ThreadLocal 就是为每个线程存储自己的一份数据，这样同一个变量在不同线程中是独立的，不会相互影响。

简单理解：

ThreadLocal 不是解决“共享”的问题，而是给“本线程”分配一份独立数据

它符合“线程本地存储”思路：Thread 自己存储了它的数据

ThreadLocal 包含4个方法：

1. initialValue 返回初始值，默认是null,如果希望线程本地变量具有空值以外的初始值，则ThreadLocal必须是子类，并且此方法被覆盖。

```java
protected T initialValue() {    return null;}
```



2. get 返回此线程本地变量的当前线程副本中的值。如果变量没有当前线程的值，则首先将其初始化，并返回调用initialValue方法返回的值，默认为null。

```java
public T get() {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);
  
    if (map != null) {
        ThreadLocalMap.Entry e = map.getEntry(this);
        if (e != null) {
            @SuppressWarnings("unchecked")
            T result = (T) e.value;
            return result;
        }
    }
  
    return setInitialValue();
}
```



```java
private T setInitialValue() {
    T value = initialValue();
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);

    if (map != null) {
        map.set(this, value);
    } else {
        createMap(t, value);
    }

    if (this instanceof TerminatingThreadLocal) {
        TerminatingThreadLocal.register((TerminatingThreadLocal<?>) this);
    }

    return value;
}
```

3. set 将当前线程的此线程本地变量的副本设置为指定的值。

```java
public void set(T value) {
    Thread t = Thread.currentThread();
    ThreadLocalMap map = getMap(t);

    if (map != null) {
        map.set(this, value);
    } else {
        createMap(t, value);
    }
}
```

4. remove 移除此线程局部变量的值。

```java
public void remove() {
    ThreadLocalMap m = getMap(Thread.currentThread());
    if (m != null) {
        m.remove(this);
    }
}
```

**二、ThreadLocal 的底层原理：ThreadLocalMap 与弱引用**

关系图：

1. Thread 内部启动 ThreadLocalMap 当你调用 ThreadLocal.set()时，它本质是调用:

```java
Thread.currentThread().threadLocals.set(this, value);
```

每个Thread 实例里，都有一个 threadLocals 字段，类型是 ThreadLocalMap，它为当前线程专用。

2. ThreadLocalMap 是什么？

```java
static class Entry extends WeakReference<ThreadLocal<?>> {
    /** The value associated with this ThreadLocal. */
    Object value;

    Entry(ThreadLocal<?> k, Object v) {
        super(k);
        value = v;
    }
}
```



ThreadLocalMap 是一种类 HashMap 的简化版，但是 key 是 ThreadLocal 的弱引用，不是常规的强引用！

这里很精妙：

* key 是 ThreadLocal 弱引用，如果引用丢失，ThreadLocal 就会被 GC
* value 却是强引用，如果你没有 remove()，value 不会被释放

总结：Thread类对象中维护了ThreadLocalMap成员变量，而ThreadLocalMap维护了以ThreadLocal为key，需要存储的数据为value的Entry数组。

**三、ThreadLocal 使用**

```java
public class ThreadLocalExample {
    private static final ThreadLocal<Integer> threadLocal = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) {
        Runnable task = () -> {
            int num = threadLocal.get();
            threadLocal.set(num + 1);
            System.out.println(Thread.currentThread().getName() + " --> " + threadLocal.get());
        };

        for (int i = 0; i < 5; i++) {
            new Thread(task, "Thread-" + i).start();
        }
    }
}
```



说明：启动5个线程，然后分别从本地缓存中获取值，加1，然后再重新设置值，最后获取并输出。执行完毕后，输出每个线程都是 1，互不干扰；

[原文链接](https://mp.weixin.qq.com/s/KrkG9eAI14K0t-J6oD2RKg)
