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
        const curlen = array.length;
        let resarr = new Array(maxlength);
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
    function createBuffer(array1,array2){
        let resarr = [];
        let buf = 0;
        for (let i = array1.length-1;i>=0;i--){
            let k = 0;
            k =  Number(buf)+Number(array1[i]) + Number(array2[i]);
            switch (k) {
                case 0:
                    resarr[array1.length - i - 1] = 0;
                    buf=0;
                    break;
                case 1:
                    resarr[array1.length - i - 1] = 0;
                    buf=0;
                    break;
                case 2:
                    resarr[array1.length - i - 1] = 1;
                    buf=1;
                    break;
                case 3:
                    resarr[array1.length - i - 1] = 1;
                    buf=1;
                    break;
            }
        }
        return resarr;
    }


    function getReadyBinary(props){

        var output = Number(props.data.first)+Number(props.data.second);
        var first = convertToBinary(props.data.first).toString().split('');
        var second = convertToBinary(props.data.second).toString().split('');
        const maxlength = nearestPowerOfTwo(Math.max(first.length,second.length));

        props.changeSumOutPut(convertToBinary(output).toString().split(''));
        props.changeSumBinary({first:elaborateArray(first,maxlength),second:elaborateArray(second,maxlength)});
        props.changeSumReady(true);
        props.changeSumBuffer(createBuffer(elaborateArray(first,maxlength),elaborateArray(second,maxlength)))
    }


    return (
        <div className="suminput">
            <form action="">
                <input type="text" className='suminput__field' value={props.data.first} onChange={(e)=>props.changeSumData({...props.data,first:e.target.value})}/>
                <input type="text" className='suminput__field' value = {props.data.second} onChange={(e)=>props.changeSumData({...props.data,second:e.target.value})}/>
                <input type="button" value="Запуск" className='suminput__button' onClick={()=> {
                    getReadyBinary(props)
                }}/>
            </form>
        </div>
    );
};

export default SumInput;