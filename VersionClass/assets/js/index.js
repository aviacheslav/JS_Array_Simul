'use strict'



const isReallyNumber=function(num){
    let verdict=true; 
    if(!typeof(num)==Number && isNaN(num)){
        verdict=false;
    }
    return verdict;
}

function isMyArray(obj){
    return (obj instanceof MyArray);
}

class MyArray{
    constructor(){
        this.length=0;
    }
	static isMyArray(obj){
        return (obj instanceof MyArray);
    }
	/*
    isMyArray(obj){
        return (obj instanceof MyArray);
    }
	
	push(element){
		this[this.length]=element;
		this.length++;
	}
	*/
    push(...elements){
		for(const element of elements){
			this[this.length]=element;
			this.length++;
		}
    }
    pop(){
        if(this.length>0){
            const lastItem=this[this.length-1];
            delete this[--this.length];//1t'y deqf l'len
            return lastItem;
        }else{
            return undefined;
        }
    }
    shift(){
        if(this.length>0){
            const firstItem=this[1-1];
            this.del(1);
            return firstItem;
        }else{
            return undefined;
        }
    }
    /*unshift(onlyOneElement){
        this.insert(onlyOneElement, 1);
        return this.length;
    }*/
	unshift(...elements){
		const L=elements.length;
		for(let i=L; i>=1; i--){
			this.insert(elements[i-1], 1);
		}
        return this.length;
    }
    map(cbf_via=null){ //null
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
    }
    forEach(cbf_via=null){
        for(let i=1; i<=this.length; i++){
            cbf_via(this[i-1], i-1, this);
            //cbf_via(this[i-1]);
        }  
    }
    filter(cbf_via=null){
        let R=new MyArray(), cond;//, count=0;
        if(cbf_via!=null){
            for(let i=1; i<=this.length; i++){
                cond=cbf_via(this[i-1], i-1, this);
                if(cond){
                    R.push(this[i-1]);
                }
            }
        }
        return R;
    }
    //---------------------------------------------------------------
    reverse(){
        let N, N1, N2;
        N = this.length%2==0 ? this.length : this.length-1; 
        for(let N1=1; i<=tN; N1++){
            N2=this.length-N1+1;
            this.swap(N1, N2);
        }
    }
    indexOf(valToSeek){
        return this.seekValFirst(valToSeek);
    }
    slice(index1=0, index2=0){
        let  R=[]
        let L=this.length, N1, N2;
        N1= index1>=0 ? index1 : this.length+index1;//+1;
        if(index2===0){
            N2=this.length+1;
        }else{
            N2= index2>0 ? index2 : this.length+index2;//+1;
        }
        //console.log('N1=',N1,' N2=',N2);
        if(N1<=N2){
            for(let i=N1; i<N2-1; i++){
                //console.log(i+') '+this[i]);
                R.push(this[i]);
            }
        }else{
            for(let i=N1; i>N2-1; i--){
                R.push(this[i]);
            }
        }
        return R;
    }
    // slice1(index){
    //     // let  R=[]
    //     // let L=this.length, N;
    //     // N= index>=0 ? index : this.length+index+1;
    //     // for(let i=N; i<=this.length-1; i++){
    //     //      R.push(this[i]);
    //     // }
    //     // return R;
    //     return this.slice2(index, this.length-1);
    // }
    // slice0(){
    //     //return this.slice(0);//stck pverflow. Why?
    //     //let R=[]
    //     //for(let i=0; i<=this.length-1; i++){
    //     //    R.push(this[i]);
    //    //}
    //    //return R;
    //    return this.slice1(0);
    // }
    //---------------------------------------------------------------
    swap(N1, N2){
        let success=true;
        if(isReallyNumber(N1) && isReallyNumber(N2) && N1>=1 && N2>=1 && N1<=this.length && N2<=this.length){
            let buf=this[N1-1];
            this[N1-1]=this[N2-1];
            this[N2-1]=buf;
        }else{
            success=false;
        }
        return success;
    }
    insert(newElement, posN=-1){//posN=-1
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
                this.swap(i, i-1);
            }
        }else if(isReallyNumber(posN)  && Math.abs(posN)==1 && this.length==0){
            this.push(newElement);
        }else{
            success=false;
        }
        return success;
    }
    del(posN){//posN=-1
        let N=posN;
        let retVal;
        if(isReallyNumber(posN)  && Math.abs(posN)<=this.length && posN!=0){
            if(posN<0){
                N=this.length-posN+1;
            }else{
                N=posN;
            }
            for(let i=N+1; i<=this.length; i++){
                this.swap(i, i-1);
            }
            this.pop();
        }
    }
    //
    add(element){
        this.push(element);
    }
    seekVal(valToSeek){
        let Ns=[];
        this.forEach((ownval, index)=>{
            if(ownval==valToSeek){
                Ns.push(index+1);
            }
        });
        return Ns;
    }
    seekValFirst(valToSeek){
        let N=0, Ns=[];
        Ns=this.seekVal(valToSeek);
        if(Ns.length>0){
            N=Ns[1-1];
        }
        return N;
    }
    seekValLast(valToSeek){
        let N=0, Ns=[];
        Ns=this.seekVal(valToSeek);
        if(Ns.length>0){
            N=Ns[Ns.length-1];
        }
        return N;
    }
    seekValCount(valToSeek){
        let Ns=[];
        Ns=this.seekVal(valToSeek);
        return Ns.length;
    }
    subArrayIsAtPos(subArr, posN){
        let b=(posN+subArr.length<=this.length), N;
        if(b){
            for(let N1=1; N1<=subArr.length; N1++){
                N=posN+N1-1;
                if(this[N-1]!==subArr[N1-1]){
                    b=false;
                }
            }
        }
        return b;
    }
    seekSubArr(subArr){
        let Ns=[];
        this.forEach((ownval, index)=>{
            if(this.subArrayIsAtPos(subArr, index+1)){
                Ns.push(index+1);
            }
        });
        return Ns;
    }
    sliceNatural(pos1=1, pos2=0){
        let N1, N2, R=[];
        if(pos1==0){
            N1=1;
        }else{
            N1 = pos1>0 ? pos1 : this.length+pos1+1;
        }
        if(pos2==0){
            N2=this.length;
        }else{
            N2 = pos2>0 ? pos2 : this.length+pos2+1;
        }
        //console.log('N1='+N1+' N2='+N2);
        if(N1<=N2){
            //console.log(N1+' <='+N2);
            for(let i=N1; i<=N2; i++){
                R.push(this[i-1]);
                //console.log(i+') '+this[i-1]);
            }
        }else{
            //console.log(N1+' >'+N2);
            for(let i=N1; i>=N2; i--){
                R.push(this[i-1]);
                //console.log(i+') '+this[i-1]);
            }
        }
        return R;
    }
}//class

