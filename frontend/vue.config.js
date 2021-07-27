const path = require('path');
const fs = require('fs');
const pathContext = ['api'];
const proxyHost = 'localhost: 3000';
module.exports = {
  devServer: {
    stats: 'errors-only',
    progress: false,
    port: 8090,
    proxy: {
      [pathContext]: {
        target: 'http://' + proxyHost,
        secure: false,
        changeOrigin: true,
        bypass(req, res) {
          if (fs.existsSync(path.join(__dirname, 'mock', 'match.rules.js'))) {
            // 实时读取，更改mock配置后不用重启webpack
            let map = fs.readFileSync(
              path.join(__dirname, 'mock', 'match.rules.js'),
              'utf-8'
            );
            map = map.replace(/(?:^|\n|\r)\s*\/\/.*(?:\r|\n|$)/g, '').trim();
            console.log(req.url);
            if (map) {
              console.log(map);
              map = JSON.parse(map)[0];
              for (let x in map) {
                if (req.url.indexOf(x) > -1) {
                  console.log(
                    'mapped local:',
                    path.join(__dirname, 'mock', map[x]).replace(/\\/g, '/')
                  );
                  res.sendFile(path.join(__dirname, 'mock', map[x]));
                }
              }
            }
          }
        },
      },
    },
  },
};
