<template>
  <div id="app">
    <div class="main">
      <header class="maze-header">
        <h2>迷宫问题实现</h2><sub> 图标来自<a href="https://www.easyicon.net" target="_blank">easyicon</a></sub>
      </header>
      <div class="maze-attr">
        <el-form :inline="true" size="mini">
          <el-form-item label="行数">
            <el-input-number v-model="form.row"
                             :min="limit.min"
                             :max="limit.max"
                             @blur="inputBlur"
                             @change="generateMap"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="列数">
            <el-input-number v-model="form.col"
                             :min="limit.min"
                             :max="limit.max"
                             @blur="inputBlur"
                             @change="generateMap"
            ></el-input-number>
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
        <div class="maze-row"
             v-for="i of form.row"
             :key="`row${i}`">
          <div class="maze-step"
               v-for="j of form.col"
               :class="maze[i-1][j-1] === 1 ? 'obstacle' : ''"
               :key="`col${j}`"
               @click="changeStatus(i,j)"
          ></div>
        </div>
      </div>
      <footer class="maze-result">当前迷宫有100条出路，图中显示为最优解之一</footer>
    </div>
  </div>
</template>

<script>
  /**
   * 生成一个二维数组
   *
   * @param form 包含row,col的值
   * @param random 是否随机
   * @returns {[]}
   */
  const initMaze = function (form, random = false) {
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

  export default {
    data() {
      return {
        form: {
          row: 10,
          col: 10
        },
        // 表单限制
        limit: {
          min: 3,
          max: 20
        },
        // 迷宫记录
        maze: []
      }
    },
    created() {
      this.generateMap()
    },
    methods: {
      // 输入框失去焦点
      inputBlur() {
        // 删除后该组件不会赋默认值，手动赋值
        if (!this.form.row) {
          this.form.row = 10
        } else if (!this.form.col) {
          this.form.col = 10
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
        this.$message(JSON.stringify(this.maze))
      },
      // 在当前位置移除或添加障碍
      changeStatus(i, j) {
        // 如果是第一个或最后一个，则退出
        if ((i === 1 && i === j) || (i === this.form.row && j === this.form.col))
          return

        this.maze[i - 1][j - 1] = this.maze[i - 1][j - 1] ? 0 : 1

        // 考虑到vue对数组支持情况，使用filter
        this.maze = this.maze.filter(item => item)
      }
    },
    components: {}
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
    background: url("./assets/images/obstacle.png") no-repeat center center;
    background-size: 60%;
  }

  // 向左走
  .go-left {
    background: url("./assets/images/left.png") no-repeat center center;
    background-size: 60%;
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
            background: url("./assets/images/start.png") no-repeat center center;
            background-size: 60%;
          }
        }

        // 最后一列每个格子都设置下边框
        &:last-of-type {
          .maze-step {
            border-bottom: $step-border;

            &:last-of-type {
              background: url("./assets/images/end.png") no-repeat center center;
              background-size: 60%;
            }
          }
        }
      }
    }
  }
</style>
