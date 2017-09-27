/**
 * Created by AllenFeng on 2017/9/25.
 */
import Balls from './Balls';

let ballInstance;
let rect;
let key = 1;


function getInstance(dom) {
    if (!ballInstance) {
        rect = dom.getBoundingClientRect();
        ballInstance = Balls.newIntstance({rect});
    } else if (rect.top !== dom.getBoundingClientRect().top) {
        ballInstance.destroy();
        rect = dom.getBoundingClientRect();
        ballInstance = Balls.newIntstance({rect});
    }
    return ballInstance;
}

export default function addBall(dom, ball) {
    let instance = getInstance(dom);
    instance.add({ball: 'ball', key: key});
    key++;
}
