import dayjs from 'dayjs'
import Vue from 'vue' // 运用过滤器给时间进行处理
//  加载中文语言包
import 'dayjs/locale/zh-cn'
// 配置处理相对时间
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// 配置中文语言包
dayjs.locale('zh-cn')

// 配置一个相对时间过滤器
Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})

// 配置一个相对时间过滤器
Vue.filter('dateTime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
    return dayjs(value).format(format)
})

