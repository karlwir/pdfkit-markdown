import PDFDocument from 'pdfkit';
import remarkParse from 'remark-parse';
import { unified } from 'unified';
import fs from 'fs';

import { MarkdownRenderer } from '../src';
import { Root } from 'mdast';

const generateExample = () => {
    const doc = new PDFDocument();

    doc.pipe(fs.createWriteStream('example.pdf'));

    const tree = unified().use(remarkParse).parse(
        "# Heading 1\n\nLorem ipsum dolor sit amet, **bold inline** adipiscing elit. Etiam in suscipit purus.\nNew line ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis fringilla hendrerit. Ut nec accumsan nisl.\n\nLorem ipsum dolor sit amet, adipiscing elit. Etiam in suscipit purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis *italic text*. Ut nec accumsan nisl.\n\n## Heading 2\n\nVestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus nec hendrerit felis. Morbi aliquam facilisis risus eu lacinia. Sed eu leo in turpis *italic text*. Ut nec accumsan nisl.\n\n### Bullet list\n\n* **List item**\n  New line\n  1. List item\n  2. List item\n\n### Numbered list\n\n1. List item\n   New line\n2. **List item**\n   * List item\n      New line\n   * List item"
    );

    new MarkdownRenderer(doc, {
        paragraphGap: 8,
        listItemGap: 10,
        listItemIndent: 10,
        headerGapSize: (depth) => {
            switch (depth) {
                case 1:
                    return 6;
                case 2:
                    return 4;
                case 3:
                    return 2;
                default:
                    return 0;
            }
        },
        headerFontSize: (depth) => {
            switch (depth) {
                case 1:
                    return 20;
                case 2:
                    return 16;
                case 3:
                    return 12;
                default:
                    return 10;
            }
        },
    }).render(tree as Root);
};

generateExample();