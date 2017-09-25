/**
 * Created by AllenFeng on 2017/9/25.
 */
import Balls from './Balls';
import deepEqual from 'deep-equal'

let ballInstance;
let rect;


function getInstance(dom) {
    if (!ballInstance) {
        rect = dom.getBoundingClientRect();
        ballInstance = Balls.newIntstance({rect});
    } else if (rect.y != dom.getBoundingClientRect().y) {
        ballInstance.destroy();
        rect = dom.getBoundingClientRect();
        ballInstance = Balls.newIntstance({rect});
    }
    return ballInstance;
}

export default function addBall(dom, ball) {
    let instance = getInstance(dom);
    instance.add(ball)
}
