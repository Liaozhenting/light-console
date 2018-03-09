import Time from '../src/date.js'
import Bash from '../src/bash.js'
import chai from 'chai';
import 'babel-polyfill';
const expect = chai.expect;
let prefix = 'my'
describe('执行命令', () => {
    let bash = new Bash({});
    it('state格式', () => {
        const currentState = {
            settings: { user: { username: `${prefix}@default` } },
            history: [],
            curentWorkingDirectory: '',
            cwd: '',
        };
        let whoami = bash.execute('whoami', currentState)
        let ls = bash.execute('ls', currentState)
        const test = function(res){
            expect(res).to.be.a('object')
            expect(res).to.have.property('settings')
            expect(res).to.have.property('history')
            expect(res).to.have.property('curentWorkingDirectory')
            expect(res).to.have.property('cwd')
            expect(res.history).to.be.a('array')
        }
        const print = function(result){
            if (result.__proto__.hasOwnProperty('then')) {
                return result.then((res) => {
                    test(res)
                })
            } else {
                test(result)
            }
        }
        print(whoami)
        print(ls)

    });
    it('时间', (done) => {
        const time = new Time().format("yyyy-MM-dd hh:mm:ss");
        expect(time).to.be.a('string');
        done()
    });

})