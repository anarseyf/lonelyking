function main() {

    // console.clear();

    let memo = [0, 1];
    const MAX = 9;

    nextRound(memo, MAX);
}

function nextRound(memo, max) {

    const N = memo.length;

    if (memo.length > max) {
        console.log("Done");
        return;
    }
    console.log(`Next round: ${N}`);

    const startTime = +new Date();
    let worker = new Worker("worker.js");

    worker.onmessage = function(e) {

        // console.log("from worker: ", e.data);

        if (e.data.progress) {
            const percentage = (e.data.progress * 100).toFixed(1);
            console.log(`N = ${N}, progress: ${percentage}%`);
        }

        else {
            const endTime = +new Date();
            const seconds = (endTime - startTime) / 1000;

            const answer = e.data.answer;
            memo.push(answer);

            console.log(`Answer for N = ${N} is:`, +answer.toFixed(4), `(${seconds} seconds)`);

            nextRound(memo, max);
        }
    };

    worker.postMessage(memo);
}

window.onload = main;

