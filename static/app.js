mermaid.initialize({ 
    startOnLoad: true,
    theme: 'default'
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
    clearTimeout(renderTimeout);
    renderTimeout = setTimeout(updateRenderer, 300);
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