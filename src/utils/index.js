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
        row.push(random ? Math.random() * 1000 > 900 ? 1 : 0 : 0)
      }
    }

    maze.push(row)
  }
  return maze
}

/**
 * 计算一条可行的出路
 *
 * @param baseMaze 初始迷宫
 * @returns {{maze: *, ruleWay: *}}
 */
function calculate(baseMaze) {
  // 简单数据执行值拷贝
  let maze = JSON.parse(JSON.stringify(baseMaze))
  // 按照右下左的顺序规则最快计算出的一条出路
  // 包含出路点的坐标
  let ruleWay = []

  function autoGo(i, j) {
    // 当前位置是终点？
    if (i === maze.length - 1 && j === maze[i].length - 1) {
      return
    }
    // 不是终点，记录当前位置
    ruleWay.push([i, j])

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

  return {
    ruleWay,
    maze
  }
}

export {
  initMaze,
  calculate
}
