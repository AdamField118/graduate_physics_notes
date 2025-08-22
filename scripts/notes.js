// Dynamic Class Notes Loader
// This script loads markdown files from class-specific directories

// DOM Elements
const notesContainer = document.getElementById('notesContainer');
const chaptersContainer = document.getElementById('chaptersContainer');
const closeBtn = document.getElementById('closeBtn');
const sortNewestBtn = document.getElementById('sort-newest');
const sortOldestBtn = document.getElementById('sort-oldest');
const sortAlphabeticalBtn = document.getElementById('sort-alphabetical');
const loadingIndicator = document.getElementById('loadingIndicator');
const controlsContainer = document.getElementById('controlsContainer');
const classTitle = document.getElementById('classTitle');
const backToHomeBtn = document.getElementById('backToHome');
const courseIntro = document.getElementById('courseIntro');
const courseTitle = document.getElementById('courseTitle');
const courseDescription = document.getElementById('courseDescription');

let allNotes = [];
let currentClass = '';

// Class configuration - maps URL parameters to directory names and display titles
const classConfig = {
    'classical-mechanics': {
        directory: 'classical-mechanics',
        title: 'Classical Mechanics Notes',
        description: 'PH 511.',
        chapters: {
            0: { title: 'Course Introduction', description: '???' },
            1: { title: 'Chapter 1???', description: '???' },
            2: { title: 'Chapter 2???', description: '???' }
        }
    },
    'quantum-mechanics': {
        directory: 'quantum-mechanics', 
        title: 'Quantum Mechanics I Notes',
        description: 'PH 514.',
        chapters: {
            0: { title: 'Course Introduction', description: '???' },
            1: { title: 'Chapter 1???', description: '???' }
        }
    },
    'mathematical-methods': {
        directory: 'math-methods',
        title: 'Mathematical Methods Notes', 
        description: 'PH 541 - Advanced mathematical techniques including complex analysis, differential equations, and special functions.',
        chapters: {
            0: { title: 'Course Introduction', description: '???' },
            1: { title: 'Chapter 1???', description: '???' }
        }
    }
};

// Get class from URL parameter
function getCurrentClass() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('class');
}

// Initialize the page
function init() {
    currentClass = getCurrentClass();
    
    if (!currentClass || !classConfig[currentClass]) {
        showError('Invalid or missing class parameter. Please return to the home page and select a valid class.');
        return;
    }
    
    // Update page title and header
    const config = classConfig[currentClass];
    if (classTitle) classTitle.textContent = config.title;
    if (courseTitle) courseTitle.textContent = config.title;
    if (courseDescription) courseDescription.textContent = config.description;
    document.title = config.title;
    
    // Setup back button
    if (backToHomeBtn) {
        backToHomeBtn.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
    
    // Load notes for this class
    loadClassNotes(currentClass);
}

// Show error message
function showError(message) {
    if (loadingIndicator) {
        loadingIndicator.innerHTML = `<div class="error">Error: ${message}</div>`;
        loadingIndicator.style.display = 'block';
    }
    console.error(message);
}

// Animation functions (from original blog.js)
function animateCardsIn(cards, staggerDelay = 100) {
    cards.forEach((card, index) => {
        card.classList.remove('card-visible');
        card.classList.add('card-hidden');
        
        setTimeout(() => {
            card.classList.remove('card-hidden');
            card.classList.add('card-visible');
        }, index * staggerDelay);
    });
}

function animateCardsOut(cards, callback) {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.remove('card-visible');
            card.classList.add('card-hidden');
        }, index * 50);
    });
    
    setTimeout(callback, cards.length * 50 + 300);
}

// Date parsing and formatting (from original blog.js)
function parseDate(dateString) {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);
    return new Date(year, month, day);
}

