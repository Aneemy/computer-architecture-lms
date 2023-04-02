import React from 'react';
const SumInput = (props) => {
    function convertToBinary(x) {
        let bin = 0;
        let rem, i = 1, step = 1;
        while (x !== 0) {
            rem = x % 2;
            x = parseInt(x / 2);
            bin = bin + rem * i;
            i = i * 10;
        }
        return bin;
    }
    function nearestPowerOfTwo(num) {
        let power = 1;
        while (power < num) {
            power *= 2;
        }
        return power;
    }
    function elaborateArray(array,maxlength){
        var curlen = array.length;
        var resarr = new Array(maxlength);
        for (let i = 0;i<maxlength-curlen;i++){
            resarr[i] = '0';
        }
        let j = 0;
        for (let i = maxlength-curlen; i<maxlength;i++){
            resarr[i]=array[j];
            j++
        }
        return resarr;
    }
    // function computeCarry(arr1, arr2) {
    //     const carry = new Array(arr1.length + 1).fill(0);
    //
    //     for (let i = arr1.length - 1; i >= 0; i--) {
    //         const sum = parseInt(arr1[i]) + parseInt(arr2[i]) + carry[i + 1];
    //         carry[i + 1] = sum > 1 ? 1 : 0;
    //     }
    //
    //     return carry;
    // }



    function getReadyBinary(props){

        var output = Number(props.data.first)+Number(props.data.second);
        var first = convertToBinary(props.data.first).toString().split('');
        var second = convertToBinary(props.data.second).toString().split('');
        const maxlength = nearestPowerOfTwo(Math.max(first.length,second.length));

        props.setOutPut(convertToBinary(output).toString().split(''));
        props.setBinary({first:elaborateArray(first,maxlength),second:elaborateArray(second,maxlength)});
        props.setFlag(true);
        // console.log('carry:',carry,'first:',elaborateArray(first,maxlength),'second:',elaborateArray(second,maxlength))
    }


    return (
        <div className="suminput">
            <form action="">
                <input type="text" className='suminput__field' value={props.data.first} onChange={(e)=>props.setData({...props.data,first:e.target.value})}/>
                <input type="text" className='suminput__field' value = {props.data.second} onChange={(e)=>props.setData({...props.data,second:e.target.value})}/>
                <input type="button" value="Запуск" className='suminput__button' onClick={()=> {
                    getReadyBinary(props)
                }}/>
            </form>
        </div>
    );
};

export default SumInput;