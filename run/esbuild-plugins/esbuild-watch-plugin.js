// https://github.com/evanw/esbuild/blob/main/CHANGELOG.md#0170
export default {
    name: 'watch-plugin',
    setup(build) {
        let count = 0;
        build.onEnd(result => {
            // if (count++ === 0) console.log('first build:', result);
            // else console.log('subsequent build:', result);
            console.log('rebuild...');
        });
    },
};