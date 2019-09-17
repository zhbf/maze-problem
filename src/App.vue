<template>
  <div id="app">
    <div class="main">
      <header class="maze-header">
        <h2>迷宫问题实现-<a href="https://zhoubangfu.com/">之间</a></h2>
        <sub> 图标来自
          <a
            href="https://www.easyicon.net"
            target="_blank">easyicon</a>
        </sub>
      </header>
      <div class="maze-attr">
        <el-form :inline="true" size="mini">
          <el-form-item label="行数">
            <el-input-number
              v-model="form.row"
              :min="limit.min"
              :max="limit.max"
              @blur="inputBlur"
              @change="generateMap"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="列数">
            <el-input-number
              v-model="form.col"
              :min="limit.min"
              :max="limit.max"
              @blur="inputBlur"
              @change="generateMap"
            ></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-button @click="generateMap">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="calculate">计算</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="autoObstacle">随机障碍</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="maze-body">
        <div
          class="maze-row"
          v-for="i of form.row"
          :key="`row${i}`">
          <div
            class="maze-step"
            v-for="j of form.col"
            :class="mazeStyle[displayMaze[i-1][j-1]]"
            :key="`col${j}`"
            @click="changeStatus(i,j)"
          ></div>
        </div>
      </div>
      <footer class="maze-result">当前迷宫有{{result.routeCount}}条出路，图中显示为最优解之一</footer>
    </div>
  </div>
</template>

<script>
  import {initMaze, redisplay, findAllRoutes} from '@/utils'

  /**
   * 规则0-可过，1-障碍，2-死胡同，3-往右，4-往下，5-往左，6-往上
   */
  export default {
    data() {
      return {
        form: {
          row: 4,
          col: 4
        },
        // 表单限制
        limit: {
          min: 2,
          max: 10
        },
        // 迷宫
        maze: [],
        displayMaze: [],
        // 迷宫位置样式
        mazeStyle: [
          '',
          'obstacle',
          '',
          'go-right',
          'go-down',
          'go-left',
          'go-up'
        ],
        // 是否已经计算过了
        // 计算过在布置障碍的时候，需要深度遍历
        calculated: false,
        // 计算出的路线总汇
        result: {routeCount: 0, bestRoute: []}
      }
    },
    watch: {
      maze(val) {
        this.displayMaze = val
      }
    },
    created() {
      this.generateMap()
      this.displayMaze = this.maze
    },
    methods: {
      // 输入框失去焦点
      inputBlur() {
        // 删除后该组件不会赋默认值，手动赋值
        if (!this.form.row) {
          this.form.row = 5
        } else if (!this.form.col) {
          this.form.col = 5
        }
      },
      // 生成地图
      generateMap() {
        this.maze = initMaze(this.form)
      },
      // 生成障碍
      autoObstacle() {
        this.maze = initMaze(this.form, true)
      },
      // 计算
      calculate() {
        // 设置已计算过
        this.calculated = true
        this.result = findAllRoutes(this.maze)

        if (this.result.routeCount === 0) {
          this.$message.error('没有出路！！！')
        } else {
          this.displayMaze = redisplay(this.maze, this.result.bestRoute).maze
        }
      },
      // 在当前位置移除或添加障碍
      changeStatus(i, j) {
        // 如果是第一个或最后一个，则退出
        if ((i === 1 && i === j) || (i === this.form.row && j === this.form.col))
          return

        // 设置障碍
        this.maze[i - 1][j - 1] = this.maze[i - 1][j - 1] ? 0 : 1

        // 重置一下地图
        if (this.calculated) {
          this.calculated = false
          this.maze = this.maze.map(row => row.map(col => col !== 1 ? 0 : 1))
        } else {
          // 简单重塑maze
          this.maze = this.maze.filter(() => true)
        }
      }
    }
  }
</script>

<style lang="scss">
  // 小方格border
  $step-border: 1px solid;

  #app {
    display: flex;
    justify-content: center;
  }

  // 障碍
  .obstacle {
    background-image: url("./assets/images/obstacle.png");
  }

  // 向左走
  .go-left {
    background-image: url("./assets/images/left.png");
  }

  .go-right {
    background-image: url("./assets/images/right.png");
  }

  .go-up {
    background-image: url("./assets/images/up.png");
  }

  .go-down {
    background-image: url("./assets/images/down.png");
  }

  .main {
    width: 610px;

    .maze-header {
      padding: 18px 0;

      h2 {
        display: inline-block;
      }
    }

    .maze-body {
      width: 100%;
      height: 600px;
      padding: 15px;
      margin-bottom: 15px;
      box-sizing: border-box;
      border: 1px solid #cfcfcf;
      display: flex;
      // 让每一行按纵向排列
      flex-direction: column;

      .maze-row {
        // 纵向平均分布
        flex: 1;
        // 将自己设置成弹性容器
        display: flex;

        .maze-step {
          cursor: pointer;
          // 水平平均分布
          flex: 1;
          // 用div的病
          display: inline-block;
          box-sizing: border-box;
          background: {
            size: 60%;
            repeat: no-repeat;
            position: center center;
          }

          // 所以小格子都设置左上边框
          border: {
            top: $step-border;
            left: $step-border;
          }

          // 每行最后一个设置右边框
          &:last-of-type {
            border: {
              right: $step-border;
            }
          }
        }

        // 第一排第一个
        &:first-of-type {
          .maze-step:first-of-type {
            background-image: url("./assets/images/start.png");
          }
        }

        // 最后一列每个格子都设置下边框
        &:last-of-type {
          .maze-step {
            border-bottom: $step-border;

            &:last-of-type {
              background-image: url("./assets/images/end.png");
            }
          }
        }
      }
    }
  }
</style>
