module.exports = function(grunt){
    require("time-grunt")(grunt);
    grunt.loadNpmTasks('grunt-karma');
    require("jit-grunt")(grunt,{
        typescript:"grunt-ts"
    });
    var appConfig = {
        src:"src",
        bower:"bower_components",
        dist:"dist",
        tests:"tests"
    };

    grunt.initConfig({
        appConfig:appConfig,
        karma: {
            test: {
                configFile: 'karma.conf.js'
            }
        },
        clean:{
            dist:{
                files:[
                    {
                        dot:true,
                        src:[
                            "<%=appConfig.dist %>",
                            "<%=appConfig.dist %>/.git{,*/}*"
                        ]
                    }
                ]
            },
            js:{
                files:[
                    {
                        dot: true,
                        src: [
                            "<%=appConfig.dist %>/**/{,*/}.js",
                            "<%=appConfig.dist %>/**/{,*/}.map"
                        ]
                    }

                ]
            },
            before:{
                files:[
                    {
                        dot:true,
                        src:[
                            "<%=appConfig.src %>/**/.baseDir.js",
                            "<%=appConfig.dist %>/**/.baseDir.js"
                        ]
                    }
                ]
            }
        },
        ts:{
            build:{
                src:["<%= appConfig.src %>/**/{,*/}*.ts"],
                dest:"<%= appConfig.src %>",
                options: {
                    target: 'es5',
                    sourceMap: false,
                    declaration: false,
                    noEmitOnError:false,
                    failOnTypeErrors: false
                }
            },
            dist:{
                src: ['<%= appConfig.src %>/**/{,*/}*.ts'],
                dest: '<%= appConfig.dist %>',
                options: {
                    target: 'es5',
                    sourceMap: false,
                    declaration: false,
                    noEmitOnError:false,
                    failOnTypeErrors: false
                }
            }
        }

    });
    grunt.registerTask("test",[
        "karma"
    ]);
    grunt.registerTask("default",[
        "dist"
    ]);
    grunt.registerTask("build",[
        "clean:js",
        "ts:build",
        "clean:before"
    ]);
    grunt.registerTask("dist",[
        "clean:dist",
        "ts:dist",
        "test",
        "clean:before"
    ]);
};
