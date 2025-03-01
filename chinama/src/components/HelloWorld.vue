<script setup>
import VueNeo4j from 'vue-neo4j';
let app = createApp(App);
app.use(VueNeo4j );
</script>

<template>
  <div class="neo4jMain">
    <div class="addContent">
      <el-form :inline="true" :model="formInline" :rules="rules" ref="neo4jform">
        <el-form-item label="开始节点名称" prop="startNode">
          <el-input v-model="formInline.startNode" placeholder="请输入开始节点名称"></el-input>
        </el-form-item>
        <el-form-item label="关系名称" prop="relationName">
          <el-input v-model="formInline.relationName" placeholder="请输入关系名称"></el-input>
        </el-form-item>
        <el-form-item label="结束节点名称" prop="endNode">
          <el-input v-model="formInline.endNode" placeholder="请输入结束节点名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
<!--          <el-button type="primary" @click="onDelete">清空表</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div class="echarts" ref="echarts">
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: "Main.vue",
  mounted() {
    this.query();
  },
  data() {
    return {
      formInline: {
        startNode: '',
        endNode: '',
        relationName: ''
      },
      rules: {
        startNode: [{required: true, trigger: 'blur'}],
        endNode: [{required: true, trigger: 'blur'}],
        relationName: [{required: true, trigger: 'blur'}]
      },
      protocol: 'bolt',
      host: '127.0.0.1',
      port: 7687,
      username: 'neo4j',
      password: '12345678',
      echartsData: [],
      nodesRelation: []
    }
  },
  methods: {
    onDelete() {
      this.connect();
      const session = this.$neo4j.getSession();
      let cypher = `match p=(n:Person)-[]->(m:Person) delete p `;
      session.run(cypher);
      cypher = `MATCH (n:Person) delete n`;
      session.run(cypher).then(() => {
        session.close()
      });
      this.query();
    },
    initEcharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(this.$refs.echarts)
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'Neo4j 图谱关系'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            type: 'graph',
            layout: 'force',
            force: {
              edgeLength: 40,
              repulsion: 50,
              gravity: 0.1
            },
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: this.echartsData,
            // links: [],
            links: this.nodesRelation,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      });
    },
    query() {
      this.connect();
      const session = this.$neo4j.getSession();
      let cypher = `match p=(n:Person)-[]->(m:Person) return p limit 1000`;
      session.run(cypher).then(res => {
        let records = res.records;
        let nodes = new Set();
        this.nodesRelation = [];
        for (let i = 0; i < records.length; i++) {
          nodes.add(records[i]._fields[0].segments[0].start.properties.name);
          nodes.add(records[i]._fields[0].segments[0].end.properties.name);
          this.nodesRelation.push({
            source: records[i]._fields[0].segments[0].start.properties.name,
            target: records[i]._fields[0].segments[0].end.properties.name,
            lineStyle: {
              curveness: 0
            },
            label: {
              show: true,
              formatter: function() {
                return records[i]._fields[0].segments[0].relationship.type
              }
            }
          });
        }
        let curveness = [0, 0.4, -0.4, 0.3, -0.3, 0.2, -0.2, 0.1, -0.1];
        for (let j = 0; j < this.nodesRelation.length; j++) {
          let repeatNumber = 0;
          for (let s = j+1; s < this.nodesRelation.length; s++) {
            let r1 = this.nodesRelation[j];
            let r2 = this.nodesRelation[s];
            if (r1.source === r2.source &&
                r1.target === r2.target) {
              repeatNumber =  repeatNumber + 1;
            }
            else if (r1.target === r2.source &&
                r1.source === r2.target) {
              repeatNumber =  repeatNumber + 1;
            }
          }
          this.nodesRelation[j].repeatNumber = repeatNumber;
        }
        for (let j = 0; j < this.nodesRelation.length; j++) {
          console.log(this.nodesRelation[j].repeatNumber);
          this.nodesRelation[j].lineStyle.curveness = curveness[this.nodesRelation[j].repeatNumber];
        }


        this.echartsData = [];
        nodes.forEach((e) => {
          let index = Math.ceil(Math.random()*10);
          let color = () => {
            if (index%4===0) {
              return '#228B22'
            } else if (index%4===1) {
              return '#FFFF00'
            } else if (index%4===2) {
              return '#20B2AA'
            } else if (index%4===3) {
              return '#FFB6C1'
            }
            return '#87CEFA';
          }
          this.echartsData.push({
            name: e,
            x: Math.random() * 100,
            y: Math.random() * 100,
            itemStyle: {
              color: color()
            }
          });
        })
        this.initEcharts();
      }).then(() => {
        session.close()
      });
    },
    onSubmit() {
      this.$refs.neo4jform.validate((valid) => {
        if (valid) {
          this.connect();
          const session = this.$neo4j.getSession();
          let cypher = `Merge (n:Person{name: '${this.formInline.startNode}'})
          Merge (m:Person{name: '${this.formInline.endNode}'}) Merge (n)-[r:${this.formInline.relationName}]->(m)`;
          session.run(cypher).then(() => {
            this.formInline = {
              startNode: '',
              endNode: '',
              relationName: ''
            };
            this.query();
          }).then(() => {
            session.close()
          });
        }
      })
    },
    connect() {
      return this.$neo4j.connect(this.protocol, this.host, this.port, this.username, this.password);
    },
    driver() {
      // Get a driver instance
      return this.$neo4j.getDriver()
    },
    testQuery() {
      // Get a session from the driver
      const session = this.$neo4j.getSession()

      // Or you can just call this.$neo4j.run(cypher, params)
      session.run('MATCH (n) RETURN n')
          .then(res => {
            console.log(res)
            // console.log(res.records[0].get('count'))
          })
          .then(() => {
            session.close()
          })
    }
  }
}
</script>

<style scoped lang="less">
.neo4jMain {
  height: 100%;
  display: flex;
  flex-direction: column;
  .addContent {
    padding: 15px;
    box-shadow: -10px 0 10px #D3D3D3, /*左边阴影*/ 10px 0 10px #D3D3D3, /*右边阴影*/
      0 -10px 10px #D3D3D3, /*顶部阴影*/ 0 10px 10px #D3D3D3;
  }

  .echarts {
    background-color: #333;
    flex: 1;
    flex-grow: 1;
  }
}
</style>
