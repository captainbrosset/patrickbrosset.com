module.exports = function (eleventyConfig, options) {
  eleventyConfig.addTransform("tab", async (content, outputPath) => {
      if (outputPath.includes("/tabs/") &&
          !outputPath.includes("/tabs/index.html")) {
        const hasIntro = content.indexOf("</p>") !== -1;
        const mainStart = hasIntro
          ? content.lastIndexOf("</p>") + 4
          : content.indexOf("<main>") + 6;
        const mainEnd = content.indexOf("</main>");

        const pre = content.substring(0, mainStart);
        const post = content.substring(mainEnd);
        
        let lines = content.substring(mainStart, mainEnd);
        lines = lines.trim().split("\r\n");

        let body = "";
        for (let i = 0; i < lines.length; i += 3) {
            body += `
                <div class="line">
                    <em>${lines[i]}</em>
                    <em>${lines[i + 1]}</em>
                </div>
            `;
        }

        return pre + body + post;
      }

      return content;
  });
};
