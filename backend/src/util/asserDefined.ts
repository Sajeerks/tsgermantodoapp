// export function assertDefined<T>(val:T): asserts val is NonNullable<T>{

//    if(!val){
//     throw Error(`Expected val to be defined but recieved--${val}` )
//    }
   

// }

export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
    if (!val) {
        throw Error("Expected 'val' to be defined, but received " + val);
    }
}