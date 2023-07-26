const SETID = {

    set : new Set,
// console.log(SETID.set.size)


    setIdDelete : function (arg){
    SETID.set.delete(arg);
    console.log(SETID.set.size)
},
}

export const set = SETID.set;
export const setIdDelete = SETID.setIdDelete;