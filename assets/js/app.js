/**
 * Codex - Local-First Notes Application
 * A modern notes app with rich text editing and folder organization
 * 
 * @author Mutlu Kurt
 * @license MIT
 * @version 2.0.0
 */

class CodexApp {
    /**
     * Initialize the Codex application
     */
    constructor() {
        this.data = {
            folders: [],
            activeFolderId: null,
            activeNoteId: null
        };
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.loadData();
        this.setupEventListeners();
        this.renderFolders();
        this.loadActiveNote();
        
        // Initialize with sample data if empty
        if (this.data.folders.length === 0) {
            this.createSampleData();
        }
    }
    
    /**
     * Create sample data for new users
     */
    createSampleData() {
        const sampleFolder = {
            id: `f_${Date.now()}`,
            name: 'Getting Started',
            notes: [{
                id: `n_${Date.now()}`,
                title: 'Welcome to Codex',
                content: `
                    <h1>Welcome to Codex</h1>
                    <p>This is your local-first notes app. Start writing your notes here.</p>
                    <p>You can select text to apply <span style="color: #f6bd60;">colors</span> and <strong>formatting</strong>.</p>
                    <h2>Features</h2>
                    <ul>
                        <li>Create folders and notes</li>
                        <li>Rich text editing with toolbar</li>
                        <li>Automatic saving to localStorage</li>
                        <li>Fully responsive design</li>
                        <li>Keyboard shortcuts support</li>
                    </ul>
                    <h3>Keyboard Shortcuts</h3>
                    <ul>
                        <li><strong>Ctrl/Cmd + B</strong> - Bold</li>
                        <li><strong>Ctrl/Cmd + I</strong> - Italic</li>
                        <li><strong>Ctrl/Cmd + U</strong> - Underline</li>
                    </ul>
                `
            }]
        };
        
        this.data.folders.push(sampleFolder);
        this.data.activeFolderId = sampleFolder.id;
        this.data.activeNoteId = sampleFolder.notes[0].id;
        this.saveData();
        this.renderFolders();
        this.loadActiveNote();
    }
    
    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        // Mobile menu handlers
        this.setupMobileMenuHandlers();
        
        // Folder and note management
        this.setupFolderHandlers();
        
        // Editor handlers
        this.setupEditorHandlers();
        
        // Toolbar handlers
        this.setupToolbarHandlers();
        
