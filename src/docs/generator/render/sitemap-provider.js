import { removeNumberOnStart, toTitleCase } from '../common-provider.js';
import fs from 'fs';
import path from 'path';

export const renderSitemap = (websiteUrl, rootPath, pagesList) => {
  let siteMap = `${ websiteUrl }\n`;

  for(const link of pagesList){
    const formatted = `${ websiteUrl }/pages/${ removeNumberOnStart(link) }.html\n`;
    siteMap += formatted;
  }

  const targetFilePath = path.join(rootPath, 'sitemap.txt')
  fs.writeFileSync(targetFilePath, siteMap, 'utf8');
};

export const updateReadmeDocs = (websiteUrl, rootPath, sideMenuMap, pagesConfig) => {
  const DOCS_START = '## Documentation 🔖';
  const DOCS_END = '------------------------------';

  const readmePath = path.join(process.cwd(), './README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  if(!readme.includes(DOCS_START)) return;

  // create the 'Table of contents'
  let md = `${ DOCS_START }\n`;

  const sections = Array.from(sideMenuMap.keys());

  // sort sections (folders) in the alphanumeric order
  // before removing the beginning number with dash
  sections.sort((item1, item2) => {
    return item1.localeCompare(item2, undefined, {
      numeric: true,
      sensitivity: 'base'
    });
  });

  for(const section of sections) {
    // check if section title appears in pages-config.json
    // otherwise remove dashes and apply title case
    const sectionConfigValue = pagesConfig[`${ section }`];
    const sectionTitle = sectionConfigValue ? sectionConfigValue.title : toTitleCase(removeNumberOnStart(section));

    // find all section links and sort them in alphanumeric order
    // before removing the beginning number with dash
    const links = Array.from(sideMenuMap.get(section));
    links.sort((item1, item2) => {
      return item1.localeCompare(item2, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });

    // add title  --------
    md += `### ${ sectionTitle } \n`;

    for (let i = 0; i < links.length; i++) {
      const link = links[i];
      const codeName = removeNumberOnStart(link);

      // check if page titles appears in pages-config.json
      // otherwise remove dashes and apply title case
      const pagesConfigValue = pagesConfig[`${ link }.md`];
      const title = pagesConfigValue ? pagesConfigValue.title : toTitleCase(codeName);

      const url = `${ websiteUrl }/pages/${ codeName }.html`;
      md += `- [${ title }](${ url })\n`;
    }
  }

  md += `${ DOCS_END }\n`;

  // replace the value in readme
  const regex = new RegExp(`${ DOCS_START }([\\s\\S]*)${ DOCS_END }`, 'gim');
  readme = readme.replace(regex, md);

  fs.writeFileSync(readmePath, readme, 'utf8');
};