'use strict'

/*
console.log('Task1');
let arr1=[10, 20, 30, 40, 50, 60];
console.log('arr1 before slice');
console.log(arr1);
let arr2=arr1.slice(1-1, 3);
console.log('arr2 = arr1.slice(0, 3)');
console.log(arr2);
console.log('arr1 after slice');
console.log(arr1);
console.log('Task2');
arr2=arr1.slice(-2);
console.log('arr2 = arr1.slice(-2)');
console.log(arr2);
console.log('or:');
arr2=arr1.slice(arr1.length-2);
console.log('arr2 = arr1.slice(L-3)');
console.log(arr2);
console.log('Task3');
let arr31=[9, 8, 7];
console.log('arr31 before reverse ', arr31);
let arr32=arr31.reverse();
console.log('arr31 after reverse ', arr31);
console.log('arr32 ',arr32);
console.log('Task4');
let arr41=[5,8,44,32,14,1,3];
console.log('arr41 before sort ', arr41);
function callBackSortAscending(memberCur, memberNext){
    return memberCur>=memberNext?1:-1;
}
function callBackSortDescending(memberCur, memberNext){
    return memberCur<=memberNext?1:-1;
}
let arr42=arr41.sort(function(memberCur, memberNext){
    return memberCur>=memberNext?1:-1;
});
console.log('arr41 after sort ', arr41);
console.log('arr42 ',arr42);
arr42=arr41.sort(callBackSortDescending);
console.log('arr41 after sort descending ', arr41);
console.log('arr42 ',arr42);
console.log('Task5');
let arr5=[2,5,8,7,9];
console.log('arr5 ',arr5);
arr5.forEach(function(val, index){
    console.log('Element ' + val +' has index '+index);
});
console.log('Task6');
let arr61= [10,9,8,7,6,5];
console.log('arr61 ',arr61);
let arr62=arr61.map(function(value, index){
    return value+index;
});
console.log('arr61 ',arr61);
console.log('arr62 ',arr62);
//NextHomeTask;
function Cat(name, age, breed){//isMale){
    this.name=name;
    this.age=age;
    this.breed=breed;
}
function createCats (amount){
    const catArray=[];
    for(let i=0; i<amount; i++){
        const cat=new Cat(
            `name${i}`,
            Math.round(Math.random()*10),
            `breed${i}`
        );
        catArray.push(cat);
    }
    return catArray;
}
//Cat.prototype=catPrototype;
//let cats=createCats(10);
//console.log('Cats');
//console.table(cats);

const catPrototype={
    eats: function(foodName){
        return 'cat '+ this.name+' eats '+foodName;
        //console.log('cat '+ this.name+' eats '+foodName);
    },
    sayMeou: function  (){
        return 'Meou';
        //console.log('Meou');
    }
}

Cat.prototype=catPrototype;
let cats=createCats(10);
console.log('Cats');
console.table(cats);

console.log('name='+cats[3-1].name);
console.log(cats[3-1].eats('meat'));
console.log(cats[3-1].name+' '+cats[3-1].eats('meat')+' '+cats[3-1].sayMeou());

*/

//-----------------------------------

const isReallyNumber=function(num){
    let verdict=true; 
    if(!typeof(num)==Number && isNaN(num)){
        verdict=false;
    }
    return verdict;
}

const MyArray=function(){
   this.length=0;
}
MyArray.isMyArray=function(obj){
    return (obj instanceof MyArray);
}

