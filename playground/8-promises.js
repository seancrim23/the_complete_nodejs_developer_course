/*const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        //resolve([1, 2, 5]);
        reject('uh ohhhhhhh');
    }, 2000);
});

doWorkPromise.then(result => {
    console.log('success!', result);
}).catch(error => {
    console.log('ERROR!', error);
});*/

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
};

add(1, 2).then(sum => {
    console.log(sum);
    return add(sum, 19);
}).then(sum2 => {
    console.log(sum2);
}).catch(error => {
    console.log(error);
});

/**
 * goal1: mess around with promise chaining
 * 
 * 1. create promise-chaining-2 .js 
 * 2. load in mongoose and task model
 * 3. remove given task by id
 * 4. get and print total number of incomplete tasks
 * 5. test
 */