const UglifyJS = require("uglify-js"),
    fs = require("fs"),
    path = require("path"),
    srcFiles = [],
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

            if(!Array.isArray(src)){

                src = [src];

            }

            src.forEach((item, index) => {

                srcFiles[index] = path.resolve(item);

            });

        }

    }

    transformSrc(srcFiles) {

        let src = {};

        srcFiles.forEach(element => {

            let source = fs.readFileSync(element, utf8);

            src[path.basename(element).replace(/\./g, "")] = source;

        });

        return src;

    }

    minify() {

        let src = this.transformSrc(srcFiles);

        return UglifyJS.minify(src, uglifyOptions);

    }

}

exports.uglify = uglify;