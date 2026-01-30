import os

def generate_partners_html(directory, html_file):
    image_files = [f for f in os.listdir(directory) if f.endswith(".webp")]
    
    # Create the slider HTML
    # We duplicate the images to create a seamless loop
    
    slider_content = '<div class="partners-track">\n'
    
    # First set
    for img in image_files:
        slider_content += f'                    <div class="partner-logo"><img src="assets/img/partners/{img}" alt="Partner"></div>\n'
    
    # Duplicate set
    for img in image_files:
        slider_content += f'                    <div class="partner-logo"><img src="assets/img/partners/{img}" alt="Partner"></div>\n'
        
    slider_content += '                </div>'
    
    # Read index.html
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the existing .partners-logos content
    # We look for the div <div class="partners-logos"> ... </div>
    # The current content in index.html is:
    # <div class="partners-logos">
    #     <div class="partner-logo">Partner 1</div>
    #     ...
    # </div>
    
    import re
    # Match the block
    pattern = re.compile(r'(<div class="partners-logos">)([\s\S]*?)(</div>)')
    
    if pattern.search(content):
        new_content = pattern.sub(r'\1\n' + slider_content + r'\n\3', content)
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print("Updated partners slider HTML.")
    else:
        print("Could not find .partners-logos div.")

if __name__ == "__main__":
    img_dir = r"c:\Users\Nawazish Ali\Downloads\NEW FILES\assets\img\partners"
    index_file = r"c:\Users\Nawazish Ali\Downloads\NEW FILES\index.html"
    generate_partners_html(img_dir, index_file)
