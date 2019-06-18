const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(a < 0 || b < 0){
                return reject('numbers must be non negative');
            }

            resolve(a + b);
        }, 2000);
    });
};

const doWork = async () => {
    try{
        const sum = await add(2, 5);
        console.log(sum);
    }catch(e){
        console.log(e);
    }
};

doWork();
