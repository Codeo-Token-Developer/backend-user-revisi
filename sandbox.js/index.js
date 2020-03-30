function test(data) {

    const beta = () => {
        console.log('This is from beta function')
    }

    const prom = new Promise ((res, rej) => {
        if (data.type === 'Hallo') {
            res (beta)
        }else if (data.type === 'Hi') {
            res ('Hi huys semua')
        }else {
            rej('this is error')
        }
    })
    return prom;
};


test({type: 'sdasdsada'})
    .then(function (value) {
        value()
    })
    .catch(err => console.log(err))