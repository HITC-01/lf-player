require('dotenv').config();

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    awskey: process.env.AWS_KEY,
    awssecret: process.env.AWS_SECRET,
    awsbucket: process.env.AWS_BUCKET,

    aws_s3: {
      options: {
        accessKeyId: '<%= awskey %>',
        secretAccessKey: '<%= awssecret %>',
        region: 'us-west-1',
        uploadConcurrency: 5,
        downloadConcurrency: 5,
      },
      staging: {
        options: {
          bucket: '<%= awsbucket %>',
        },
        files: [
          {
            expand: true,
            cwd: 'public/dist/',
            src: 'player-bundle.min.js',
            dest: 'dist/',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-aws-s3');

  // Default task(s).
  grunt.registerTask('default', ['aws_s3']);
};
