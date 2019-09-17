/**
 * 生成一个二维数组
 *
 * @param form 包含row,col的值
 * @param random 是否随机
 * @returns {[]}
 */
function initMaze(form, random = false) {
  let maze = []
  // 生成行
  for (let i = 1; i <= form.row; i++) {
    let row = []
    for (let j = 1; j <= form.col; j++) {
      // 设置障碍状态
      // 第一个位置和最后一个位置不能为障碍
      if ((i === 1 && i === j) || (i === form.row && j === form.col)) {
        row.push(0)
      } else {
        row.push(random ? Math.random() * 1000 > 750 ? 1 : 0 : 0)
      }
    }

    maze.push(row)
  }
  return maze
}

/**
 * 根据计算出的路径在已知的地图上绘制出可视地图
 *
 * @param baseMaze 二维数组，包含了障碍的地图数据
 * @param ruleWay 给出的行走路线
 * @returns {{maze: *, ruleWay: *}}
 */
function redisplay(baseMaze, ruleWay = []) {
  // 简单数据执行值拷贝
  let maze = JSON.parse(JSON.stringify(baseMaze))

  for (let index = 0; index < ruleWay.length; index++) {
    // 下一步在路径中的位置
    const nextIndex = index + 1

    // 地图上X坐标
    const row = ruleWay[index][0]
    // 地图上Y坐标
    const col = ruleWay[index][1]

    // 判断最后一步还存在不
    if (nextIndex !== ruleWay.length) {
      // 向右和向左纵坐标是不会变化的
      if (ruleWay[index][0] === ruleWay[nextIndex][0]) {
        // 往右
        if (ruleWay[index][1] + 1 === ruleWay[nextIndex][1]) {
          maze[row][col] = 3
        }
        // 往左
        else {
          maze[row][col] = 5
        }

      } else {
        // 往下
        if (ruleWay[index][0] + 1 === ruleWay[nextIndex][0]) {
          maze[row][col] = 4
        }
        // 往上
        else {
          maze[row][col] = 6
        }
      }
    }
  }

  // 返回一个修改后的地图和路径
  return {maze, ruleWay}
}

/**
 *
 * @param maze 地图
 * @param route 递归通路
 * @param routeCount 路径条数
 * @param bestRoute 最好路径
 * @returns {{bestRoute: *, routeCount: *}}
 */
function go(maze = [[]], route = [[]], routeCount = 0, bestRoute = []) {
  let location = route[route.length - 1]

  // 如果没有，直接返回
  if (!location) {
    return routeCount
  }

  const row = location[0]
  const col = location[1]

  // 向右，第一不越界，第二这个位置还可以向右，第三地图上向右这个位置可行
  if (col + 1 !== maze[row].length && maze[row][col + 1] === 0) {
    // 判断下一步是否是最后一步
    if (row === maze.length - 1 && col + 1 === maze[row].length - 1) {
      // 通路条数加1
      routeCount++//.push(baseRoute.concat([[row, col + 1]]))

      // 当前最短通路为空或者长度大于当前计算出的通路，即保存最优路径
      if (bestRoute.length === 0 || bestRoute.length > route.length + 1) {
        bestRoute = route.concat([[row, col + 1]])
      }
    }
    // 不是最后一步
    else {
      // 封锁地图当前位置
      maze[row][col] = 3

      // 把下一步放入栈中，继续行走
      route.push([row, col + 1])

      let result = go(maze, route, routeCount, bestRoute)
      routeCount = result.routeCount
      bestRoute = result.bestRoute
    }
  }

  // 向下
  if (row + 1 !== maze.length && maze[row + 1][col] === 0) {
    // 判断下一步是否是最后一步
    if (row + 1 === maze.length - 1 && col === maze[row].length - 1) {
      // 通路条数加1
      routeCount++ //.push(baseRoute.concat([[row + 1, col]]))

      // 当前最短通路为空或者长度大于当前计算出的通路，即保存最优路径
      if (bestRoute.length === 0 || bestRoute.length > route.length + 1) {
        bestRoute = route.concat([[row + 1, col]])
      }
    }
    // 不是下一步
    else {
      // 封锁地图当前位置
      maze[row][col] = 4

      // 把下一步放入栈中，继续行走
      route.push([row + 1, col])

      let result = go(maze, route, routeCount, bestRoute)
      routeCount = result.routeCount
      bestRoute = result.bestRoute
    }
  }

  // 向左
  if (col - 1 !== -1 && maze[row][col - 1] === 0) {
    // 封锁地图当前位置
    maze[row][col] = 5

    // 目前的迷宫，不可能向左走和向上走是出口
    // 所以不需要判断下一步是不是出口
    // 把下一步放入栈中，继续行走
    route.push([row, col - 1])

    let result = go(maze, route, routeCount, bestRoute)
    routeCount = result.routeCount
    bestRoute = result.bestRoute
  }

  // 向上
  if (row - 1 !== -1 && maze[row - 1][col] === 0) {
    // 封锁地图当前位置
    maze[row][col] = 6

    route.push([row - 1, col])

    let result = go(maze, route, routeCount, bestRoute)
    routeCount = result.routeCount
    bestRoute = result.bestRoute
  }

  route.pop()

  // 释放当前位置
  maze[row][col] = 0

  return {routeCount, bestRoute}
}

/**
 * @param baseMaze
 * @param baseRoute
 * @returns {{bestRoute: *, routeCount: *}}
 */
function findAllRoutes(baseMaze, baseRoute = [[0, 0]]) {
  // 该方法会改变迷宫和基础路线
  // 需要进行深拷贝
  // 简单数据执行值拷贝
  let {maze} = redisplay(baseMaze, baseRoute)

  return go(maze, baseRoute, 0, [])
}

export {
  initMaze,
  findAllRoutes,
  redisplay
}
