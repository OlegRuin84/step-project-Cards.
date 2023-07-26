const SETID = {

    set : new Set,

    setIdDelete : function (arg){
    SETID.set.delete(arg);
},
}

export const set = SETID.set;
export const setIdDelete = SETID.setIdDelete;