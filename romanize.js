/**
 * Created by tyler on 20/09/2015.
 */

function romanize(number) {

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

    var result = '';

    function run() {
        var highest = getHighestNumeral(number);
        result += highest.letter;
        number -= highest.number;

        if (number > 0) run();
    }

    run();

    return result;
}

romanize(1);
romanize(5);
romanize(9);
romanize(19);
romanize(90);
romanize(99);
romanize(100);