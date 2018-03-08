import reqwest from 'reqwest';

const dataUrl = 'http://localhost:4000/test';

export default {
    token: '',
    getOutput: function (d) {
        return reqwest({
            url: `${dataUrl}`,
            method: 'post',
            // // contentType:'application/json',
            // header:{'token':d.token,'Content-Type':'application/json'},
            data: {
                id: d.id,
                cmd: d.cmd
            }
        })
    }
}