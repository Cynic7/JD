({
    paths: {//打包文件的路径,
        reg:'./src/script/js/reg',
		config:'./src/script/js/config',
		reg_validata:'./src/script/js/reg_validata',
    },
    name: 'reg', // 模块入口
    out: "dist/main-build.js", // 输出压缩后的文件位置
})