
const FLAG_SELECTED = 0,
      FLAG_UNSELECTED = 1;

function* permute(n) {

    let arr = new Array(n).fill(0);
    let permutation = arr;
    while (permutation) {
        yield permutation;
        permutation = next(permutation);
    }
}

function next(permutation) {
    let max = permutation.length - 1;
    let r = max;
    while (r >= 0) {
        let val = permutation[r];
        if (val >= max) {
            permutation[r] = 0;
        }
        else {
            permutation[r] = val + 1;
            break;
        }
        r--;
    }

    return (r < 0 ? null : permutation);
}

function isValid(permutation) {
    for (let r = 0; r < permutation.length; r++) {
        if (permutation[r] == r) { return false; }
    }
    return true;
}

function sum(arr) {
    return arr.reduce((acc, v) => acc + v, 0);
}

function unselected(permutation, flags) {
    for (let r = 0; r < permutation.length; r++) {
        flags[permutation[r]] = FLAG_SELECTED;
    }
    const result = sum(flags);
    resetFlags(flags);
    return result;
}

function resetFlags(flags) {
    for (let i = 0; i < flags.length; i++) {
        flags[i] = FLAG_UNSELECTED;
    }
}

onmessage = function (e) {

    const memo = e.data;
    const N = memo.length;

    const TOTAL = Math.pow(N, N);
    const PROGRESS_THRESHOLD = TOTAL / 100;
    let progressCount = 0;
    let totalIterations = 0;

    let gen = permute(N);
    let count = 0, sum = 0;
    let flags = new Array(N).fill(FLAG_UNSELECTED);

    while (true) {
        totalIterations++;
        progressCount++;

        let yielded = gen.next();
        let permutation = yielded.value;
        let done = yielded.done;
        if (done) {
            break;
        }

        if (!isValid(permutation)) {
            continue;
        }
        let unselectedCount = unselected(permutation, flags);
        sum += memo[unselectedCount];
        count++;

        if (progressCount > PROGRESS_THRESHOLD) {
            progressCount = 0;
            const progress = totalIterations / TOTAL;
            postMessage({progress: progress});
        }
    }

    let answer = sum / count;

    postMessage({answer: answer});
}