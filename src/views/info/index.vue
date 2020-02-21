<template>
    <div id="info-wrapper">
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap">
                    <label for="">类型：</label>
                    <div class="wrap-content">
                        <el-select v-model="value" placeholder="请选择" style="width:100%;">
                        <el-option v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap">
                    <label for="">时间：</label>
                    <div class="wrap-content">
                        <el-date-picker
                            style="width:100%;"
                            v-model="value2"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap">
                    <label for="">关键字：</label>
                    <div class="wrap-content">
                        <el-select v-model="value3" placeholder="请选择" style="width:80px;">
                            <el-option v-for="item in options2"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3"> 
                <el-input v-model="search_word" placeholder="请输入内容" style="width:100%;"></el-input>
            </el-col>
            <el-col :span="2"> 
                <el-button type="danger" style="width:80px;height:100%;">搜索</el-button>
            </el-col>
            <el-col :span="5" > 
                <el-button @click="addInfo" type="danger" class="pull-right" style="width:80px;height:100%;float:right;">新增</el-button>
            </el-col>
        </el-row>

        <!-- table data -->
        <el-table :data="tableData" border align="center" style="width: 100%;margin-top:15px;">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="标题" width="400"></el-table-column>
            <el-table-column  prop="category" label="类型" width="130"></el-table-column>
            <el-table-column prop="date" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理人" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="success"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-row style="padding-top:30px;">
            <el-col :span="12">
                <el-button size="medium ">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination>
            </el-col>
        </el-row>

    <!-- dialog -->
    <add-dialog-info :updataData="data" :flag='dialog_info' @change="change_dialog"></add-dialog-info>


    </div>    
</template>
<script>
import {GetCategory} from '@/api/news'
import AddDialogInfo from './dialog/info'
export default {
    name:'InfoPage',
    components:{AddDialogInfo},
    data() {
        return {
            formInline:{},
            data:{},
           options: [{
            value: 1,
            label: '国际信息'
            }, {
            value: 2,
            label: '国内信息'
            }, {
            value: 3,
            label: '行内信息'
            }],
            options2: [
                { value: 'id',label: 'ID'},
                { value: 'title',label: '标题'}
            ],
            tableData: [
                {
                title:'新浪文本',
                category:'国内信息',
                date: '2016-05-02 02:21:25',
                user: '王小虎'
                },
                {
                title:'新浪文本',
                category:'国内信息',
                date: '2016-05-02 02:21:25',
                user: '王小虎'
                }],
            value:'',
            value2:'',
            value3:'id',
            search_word:'',
            currentPage4:1, 
            dialog_info:false
        }
    },
    created() {
    },
    methods: {
        change_dialog(val){
            this.dialog_info = val;
        },
        // add user
        addInfo(){
            this.dialog_info =true;
            this.data = {};
            console.log(this.dialog_info)
        },
        //edition user
         handleEdit(index, row) {
            this.dialog_info =true;
            this.data = row;
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    mounted() {
         GetCategory({}).then(res=>{
          console.log(res,6666)
        }).catch(err=>{
           this.$message.error(err.message);
        });
    },
}
</script>
<style lang="less" scoped>
@import url('./style.less');
</style>