const myArrayPrototype={
    push: function(newElem){
        this[this.length]=newElem;
        this.length++;
        return this.length;
    },
    pop: function(){
        if(this.length>0){
            const lastItem=this[this.length-1];
            delete this[--this.length];//1t'y deqf l'len
            return lastItem;
        }else{
            return undefined;
        }
    },
    shift:function(){
        if(this.length>0){
            const firstItem=this[1-1];
            this.myDel(1);
            return firstItem;
        }else{
            return undefined;
        }
    },
    unshift:function(onlyOneElement){
        this.myInsert(onlyOneElement, 1);
        return this.length;
    },
    // isMyArray:function(obj){
    //     return (obj instanceof MyArray);
    // },
    map:function(cbf_via=null){
        let R=new MyArray(), cur;
        for(let i=1; i<=this.length; i++){
            R.push(this[i-1]);
        }
        if(cbf_via!=null){
            for(let i=1; i<=this.length; i++){
                cur=cbf_via(this[i-1], i-1, this);
                R[i-1]=cur;
            }
        }
        return R;
    },
    forEach:function(cbf_via=null){
        for(let i=1; i<=this.length; i++){
            cbf_via(this[i-1], i-1, this);
            //cbf_via(this[i-1]);
        }  
    },
    mySwap:function(N1, N2){
        let success=true;
        if(isReallyNumber(N1) && isReallyNumber(N2) && N1>=1 && N2>=1 && N1<=this.length && N2<=this.length){
            let buf=this[N1-1];
            this[N1-1]=this[N2-1];
            this[N2-1]=buf;
        }else{
            success=false;
        }
        return success;
    },
    myInsert:function(newElement, posN=-1){
        let success=true;
        let N=0;
        if(isReallyNumber(posN)  && Math.abs(posN)<=this.length && posN!=0){
            if(posN<0){
                N=this.length-posN+1;
            }else{
                N=posN;
            }
            this.push(newElement);//length++, this[length-1]=newElt
            for(let i=this.length; i>=N+1; i--){
                this.mySwap(i, i-1);
            }
        }else if(isReallyNumber(posN)  && Math.abs(posN)==1 && this.length==0){
            this.push(newElement);
        }else{
            success=false;
        }
        return success;
    },
    myDel:function(posN=-1){
        let N=posN;
        let retVal;
        if(isReallyNumber(posN)  && Math.abs(posN)<=this.length && posN!=0){
            if(posN<0){
                N=this.length-posN+1;
            }else{
                N=posN;
            }
            for(let i=N+1; i<=this.length; i++){
                this.mySwap(i, i-1);
            }
            this.pop();
        }
    }
}//class

MyArray.prototype=myArrayPrototype;



const cbf_for_map=function(value, index, arr){
    let R, median, sum=0;
    for(let i=1; i<=arr.length; i++){
        sum+=arr[i-1];
    }
    median=sum/arr.length;
    if(index%2!==0){
        R=arr[index];
    }else{
        if(value<median){
            R=value;
        }else{
            R=value*10;
        }
    }
    return R;
}

let arr1=new MyArray();
arr1.push(-1);
arr1.push(1);
console.log('My arr af push -1, 1: ', arr1);
arr1.push(2);
console.log('My arr af push 2: ', arr1);
arr1.pop();
console.log('My arr af pop: ', arr1);
let arr2=new MyArray();
arr2.push(10);
arr2.push(9);
arr2.push(8);
arr2.push(7);
arr2.push(6);
arr2.push(5);
arr2.push(4);
arr2.push(3);
arr2.push(2);
arr2.push(1);
console.log('My arr af many times push: ', arr2);
arr2.unshift(-1);
console.log('My arr af unshift(-1): ', arr2);
arr2.shift(-1);
console.log('My arr af shift(): ', arr2);
arr2.push(100);
console.log('My arr af   push(100): ', arr2);
arr2.pop();
console.log('My arr af pop: ', arr2);
let arr3=arr2.map(function(val, index){
    return(val+index);
});
console.log('My arr af map: ', arr2);
console.log('arr3=map(arr2): ', arr3);
console.log('arr2.forEach(): ');
arr2.forEach(function(val, index, arr){
    console.log(val);
});
let xn=5.8;
let xs='it s a string';
console.log(MyArray.isMyArray(xn));
console.log(MyArray.isMyArray(xs));
console.log(MyArray.isMyArray(arr2));










