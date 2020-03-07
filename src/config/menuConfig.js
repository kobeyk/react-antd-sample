const menuList = [
    {
        title: "首页",
        key: "/home",
        icon: "home"
    },
    {
        title: "商品",
        icon: "appstore",
        key:"goods",
        children: [
            {
                title: "品类管理",
                key: "/category",
                icon: "bars"
            }, {
                title: "商品管理",
                key: "/goods",
                icon: "tool"
            }
        ]
    }, {
        title: "用户管理",
        key: "/user",
        icon: "user"
    }, {
        title: "权限管理",
        key: "/role",
        icon: "tool"
    },{
        title: "统计图",
        icon: "bar-chart",
        key:"charts",
        children: [
            {
                title: "柱状体",
                key: "/charts/bar",
                icon: "bar-chart"
            }, {
                title: "折线图",
                key: "/charts/line",
                icon: "line-chart"
            },{
                title: "饼状图",
                key: "/charts/pie",
                icon: "pie-chart"
            }
        ]
    }
]

export default menuList