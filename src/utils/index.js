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
        row.push(random ? Math.random() * 1000 > 700 ? 1 : 0 : 0)
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
 * 计算一条可行的出路
 *
 * @param baseMaze 初始迷宫
 * @returns {{maze: *, ruleWay: *}}
 */
function findOneRoute(baseMaze) {
  // 简单数据执行值拷贝
  let maze = JSON.parse(JSON.stringify(baseMaze))
  // 按照右下左的顺序规则最快计算出的一条出路
  // 包含出路点的坐标
  let ruleWay = []

  function autoGo(i, j) {
    // 不是终点，记录当前位置
    ruleWay.push([i, j])

    // 当前位置是终点？
    if (i === maze.length - 1 && j === maze[i].length - 1) {
      return
    }

    // 判断右边能走不
    // 不能走出右边界
    if (j + 1 !== maze[i].length && maze[i][j + 1] === 0) {
      // 将地图上这个位置标记为行走方向
      maze[i][j] = 3
      autoGo(i, j + 1)
    }
    // 右边不能走，走下边
    //也不能走出下边界
    else if (i + 1 !== maze.length && maze[i + 1][j] === 0) {
      // 将地图上这个位置标记为行走方向
      maze[i][j] = 4
      autoGo(i + 1, j)
    }
    // 右边下边都不能走，走左边
    // 还不能走出左边界
    else if (j - 1 !== -1 && maze[i][j - 1] === 0) {
      // 将地图上这个位置标记为行走方向
      maze[i][j] = 5
      autoGo(i, j - 1)
    }
    // 右下左走不通，往上走
    // 也不能走出上边界
    else if (i - 1 !== -1 && maze[i - 1][j] === 0) {
      // 将地图上这个位置标记为行走方向
      maze[i][j] = 6
      autoGo(i - 1, j)
    }
    // 几个方向都走不通，只有向回退了
    // 当前位置没有下一步可走了，把当前位置标记为无路可走状态3
    else {
      // 0-可过，1-障碍，2-死胡同
      maze[i][j] = 2
      // 将记录的当前位置移除
      ruleWay.pop()
      // 将上一步也移除，重新走过
      let lastStep = ruleWay.pop()
      // 如果没有上一步，就没有出路
      if (lastStep) {
        // 同时将上一步位置标记为可走状态
        maze[lastStep[0]][lastStep[1]] = 0
        // 重新走上一步
        autoGo(lastStep[0], lastStep[1])
      }
    }
  }

  autoGo(0, 0)

  return redisplay(baseMaze, ruleWay)
}

/**
 *
 * @param maze
 * @param baseRoute
 * @param routeList
 * @returns {Array[]}
 */
function go(maze = [[]], baseRoute = [[]], routeList = [[]]) {
  let location = baseRoute.pop()

  // 如果没有，直接返回
  if (!location) {
    return routeList
  }

  const row = location[0]
  const col = location[1]

  // 判断向右下左上是否是最后一步

  // 向右，第一不越界，第二这个位置还可以向右，第三地图上向右这个位置可行
  if (col + 1 !== maze[row].length && maze[row][col + 1] === 0) {
    // 放回栈中
    baseRoute.push(location)
    // 判断下一步是否是最后一步
    if (row === maze.length - 1 && col + 1 === maze[row].length - 1) {
      routeList.push(baseRoute.concat([[row, col + 1]]))
    }
    // 不是最后一步
    else {
      // 封锁地图当前位置
      maze[row][col] = 3

      // 把下一步放入栈中，继续行走
      baseRoute.push([row, col + 1])

      routeList = go(maze, baseRoute, routeList)
    }

    // 将当前位置pop
    baseRoute.pop()
  }

  // 向下
  if (row + 1 !== maze.length && maze[row + 1][col] === 0) {
    // 放回栈中
    baseRoute.push(location)

    // 判断下一步是否是最后一步
    if (row + 1 === maze.length - 1 && col === maze[row].length - 1) {
      routeList.push(baseRoute.concat([[row + 1, col]]))
    }
    // 不是下一步
    else {
      // 封锁地图当前位置
      maze[row][col] = 4

      // 把下一步放入栈中，继续行走
      baseRoute.push([row + 1, col])

      routeList = go(maze, baseRoute, routeList)
    }

    // 将当前位置pop
    baseRoute.pop()
  }

  // 向左
  if (col - 1 !== -1 && maze[row][col - 1] === 0) {
    baseRoute.push(location)

    // 封锁地图当前位置
    maze[row][col] = 5

    // 目前的迷宫，不可能向左走和向上走是出口
    // 所以不需要判断下一步是不是出口
    // 把下一步放入栈中，继续行走
    baseRoute.push([row, col - 1])

    go(maze, baseRoute, routeList)
    // 将当前位置pop
    baseRoute.pop()
  }

  // 向上
  if (row - 1 !== -1 && maze[row - 1][col] === 0) {
    baseRoute.push(location)

    // 封锁地图当前位置
    maze[row][col] = 6

    baseRoute.push([row - 1, col])

    go(maze, baseRoute, routeList)
    // 将当前位置pop
    baseRoute.pop()
  }

  // 释放当前位置
  maze[row][col] = 0

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
function findAllRoutes(baseMaze, baseRoute = [[0, 0]], routeList = []) {
  // 该方法会改变迷宫和基础路线
  // 需要进行深拷贝
  // 简单数据执行值拷贝
  let {maze} = redisplay(baseMaze, baseRoute)

  return go(maze, baseRoute, routeList)
}

export {
  initMaze,
  findOneRoute,
  findAllRoutes,
  redisplay
}
