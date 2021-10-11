# java8 hashmap
jdk8中，在hashmap链表长度达到8时，会自动转成红黑树
## 源码注释解释
```java
    /*
     * Implementation notes.
     *
     * This map usually acts as a binned (bucketed) hash table, but
     * when bins get too large, they are transformed into bins of
     * TreeNodes, each structured similarly to those in
     * java.util.TreeMap. Most methods try to use normal bins, but
     * relay to TreeNode methods when applicable (simply by checking
     * instanceof a node).  Bins of TreeNodes may be traversed and
     * used like any others, but additionally support faster lookup
     * when overpopulated. However, since the vast majority of bins in
     * normal use are not overpopulated, checking for existence of
     * tree bins may be delayed in the course of table methods.
     *
     * Tree bins (i.e., bins whose elements are all TreeNodes) are
     * ordered primarily by hashCode, but in the case of ties, if two
     * elements are of the same "class C implements Comparable<C>",
     * type then their compareTo method is used for ordering. (We
     * conservatively check generic types via reflection to validate
     * this -- see method comparableClassFor).  The added complexity
     * of tree bins is worthwhile in providing worst-case O(log n)
     * operations when keys either have distinct hashes or are
     * orderable, Thus, performance degrades gracefully under
     * accidental or malicious usages in which hashCode() methods
     * return values that are poorly distributed, as well as those in
     * which many keys share a hashCode, so long as they are also
     * Comparable. (If neither of these apply, we may waste about a
     * factor of two in time and space compared to taking no
     * precautions. But the only known cases stem from poor user
     * programming practices that are already so slow that this makes
     * little difference.)
     *
     * Because TreeNodes are about twice the size of regular nodes, we
     * use them only when bins contain enough nodes to warrant use
     * (see TREEIFY_THRESHOLD). And when they become too small (due to
     * removal or resizing) they are converted back to plain bins.  In
     * usages with well-distributed user hashCodes, tree bins are
     * rarely used.  Ideally, under random hashCodes, the frequency of
     * nodes in bins follows a Poisson distribution
     * (http://en.wikipedia.org/wiki/Poisson_distribution) with a
     * parameter of about 0.5 on average for the default resizing
     * threshold of 0.75, although with a large variance because of
     * resizing granularity. Ignoring variance, the expected
     * occurrences of list size k are (exp(-0.5) * pow(0.5, k) /
     * factorial(k)). The first values are:
     *
     * 0:    0.60653066
     * 1:    0.30326533
     * 2:    0.07581633
     * 3:    0.01263606
     * 4:    0.00157952
     * 5:    0.00015795
     * 6:    0.00001316
     * 7:    0.00000094
     * 8:    0.00000006
     * more: less than 1 in ten million
     *
     * The root of a tree bin is normally its first node.  However,
     * sometimes (currently only upon Iterator.remove), the root might
     * be elsewhere, but can be recovered following parent links
     * (method TreeNode.root()).
     *
     * All applicable internal methods accept a hash code as an
     * argument (as normally supplied from a public method), allowing
     * them to call each other without recomputing user hashCodes.
     * Most internal methods also accept a "tab" argument, that is
     * normally the current table, but may be a new or old one when
     * resizing or converting.
     *
     * When bin lists are treeified, split, or untreeified, we keep
     * them in the same relative access/traversal order (i.e., field
     * Node.next) to better preserve locality, and to slightly
     * simplify handling of splits and traversals that invoke
     * iterator.remove. When using comparators on insertion, to keep a
     * total ordering (or as close as is required here) across
     * rebalancings, we compare classes and identityHashCodes as
     * tie-breakers.
     *
     * The use and transitions among plain vs tree modes is
     * complicated by the existence of subclass LinkedHashMap. See
     * below for hook methods defined to be invoked upon insertion,
     * removal and access that allow LinkedHashMap internals to
     * otherwise remain independent of these mechanics. (This also
     * requires that a map instance be passed to some utility methods
     * that may create new nodes.)
     *
     * The concurrent-programming-like SSA-based coding style helps
     * avoid aliasing errors amid all of the twisty pointer operations.
     */
```
## java8如何将链表转成红黑树的？
- 当链表长度大于8时，调用treeify()将链表转成红黑树
```java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        // 数组大小小于64的，调用resize将数组大小扩容至2倍大小
        resize();
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        TreeNode<K,V> hd = null, tl = null;
        // 遍历链表，将链表元素转化成TreeNode链
        do {
            // 调用replacementTreeNode构造TreeNode
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                // TreeNode链为空，将元素设置为hd的首个节点
                hd = p;
            else {
                // TreeNode链不为空，向TreeNode链后面添加元素
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        if ((tab[index] = hd) != null)
            // TreeNode链表转化为红黑树
            hd.treeify(tab);
    }
}
```
- 转换步骤大致如下：
    1. 插入树结点元素，具体可以参考二叉搜索树的插入操作
       
       插入的时候，先比较key的hash值来决定插入方向，如果hash值相等的话，再比较compare方法，如果key所属对象没有直接实现Comparable接口，或者compare方法返回0，执行tieBreakOrder，比较两个key所属Class的name，如果还相等，也就是两个对象是同一个类型，那么调用本地方法为两个对象生成hashCode值，再进行比较，hashCode相等的话返回-1。
    2. 插入完之后开始调整红黑树，使之符合红黑树的特性
