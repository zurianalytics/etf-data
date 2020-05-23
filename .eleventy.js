module.exports = function(eleventyConfig) {

    // Add passthrough file copy of generated dir
    eleventyConfig.addPassthroughCopy({"generated/css": "css"});
    eleventyConfig.addPassthroughCopy({"generated/js": "js"});
    eleventyConfig.addPassthroughCopy({"src/images": "images"});
    eleventyConfig.addPassthroughCopy({"src/font": "font"});


    return {
      passthroughFileCopy: true
    }
  }