'use strict';

//How we define node modules -- on server side course
//Grunt file is a module that will load various grunt plugins
module.exports = function(grunt){
    
    //require grunt plugins
    require('time-grunt')(grunt);

    //make sure every glunt plugin is automatically loaded when used
    //could also be done manually
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });
    
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css' : 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        //Should read the documentation to understand how
        //the configuration is done for each task.
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.scss',
                        '*.html',
                        'js/*.js'
                    ]
                },
                options: {
                    //Meaning there is a watch task running.
                    watchTask: true,
                    server: {
                        baseDir: './'
                    }
                }
            }
        },
        copy: {
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'node_modules/font-awesome',
                    src: ['fonts/*.*'],
                    dest: 'dist'
                }]
            }
        },
        clean:{
            build:{
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: './',
                    src: ['img/*.{png,jpg,gig}'],
                    dest: 'dist/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src: ['contactus.html','aboutus.html','index.html']
            },
            options:{
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    },
                    post: {
                        css: [{
                            name: 'cssmin',
                            createConfig: function(context, block){
                                var generated = context.options.generated;
                                generated.options = {
                                    keepSpecialComments: 0,rebase: false
                                };
                            }
                        }]
                    }
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {

            }
        },
        uglify: {
            dist: {}
        },
        cssmin: {
            dist:{}
        },
        //If someone has visited your site previously,the browser may keep
        //the main.js and main.css file in their local cache and if you
        //update those , when someone revisits your website,
        //the browser does not download them because it has them on the cache
        //Adds additional extendsion to the main name
        //Add a file revision number every time we prepare a dist folder
        //It takes the contents,processed and produces an md5 20 character
        //number attached to the main file.
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            },
        },
        usemin: {
            html: ['dist/contactus.html','dist/aboutus.html','dist/index.html'],
            options: {
                assetsDirs: ['dist','dist/css','dist/js']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhiteSpace: true
                },
                files: {
                    'dist/index.html' : 'dist/index.html',
                    'dist/contactus.html' : 'dist/contactus.html',
                    'dist/aboutus.html' : 'dist/aboutus.html'
                }
            }
        }
    });
    //Configure the sass task
    //Task named scss that executes the sass task that has been configured above.
    grunt.registerTask('css',['sass']);
    //The watch task stops all the other tasks after so it must be done last
    grunt.registerTask('default',['browserSync','watch']);
    grunt.registerTask('build',[
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ])
};