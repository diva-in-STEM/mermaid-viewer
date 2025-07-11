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
const downloadButton = document.getElementById('download')
window.onbeforeunload = function() {
    input.value = '';
};

async function updateRenderer() {
    const code = input.value.trim();
    
    if (!code) {
        renderer.innerHTML = '<p style="color: #666;">Enter Mermaid code to see the diagram</p>';
        downloadButton.style.display = 'none';
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
        downloadButton.style.display = 'flex';
        
    } catch (error) {
        renderer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        downloadButton.style.display = 'none';
    }
}

function debounceUpdate() {
    renderTimeout = setTimeout(updateRenderer, 300);
    clearTimeout(renderTimeout);
}

input.addEventListener('input', debounceUpdate);

function formatXML(xml) {
    let formatted = '';
    let indent = '';
    const tab = '  '; // 2 spaces for indentation
    
    xml.split(/>\s*</).forEach(function(node) {
        if (node.match(/^\/\w/)) {
            // Closing tag
            indent = indent.substring(tab.length);
        }
        formatted += indent + '<' + node + '>\r\n';
        
        if (node.match(/^<?\w[^>]*[^\/]$/)) {
            // Opening tag (not self-closing)
            indent += tab;
        }
    });
    
    return formatted.substring(1, formatted.length - 3);
}


function downloadGraph() {
    const svg = document.getElementsByTagName('svg')[0];
    const serialiser = new XMLSerializer();
    let source = serialiser.serializeToString(svg);
    
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
        source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }
    
    source = formatXML('<?xml version="1.0" standalone="no"?>\r\n' + source);
    const url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Mermaid Graph.svg';
    document.body.appendChild(link);
    link.click()
    document.body.removeChild(link);
}

if (input.addEventListener) {
  input.addEventListener('input', function() {
    updateRenderer()
  }, false);
} else if (input.attachEvent) {
  input.attachEvent('onpropertychange', function() {
    updateRenderer()
  });
}