// class MyArray2D{
//     constructor(data=null, if1DArray_Ext0Innerr1=0){
//         this.QExtRows=0;
//     }
// }




let arr2=new MyArray();
arr2.push(10);
arr2.push(9);
arr2.push(8, 7, 6);
arr2.push(5);
arr2.push(4, 3);
arr2.push(2);
arr2.push(1);
console.log('My arr after many times push: ', arr2);
arr2.unshift(-1);
console.log('My arr after unshift(-1): ', arr2);
arr2.shift(-1);
console.log('My arr after shift(): ', arr2);

arr2.push(100);
console.log('My arr after   push(100): ', arr2);
arr2.pop();
console.log('My arr after pop: ', arr2);
arr2.unshift(-4, -3, -2, -1);
console.log('My arr after unshift(-4, -3, -2, -1): ', arr2);
for(let i=1; i<=4; i++)arr2.shift();
console.log('My arr shift pop 4 times: ', arr2);
let arr3=arr2.map(function(val, index){
    return(val+index);
});
console.log('My arr after map (initial arr must not be changed): ', arr2);
console.log('arr3=map(arr2): ', arr3);
console.log('arr2.forEach(): ');
arr2.forEach(function(val, index, arr){
    console.log(val);
});
let xn=5.8;
let xs='it s a string';
//console.log(arr2.isMyArray(xn));
//console.log(arr2.isMyArray(xs));
//console.log(arr2.isMyArray(arr2));
//console.log(isMyArray(xn));
//console.log(isMyArray(xs));
//console.log(isMyArray(arr2));
console.log(xn,' - it is My Array? - ',MyArray.isMyArray(xn));
console.log(xs,' - it is My Array? - ',MyArray.isMyArray(xs));
console.log(arr2,' - it is My Array? - ',MyArray.isMyArray(arr2));
console.log(arr3,' - it is My Array? - ',MyArray.isMyArray(arr3));
//

//
let arr4=arr2.filter(function(val, index, arr){
    let sum=0, med;
    for(let i=1; i<=arr.length; i++){
        sum+=arr[i-1];
    }
    med=sum/arr.length;
    return (index%3!==0 && val<=med);
});
console.log('arr2 after filter: ', arr2);
console.log('must be: no 10...6 - no, they are >5; 5; no 4 because it is N6, 3, 2, no 1 because it is N9');
console.log('arr4=arr2.filter(): ', arr4);
//
console.log('index of 9 = ',arr2.indexOf(9));
console.log('slice(2, -2)  = ',arr2.slice(2, -2));
console.log('slice(-2, 2)  = ',arr2.slice(-2, 2));
console.log('slice(-4)  = ',arr2.slice(-4));
console.log('slice()  = ',arr2.slice());
//
//console.log('seek 9: ',arr2.seekVal(9),' first: ',arr2.seekValFirst(9),' last: ',arr2.seekValLast(9),' quantity: ',arr2.seekValCount(9));
console.log('seek [8, 7, 6]: ',arr2.seekSubArr([8, 7, 6]));

console.log('sliceNatural(2, -2)  = ',arr2.sliceNatural(2, -2));
console.log('sliceNatural(-2, 2)  = ',arr2.sliceNatural(-2, 2));
console.log('sliceNatural(-4)  = ',arr2.sliceNatural(-4));
console.log('sliceNatural()  = ',arr2.sliceNatural());










