const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([1, 2, 5]);
        reject('uh ohhhhhhh');
    }, 2000);
});

doWorkPromise.then(result => {
    console.log('success!', result);
}).catch(error => {
    console.log('ERROR!', error);
});