/**
 * 将通路中的点抽象成对象
 * 包含基础属性：位置，左右前后是否走过
 */
class Location {
  constructor(coordinate = [0, 0]) {
    // 当前位置在地图中的坐标
    this.coordinate = coordinate
    // 向该方向是否可走
    // 本质上代表了当前递归中的路径后退一步后
    // 标记该位置已经找过通行路径
    this.right = false
    this.down = false
    this.left = false
    this.up = false
  }

  isDone() {
    return this.right
      && this.down
      && this.left
      && this.up
  }
}

function go(maze = [[]], baseRoute = [{}], routeList = [[]]) {
  const location = baseRoute.pop()

  // 如果没有，直接返回
  if (!location) {
    return routeList
  }

  const row = location.coordinate[0]
  const col = location.coordinate[1]

  // 判断向右下左上是否是最后一步

  // 向右，第一不越界，第二这个位置还可以向右，第三地图上向右这个位置可行
  if (col + 1 !== maze[row].length && !location.right && maze[row][col + 1] === 0) {
    // 可以向右走，锁定当前位置向右的方向
    location.right = true

    // 判断下一步是否是最后一步
    if (row === maze.length - 1 && col + 1 === maze[row].length - 1) {
      routeList.push(baseRoute)
    }
    // 不是最后一步
    else {
      // 放回栈中
      baseRoute.push(location)
      // 把下一步放入栈中，继续行走
      baseRoute.push(new Location([row, col + 1]))

      routeList = go(maze, baseRoute, routeList)

      // 将当前位置pop
      baseRoute.pop()
    }
  }

  // 向下
  if (row + 1 !== maze.length && !location.down && maze[row + 1][col] === 0) {
    // 可以向下走，锁定当前位置向右的方向
    location.down = true

    // 判断下一步是否是最后一步
    if (row + 1 === maze.length - 1 && col === maze[row].length - 1) {
      routeList.push(baseRoute)
    }
    // 不是下一步
    else {
      // 放回栈中
      baseRoute.push(location)
      // 把下一步放入栈中，继续行走
      baseRoute.push(new Location([row + 1, col]))

      routeList = go(maze, baseRoute, routeList)

      // 将当前位置pop
      baseRoute.pop()
    }
  }

  // 向左
  if (col - 1 !== -1 && !location.left && maze[row][col - 1] === 0) {
    // 可以向右走，锁定当前位置向右的方向
    location.left = true
    baseRoute.push(location)

    // 目前的迷宫，不可能向左走和向上走是出口
    // 所以不需要判断下一步是不是出口
    // 把下一步放入栈中，继续行走
    baseRoute.push(new Location([row, col - 1]))

    go(maze, baseRoute, routeList)
    // 将当前位置pop
    baseRoute.pop()
  }

  // 向上
  if (row - 1 !== -1 && !location.up && maze[row - 1][col] === 0) {
    location.up = true
    baseRoute.push(location)
    baseRoute.push(new Location([row - 1, col]))

    go(maze, baseRoute, routeList)
    // 将当前位置pop
    baseRoute.pop()
  }

  return routeList
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

  // 转换通路数据结构
  let route = baseRoute.map(item => {
    return new Location(item)
  })

  return go(maze, route, routeList)
}

findAllRoutes([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]
  , [[0, 0], [0, 1], [0, 2], [1, 2]], [])
