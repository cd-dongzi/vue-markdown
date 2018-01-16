import Koa from 'koa'
import koaRouter from 'koa-router'
import staticFiles from 'koa-static'
import Busboy from 'busboy'
import path from 'path'
import fs from 'fs'
const router = koaRouter()
const app = new Koa()

const uploadFile = (ctx, opts) => {
    //重命名
    const rename = fileName => {
        return Math.random().toString(16).substr(2) + '.' + fileName.split('.').pop()
    }
    // 查找文件
    const mkdirSync = dirname => {
        if (fs.existsSync(dirname)) {
            return true
        } else {
            if (mkdirSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname)
                return true
            }
        }
    }
    let busboy = new Busboy({headers: ctx.req.headers});
    console.log('start uploading...')
    return new Promise( (resolve, reject) => {
        var fileObj = {};
        busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
            let filePath = '',
                imgPrefix = ''
            filePath = path.join(opts.path, mimetype.split('/')[0] + 's')
            imgPrefix = `http://localhost:3000/${mimetype.split('/')[0]}s`
            if (!mkdirSync(filePath)) {
                throw new Error('没找到目录')
            }
            let fName = rename(filename),
                fPath = path.join(path.join(filePath, fName))

            file.pipe(fs.createWriteStream(fPath))

            file.on('end', () => {
                fileObj[fieldname] = `${imgPrefix}/${fName}`
            })
        })
        busboy.on('finish',  async () => {
            resolve(fileObj)
            console.log('finished...')
        })
        busboy.on('error', function (err) {
           console.log('err:' + err)
           reject(err)
        })

        ctx.req.pipe(busboy)
    })
}

app.use( async (ctx, next) => { // 跨域设置
    ctx.set("Access-Control-Allow-Origin", "*")
    await next();
})
app.use(staticFiles(path.resolve(__dirname, './public'))); //静态文件


router.post('/markdown_upload_img', async (ctx, next) => { // 上传图片接口
    let data = await uploadFile(ctx,{
        path: path.resolve(__dirname, './public')
    })
    return ctx.body = data
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
    console.log(`server is running at http://localhost:3000`)
})