import utils from '@/utils/utils'
// 判断是否登录
export function isLoginMiddle(to, from, next) {
    let token = utils.storage.getLocal('token')
    // 已登录 继续执行
    if (token) {
        return true
    }
    utils.$Message.warning('请登录')
    next({ name:'Login'});
    return false ;
}