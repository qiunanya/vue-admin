import service from '@/utils/requestFilter'
/**列表 */

/** 新增*/

/**编辑 */

/**删除 */

/**分类 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}