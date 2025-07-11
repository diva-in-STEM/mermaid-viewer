let isResizing = false;
const inputsPanel = document.querySelector('.inputs');
const resizeHandle = document.querySelector('.inputs::after');

// Add event listeners for custom resizing
inputsPanel.addEventListener('mousedown', (e) => {
    const rect = inputsPanel.getBoundingClientRect();
    const isNearRightEdge = e.clientX > rect.right - 15;
    
    if (isNearRightEdge) {
        isResizing = true;
        document.body.style.cursor = 'col-resize';
        e.preventDefault();
    }
});

document.addEventListener('mousemove', (e) => {
    if (isResizing) {
        const containerRect = document.querySelector('.container').getBoundingClientRect();
        const newWidth = e.clientX - containerRect.left;
        const minWidth = 300;
        const maxWidth = window.innerWidth * 0.7;
        
        if (newWidth >= minWidth && newWidth <= maxWidth) {
            inputsPanel.style.width = newWidth + 'px';
        }
    }
});

document.addEventListener('mouseup', () => {
    if (isResizing) {
        isResizing = false;
        document.body.style.cursor = 'default';
    }
});

mermaid.initialize({ 
    startOnLoad: true,
    theme: 'base',
    themeVariables: {
        primaryColor: '#E4610F',
        secondaryColor: '#a5a5a5',
        tertiaryColor: '#6c757d',
        lineColor: '#F8B229'
    }
});

const renderer = document.getElementById('mermaid')
const input = document.getElementById('codeInput')

async function updateRenderer() {
    const code = input.value.trim();
    
    if (!code) {
        renderer.innerHTML = '<p style="color: #666;">Enter Mermaid code to see the diagram</p>';
        return;
    }
    
    try {
        // Clear previous content
        renderer.innerHTML = '';
        
        // Generate unique ID for this render
        const id = 'mermaid-' + Date.now();
        
        // Render the mermaid diagram
        const { svg } = await mermaid.render(id, code);
        renderer.innerHTML = svg;
        
    } catch (error) {
        renderer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

function debounceUpdate() {
    renderTimeout = setTimeout(updateRenderer, 300);
    clearTimeout(renderTimeout);
}

input.addEventListener('input', debounceUpdate);

if (input.addEventListener) {
  input.addEventListener('input', function() {
    updateRenderer()
  }, false);
} else if (input.attachEvent) {
  input.attachEvent('onpropertychange', function() {
    updateRenderer()
  });
}