function formatDate(dateString) {
    const date = parseDate(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// UPDATED: Complete markdown rendering function from blog script
function renderMarkdown(content) {
    // Step 1: Extract and placeholder LaTeX blocks to protect them from processing
    const latexBlocks = [];
    
    // Handle $ blocks first (display/block math)
    let html = content.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
        const processedLatex = latex.trim();
        const latexHtml = `<div class="latex-display">$$${processedLatex}$$</div>`;
        const placeholder = `__LATEXBLOCK_${latexBlocks.length}__`;
        latexBlocks.push(latexHtml);
        return placeholder;
    });
    
    // Handle inline $ LaTeX (but avoid matching $ which we already processed)
    html = html.replace(/(?<!\$)\$(?!\$)((?:[^$]|\\\$)+?)\$(?!\$)/g, (match, latex) => {
        const processedLatex = latex.trim();
        const latexHtml = `<span class="latex-inline">$${processedLatex}$</span>`;
        const placeholder = `__LATEXBLOCK_${latexBlocks.length}__`;
        latexBlocks.push(latexHtml);
        return placeholder;
    });

    // Step 2: Extract and placeholder code blocks to protect them from processing
    const codeBlocks = [];
    html = html.replace(/```([\w-]*)\s*\n?([\s\S]*?)```/g, (match, lang, code) => {
        // Remove only the very first newline if it exists
        let processedCode = code;
        if (processedCode.startsWith('\n')) {
            processedCode = processedCode.substring(1);
        }
        
        // Remove trailing whitespace but preserve internal formatting
        processedCode = processedCode.replace(/\s+$/, '');
        
        // Convert tabs to 4 spaces for consistent rendering
        processedCode = processedCode.replace(/\t/g, '    ');
        
        // Escape HTML entities but preserve whitespace and newlines exactly
        const escapedCode = processedCode
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
            
        const codeBlockHtml = lang 
            ? `<pre><code class="language-${lang}">${escapedCode}</code></pre>`
            : `<pre><code>${escapedCode}</code></pre>`;
            
        // Store the processed code block and return a placeholder
        const placeholder = `__CODEBLOCK_${codeBlocks.length}__`;
        codeBlocks.push(codeBlockHtml);
        return placeholder;
    });

    // Step 3: Process the rest of the markdown (without code blocks and LaTeX)
    html = html
        // Headers
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Images (must be before links) - THIS WAS MISSING IN NOTES SCRIPT
        .replace(/!\[([^\]]+)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1">')
        // Links
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        // Inline code
        .replace(/`(.*?)`/gim, (match, code) => {
            return `<code>${code
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')}</code>`;
        })
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Step 4: Handle lists
    // First, convert markdown unordered lists to ordered list items
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    
    // Also handle existing numbered lists
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>');
    
    // Split into lines and process list items
    const lines = html.split('\n');
    const processedLines = [];
    let inList = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const isListItem = line.trim().match(/^<li>.*<\/li>$/);
        
        if (isListItem && !inList) {
            // Starting a new list
            processedLines.push('<ol>');
            processedLines.push(line);
            inList = true;
        } else if (isListItem && inList) {
            // Continue current list
            processedLines.push(line);
        } else if (!isListItem && inList) {
            // End current list
            processedLines.push('</ol>');
            processedLines.push(line);
            inList = false;
        } else {
            // Regular line
            processedLines.push(line);
        }
    }
    
    // Close list if we ended while in a list
    if (inList) {
        processedLines.push('</ol>');
    }
    
    html = processedLines.join('\n');

    // Step 5: Process paragraphs and line breaks (but not inside code blocks or LaTeX)
    html = html
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n(?!<li>|<\/ol>)/g, '<br>')  // Don't add <br> before <li> or </ol>
        .replace(/(<ol>)\n/g, '$1')             // Remove newline after <ol>
        .replace(/(<\/li>)\n/g, '$1');          // Remove newline after </li>

    // Step 6: Wrap in paragraphs and clean up
    html = `<p>${html}</p>`
        .replace(/<p><\/p>/g, '')
        .replace(/<p>(<\/?(?:pre|h\d|blockquote|ol|div)[^>]*>)/g, '$1')
        .replace(/(<\/?(?:pre|h\d|blockquote|ol|div)[^>]*>)<\/p>/g, '$1');

    // Step 7: Restore the protected code blocks
    codeBlocks.forEach((codeBlock, index) => {
        html = html.replace(`__CODEBLOCK_${index}__`, codeBlock);
    });

    // Step 8: Restore the protected LaTeX blocks
    latexBlocks.forEach((latexBlock, index) => {
        html = html.replace(`__LATEXBLOCK_${index}__`, latexBlock);
    });

    return html;
}

