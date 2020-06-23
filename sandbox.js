
// for (let i = 0; i < arr.length; i++) {
//     if (arr[i] === 3) {
//         break;
//     }else {
//         console.log(arr[i])
//     }
// }
const arr = [1,2,3,4,5,6];

function getNumber(num) {
    return new Promise((res,rej) => {
        if (num) {
            console.log(num)
            res(String(num) + " hallo")
        }else {
            rej("this is error")
        } 
    })
};

let newPromise = [];

arr.forEach(item => {
    newPromise.push(getNumber(item))
});

Promise.all(newPromise)
    .then(value => {
        console.log(value)
    })

