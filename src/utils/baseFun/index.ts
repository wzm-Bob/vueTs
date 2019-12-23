
/**
 * 工具类 wzm
 */
export const toHasUnitString = (num?: number, point?: number) => {
    if (typeof point === 'undefined') {
        point = 2;
    }
    var obj: { [type: string]: any } = {};
    if (typeof num === 'undefined') {
        num = 0
    }
    if (num >= 100000000) {
        obj.data = (num / 100000000).toFixed(point);
        obj.unit = '亿';
    } else if (100000000 > num && num >= 10000) {
        obj.data = (num / 10000).toFixed(point);
        obj.unit = '万';
    } else {
        if (!!num && !isNaN(num) && num.toString().indexOf('.') > 0) {
            num = Number(num.toFixed(point));
        }
        obj.data = num;
        obj.unit = '';
    }
    return obj;
}

export const getParentAreaCodeByCodeAndLevel = (code: string, level: string) => {
    let areaCode = ''
    if (level == '1')
        areaCode = code.substring(0, 2) + '0000000000';
    else if (level == '2')
        areaCode = code.substring(0, 4) + '00000000';
    else if (level == '3')
        areaCode = code.substring(0, 6) + '000000';
    else if (level == '4')
        areaCode = code.substring(0, 9) + '000';
    else if (level == '5')
        areaCode = code;
    return areaCode;
}

