import VueRouter from 'vue-router'
import Vue from 'vue'
import home from '../pages/home/home'
import bitcoinBlockchainDevelopment from '../pages/data_statistics/bitcoinBlockchainDevelopment'
import bitcoinSpendingStatistic from '../pages/data_statistics/bitcoinSpendingStatistic'
import communityAnalysis from '../pages/data_analysis/communityAnalysis'
import communityGraph from '../pages/data_analysis/communityGraph'
import illegalActivitiyAnalysis from '../pages/data_analysis/illegalActivitiyAnalysis'
import illegalGraph from '../pages/data_analysis/illegalGraph'
import trackingModel from '../pages/data_analysis/TrackingModel'
import trackingModelShowing from '../pages/data_analysis/TrackingModelShowing'
import addressQuery from '../pages/data_query/addressQuery'
import blockQuery from '../pages/data_query/blockQuery'
import transactionQuery from '../pages/data_query/transactionQuery'
import login from '../pages/login/Login'
import registered from '../pages/login/Registered'
import userCenter from '../pages/different_user/user/userCenter'
import userFinishedTask from '../pages/different_user/user/userFinishedTask'
import userUnfinishedTask from '../pages/different_user/user/userUnfinishedTask'
import singleCluster from '../pages/cluster/singleCluster'
import singleClusterGraph from '../pages/cluster/singleClusterGraph'
import allCluster from '../pages/cluster/allCluster'
import AdminManagement from '../pages/different_user/AdminManagement'
import Admin from '../pages/different_user/Admin'
import systeminfo from '../pages/systeminfo'
import uploadlabel from '../pages/uploadlabel'
import test from '../pages/test'
Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: home,
            meta : {
                title: '比特币区块链数据分析平台'
            }
        },
        {
            path: '/data_query/addressQuery',
            name: 'addressQuery',
            component: addressQuery,
            meta :{
                title: '地址查询'
            }
        },
        {
            path: '/test',
            name: 'test',
            component: test,
            meta :{
                title: 'test'
            }
        },
        {
            path: '/data_query/blockQuery',
            name: 'blockQuery',
            component: blockQuery,
            meta :{
                title: '区块查询'
            }
        },
        {
            path: '/data_query/transactionQuery',
            name: 'transactionQuery',
            component: transactionQuery,
            meta :{
                title: '交易查询'
            }
        },
        {
            path: '/systeminfo',
            name: 'systeminfo',
            component: systeminfo,
            meta :{
                title: '系统简介'
            }
        },
        {
            path: '/uploadlabel',
            name: 'uploadlabel',
            component: uploadlabel,
            meta :{
                title: '上传标签'
            }
        },
        {
            path: '/data_statistics/bitcoinBlockchainDevelopment',
            name: 'bitcoinBlockchainDevelopment',
            component: bitcoinBlockchainDevelopment,
            meta :{
                title: '每日发展情况统计'
            }
        },
        {
            path: '/data_statistics/bitcoinSpendingStatistic',
            name: 'bitcoinSpendingStatistic',
            component: bitcoinSpendingStatistic,
            meta :{
                title: '花费情况统计'
            }
        },
        {
            path: '/data_analysis/communityAnalysis',
            name: 'communityAnalysis',
            component: communityAnalysis,
            meta :{
                title: '行业活动分析'
            }
        }, {
            path: '/data_analysis/communityGraph',
            name: 'communityGraph',
            component: communityGraph,
        }, {
            path: '/data_analysis/illegalActivitiyAnalysis',
            name: 'illegalActivitiyAnalysis',
            component: illegalActivitiyAnalysis,
            meta :{
                title: '非法活动分析'
            }
        }, {
            path: '/data_analysis/illegalGraph',
            name: 'illegalGraph',
            component: illegalGraph
        }, {
            path: '/data_analysis/trackingModel',
            name: 'trackingModel',
            component: trackingModel,
            meta :{
                title: '资金链追踪'
            }
        }, {
            path: '/data_analysis/trackingModelShowing',
            name: 'trackingModelShowing',
            component: trackingModelShowing
        }, {
            path: '/cluster/singleCluster',
            name: 'singleCluster',
            component: singleCluster,
            meta :{
                title: '单地址聚类'
            }
        }, {
            path: '/cluster/singleClusterGraph',
            name: 'singleClusterGraph',
            component: singleClusterGraph,
            meta :{
                title: '单地址聚类'
            }
        }, {
            path: '/cluster/allCluster',
            name: 'allCluster',
            component: allCluster,
            meta :{
                title: '地址全量聚类'
            }
        }, {
            path: '/Login',
            name: 'login',
            component: login,
            meta :{
                title: '登录'
            }
        },
        {
            path: '/Registered',
            name: 'registered',
            component: registered,
            meta :{
                title: '注册'
            }
        },
        {
            path: '/userCenter',
            name: 'userCenter',
            component: userCenter,
            meta :{
                title: '用户中心'
            },
            children: [{
                    path: 'userFinishedTask',
                    name: 'userFinishedTask',
                    component: userFinishedTask
                },
                {
                    path: 'userUnfinishedTask',
                    name: 'userUnfinishedTask',
                    component: userUnfinishedTask
                }
            ]
            
        },{
            path: '/Admin',
            name: 'Admin',
            component: Admin,
            meta: {
                title: '管理员中心'
            },
            children: [{
                path: '/AdminManagement',
                name: 'AdminManagement',
                component: AdminManagement,
            }]
        }
    ]
})