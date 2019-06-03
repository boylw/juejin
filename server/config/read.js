const request = require('request-promise');
const cheerio = require('cheerio');
const db = require('./db');

async function sleep() { 
    return new Promise((resolve, reject) => {
        new setInterval(() => {
            resolve();
        }, 800)
    })
}

async function tagLiat(url) {
    // 掘金首页,分类
    var options = {
        url: url,
        transform(body) {
            return cheerio.load(body);
        }
    };
    return request(options).then(async $ => {
        let navList = [];
        for (let i = 0; i < $('.tag-list .item').find('a').length; i++) {
            let item = $('.tag-list .item').find('a').eq(i);
            let navListItem = {
                href: `https://juejin.im${$(item).attr('href')}`,
                name: $(item).find('.title').text(),
                icon: $(item).find('.thumb').data('src'),
                article: $(item).next().find('.article').text()
            }
            navList.push(navListItem);
            await sleep();
            try {
                await tagContainer(`https://juejin.im/tag/${encodeURI(navListItem.name)}`, navListItem.name);
                await db.query(`insert into tag(href, name, icon, article) values (?,?,?,?)`, [navListItem.href, navListItem.name, navListItem.icon, navListItem.article]);
                console.log('列表写入完成~');
            } catch (error) {
                console.log('出错了');
            }
           
        }
    })
}

// 分类数据
tagLiat('https://juejin.im/subscribe/all').then(tag => {
    console.log('finished');
});


// 获取文章container
async function tagContainer(url, names) {
    console.log(url);
    // 掘金首页,分类
    var options = {
        url: url,
        transform(body) {
            return cheerio.load(body);
        }
    };
    return request(options).then(async $ => {
        let container = [];
        for (let i = 0; i < $('.info-row.title-row .title').length; i++) {
            let name = $('.info-row.title-row .title').eq(i).text();
            let href = $('.info-row.title-row .title').eq(i).attr('href');
            let id = href.slice(6);
            href = `https://juejin.im${href}`;
            debugger;
            await sleep();
            let content = await tagDetail(href);
            container.push({
                id,
                name,
                href,
                content
            })
            try {
                (async () => {
                    debugger;
                    let isId = await db.query(`select * from container where id = '${id}'`);
                    console.log(isId.length);
                    if (isId.length != 0) {
                    } else {
                        await db.query(`insert into container(tag_name, id, name, href, content) values (?,?,?,?,?)`, [names, id, name, href, content]);
                        console.log('数据库写入完成'+name);
                    }
                   
                })()
            } catch (error) {
                console.log('出错了');
            }
        }
        
        console.log(url + 'finished');
    })
}

// tagContainer(href).then(tag => {
//     console.log(tag);
// });

// 获取文章详情
async function tagDetail(url) {
    debugger;
    console.log('详情获取='+url);
    // 掘金首页,分类
    var options = {
        url: url,
        transform(body) {
            return cheerio.load(body);
        }
    };
    return request(options).then($ => {
        let article = $('.main-container .article').html();
        console.log('详情获取结束='+url);
        
        return article;
    })
}
module.exports = {
    tagLiat,
    tagContainer
}