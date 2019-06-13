//object property shorthand

const name = 'Sean';
const userAge = 24;

const user = {
    name: name,
    age: userAge,
    location: 'Delaware'
};

//object destructuring

const product = { 
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

const { label, stock } = product;
console.log(label);
console.log(stock);