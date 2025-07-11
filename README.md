# Mermaid Viewer
A super simple containerised viewer for [mermaid.js](https://mermaid.js.org/) code!

## Features
- Live updates as you type your code
- Resizable input and output windows
- Mobile layout
- Download button for finished graph
- JavaScript syntax 
- Reable XML for the downloaded svg

## Setup Instructions

### With Docker
1. Clone repository
```bash
git clone https://github.com/diva-in-STEM/mermaid-viewer.git
```

2. Open directory in a terminal
```bash
cd mermaid-viewer
```

3. Build docker container
```bash
docker build -t mermaid-viewer .
```

4. Run the container
```bash
docker run -p 5000:5000 mermaid-viewer
```

#### Docker Compose (follow instructions to build the container)
```yaml
services:
  mermaid:
    image: mermaid-viewer
    ports:
      - "5000:5000"
    restart: unless-stopped
    container_name: mermaid
    networks:
      - mermaid-network

networks:
  mermaid-network:
    driver: bridge
```

## With python
There is no virual environment provided but feel free to create your own!

1. Clone repository
```bash
git clone https://github.com/diva-in-STEM/mermaid-viewer.git
```

2. Open directory in a terminal
```bash
cd mermaid-viewer
```

3. Install dependencies
```bash
pip install -r requirements.txt
```

4. Run the app
```bash
python app.py
```