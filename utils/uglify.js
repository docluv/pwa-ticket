const UglifyJS = require("uglify-js"),
    fs = require("fs"),
    path = require("path"),
    srcPath = "",
    uglifyOptions = {
        parse: {
            html5_comments: false,
            shebang: false
        },
        compress: {
            drop_console: true,
            keep_fargs: false
        }
    },
    utf8 = "utf8";

class uglify {

    constructor(src) {

        if (src && src !== "") {

            srcPath = path.resolve(src);

        }

    }

    transformSrc(srcFiles) {

        let src = {};

        srcFiles.forEach(element => {

            let source = fs.readFileSync(path.join(srcPath, element), utf8);

            src[path.basename(element), source];

        });

        return src;

    }

    minify(srcFiles) {

        let src = this.transformSrc(srcFiles);

        return UglifyJS.minify(src, options);

    }

}