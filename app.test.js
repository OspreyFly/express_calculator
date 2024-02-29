const { mean, median, mode } = require("mathjs");
const { unpack } = require('./app.js');

test('Should return average of set' , () => {
    const answer = mean(1,3,5,7);
    expect(answer).toEqual(4);
});

test('Should return midpoint of set', () => {
    const answer = median(1,10);
    expect(answer).toEqual(5.5);
});

test('Should return most frequent of set', () => {
    const answer = mode(1,3,5,7);
    expect(answer).toEqual([1,3,5,7]);
});

test('Should return a list of numbers', () => {
    const req = {header: "gibberish", query: {nums: "1,3,5,7"}}
    const answer = unpack(req);
    expect(answer).toEqual([1,3,5,7]);
});