// Parse front matter from markdown files
function parseFrontMatter(content) {
    if (!content.startsWith('---')) {
        return {
            metadata: { 
                title: 'Untitled', 
                date: new Date().toISOString().split('T')[0], 
                tags: '', 
                snippet: content.substring(0, 150) + '...',
                section: '1.0' 
            },
            content: content
        };
    }
    
    const frontMatterEnd = content.indexOf('---', 3);
    if (frontMatterEnd === -1) {
        return {
            metadata: { 
                title: 'Untitled', 
                date: new Date().toISOString().split('T')[0], 
                tags: '', 
                snippet: content.substring(0, 150) + '...',
                section: '1.0' 
            },
            content: content
        };
    }
    
    const frontMatter = content.slice(3, frontMatterEnd).trim();
    const contentBody = content.slice(frontMatterEnd + 3).trim();
    
    const metadata = {};
    frontMatter.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();
            metadata[key] = value.replace(/^['"](.*)['"]$/, '$1');
        }
    });
    
    // Set defaults
    if (!metadata.title) metadata.title = 'Untitled Note';
    if (!metadata.date) metadata.date = new Date().toISOString().split('T')[0];
    if (!metadata.tags) metadata.tags = '';
    if (!metadata.section) metadata.section = '1.0';
    if (!metadata.snippet) {
        metadata.snippet = contentBody.substring(0, 150) + (contentBody.length > 150 ? '...' : '');
    }
    
    return { metadata, content: contentBody };
}