        // Keyboard shortcuts
        this.setupKeyboardShortcuts();
    }
    
    /**
     * Setup mobile menu event handlers
     */
    setupMobileMenuHandlers() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const closeSidebarBtn = document.getElementById('closeSidebarBtn');
        const mobileOverlay = document.getElementById('mobileOverlay');
        
        mobileMenuBtn?.addEventListener('click', () => {
            document.getElementById('sidebar').classList.add('open');
            mobileOverlay.classList.remove('hidden');
        });
        
        closeSidebarBtn?.addEventListener('click', () => {
            this.closeMobileSidebar();
        });
        
        mobileOverlay?.addEventListener('click', () => {
            this.closeMobileSidebar();
        });
    }
    
    /**
     * Setup folder management event handlers
     */
    setupFolderHandlers() {
        const addFolderBtn = document.getElementById('addFolderBtn');
        addFolderBtn?.addEventListener('click', () => {
            this.createFolder();
        });
    }
    
    /**
     * Setup editor event handlers
     */
    setupEditorHandlers() {
        const noteTitle = document.getElementById('noteTitle');
        const editor = document.getElementById('editor');
        
        noteTitle?.addEventListener('input', () => {
            this.saveCurrentNote();
        });
        
        editor?.addEventListener('input', () => {
            this.saveCurrentNote();
        });
        
        // Update toolbar state when editor gains focus
        editor?.addEventListener('focus', () => {
            this.updateToolbarState();
        });
        
        // Update toolbar state when clicking in editor
        editor?.addEventListener('click', () => {
            setTimeout(() => {
                this.updateToolbarState();
            }, 10);
        });
        
        // Update toolbar state on keyup for immediate feedback
        editor?.addEventListener('keyup', () => {
            this.updateToolbarState();
        });
        
        // Handle paste events to clean up formatting
        editor?.addEventListener('paste', (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertText', false, text);
            // Update toolbar state after paste
            setTimeout(() => {
                this.updateToolbarState();
            }, 20);
        });
    }
    
    /**
     * Setup toolbar event handlers
     */
    setupToolbarHandlers() {
        const toolbar = document.getElementById('toolbar');
        const textColorPicker = document.getElementById('textColorPicker');
        
        toolbar?.addEventListener('click', (e) => {
            if (e.target.closest('.toolbar-btn')) {
                this.handleToolbarClick(e.target.closest('.toolbar-btn'));
            }
        });
        
        textColorPicker?.addEventListener('change', (e) => {
            this.applyTextColor(e.target.value);
        });
        
        // PDF Export button
        const exportPdfBtn = document.getElementById('exportPdfBtn');
        exportPdfBtn?.addEventListener('click', () => {
            this.exportToPDF();
        });
    }
    
    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Only handle shortcuts when editor is focused
            const editor = document.getElementById('editor');
            if (!editor || !editor.contains(document.activeElement) && document.activeElement !== editor) {
                return;
            }
            
            if (e.ctrlKey || e.metaKey) {
                switch(e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault();
                        this.toggleFormat('bold');
                        break;
                    case 'i':
                        e.preventDefault();
                        this.toggleFormat('italic');
                        break;
                    case 'u':
                        e.preventDefault();
                        this.toggleFormat('underline');
                        break;
                }
            }
        });
        
        // Update toolbar state on selection change with debounce
        let selectionTimeout;
        document.addEventListener('selectionchange', () => {
            clearTimeout(selectionTimeout);
            selectionTimeout = setTimeout(() => {
                // Only update if selection is within editor
                const selection = window.getSelection();
                const editor = document.getElementById('editor');
                if (selection.rangeCount > 0 && editor && editor.contains(selection.anchorNode)) {
                    this.updateToolbarState();
                }
            }, 50);
        });
    }
    
    /**
     * Close mobile sidebar
     */
    closeMobileSidebar() {
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('mobileOverlay').classList.add('hidden');
    }
    
    /**
     * Load data from localStorage
     */
    loadData() {
        try {
            const saved = localStorage.getItem('codex-data');
            if (saved) {
                this.data = JSON.parse(saved);
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            this.data = {
                folders: [],
                activeFolderId: null,
                activeNoteId: null
            };
        }
    }
    
    /**
     * Save data to localStorage
     */
    saveData() {
        try {
            localStorage.setItem('codex-data', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error saving data to localStorage:', error);
        }
    }
    
    /**
     * Create a new folder
     */
    createFolder() {
        const name = prompt('Enter folder name:');
        if (name && name.trim()) {
            const folder = {
                id: `f_${Date.now()}`,
                name: name.trim(),
                notes: []
            };
            
            this.data.folders.push(folder);
            this.saveData();
            this.renderFolders();
        }
    }
    
    /**
     * Rename a folder
     * @param {string} folderId - The ID of the folder to rename
     */
    renameFolder(folderId) {
        const folder = this.data.folders.find(f => f.id === folderId);
        if (!folder) return;
        
        const currentName = folder.name;
        const newName = prompt(`Rename folder "${currentName}":`, currentName);
        
        if (newName && newName.trim() && newName.trim() !== currentName) {
            const trimmedName = newName.trim();
            
            // Check if folder name already exists
            const existingFolder = this.data.folders.find(f => 
                f.id !== folderId && f.name.toLowerCase() === trimmedName.toLowerCase()
            );
            
            if (existingFolder) {
                alert('A folder with this name already exists!');
                return;
            }
            
            // Validate name length
            if (trimmedName.length > 50) {
                alert('Folder name is too long! Maximum 50 characters allowed.');
                return;
            }
            
            // Update folder name
            folder.name = trimmedName;
            this.saveData();
            this.renderFolders();
            
            // Show success feedback
            this.showToast(`Folder renamed to "${trimmedName}"`, 'success');
        }
    }
    
    /**
     * Delete a folder
     * @param {string} folderId - The ID of the folder to delete
     */
    deleteFolder(folderId) {
        if (confirm('Are you sure you want to delete this folder and all its notes?')) {
            this.data.folders = this.data.folders.filter(f => f.id !== folderId);
            
            if (this.data.activeFolderId === folderId) {
                this.data.activeFolderId = null;
                this.data.activeNoteId = null;
                this.clearEditor();
            }
            
            this.saveData();
            this.renderFolders();
        }
    }
    
    /**
     * Create a new note in a folder
     * @param {string} folderId - The ID of the folder to create the note in
     */
    createNote(folderId) {
        const folder = this.data.folders.find(f => f.id === folderId);
        if (folder) {
            const note = {
                id: `n_${Date.now()}`,
                title: 'Untitled Note',
                content: ''
            };
            
            folder.notes.push(note);
            this.data.activeFolderId = folderId;
            this.data.activeNoteId = note.id;
            
            this.saveData();
            this.renderFolders();
            this.loadActiveNote();
            
            // Focus on title after a short delay
            setTimeout(() => {
                const titleInput = document.getElementById('noteTitle');
                if (titleInput) {
                    titleInput.focus();
                    titleInput.select();
                }
            }, 100);
        }
    }
    
    /**
     * Delete a note
     * @param {string} folderId - The ID of the folder containing the note
     * @param {string} noteId - The ID of the note to delete
     */
    deleteNote(folderId, noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            const folder = this.data.folders.find(f => f.id === folderId);
            if (folder) {
                folder.notes = folder.notes.filter(n => n.id !== noteId);
                
                if (this.data.activeNoteId === noteId) {
                    this.data.activeNoteId = null;
                    this.clearEditor();
                }
                
                this.saveData();
                this.renderFolders();
            }
        }
    }
    
    /**
     * Select a note for editing
     * @param {string} folderId - The ID of the folder containing the note
     * @param {string} noteId - The ID of the note to select
     */
    selectNote(folderId, noteId) {
        this.data.activeFolderId = folderId;
        this.data.activeNoteId = noteId;
        this.saveData();
        this.loadActiveNote();
        this.renderFolders();
        this.closeMobileSidebar();
    }
    
    /**
     * Render the folders list in the sidebar
     */
    renderFolders() {
        const container = document.getElementById('foldersList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.data.folders.forEach(folder => {
            const folderElement = document.createElement('div');
            folderElement.className = 'mb-2 fade-in';
            
            folderElement.innerHTML = `
                                        <div class="group flex items-center justify-between p-4 mb-2 rounded-xl bg-white/5 hover:bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-500/20 border border-white/10 hover:border-yellow-400/30 transition-all duration-300 cursor-pointer ${folder.id === this.data.activeFolderId ? 'bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-yellow-400/30 shadow-lg shadow-yellow-400/10' : ''}" 
                             onclick="app.toggleFolder('${folder.id}')">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 rounded-lg bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-all duration-300">
                                    <svg class="w-5 h-5 ${folder.id === this.data.activeFolderId ? 'text-yellow-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                    </svg>
                                </div>
                                <span class="font-semibold text-truncate ${folder.id === this.data.activeFolderId ? 'text-yellow-400' : ''}">${this.escapeHtml(folder.name)}</span>
                            </div>
                            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button class="p-2 rounded-lg hover:bg-white/20 transition-all duration-200" onclick="event.stopPropagation(); app.createNote('${folder.id}')" title="Add Note">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                    </svg>
                                </button>
                                <button class="p-2 rounded-lg hover:bg-blue-500/20 hover:text-blue-400 transition-all duration-200" onclick="event.stopPropagation(); app.renameFolder('${folder.id}')" title="Rename Folder">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                    </svg>
                                </button>
                                <button class="p-2 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all duration-200" onclick="event.stopPropagation(); app.deleteFolder('${folder.id}')" title="Delete Folder">
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                </div>
                <div class="ml-8 ${folder.id === this.data.activeFolderId ? '' : 'hidden'}" id="notes-${folder.id}">
                    ${folder.notes.map(note => `
                        <div class="group flex items-center justify-between p-3 mb-1 rounded-xl bg-white/5 hover:bg-yellow-400/10 border border-transparent hover:border-yellow-400/20 transition-all duration-300 cursor-pointer ${note.id === this.data.activeNoteId ? 'bg-yellow-400/15 border-yellow-400/30 shadow-sm' : ''}"
                             onclick="app.selectNote('${folder.id}', '${note.id}')">
                            <div class="flex items-center gap-3 flex-1 min-w-0">
                                <div class="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                                    <svg class="w-3.5 h-3.5 ${note.id === this.data.activeNoteId ? 'text-yellow-400' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-truncate ${note.id === this.data.activeNoteId ? 'text-yellow-400' : ''}">${this.escapeHtml(note.title)}</span>
                            </div>
                            <button class="p-1.5 rounded-lg hover:bg-red-500/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all duration-200 flex-shrink-0" onclick="event.stopPropagation(); app.deleteNote('${folder.id}', '${note.id}')" title="Delete Note">
                                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            container.appendChild(folderElement);
        });
    }
    
    /**
     * Toggle folder visibility
     * @param {string} folderId - The ID of the folder to toggle
     */
    toggleFolder(folderId) {
        this.data.activeFolderId = this.data.activeFolderId === folderId ? null : folderId;
        this.saveData();
        this.renderFolders();
    }
    
    /**
     * Load the active note into the editor
     */
    loadActiveNote() {
        const activeNote = this.getActiveNote();
        const titleInput = document.getElementById('noteTitle');
        const editor = document.getElementById('editor');
        
        if (activeNote && titleInput && editor) {
            titleInput.value = activeNote.title || 'Untitled Note';
            editor.innerHTML = activeNote.content || '<p><br></p>';
        } else if (titleInput && editor) {
            titleInput.value = '';
            editor.innerHTML = '<p><br></p>';
        }
        
        this.updateToolbarState();
    }
    
    /**
     * Clear the editor
     */
    clearEditor() {
        const titleInput = document.getElementById('noteTitle');
        const editor = document.getElementById('editor');
        
        if (titleInput) titleInput.value = '';
        if (editor) editor.innerHTML = '<p><br></p>';
    }
    
    /**
     * Get the currently active note
     * @returns {Object|null} The active note object or null
     */
    getActiveNote() {
        const activeFolder = this.data.folders.find(f => f.id === this.data.activeFolderId);
        if (activeFolder) {
            return activeFolder.notes.find(n => n.id === this.data.activeNoteId);
        }
        return null;
    }
    
    /**
     * Save the current note
     */
    saveCurrentNote() {
        const activeNote = this.getActiveNote();
        const titleInput = document.getElementById('noteTitle');
        const editor = document.getElementById('editor');
        
        if (activeNote && titleInput && editor) {
            const newTitle = titleInput.value.trim() || 'Untitled Note';
            const newContent = editor.innerHTML;
            
            // Only save if there are changes
            if (activeNote.title !== newTitle || activeNote.content !== newContent) {
                activeNote.title = newTitle;
                activeNote.content = newContent;
                this.saveData();
                this.renderFolders();
            }
        }
    }
    
    /**
     * Handle toolbar button clicks
     * @param {HTMLElement} button - The clicked toolbar button
     */
    handleToolbarClick(button) {
        const command = button.dataset.command;
        const value = button.dataset.value;
        
        if (command === 'formatBlock') {
            document.execCommand(command, false, value);
        } else if (command === 'bold' || command === 'italic' || command === 'underline') {
            this.toggleFormat(command);
            return; // toggleFormat handles state update and saving
        } else if (command) {
            document.execCommand(command, false, value);
        }
        
        this.updateToolbarState();
        this.saveCurrentNote();
    }
    
    /**
     * Toggle text formatting (bold, italic, underline) with proper state management
     * @param {string} command - The formatting command to toggle
     */
    toggleFormat(command) {
        // Ensure we have focus on the editor
        const editor = document.getElementById('editor');
        if (!editor) return;
        
        // Focus editor if not already focused
        if (document.activeElement !== editor && !editor.contains(document.activeElement)) {
            editor.focus();
        }
        
        // Execute the formatting command
        document.execCommand(command, false, null);
        
        // Force update toolbar state immediately
        this.updateToolbarState();
        
        // Save the note
        this.saveCurrentNote();
    }
    
    /**
     * Apply text color to selected text
     * @param {string} color - The color to apply
     */
    applyTextColor(color) {
        document.execCommand('foreColor', false, color);
        this.saveCurrentNote();
    }
    
    /**
     * Update toolbar button states based on current selection
     */
    updateToolbarState() {
        // Ensure we're in the editor context
        const editor = document.getElementById('editor');
        if (!editor) return;
        
        // Add a small delay to ensure DOM is updated
        setTimeout(() => {
            const buttons = document.querySelectorAll('.toolbar-btn');
            buttons.forEach(btn => {
                const command = btn.dataset.command;
                if (command) {
                    try {
                        let isActive = false;
                        
                        // Special handling for formatting commands
                        if (command === 'bold' || command === 'italic' || command === 'underline') {
                            // Check if command is active in current selection/cursor position
                            isActive = document.queryCommandState(command);
                        } else if (command === 'formatBlock') {
                            // Handle format block commands (headings)
                            const value = btn.dataset.value;
                            isActive = document.queryCommandValue('formatBlock') === value;
                        } else {
                            // Default behavior for other commands
                            isActive = document.queryCommandState(command);
                        }
                        
                        // Update button appearance
                        if (isActive) {
                            btn.classList.add('active');
                        } else {
                            btn.classList.remove('active');
                        }
                    } catch (e) {
                        // Some commands might not be supported, remove active state
                        btn.classList.remove('active');
                    }
                }
            });
        }, 10);
    }
    
    /**
     * Escape HTML to prevent XSS
     * @param {string} text - The text to escape
     * @returns {string} The escaped text
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    /**
     * Export data as JSON
     * @returns {string} JSON string of all data
     */
    exportData() {
        return JSON.stringify(this.data, null, 2);
    }
    
    /**
     * Import data from JSON
     * @param {string} jsonData - JSON string to import
     * @returns {boolean} Success status
     */
    importData(jsonData) {
        try {
            const importedData = JSON.parse(jsonData);
            if (importedData.folders && Array.isArray(importedData.folders)) {
                this.data = importedData;
                this.saveData();
                this.renderFolders();
                this.loadActiveNote();
                return true;
            }
        } catch (error) {
            console.error('Error importing data:', error);
        }
        return false;
    }
    
    /**
     * Export current note as PDF
     */
    async exportToPDF() {
        const activeNote = this.getActiveNote();
        if (!activeNote) {
            alert('No note selected to export!');
            return;
        }
        
        try {
            // Show loading state
            const exportBtn = document.getElementById('exportPdfBtn');
            const originalHTML = exportBtn.innerHTML;
            exportBtn.innerHTML = `
                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            `;
            exportBtn.disabled = true;
            
            // Create PDF content
            await this.generatePDF(activeNote);
            
            // Reset button
            exportBtn.innerHTML = originalHTML;
            exportBtn.disabled = false;
            
        } catch (error) {
            console.error('Error exporting PDF:', error);
            alert('Error exporting PDF. Please try again.');
            
            // Reset button on error
            const exportBtn = document.getElementById('exportPdfBtn');
            exportBtn.innerHTML = originalHTML;
            exportBtn.disabled = false;
        }
    }
    
    /**
     * Generate PDF from note content
     * @param {Object} note - The note to export
     */
    async generatePDF(note) {
        const { jsPDF } = window.jspdf;
        
        // Create a temporary container for PDF content
        const tempContainer = document.createElement('div');
        tempContainer.style.cssText = `
            position: fixed;
            top: -9999px;
            left: -9999px;
            width: 794px;
            padding: 40px;
            background: white;
            color: black;
            font-family: 'Inter', sans-serif;
            line-height: 1.6;
        `;
        
        // Add content to temp container
        tempContainer.innerHTML = `
            <div style="margin-bottom: 30px; border-bottom: 2px solid #feb92e; padding-bottom: 20px;">
                <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #217f8b;">${this.escapeHtml(note.title)}</h1>
                <p style="margin: 10px 0 0 0; color: #666; font-size: 14px;">Exported from Codex • ${new Date().toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })}</p>
            </div>
            <div style="font-size: 16px; line-height: 1.8;">
                ${this.sanitizeContentForPDF(note.content)}
            </div>
        `;
        
        document.body.appendChild(tempContainer);
        
        try {
            // Convert to canvas
            const canvas = await html2canvas(tempContainer, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: 794,
                windowWidth: 794
            });
            
            // Create PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 210; // A4 width in mm
            const pageHeight = 297; // A4 height in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;
            
            // Add first page
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
            
            // Add additional pages if needed
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }
            
            // Download PDF
            const fileName = `${note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.pdf`;
            pdf.save(fileName);
            
        } finally {
            // Clean up
            document.body.removeChild(tempContainer);
        }
    }
    
    /**
     * Sanitize HTML content for PDF export
     * @param {string} content - HTML content to sanitize
     * @returns {string} Sanitized content
     */
    sanitizeContentForPDF(content) {
        if (!content) return '<p>Bu not boş.</p>';
        
        // Replace HTML tags with PDF-friendly styling
        let sanitized = content
            // Headers
            .replace(/<h1[^>]*>/gi, '<h1 style="font-size: 24px; font-weight: 700; margin: 20px 0 15px 0; color: #217f8b;">')
            .replace(/<h2[^>]*>/gi, '<h2 style="font-size: 20px; font-weight: 700; margin: 18px 0 12px 0; color: #217f8b;">')
            .replace(/<h3[^>]*>/gi, '<h3 style="font-size: 18px; font-weight: 700; margin: 16px 0 10px 0; color: #217f8b;">')
            // Paragraphs
            .replace(/<p[^>]*>/gi, '<p style="margin: 10px 0; line-height: 1.8;">')
            // Lists
            .replace(/<ul[^>]*>/gi, '<ul style="margin: 10px 0; padding-left: 20px;">')
            .replace(/<ol[^>]*>/gi, '<ol style="margin: 10px 0; padding-left: 20px;">')
            .replace(/<li[^>]*>/gi, '<li style="margin: 5px 0;">')
            // Text formatting
            .replace(/<strong[^>]*>/gi, '<strong style="font-weight: 700;">')
            .replace(/<b[^>]*>/gi, '<strong style="font-weight: 700;">')
            .replace(/<em[^>]*>/gi, '<em style="font-style: italic;">')
            .replace(/<i[^>]*>/gi, '<em style="font-style: italic;">')
            // Remove any remaining style attributes that might conflict
            .replace(/style="[^"]*"/gi, (match) => {
                // Keep color styles, remove others that might conflict
                if (match.includes('color:')) {
                    return match;
                }
                return '';
            });
        
        return sanitized;
    }
    
    /**
     * Show toast notification
     * @param {string} message - The message to display
     * @param {string} type - The type of toast (success, error, info)
     */
    showToast(message, type = 'info') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast-notification fixed top-4 right-4 z-50 px-6 py-3 rounded-xl shadow-lg transform translate-x-full transition-transform duration-300 ${this.getToastStyles(type)}`;
        toast.textContent = message;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('translate-x-full');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    /**
     * Get toast styling based on type
     * @param {string} type - The type of toast
     * @returns {string} CSS classes
     */
    getToastStyles(type) {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-yellow-500 text-gray-900';
            default:
                return 'bg-blue-500 text-white';
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CodexApp();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodexApp;
}
