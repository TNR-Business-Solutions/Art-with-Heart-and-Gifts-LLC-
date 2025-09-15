#!/usr/bin/env node
/**
 * Script: generateGalleryData.mjs
 * Purpose: Scan public/images, parse artwork filenames, dedupe variants (" - Copy" or duplicates),
 *          infer title, size, and price from patterns, and regenerate src/js/galleryData.js.
 *
 * Filename patterns supported (case-insensitive):
 *   1. "<number>. <Title> <width>in x <height>in $<price>.jpg"
 *   2. "<Title> <width>in x <height>in $<price>.jpg"
 *   3. "<Title>.jpg" (fallback: price null, size empty)
 *   Removes trailing " - Copy".
 */
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const IMAGES_DIR = path.join(ROOT, 'public', 'images');
const OUT_FILE = path.join(ROOT, 'src', 'js', 'galleryData.js');

const priceRegex = /\$(\d+(?:\.\d{1,2})?)/i; // still parsed so it can be stripped but not stored
const sizeRegex = /(\d{1,2})\s*(?:in|inch|inches)\s*[xX]\s*(\d{1,2})\s*(?:in|inch|inches)?/i;
const leadingNumberRegex = /^\s*\d+\.\s*/;

function slugify(str){
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g,'-')
    .replace(/^-+|-+$/g,'')
    .replace(/-{2,}/g,'-');
}

async function main(){
  const files = await fs.readdir(IMAGES_DIR);
  const jpgs = files.filter(f=>/\.(jpe?g|png|webp)$/i.test(f));

  const map = new Map(); // key: base title slug -> data

  for(const file of jpgs){
    let base = file.replace(/\s*-\s*Copy/i,'');
    base = base.replace(/_/g,' ');

    const ext = path.extname(base);
    const nameNoExt = base.slice(0, -ext.length);

    let working = nameNoExt.replace(leadingNumberRegex,'').trim();

    // Extract price
    // Strip price tokens but we won't store price values anymore
    const priceMatch = working.match(priceRegex);
    if(priceMatch){
      working = working.replace(priceMatch[0],'').trim();
    }

    // Extract size
    let size = '';
    const sizeMatch = working.match(sizeRegex);
    if(sizeMatch){
      size = `${sizeMatch[1]}x${sizeMatch[2]}`;
      working = working.replace(sizeMatch[0],'').trim();
    }

    // Clean leftover multiple spaces and stray symbols
    working = working.replace(/\s{2,}/g,' ').replace(/\s+\$/g,'').trim();

    const title = working
      .replace(/\s+[-–]$/,'')
      .replace(/\s{2,}/g,' ')
      .replace(/\b(in)\b/gi,'in')
      .replace(/\b(x)\b/gi,'x')
      .replace(/\b\d+_n$/i,'')
      .trim();

    const id = slugify(title || nameNoExt);

    if(!map.has(id)){
      map.set(id, {
        id,
        title: title || nameNoExt,
        image: `/images/${file}`.replace(/\\/g,'/'),
        alt: `${title || nameNoExt} painting`,
  // price removed per latest requirements
        size,
        type: 'original',
        category: 'Gallery'
      });
    } else {
      // Prefer entry that has size or price if existing lacks
      const existing = map.get(id);
  if(!existing.size && size) existing.size = size;
    }
  }

  // Sort by title
  const items = [...map.values()].sort((a,b)=>a.title.localeCompare(b.title));

  // Remove any lingering price fields just in case
  const sanitized = items.map(i=>{ const {price, ...rest}=i; return rest; });
  const fileContent = `export const galleryItems = ${JSON.stringify(sanitized, null, 2)}\n;\nexport const products = galleryItems;\n`;
  await fs.writeFile(OUT_FILE, fileContent, 'utf8');
  console.log(`Generated ${items.length} gallery items -> ${path.relative(ROOT, OUT_FILE)}`);
}

main().catch(err=>{console.error(err);process.exit(1);});
