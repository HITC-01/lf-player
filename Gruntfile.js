require('dotenv').config();

module.exports = (grunt) => {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    awskey: process.env.AWS_KEY,
    awssecret: process.env.AWS_SECRET,
    awsbucket: process.env.AWS_BUCKET,
    s3: {
      options: {
        key: '<%= awskey %>',
        secret: '<%= awssecret %>',
        bucket: '<%= awsbucket %>',
        access: 'public-read',
        headers: {
          'Cache-Control': 'max-age=630720000, public',
          Expires: new Date(Date.now() + 63072000000).toUTCString(),
        },
      },
      dev: {
        upload: [
          {
            src: 'public/dist/player-bundle.min.js',
            dest: 'player-bundle.min.js',
          },
          {
            src: 'public/assets/styles/main.css',
            dest: 'main.css',
          },
          {
            src: 'public/assets/styles/clearAll.css',
            dest: 'clearAll.css',
          },
        ],
      },
    },
  });

  grunt.loadNpmTasks('grunt-s3');

  // Default task(s).
  grunt.registerTask('default', ['s3']);
};
