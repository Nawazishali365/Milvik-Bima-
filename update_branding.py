import os
import re

def update_html_files(directory):
    logo_replacement = '<div class="logo">\n                    <img src="assets/img/logo.png" alt="BIMA" class="logo-img">\n                </div>'
    
    # Regex to match the existing logo div (SVG + text)
    # It matches <div class="logo"> ... </div> including newlines
    logo_pattern = re.compile(r'<div class="logo">\s*<svg[\s\S]*?</svg>\s*<span class="logo-text">BIMA</span>\s*</div>')
    
    # Regex to find <head> to insert favicon
    head_pattern = re.compile(r'(<head>[\s\S]*?)(\s*</head>)')

    # New favicon link
    favicon_link = '    <link rel="icon" type="image/png" href="assets/img/favicon.png">'

    for filename in os.listdir(directory):
        if filename.endswith(".html"):
            filepath = os.path.join(directory, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            new_content = content
            
            # Replace Logo
            # Check if we can find the detailed SVG logo pattern
            if logo_pattern.search(new_content):
                 new_content = logo_pattern.sub(logo_replacement, new_content)
            else:
                 # Fallback for simpler matches or if already changed partially (just in case)
                 # We'll stick to the specific pattern for safety to avoid breaking other things
                 print(f"Logo pattern not found in {filename}")

            # Add Favicon
            # Check if favicon already exists
            if '<link rel="icon"' not in new_content:
                # Insert before </head> or other links? 
                # Let's insert after <title> or meta description if possible, or just before </head>
                # Using regex to find the end of head block is safest
                
                # Check for existing <link rel="stylesheet"> to put it before or after
                if '<link rel="stylesheet"' in new_content:
                     new_content = new_content.replace('<link rel="stylesheet"', f'{favicon_link}\n    <link rel="stylesheet"', 1)
                else: 
                     new_content = new_content.replace('</head>', f'{favicon_link}\n</head>')
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filename}")
            else:
                print(f"No changes for {filename}")

if __name__ == "__main__":
    update_html_files(r"c:\Users\Nawazish Ali\Downloads\NEW FILES")
