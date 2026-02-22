const fs = require('fs');
let content = fs.readFileSync('src/data/blogContent.js', 'utf8');

// 1. Remove multiple blank lines (reduce 3+ blank lines to 2)
content = content.replace(/\n{4,}/g, '\n\n\n');

// 2. Ensure proper spacing around headings (at least one blank line before and after)
// Note: We don't want to mess up the JS object structure, so we only target markdown headings `### `
// Actually, it's safer to just do basic cleanups.

// 3. Remove common placeholders
content = content.replace(/\[Insert image here\]/gi, '');
content = content.replace(/\[Add content here\]/gi, '');
content = content.replace(/TODO:.*?\n/gi, '');
content = content.replace(/FIXME:.*?\n/gi, '');
content = content.replace(/Lorem ipsum.*?(\n|$)/gi, '');

// Let's do a more robust approach: iterate over blogContentData
const Module = module.constructor;
const m = new Module();
m._compile(`module.exports = ${content.replace('export const blogContentData =', '')}`, 'tmp.js');
const blogData = m.exports;

let modifiedContent = content;

Object.keys(blogData).forEach(id => {
    let blog = blogData[id];
    let originalMarkdown = blog.content;
    let newMarkdown = originalMarkdown;

    // Clean up excessive blank lines inside the markdown content specifically
    newMarkdown = newMarkdown.replace(/\n{4,}/g, '\n\n\n');

    // Ensure headings have a blank line before them (if not at start)
    newMarkdown = newMarkdown.replace(/([^\n])\n(### .*)/g, '$1\n\n$2');

    // Ensure code blocks have a blank line before them
    newMarkdown = newMarkdown.replace(/([^\n])\n(```.*)/g, '$1\n\n$2');

    // Ensure lists are properly spaced from preceding paragraphs
    newMarkdown = newMarkdown.replace(/([^\n])\n(- .*)/g, '$1\n\n$2');
    // Re-collapse consecutive list items (we just added newlines between ALL list items, let's fix that)
    newMarkdown = newMarkdown.replace(/\n\n(- .*)/g, '\n\n$1'); // Actually, this is tricky. Let's rely on standard regex.

    // Better list spacing: only add newline before a list item if the PREVIOUS line is NOT a list item or empty
    newMarkdown = originalMarkdown.split('\n').map((line, idx, arr) => {
        if (line.startsWith('- ') && idx > 0 && !arr[idx - 1].startsWith('- ') && arr[idx - 1].trim() !== '') {
            return '\n' + line;
        }
        if (line.startsWith('### ') && idx > 0 && arr[idx - 1].trim() !== '') {
            return '\n' + line;
        }
        if (line.startsWith('\`\`\`') && idx > 0 && arr[idx - 1].trim() !== '') {
            return '\n' + line;
        }
        return line;
    }).join('\n');

    // Reduce excessive newlines to max 2
    newMarkdown = newMarkdown.replace(/\n{3,}/g, '\n\n');

    // Strip trailing whitespace
    newMarkdown = newMarkdown.split('\n').map(l => l.trimRight()).join('\n');

    // Substitute back in
    if (originalMarkdown !== newMarkdown) {
        // Need to escape replacement string cautiously
        // So we don't accidentally replace wrong things. The best way is to reconstruct the JS or use a smart replace.
        // Let's use string replace on the full content string.
        modifiedContent = modifiedContent.replace(originalMarkdown, newMarkdown);
    }
});

// Write it back
if (content !== modifiedContent) {
    fs.writeFileSync('src/data/blogContent.js', modifiedContent, 'utf8');
    console.log('Blog formatting cleaned up successfully.');
} else {
    console.log('No formatting changes were necessary.');
}
