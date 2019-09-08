/**
 * 将通路中的点抽象成对象
 * 包含基础属性：位置，左右前后是否走过
 */
class Location {
  constructor(coordinate = []) {
    // 当前位置在地图中的坐标
    this.coordinate = coordinate
    // 向该方向是否可走
    // 本质上代表了当前递归中的路径后退一步后
    // 标记该位置已经找过通行路径
    this.right = true
    this.down = true
    this.left = true
    this.up = true
  }
}

/**
 *
 *
 * @param baseMaze
 * @param baseRoute
 * @param routeList
 * @returns {Array}
 */
function findAllRoutes(baseMaze, baseRoute, routeList = []) {
  // 该方法会改变迷宫和基础路线
  // 需要进行深拷贝
  // 简单数据执行值拷贝
  let maze = JSON.parse(JSON.stringify(baseMaze))
  let route = JSON.parse(JSON.stringify(baseRoute))

  // 转换通路数据结构
  route.map(route => {
    return new Location(route)
  })

  route.forEach(() => routeList.push(maze))

  console.log(new Location())

  return routeList
}

findAllRoutes([[]], [], [])
