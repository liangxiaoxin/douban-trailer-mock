import puppeteer from 'puppeteer'
import {doubanUrl} from '../config'
import {sleep} from "../utils/utils";
import uploadToQiniu from '../utils/qiniu'
const URL = doubanUrl('T','0,10','经典,中国大陆,电影')

getData()

async function getData() {

  console.log('start puppeteer');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false
  })

  const page = await browser.newPage()
  await page.goto(URL, {
    waitUntil: 'networkidle2'
  })

  await sleep(3000)

  await page.waitForSelector('.more')

  for (let i = 0; i < 2; i++) {
    await sleep(3000)
    await page.click('.more')
  }

  const movies = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-wp a')
    var links = []

    if (items.length >= 1) {
      items.each((index, item) => {
        let it = $(item)
        let doubanId = it.find('div').data('id')
        let title = it.find('.title').text()
        let rate = Number(it.find('.rate').text())
        let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

        links.push({
          doubanId,
          title,
          rate,
          poster
        })
      })
    }

    return links
  })
  console.log('movies',movies);
  browser.close()

  // 上传数据到七牛云
  uploadToQiniu(movies)
}