const { spawn } = require("child_process");
const _ = require('lodash')

const get_farming_info = () => new Promise((resolve, reject) => {
    const ls = spawn(`cd ${process.env.CHIA_LOCATION} && . activate && chia farm summary`, {
        shell: true,

    });

    ls.once('exit', () => {
        console.log('exit.')
    })

    ls.stdout.on("data", data => {
        const string_data = data.toString()
        const farm_status_regex = /(?<=Farming status:)(.*\n?)(?=\n)/g
        const total_chia_farmed_regex = /(?<=Total chia farmed:)(.*\n?)(?=\n)/g
        const user_transaction_fees_regex = /(?<=User transaction fees:)(.*\n?)(?=\n)/g
        const block_rewards_regex = /(?<=Block rewards:)(.*\n?)(?=\n)/g
        const last_height_farmed_regex = /(?<=Last height farmed:)(.*\n?)(?=\n)/g
        const network_space_regex = /(?<=Estimated network space:)(.*\n?)(?=\n)/g
        // const plot_count_regex = /(?<=Plot count:)(.*\n?)(?=\n)/g
        // const total_size_regex = /(?<=Total size of plots:)(.*\n?)(?=\n)/g
        // const expected_time_to_win_regex = /(?<=Expected time to win:)(.*\n?)(?=\n)/g
        const farm_status = _.get(string_data.match(farm_status_regex), '0', '').trim()
        const total_chia_farmed = _.get(string_data.match(total_chia_farmed_regex), '0', '').trim()
        const user_transaction_fees = _.get(string_data.match(user_transaction_fees_regex), '0', '').trim()
        const block_rewards = _.get(string_data.match(block_rewards_regex), '0', '').trim()
        const last_height_farmed = _.get(string_data.match(last_height_farmed_regex), '0', '').trim()
        const network_space = _.get(string_data.match(network_space_regex), '0', '').trim()

        resolve({
            farm_status,
            total_chia_farmed,
            user_transaction_fees,
            block_rewards,
            last_height_farmed,
            network_space,
        })
    });

    ls.stderr.on("data", err => {
        reject(err.toString())
    });

    ls.on('error', (error) => {
        reject(error)
    });

    ls.on("close", code => {
        console.log(`child process exited with code ${code}`);
    });
})

module.exports = get_farming_info