```java
final void treeify(Node<K,V>[] tab) {
    TreeNode<K,V> root = null;
    for (TreeNode<K,V> x = this, next; x != null; x = next) {
        // 遍历TreeNode链
        next = (TreeNode<K,V>)x.next;
        x.left = x.right = null;
        if (root == null) {
            // 设置root节点
            x.parent = null;
            x.red = false;
            root = x;
        }
        else {
            K k = x.key;
            int h = x.hash;
            Class<?> kc = null;
            for (TreeNode<K,V> p = root;;) {
                // 循环查找当前节点插入的位置并添加节点
                int dir, ph;
                K pk = p.key;
                // hashMap元素的hash值用来表示红黑树中节点数值大小
                if ((ph = p.hash) > h)
                    // 当前节点值小于根节点，dir = -1
                    dir = -1;
                else if (ph < h)
                    // 当前节点值大于根节点, dir = 1
                    dir = 1;
                else if ((kc == null &&
                          (kc = comparableClassFor(k)) == null) ||
                         (dir = compareComparables(kc, k, pk)) == 0)
                    /** 
                      *   当前节点的值等于根节点值。
                      *   如果当前节点实现Comparable接口，调用compareTo比较大小并赋值dir
                      *   如果当前节点没有实现Comparable接口，compareTo结果等于0，则调用tieBreakOrder继续比较大小
                      *   tieBreakOrder本质是通过比较k与pk的hashcode
                    */
                    dir = tieBreakOrder(k, pk);
                // 当前“根节点”赋值给xp
                TreeNode<K,V> xp = p;
                if ((p = (dir <= 0) ? p.left : p.right) == null) {
                    // 如果当前节点小于根节点且左子节点为空 或者  当前节点大于根节点且右子节点为空，直接添加子节点
                    x.parent = xp;
                    if (dir <= 0)
                        xp.left = x;
                    else
                        xp.right = x;
                    // 平衡红黑树
                    root = balanceInsertion(root, x);
                    // 跳出循环，继续向红黑树添加下一个元素
                    break;
                }
            }
        }
    }
    // 确保红黑树根节点是数组中该index的第一个节点
    moveRootToFront(tab, root);
}
```
- 插入树节点后，调用balanceInsertion(TreeNode<K,V> root,TreeNode<K,V> x)平衡红黑树
```java
static <K,V> TreeNode<K,V> balanceInsertion(TreeNode<K,V> root,
                                                    TreeNode<K,V> x) {
    // 新增节点默认是红色
    x.red = true;
    // xp父节点 xpp祖父节点 xppl祖父左节点 xppr 祖父右节点
    for (TreeNode<K,V> xp, xpp, xppl, xppr;;) {
        if ((xp = x.parent) == null) {
            // x的父节点为空，x应为根节点，应为黑色
            x.red = false;
            return x;
        }
        else if (!xp.red || (xpp = xp.parent) == null)
            // 父节点是黑色，祖父节点为空，直接返回
            return root;
            
        // 父节点是红色
        if (xp == (xppl = xpp.left)) {
            // 父节点是祖父节点的左节点
            if ((xppr = xpp.right) != null && xppr.red) {           
                // 叔父节点是红色
                
                // 叔父节点设为黑色
                xppr.red = false;
                // 父节点设为黑色
                xp.red = false;
                // 祖父节点设置为红色
                xpp.red = true;
                // 将祖父节点设置为当前节点，并继续循环操作
                x = xpp;
            }
            else {
                // 叔父节点为黑色或者空
                if (x == xp.right) {
                    // x为父节点右节点，则要进行左旋操作
                    root = rotateLeft(root, x = xp);
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                // 经过左旋x为左节点
                if (xp != null) {
                    // 父节点涂成黑色
                    xp.red = false;
                    if (xpp != null) {
                        // 祖父节点不为空
                        // 祖父节点设为红色
                        xpp.red = true;
                        // 以租父节点为支点右旋转
                        root = rotateRight(root, xpp);
                    }
                }
            }
        }
        else {
            // 父亲节点为右节点
            if (xppl != null && xppl.red) {
                // 叔父节点为红色
                
                // 将叔父节点设为黑色
                xppl.red = false;
                // 父节点设为黑色
                xp.red = false;
                // 祖父节点设为红色
                xpp.red = true;
                // 循环操作
                x = xpp;
            }
            else {
                if (x == xp.left) {
                    // 右旋
                    root = rotateRight(root, x = xp);
                    xpp = (xp = x.parent) == null ? null : xp.parent;
                }
                // x为右节点
                if (xp != null) {
                    xp.red = false;
                    if (xpp != null) {
                        xpp.red = true;
                        // 以祖父节点为支点左旋
                        root = rotateLeft(root, xpp);
                    }
                }
            }
        }
    }
}
```
