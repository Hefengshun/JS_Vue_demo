https://juejin.cn/post/7170662948656906253#comment
type T1 = Exclude<string | number, string>; //在T中去除U中string    作用单个类型
type T2 = Extract<string | number, string>; //T保留U中存在的         作用单个类型

type User = {
    name: string,
    age: number
}
type T3 = Omit<User, "age">  //去除User里面age属性

type User2 = {
    name: string,
    age: number,
    gender: string
}
type T4 = Pick<User, "name" | "age">//保留User2中的name age

// 练习 去掉gender类型
type User3 = {
    name: string
    age: number
    gender: string
}
// 1
type T5 = Omit<User3, "gender">
type T6 = Pick<User3, "name" | "age">
type T7 = Pick<User3, Exclude<keyof User3, "gender">>
type T8 = Pick<User3, Extract<keyof User3, "name" | "age">>
type T9 = { [P in 'name' | 'age']: User3[P] }    //暂时不理解
type T10 = { [P in Exclude<keyof User3, 'gender'>]: User[P] }  //暂时不理解


/**
 *  阶段二
 */

// Record  定义一个对象  ， never限制只能为空对象  unknown为任意  还可以给固定值
type T_1 = Record<any, never>
let obj: T_1 = {}  //ok
// let obj2: T_1 = { name: "123" }  //no 只能为空对象

type T_2 = Record<any, unknown  /** unknown 或者{} */>  //对象形式 任意
let obj2: T_2 = { name: "123" }

// 自定义对象key
type keys = 'name' | 'age'
type T_3 = Record<keys, string>  // 这里的string会限制keys对应value的类型
let obj3: T_3 = {
    name: "13",
    age: "123"
}

//自定义对象的value
type keys2 = 'a' | 'b'
type value<T> = {
    name?: T,
    age?: T,                                 //这里不理解
    gender?: string
}
type T_4 = Record<keys2, value<number | string>>
let obj4: T_4 = {
    a: { name: "string" },
    b: { age: 18 }
}

type User4 = {
    name: string
    age: number
}
type T_5 = Partial<User4>  //Partial生成一个将T(对象类型) 属性是可选的    

type User5 = {
    name?: string
    age?: number
}
type T_6 = Required<User4>  //Required生成一个将T(对象类型) 属性是必填的

// 练习   变为可选属性   不会
type User6 = {
    name: string
    age: number
    children: {
        boy: number
        girl: number
    }
}
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;            //递归 Partial 自己实现
type DeepRequired<T> = T extends object ? { [P in keyof T]-?: DeepRequired<T[P]> } : T;         //递归 Required 自己实现
type DeepReadonly<T> = T extends object ? { readonly [P in keyof T]: DeepReadonly<T[P]> } : T;  //递归 Readonly 自己实现
type User_6 = DeepPartial<User6>

// NonNullable 去掉T中的null 和 undefined
type D = string[] | null | undefined | string
type T_8 = NonNullable<D>
let str: T_8 = ["123"]

type T_7 = {
    name: string
    age: undefined
    gender: undefined
}
// 对象是不行的 实现如下  
type ObjNonNullable<T> = { [P in keyof T as T[P] extends null | undefined ? never : P]: T[P] };
type T_9 = ObjNonNullable<T_7>

type User_7 = {
    name: string
    age: undefined,
    children: {
        boy: number
        girl: number
        neutral: null
    }
}
// 递归处理对象类型的 DeepNonNullable
type DeepNonNullable<T> = T extends object ? { [P in keyof T as T[P] extends null | undefined ? never : P]: DeepNonNullable<T[P]> } : T;
type T_10 = DeepNonNullable<User_7>

// 阶段三
// Awaited 作用是获取 async/await 函数或 promise 的 then() 方法的返回值的类型。
// Promise
type T_11 = Awaited<Promise<string>>;
// type T1 = string

// 嵌套 Promise，会递归
type T_12 = Awaited<Promise<Promise<number>>>;
// type T2 = number

// 联合类型，会触发分发
type T_13 = Awaited<boolean | Promise<number>>;
// type T3 = number | boolean

// Parameters<T>：作用是获取函数所有参数的类型集合，返回的是元组。T 自然就是函数了
// ReturnType<T>：作用是获取函数返回值的类型。T 为函数
// Capitalize / Uncapitalize  这俩儿的作用是转换首字母大小写
type T_14 = Capitalize<"abcd efg">
// type T_14 = "Abcd efg"

type T_15 = Uncapitalize<"ABCD EFG">
// type T_15 = "aBCD EFG"