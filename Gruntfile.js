'use strict';

//How we define node modules -- on server side course
//Grunt file is a module that will load various grunt plugins
module.exports = function(grunt){
    
    //require grunt plugins
    require('time-grunt')(grunt);

    //make sure every glunt plugin is automatically loaded when used
    //could also be done manually
    require('jit-grunt')(grunt);
    
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
        }
    });
    //Configure the sass task
    //Task named scss that executes the sass task that has been configured above.
    grunt.registerTask('css',['sass']);
    //The watch task stops all the other tasks after so it must be done last
    grunt.registerTask('default',['browserSync','watch']);
};