// Load notes for a specific class - SIMPLIFIED
async function loadClassNotes(className) {
    const config = classConfig[className];
    if (!config) {
        showError('Invalid class configuration');
        return;
    }

    console.log(`Loading notes for class: ${className}`);
    const notes = [];
    
    // Start with just a small list of files to test
    const commonFiles = [
        'section-1-1.md',
        'section-1-1_practice.md',
        'section-1-2.md',
        'section-2-1.md'
    ];
    
    let loadedCount = 0;
    
    for (const file of commonFiles) {
        try {
            const filePath = `../notes/${config.directory}/${file}`;
            console.log(`Attempting to fetch: ${filePath}`);
            
            if (loadingIndicator) {
                loadingIndicator.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Loading notes... (${loadedCount + 1}/${commonFiles.length})`;
            }

            const response = await fetch(filePath);
            if (!response.ok) {
                console.log(`File ${file} not found (${response.status}), skipping...`);
                continue;
            }
            
            const text = await response.text();
            console.log(`Successfully fetched ${file}, content length: ${text.length}`);
            
            const { metadata, content } = parseFrontMatter(text);
            
            const tags = metadata.tags 
                ? metadata.tags.split(',').map(tag => tag.trim()) 
                : [];
            
            notes.push({
                title: metadata.title,
                date: metadata.date,
                section: metadata.section || '1.0',
                tags: tags,
                snippet: metadata.snippet,
                content: content,
                fileName: file
            });
            
            loadedCount++;
            console.log(`Successfully processed: ${file}`);
        } catch (error) {
            console.log(`Error loading ${file}: ${error.message}`);
        }
    }
    
    console.log(`Finished loading. Found ${notes.length} notes.`);
    
    // Hide loading indicator
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    
    if (notes.length === 0) {
        showError(`No notes found for ${config.title}. Please check that markdown files exist in the notes/${config.directory}/ directory.`);
        return;
    }
    
    // Show controls and course intro
    if (controlsContainer) {
        controlsContainer.style.display = 'flex';
    }
    if (courseIntro) {
        courseIntro.style.display = 'block';
    }
    
    allNotes = notes;
    
    // Sort by section and render
    const sortedNotes = sortBySection(allNotes);
    
    // Try chapter rendering first, fall back to simple rendering
    try {
        renderNotesWithChapters(sortedNotes);
    } catch (error) {
        console.error('Chapter rendering failed, falling back to simple rendering:', error);
        renderNotesSimple(sortedNotes);
    }
    
    // Update active button
    if (sortAlphabeticalBtn) {
        sortAlphabeticalBtn.classList.add('active');
    }
    if (sortNewestBtn) {
        sortNewestBtn.classList.remove('active');
    }
    if (sortOldestBtn) {
        sortOldestBtn.classList.remove('active');
    }
}

// Group posts by chapter based on section number
function groupPostsByChapter(posts) {
    const chapters = {};
    
    posts.forEach(post => {
        const sectionParts = post.section.split('.');
        const chapterNum = parseInt(sectionParts[0]) || 0;
        
        if (!chapters[chapterNum]) {
            chapters[chapterNum] = [];
        }
        chapters[chapterNum].push(post);
    });
    
    return chapters;
}

// Render notes organized by chapters
function renderNotesWithChapters(notes) {
    if (!chaptersContainer) {
        console.log('Chapters container not found, falling back to simple rendering');
        renderNotesSimple(notes);
        return;
    }
    
    // Hide simple container, show chapters
    if (notesContainer) notesContainer.style.display = 'none';
    chaptersContainer.innerHTML = '';
    
    if (notes.length === 0) {
        chaptersContainer.innerHTML = '<div class="error">No notes found for this class.</div>';
        return;
    }
    
    const chapters = groupPostsByChapter(notes);
    const config = classConfig[currentClass];
    
    // Sort chapter numbers
    const sortedChapterNums = Object.keys(chapters).sort((a, b) => parseInt(a) - parseInt(b));
    
    sortedChapterNums.forEach(chapterNum => {
        const chapterPosts = chapters[chapterNum];
        const chapterInt = parseInt(chapterNum);
        const chapterConfig = config.chapters[chapterInt] || { 
            title: `Chapter ${chapterInt}`, 
            description: 'Additional course material' 
        };
        
        // Create chapter section
        const chapterSection = document.createElement('section');
        chapterSection.className = 'chapter-section';
        
        // Chapter header
        const chapterHeader = document.createElement('div');
        chapterHeader.className = 'chapter-header';
        chapterHeader.innerHTML = `
            <h3>${chapterConfig.title}</h3>
            <p>${chapterConfig.description}</p>
        `;
        chapterSection.appendChild(chapterHeader);
        
        // Chapter card container
        const cardContainer = document.createElement('section');
        cardContainer.className = 'card-container';
        
        // Sort posts within chapter by section
        chapterPosts.sort((a, b) => {
            const sectionA = parseFloat(a.section) || 0;
            const sectionB = parseFloat(b.section) || 0;
            return sectionA - sectionB;
        });
        
        chapterPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'card card-visible'; // Start visible
            postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-title">${post.title}</div>
                    <div class="post-date">§${post.section}</div>
                </div>
                <div class="post-snippet">
                    ${post.snippet}
                </div>
                <div class="post-footer">
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    <div class="read-more">Click to read →</div>
                </div>
            `;
            
            postElement.addEventListener('click', () => {
                showFullNote(post);
            });
            
            cardContainer.appendChild(postElement);
        });
        
        chapterSection.appendChild(cardContainer);
        chaptersContainer.appendChild(chapterSection);
    });
    
    console.log('Chapter rendering completed successfully');
}

// Simple fallback rendering
function renderNotesSimple(notes) {
    if (!notesContainer) {
        console.error('Notes container not found');
        return;
    }
    
    // Show simple container, hide chapters
    notesContainer.style.display = 'block';
    if (chaptersContainer) chaptersContainer.style.display = 'none';
    notesContainer.innerHTML = '';
    
    if (notes.length === 0) {
        notesContainer.innerHTML = '<div class="error">No notes found for this class.</div>';
        return;
    }
    
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'card card-visible'; // Start visible
        noteElement.innerHTML = `
            <div class="post-header">
                <div class="post-title">${note.title}</div>
                <div class="post-date">Section ${note.section}</div>
            </div>
            <div class="post-snippet">
                ${note.snippet}
            </div>
            <div class="post-footer">
                <div class="post-tags">
                    ${note.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="read-more">Click to read →</div>
            </div>
        `;
        
        noteElement.addEventListener('click', () => {
            showFullNote(note);
        });
        
        notesContainer.appendChild(noteElement);
    });
    
    console.log('Simple rendering completed successfully');
}

