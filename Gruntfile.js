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
        secretAccessKey: '<%= awssecret %>', // You can also use env variables
        region: 'us-west-1',
        uploadConcurrency: 5, // 5 simultaneous uploads
        downloadConcurrency: 5, // 5 simultaneous downloads
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
    s3: {
      options: {
        key: '<%= awskey %>',
        secret: '<%= awssecret %>',
        bucket: '<%= awsbucket %>',
        access: 'public-read',
      },
      dev: {
        upload: [
          {
            src: 'public/dist/player-bundle.min.js',
            dest: 'player-bundle.min.js',
          },
        ],
      },
    },
  });

  // grunt.loadNpmTasks('grunt-s3');
  grunt.loadNpmTasks('grunt-aws-s3');

  // Default task(s).
  grunt.registerTask('default', ['aws_s3']);
};
