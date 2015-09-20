/**
 * Created by tyler on 20/09/2015.
 */

function romanize(number) {
    console.log(number + ": ");

    var numerals = [
        {
            letter: 'I',
            number: 1
        },
        {
            letter: 'V',
            number: 5
        },
        {
            letter: 'X',
            number: 10
        },
        {
            letter: 'L',
            number: 50
        },
        {
            letter: 'C',
            number: 100
        },
        {
            letter: 'D',
            number: 500
        },
        {
            letter: 'M',
            number: 1000
        }
    ];


    function getHighestNumeral(num) {
        for (var i = 0; i < numerals.length; i++) {
            if (numerals[i].number > num) {
                return numerals[i - 1];
            }
        }
    }

    function getNextHighestNumeral(numeral) {
        return numerals[numerals.indexOf(numeral) + 1];
    }

    function getNextLowestNumeral(numeral) {
        return numerals[Math.max(0, numerals.indexOf(numeral) - 1)];
    }

    var result = '';

    var ones = 0;
    var tens = 0;
    var hundreds = 0;
    var thousands = 0;

    if (number >= 1000) {
        thousands = Math.floor(number / 1000) * 1000;
        number -= thousands;
    }
    if (number >= 100) {
        hundreds = Math.floor(number / 100) * 100;
        number -= hundreds;
    }
    if (number >= 10) {
        tens = Math.floor(number / 10) * 10;
        number -= tens;
    }
    if (number > 0) ones = number;

    //console.log("split - ", thousands, hundreds, tens, ones);

    function run(num) {
        var highest = getHighestNumeral(num);
        var nextHighest;

        if (num <= 0) return;

        /*
        If it's about to repeat / end, amend
         */
        if ((num / highest.number) === 4) {
            nextHighest = getNextHighestNumeral(getNextHighestNumeral(highest));
            result = result.slice(0, result.length - 1);
            result += highest.letter;
            result += nextHighest.letter;
            num = 0;

            return;
        }

        /*
        If the next iteration would start repeating, we need to change our course
         */



        result += highest.letter;
        num -= highest.number;


        if (num > 0) run(num);
    }

    run(thousands);
    run(hundreds);
    run(tens);
    run(ones);

    console.log(result);
    return result;
}

romanize(1);
romanize(5);
romanize(9);
romanize(19);
romanize(90);
romanize(99);
romanize(100);
romanize(123);
romanize(139);
romanize(150);
romanize(199);
romanize(499);
romanize(501);