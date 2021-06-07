//对data.json
const fs = require('fs');
// const path = require('path');

export function readFile(filePath, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, encoding, (err, data) => { // nodeApi 转化成promise
            if (err) return reject(err);
            resolve(data);
        })
    })
}

export function writeFile(filePath, data, encoding = 'utf8') {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, encoding, (err, data) => { // nodeApi 转化成promise
            if (err) return reject(err);
            resolve({
                status: 200,
                message: '写入成功！'
            });
        })
    })
}

// 获取vuex中的filepath路径
// const filePath = localStorage.getItem("filePath")
//在真实的开发中id肯定是随机生成的而且不会重复的，下一篇写如何生成随机切不会重复的随机数，现在就模拟一下假数据
//写入json文件选项
export async function writeJson(obj) {
    //现将json文件读出来
    let data = await readFile(localStorage.getItem("filePath"))
    let doc = JSON.parse(data.toString());//将字符串转换为json对象
    doc['todo'].data.push(obj);//将传来的对象push进数组对象中
    // doc.total = doc.data.length;//定义一下总条数，为以后的分页打基础
    const str = JSON.stringify(doc);//因为nodejs的写入文件只认识字符串或者二进制数，所以把json对象转换成字符串重新写入json文件中
    const res = await writeFile(localStorage.getItem("filePath"), str)
    return res

}

//删除json文件中的选项
export function deleteJson(id) {
    return readFile(localStorage.getItem("filePath"), function (err, data) {
        if (err) {
            return
        }
        let doc = data.toString();
        doc = JSON.parse(doc);
        //把数据读出来删除
        for (const i = 0; i < doc.data.length; i++) {
            if (id == doc.data[i].id) {
                doc.data.splice(i, 1);
            }
        }
        doc.total = doc.data.length;
        const str = JSON.stringify(doc);
        //然后再把数据写进去
        writeFile(localStorage.getItem("filePath"), str, function (err) {
            if (err) {
                return
            }
        })
    })
}


export function changeJson(id, newDoc) {
    return readFile(localStorage.getItem("filePath"), function (err, data) {
        if (err) {
            return
        }
        let doc = data.toString();
        doc = JSON.parse(doc);
        //把数据读出来,然后进行修改
        for (const i = 0; i < doc.data.length; i++) {
            if (id == doc.data[i].id) {
                doc.data.splice(i, 1, newDoc);
            }
        }
        doc.total = doc.data.length;
        const str = JSON.stringify(doc);
        writeFile(localStorage.getItem("filePath"), str, function (err) {
            if (err) {
                return
            }
        })
    })
}

//通过传回来的页数，进行分页模拟
export async function search(cate, pageIndex, pageSize) {
    const data = await readFile(localStorage.getItem("filePath"))
    const doc = JSON.parse(data.toString());
    if (!(pageIndex && pageSize)) {
        return doc[cate]
    } else {
        const total = doc[cate].data.length;
        const data = doc[cate].data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize);
        return {
            data, total
        }
    }
}

export async function update(cate, target) {
    console.log(localStorage.getItem("filePath"));
    const data = await readFile(localStorage.getItem("filePath"))
    const doc = JSON.parse(data.toString());
    doc[cate].data = target;

    const str = JSON.stringify(doc);
    //然后再把数据写进去
    const res = await writeFile(localStorage.getItem("filePath"), str)
    return res
}

export async function setTags(target) {
    // const configPath = path.resolve(process.cwd(), './src/dataStore/config.json')
    // const dir = path.resolve(".")
    // const configPath = path.join(dir, "/dataStore/config.json")

    const data = await readFile(localStorage.getItem("filePath"))
    const config = JSON.parse(data.toString());
    config["config"]['tags'] = target;

    const str = JSON.stringify(config);
    //然后再把数据写进去
    const res = await writeFile(localStorage.getItem("filePath"), str)
    return res
}

export async function getTags() {
    // const configPath = path.resolve(process.cwd(), './src/dataStore/config.json')
    // const configPath = "./src/dataStore/config.json"
    // const dir = path.resolve(".")
    // const configPath = path.join(dir, "/dataStore/config.json")
    console.log(localStorage.getItem("filePath"))
    const data = await readFile(localStorage.getItem("filePath"))
    const config = JSON.parse(data.toString());
    return config["config"]['tags'];
}


