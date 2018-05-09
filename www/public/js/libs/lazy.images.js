var lazyImages = {

    showImage: function (entries, observer) {

        entries.forEach(function (io) {

            if (io.isIntersecting) {

                var image = io.target,
                    src = image.getAttribute("data-src"),
                    srcSet = image.getAttribute("data-srcset");

                if (srcSet) {

                    image.setAttribute("srcset", srcSet);

                }

                if (src) {

                    image.setAttribute("src", src);

                }

            }

        });

    },

    lazyDisplay: function () {

        var images = document.querySelectorAll('.lazy-image');

        var config = {
            // If the image gets within 50px in the Y axis, start the download.
            rootMargin: '50px 0px',
            threshold: 0.01
        };

        // The observer for the images on the page
        var observer = new IntersectionObserver(this.showImage, config);

        images.forEach(function (image) {
            observer.observe(image);
        });

    }

};