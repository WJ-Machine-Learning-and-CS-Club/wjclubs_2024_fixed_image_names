from bs4 import BeautifulSoup
import csv
import re
import os
import shutil

# Read the HTML content from the file
with open('index.html', 'r', encoding='utf-8') as file:
    soup = BeautifulSoup(file, 'html.parser')

os.makedirs('updated_images', exist_ok=True)

unique_extensions = set()

# Find all the club entries
clubs = []

# Iterate through each figure in the gallery section to extract club name and image path
for figure in soup.find_all('figure'):
    # Extract the club name from the <th> tag (first <th> is the club name)
    club_name = figure.find('th').text.strip() if figure.find('th') else 'Unknown Club'
    
    # Extract the image path from the <img> tag
    img_tag = figure.find('img')
    img_path = img_tag['src'].strip() if img_tag else 'No image'
    img_path=img_path.split("\\")[1]

    file_type=str(img_path.split(".")[1].lower())
    unique_extensions.add(file_type)
    #print(file_type)
    club_name=re.sub(r'[^A-Za-z0-9\s]', '', club_name)
    club_name_underscored = club_name.replace(" ", "_")
    new_img_path = f"updated_images/{club_name_underscored}.{file_type}"

    # Copy the image from original path to new path
    original_img_path = f"img/{img_path}"  # Assuming images are located in 'img' directory
    try:
        shutil.copy(original_img_path, new_img_path)
        print(f"Image copied successfully: {original_img_path} to {new_img_path}")
    except FileNotFoundError:
        print(f"Image not found: {original_img_path}")

print(unique_extensions)