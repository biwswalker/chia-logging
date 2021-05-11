const Tail = require('tail').Tail

const tailing_log = () => {
    const tail = new Tail('/home/biwswalker/.chia/mainet/log/debug.log');

    tail.on("line", function (data) {
        console.log(data);
    });

    tail.on("error", function (error) {
        console.log('ERROR: ', error);
    });
}

module.exports = tailing_log