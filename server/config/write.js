const db = require('./db');
const {tagLiat,tagContainer} = require('./read');

// 插入标签
async function addTag() {
    let tags = await tagLiat('https://juejin.im/subscribe/all');
    try {
        await db.query('delete from tag');
        Array.from(tags).forEach(async item => {
            try {
                await db.query(`insert into tag(href, name, icon, article) values (?,?,?,?)`, [item.href, item.name, item.icon, item.article]);
            } catch (error) {
                console.log('插入失败:' + error);
                return '0';
            }
        })
    } catch (error) {
        console.log(error);
    }
};

// 插入列表
async function addContainer(url, tag_name) { 
    let Containers = await tagContainer(url);
    try {
        Array.from(Containers).forEach(async item => {
            await db.query(`insert into container(tag_name, id, name, href, content) values (?,?,?,?,?)`, [tag_name, item.id, item.name, item.href, item.content]);
        })
    } catch (error) {
        console.log(error);
    }
}

// addContainer('https://juejin.im/tag/%E5%89%8D%E7%AB%AF', '前端')