// Show full note in overlay
function showFullNote(note) {
    const noteFull = document.createElement('div');
    noteFull.className = 'post-full';
    noteFull.id = 'noteFull';
    noteFull.innerHTML = `
        <div class="post-full-content">
            <div class="post-full-header">
                <h1 class="post-full-title">${note.title}</h1>
                <div class="post-full-meta">
                    <span><i class="far fa-bookmark"></i> Section ${note.section}</span>
                    <span><i class="far fa-clock"></i> ${Math.ceil(note.content.length / 1200)} min read</span>
                    <span><i class="far fa-calendar"></i> ${formatDate(note.date)}</span>
                </div>
            </div>
            <div class="post-full-body">
                ${renderMarkdown(note.content)}
            </div>
        </div>
    `;
    
    document.body.appendChild(noteFull);
    if (closeBtn) closeBtn.classList.add('visible');
    
    setTimeout(() => {
        noteFull.classList.add('active');
        // Add syntax highlighting and math rendering if available
        if (window.Prism) {
            Prism.highlightAll();
        }
        if (window.MathJax && window.MathJax.typesetPromise) {
            MathJax.typesetPromise();
        }
    }, 10);
    
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleEscapeKey);
}

// Close full note overlay
function closeFullNote() {
    const noteFull = document.getElementById('noteFull');
    if (noteFull) {
        noteFull.classList.remove('active');
        setTimeout(() => {
            noteFull.remove();
        }, 300);
    }
    
    if (closeBtn) closeBtn.classList.remove('visible');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEscapeKey);
}

// Handle escape key
function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        closeFullNote();
    }
}

// Sorting functions
function sortNewestFirst(notes) {
    return [...notes].sort((a, b) => {
        const dateComparison = parseDate(b.date) - parseDate(a.date);
        if (dateComparison === 0) {
            return a.title.localeCompare(b.title);
        }
        return dateComparison;
    });
}

function sortOldestFirst(notes) {
    return [...notes].sort((a, b) => {
        const dateComparison = parseDate(a.date) - parseDate(b.date);
        if (dateComparison === 0) {
            return a.title.localeCompare(b.title);
        }
        return dateComparison;
    });
}

function sortBySection(notes) {
    return [...notes].sort((a, b) => {
        const sectionA = parseFloat(a.section) || 0;
        const sectionB = parseFloat(b.section) || 0;
        return sectionA - sectionB;
    });
}

// Event listeners
if (closeBtn) {
    closeBtn.addEventListener('click', closeFullNote);
}

if (sortNewestBtn) {
    sortNewestBtn.addEventListener('click', () => {
        const sortedNotes = sortNewestFirst(allNotes);
        try {
            renderNotesWithChapters(sortedNotes);
        } catch (error) {
            renderNotesSimple(sortedNotes);
        }
        sortNewestBtn.classList.add('active');
        if (sortOldestBtn) sortOldestBtn.classList.remove('active');
        if (sortAlphabeticalBtn) sortAlphabeticalBtn.classList.remove('active');
    });
}

if (sortOldestBtn) {
    sortOldestBtn.addEventListener('click', () => {
        const sortedNotes = sortOldestFirst(allNotes);
        try {
            renderNotesWithChapters(sortedNotes);
        } catch (error) {
            renderNotesSimple(sortedNotes);
        }
        sortOldestBtn.classList.add('active');
        if (sortNewestBtn) sortNewestBtn.classList.remove('active');
        if (sortAlphabeticalBtn) sortAlphabeticalBtn.classList.remove('active');
    });
}

if (sortAlphabeticalBtn) {
    sortAlphabeticalBtn.addEventListener('click', () => {
        const sortedNotes = sortBySection(allNotes);
        try {
            renderNotesWithChapters(sortedNotes);
        } catch (error) {
            renderNotesSimple(sortedNotes);
        }
        sortAlphabeticalBtn.classList.add('active');
        if (sortNewestBtn) sortNewestBtn.classList.remove('active');
        if (sortOldestBtn) sortOldestBtn.classList.remove('active');
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}