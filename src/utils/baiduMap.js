import BMap from 'BMap'
/**
 * 计算二维坐标轴上两坐标点之间的距离
 * @param pot1
 * @param pot2
 * @returns {number}
 */
export function p2pLength (pot1, pot2) {
  let y = pot2[1] - pot1[1]
  let x = pot2[0] - pot1[0]
  let l = Math.sqrt(Math.pow(y, 2) + Math.pow(x, 2))
  return l
}

/**
 * 计算多个坐标点顺序连成线的总长度
 * @param pots
 * @returns {number}
 */
export function getTotalLength (pots) {
  let L = 0
  for (let i = 0; i < pots.length - 1; i++) {
    let l = p2pLength(pots[i], pots[i + 1])
    L += l
  }
  return L
}

/**
 * 长度为l的单位向量在（pot1=>pot2）向量中的投影x，y坐标
 * @param pot1
 * @param pot2
 * @param l
 * @returns {*}
 */
export function getAbsolutePoint (pot1, pot2, l) {
  let l1 = p2pLength(pot1, pot2)
  if (l1 >= l) {
    let y1 = pot2[1] - pot1[1]
    let x1 = pot2[0] - pot1[0]
    let y = y1 * l / l1
    let x = x1 * l / l1
    return [pot1[0] + x, pot1[1] + y]
  }
  return []
}

/**
 * 转换二维坐标点为百度坐标点
 * @param pots
 * @returns {*}
 */
export function pot2mapPot (pots) {
  let mapPots = []
  if (!pots.length) return
  pots.forEach(item => {
    mapPots.push(new BMap.Point(item[0], item[1]))
  })
  return mapPots
}
